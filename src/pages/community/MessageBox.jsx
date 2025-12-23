import React, { useState, useRef, useEffect } from "react";
import { Avatar, Typography, Spin, Empty, Button, Image } from "antd";
import { useCommunityMessages } from "../../api/api";
import { LoadingOutlined, UserOutlined } from "@ant-design/icons";

const { Text } = Typography;

function MessageBox({ tribeID }) {
  const [filter, setFilter] = useState({
    tribeID: tribeID,
    page: 1,
  });

  const messagesEndRef = useRef(null);
  const messageContainerRef = useRef(null);

  const { communityMessages, isLoading, isError, error, refetch } =
    useCommunityMessages(filter, { enabled: tribeID > 0 });

  // Scroll to bottom when new messages load
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Scroll to bottom after messages are loaded
  useEffect(() => {
    if (communityMessages?.data?.messages && !isLoading) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        scrollToBottom();
      }, 100);
    }
  }, [communityMessages, isLoading]);

  // Update filter when tribeID changes
  useEffect(() => {
    setFilter({ tribeID: tribeID, page: 1 });
  }, [tribeID]);

  // Format message time
  const formatMessageTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  // Format date header
  const formatDateHeader = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    }
  };

  // Group messages by date (reversed to show oldest first, latest at bottom)
  const groupMessagesByDate = (messages) => {
    const grouped = {};
    // Reverse to show oldest first (latest at bottom)
    const reversedMessages = [...(messages || [])].reverse();
    reversedMessages?.forEach((msg) => {
      const dateKey = new Date(msg.created_at).toDateString();
      if (!grouped[dateKey]) {
        grouped[dateKey] = [];
      }
      grouped[dateKey].push(msg);
    });
    return grouped;
  };

  const tribeData = communityMessages?.data?.tribe;
  const messages = communityMessages?.data?.messages || [];
  const pagination = communityMessages?.data?.pagination;
  const hasMessages = messages && messages.length > 0;
  const groupedMessages = groupMessagesByDate(messages);

  // Get sorted date keys (oldest to newest)
  const sortedDateKeys = Object.keys(groupedMessages).sort(
    (a, b) => new Date(a) - new Date(b)
  );

  // Handle pagination
  const handleLoadMore = () => {
    if (pagination?.has_previous) {
      setFilter((prev) => ({ ...prev, page: prev.page + 1 }));
    }
  };

  // Extract base64 image from message
  const extractBase64Image = (message) => {
    // Pattern: [img:image/type]base64data[/img]
    // Using non-greedy match and proper closing tag
    const imageMatch = message.match(
      /\[img:(image\/\w+)\]([A-Za-z0-9+/=\s]+)\[\/img\]/
    );

    if (imageMatch) {
      const mimeType = imageMatch[1];
      // Remove any whitespace/newlines from base64
      const base64Data = imageMatch[2].replace(/\s/g, "");

      // Get text before the image tag
      const imageStartIndex = message.indexOf("[img:");
      const textBefore =
        imageStartIndex > 0 ? message.substring(0, imageStartIndex).trim() : "";

      return {
        hasImage: true,
        mimeType,
        base64Data,
        src: `data:${mimeType};base64,${base64Data}`,
        textBefore,
      };
    }
    return { hasImage: false, textBefore: message };
  };

  // Render message content with base64 images
  const renderMessageContent = (message) => {
    const imageInfo = extractBase64Image(message);

    if (imageInfo.hasImage) {
      return (
        <div>
          {/* Show text before image if exists */}
          {imageInfo.textBefore && (
            <p className="text-sm text-gray-800 whitespace-pre-wrap break-words mb-2">
              {imageInfo.textBefore}
            </p>
          )}
          {/* Show image */}
          <div className="mt-2">
            <Image
              src={imageInfo.src}
              alt="Message attachment"
              className="max-w-xs rounded-lg hover:opacity-90 transition-opacity"
            />
          </div>
        </div>
      );
    }

    return (
      <p className="text-sm text-gray-800 whitespace-pre-wrap break-words">
        {message}
      </p>
    );
  };

  return (
    <div className="flex flex-col h-full max-h-[84vh]">
      {/* Chat Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-200 flex justify-between items-center bg-white shadow-sm">
        <div className="flex items-center">
          <Avatar
            size={48}
            src={tribeData?.image_url}
            style={{
              backgroundColor: !tribeData?.image_url ? "#1890ff" : undefined,
            }}
          >
            {!tribeData?.image_url &&
              tribeData?.display_name?.charAt(0).toUpperCase()}
          </Avatar>
          <div className="ml-3">
            <Text strong className="text-lg block">
              {tribeData?.display_name || "Community Chat"}
            </Text>
            <Text type="secondary" className="text-xs flex items-center">
              {tribeData?.member_count || 0} members • {tribeData?.description}
            </Text>
          </div>
        </div>
      </div>

      {/* Message Area with Fixed Height */}
      <div
        ref={messageContainerRef}
        className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white"
        style={{ height: "calc(100vh - 200px)" }}
      >
        <div className="p-6 max-w-4xl mx-auto">
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center min-h-[60vh]">
              <Spin
                indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />}
                tip="Loading messages..."
              />
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="flex justify-center items-center min-h-[60vh]">
              <div className="text-center">
                <Text type="danger" className="text-lg">
                  Failed to load messages
                </Text>
                <br />
                <Button onClick={() => refetch()} className="mt-4">
                  Retry
                </Button>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && !hasMessages && (
            <div className="flex justify-center items-center min-h-[60vh]">
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={
                  <div className="text-center">
                    <Text strong className="text-lg block mb-2">
                      No messages yet
                    </Text>
                    <Text type="secondary">
                      Be the first to start a conversation in this community
                    </Text>
                  </div>
                }
              />
            </div>
          )}

          {/* Load More Button (at top for older messages) */}
          {!isLoading && hasMessages && pagination?.has_previous && (
            <div className="text-center mb-6">
              <Button
                onClick={handleLoadMore}
                loading={isLoading}
                className="shadow-sm"
              >
                Load older messages
              </Button>
            </div>
          )}

          {/* Messages */}
          {!isLoading && hasMessages && (
            <div className="space-y-6">
              {sortedDateKeys.map((dateKey) => (
                <div key={dateKey}>
                  {/* Date Separator */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="bg-gray-200 text-gray-600 text-xs font-medium px-4 py-1 rounded-full">
                      {formatDateHeader(groupedMessages[dateKey][0].created_at)}
                    </div>
                  </div>

                  {/* Messages for this date */}
                  <div className="flex flex-col space-y-4">
                    {groupedMessages[dateKey].map((msg) => {
                      const imageInfo = extractBase64Image(msg.message);
                      const displayMessage = imageInfo.hasImage
                        ? "[Image]"
                        : msg.message;

                      return (
                        <div
                          key={msg.id}
                          className="flex items-start space-x-3 group hover:bg-gray-50 p-2 rounded-lg transition-colors"
                        >
                          {/* Sender Avatar */}
                          <Avatar
                            size={40}
                            src={msg.user?.profile_picture}
                            icon={<UserOutlined />}
                            style={{
                              backgroundColor: !msg.user?.profile_picture
                                ? msg.is_bot
                                  ? "#52c41a"
                                  : "#1890ff"
                                : undefined,
                            }}
                          />

                          {/* Message Bubble */}
                          <div className="flex-1 min-w-0">
                            {/* Sender Info */}
                            <div className="flex items-baseline space-x-2 mb-1 flex-wrap">
                              <Text strong className="text-sm">
                                {msg.user?.username ||
                                  msg.user?.full_name ||
                                  msg.user?.email ||
                                  "Unknown User"}
                              </Text>
                              {msg.is_bot && (
                                <span className="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-medium">
                                  BOT
                                </span>
                              )}
                              <Text className="text-gray-400 text-xs">
                                {formatMessageTime(msg.created_at)}
                              </Text>
                              {msg.is_edited && (
                                <Text className="text-gray-400 text-xs italic">
                                  (edited)
                                </Text>
                              )}
                            </div>

                            {/* Message Content */}
                            <div className="bg-white border border-gray-200 rounded-lg px-4 py-3 shadow-sm">
                              {renderMessageContent(msg.message)}
                            </div>

                            {/* Message Metadata */}
                            <div className="flex items-center space-x-4 mt-1 text-xs text-gray-400">
                              {msg.is_pinned && (
                                <span className="flex items-center">
                                  📌 Pinned
                                </span>
                              )}
                              {msg.reactions_count > 0 && (
                                <span>👍 {msg.reactions_count}</span>
                              )}
                              {msg.replies_count > 0 && (
                                <span>💬 {msg.replies_count} replies</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Scroll anchor - This will be at the bottom */}
          <div ref={messagesEndRef} className="h-4" />
        </div>
      </div>

      {/* Pagination Info */}
      {pagination && hasMessages && (
        <div className="flex-shrink-0 p-3 bg-gray-50 border-t border-gray-200 text-center">
          <Text type="secondary" className="text-xs">
            Showing {messages.length} of {pagination.total_messages} messages
            {pagination.total_pages > 1 && (
              <>
                {" "}
                • Page {pagination.current_page} of {pagination.total_pages}
              </>
            )}
          </Text>
        </div>
      )}
    </div>
  );
}

export default MessageBox;
