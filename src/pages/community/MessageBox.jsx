import React from "react";
import { Avatar, Typography } from "antd";
import { useCommunityMessages } from "../../api/api";

const { Text } = Typography;

function MessageBox({ communityData }) {
  const { communityMessage, isLoading, isError, error, refetch } =
    useCommunityMessages();

  // Format message time
  const formatMessageTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const hasMessages =
    communityMessage?.messages && communityMessage.messages.length > 0;

  return (
   <div className=" ">
     <div className="flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-white">
        <div className="flex items-center">
          <Avatar
            size={48}
            src={
              <img
                src={communityMessage?.community_profile}
                alt={communityMessage?.community_name}
                className="object-cover"
              />
            }
          />
          <div className="ml-3">
            <Text strong className="text-lg block">
              {communityMessage?.community_name}
            </Text>
            <Text type="secondary" className="text-xs flex items-center">
              Community Chat
            </Text>
          </div>
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 p-6 overflow-y-auto  min-h-[74vh]  max-h-[74vh] bg-gray-50">
        {hasMessages ? (
          <div className="flex flex-col space-y-4">
            {communityMessage.messages.map((msg) => (
              <div key={msg.message_id} className="flex items-start space-x-3">
                {/* Sender Avatar */}
                <Avatar
                  size={36}
                  src={
                    <img src={msg.sender.profile} alt={msg.sender.full_name} />
                  }
                />
                {/* Message Bubble */}
                <div className="bg-white text-gray-800 rounded-xl px-4 py-2 max-w-md shadow-sm">
                  <Text strong className="block text-sm mb-1">
                    {msg.sender.full_name}
                  </Text>
                  <p className="text-sm">{msg.message}</p>
                  <Text className="text-gray-500 text-xs block mt-1 text-right">
                    {formatMessageTime(msg.created_at)}
                  </Text>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center h-full">
            <div className="text-center">
              <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
              </div>
              <Text strong className="text-lg block mb-2">
                No messages yet
              </Text>
              <Text type="secondary">This community has no messages yet</Text>
            </div>
          </div>
        )}
      </div>
    </div>
   </div>
  );
}

export default MessageBox;
