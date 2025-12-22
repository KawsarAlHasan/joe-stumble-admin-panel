import { useState, useEffect } from "react";
import { Avatar, Badge, Input, List, Typography, Drawer, Button } from "antd";
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  MoreOutlined,
  SearchOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useAllCommunity } from "../../api/api";
import { Link, useSearchParams } from "react-router-dom";

const { Search } = Input;
const { Text } = Typography;

function SidebarForMessages({ vendorID, isMobile, onUserSelect }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedUser, setSelectedUser] = useState(null);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const { allCommunity, isLoading, isError, error, refetch } = useAllCommunity();

  // Filter tribes based on search query
  const filteredTribes =
    allCommunity?.tribes?.filter((tribe) =>
      tribe?.display_name?.toLowerCase().includes(searchQuery.toLowerCase())
    ) || [];

  // Calculate total unread count
  const totalUnreadCount = allCommunity?.tribes?.reduce(
    (sum, tribe) => sum + (tribe.unread_count || 0),
    0
  ) || 0;

  // Format timestamp to relative time
  const formatTime = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const now = new Date();
    const diffHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffHours < 24) {
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (diffHours < 48) {
      return "Yesterday";
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }
  };

  const onSearch = (value) => {
    setSearchQuery(value);
  };

  const handleUserSelect = async (tribe) => {
    const senderId = tribe.id;
    searchParams.set("sender", senderId);
    setSearchParams(searchParams);
    setSelectedUser(tribe);

    if (isMobile) {
      setDrawerVisible(false);
    }

    // Call the parent callback if provided
    if (onUserSelect) {
      onUserSelect(tribe);
    }

    try {
      const sendReadData = {
        sender_id: senderId,
        receiver_id: vendorID,
      };
      // await API.put("/message/read-message", sendReadData);
      // refetch();
    } catch (error) {
      console.error(error);
    }
  };

  // Mobile drawer toggle
  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  const sidebarContent = (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0">
        <div className="flex items-center justify-between p-4 border-b">
          <Link
            to={`/community`}
            className="text-xl font-semibold text-center flex-1"
          >
            Community Messages ({allCommunity?.tribes?.length || 0})
          </Link>
          {isMobile && (
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={toggleDrawer}
              className="ml-2"
            />
          )}
        </div>

        {/* Search Bar */}
        <div className="p-2">
          <Search
            placeholder="Search Community..."
            onSearch={onSearch}
            onChange={(e) => setSearchQuery(e.target.value)}
            value={searchQuery}
            prefix={<SearchOutlined />}
            className="w-full"
            size={isMobile ? "large" : "middle"}
          />
        </div>
      </div>

      {/* Tribe List */}
      <div className="flex-1 overflow-hidden">
        <div
          className="overflow-y-auto flex-1 min-h-[69vh]"
          style={{ maxHeight: "calc(80vh - 100px)" }}
        >
          <List
            itemLayout="horizontal"
            dataSource={filteredTribes}
            loading={isLoading}
            renderItem={(tribe) => (
              <List.Item
                className={`p-3 mx-2 my-1 rounded-lg border-0 hover:bg-gray-50 cursor-pointer transition-all ${
                  selectedUser?.id === tribe.id
                    ? "bg-blue-50 border-l-4 border-l-blue-500"
                    : ""
                } ${isMobile ? "p-4" : "p-3"}`}
                onClick={() => handleUserSelect(tribe)}
                extra={
                  <div className="flex flex-col items-end">
                    <Text type="secondary" className="text-xs">
                      {formatTime(tribe.last_message_at)}
                    </Text>
                    {tribe.unread_count > 0 && (
                      <Badge
                        count={tribe.unread_count}
                        style={{ backgroundColor: "#1890ff" }}
                        className="mt-1"
                        size={isMobile ? "default" : "small"}
                      />
                    )}
                  </div>
                }
              >
                <List.Item.Meta
                  avatar={
                    <div className="relative">
                      {/* Tribe avatar with member count badge */}
                      <Badge
                        count={tribe.member_count}
                        showZero
                        style={{ backgroundColor: "#52c41a" }}
                        offset={isMobile ? [-5, 40] : [-5, 35]}
                        size={isMobile ? "default" : "small"}
                      >
                        <Avatar
                          size={isMobile ? 56 : 50}
                          src={
                            tribe.image ? (
                              <img
                                src={tribe.image}
                                alt={tribe.display_name}
                                className="object-cover w-full h-full"
                              />
                            ) : null
                          }
                          style={{
                            backgroundColor: !tribe.image ? "#1890ff" : undefined,
                          }}
                        >
                          {!tribe.image &&
                            tribe.display_name?.charAt(0).toUpperCase()}
                        </Avatar>
                      </Badge>
                    </div>
                  }
                  title={
                    <div className="flex items-center">
                      <Text
                        strong
                        className={`${
                          isMobile ? "text-lg" : "text-base"
                        } truncate max-w-[120px]`}
                      >
                        {tribe.display_name}
                      </Text>
                      {tribe.is_unlocked && (
                        <CheckCircleOutlined
                          className="text-green-500 ml-2"
                          style={{ fontSize: isMobile ? 16 : 14 }}
                        />
                      )}
                    </div>
                  }
                  description={
                    <div className="flex flex-col mt-1">
                      <Text
                        ellipsis
                        className={`${
                          isMobile ? "text-base" : "text-sm"
                        } max-w-[180px]`}
                        type="secondary"
                      >
                        {tribe.description}
                      </Text>
                      {tribe.member_count > 0 && (
                        <Text
                          className={`${
                            isMobile ? "text-xs" : "text-xs"
                          } mt-1`}
                          type="secondary"
                        >
                          {tribe.member_count} member{tribe.member_count !== 1 ? "s" : ""}
                        </Text>
                      )}
                    </div>
                  }
                />
              </List.Item>
            )}
            locale={{ emptyText: "No conversations found" }}
          />
        </div>
      </div>
    </div>
  );

  // Desktop version
  if (!isMobile) {
    return (
      <div className="h-full">
        <div className=" bg-white border-r h-full flex flex-col">
          {sidebarContent}
        </div>
      </div>
    );
  }

  // Mobile version with drawer
  return (
    <>
      {/* Mobile Header Button */}
      <div className="bg-white p-3 border-b flex items-center justify-between lg:hidden">
        <Button
          type="text"
          icon={<MenuOutlined />}
          onClick={toggleDrawer}
          size="large"
        >
          Conversations
        </Button>
        <Badge count={totalUnreadCount} style={{ backgroundColor: "#1890ff" }} />
      </div>

      {/* Drawer for mobile */}
      <Drawer
        placement="left"
        onClose={toggleDrawer}
        open={drawerVisible}
        width="100%"
        height="100%"
        bodyStyle={{ padding: 0 }}
        className="mobile-messages-drawer"
        styles={{
          body: { padding: 0 },
        }}
      >
        {sidebarContent}
      </Drawer>
    </>
  );
}

export default SidebarForMessages;