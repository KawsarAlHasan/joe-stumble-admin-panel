import React, { useState } from "react";
import {
  Modal,
  Typography,
  Button,
  Space,
  notification,
  Descriptions,
  Tag,
  Divider,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  ManOutlined,
  WomanOutlined,
} from "@ant-design/icons";
import { API } from "../../api/api";

const { Title, Text } = Typography;

function ViewUser({ userDetailsData, isOpen, onClose, refetch }) {
  const [enableLoading, setEnableLoading] = useState(false);
  const [disableLoading, setDisableLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const openNotification = (type, message, description) => {
    notification[type]({
      message,
      description,
      placement: "topRight",
      duration: 3,
    });
  };

  const handleUserEnable = async (userData) => {
    setEnableLoading(true);
    try {
      await API.post(
        `/admin-dashboard/admin/users/${userData?.user_id}/block/`
      );

      openNotification("success", "Success", "User disabled successfully");
      refetch?.();
      onClose();
    } catch (error) {
      console.log("error", error);
      openNotification(
        "error",
        "Error",
        `${error?.response?.data?.message || "Failed to disable user"}`
      );
    } finally {
      setEnableLoading(false);
    }
  };

  const handleUserDisable = async (userData) => {
    setDisableLoading(true);
    try {
      await API.post(
        `/admin-dashboard/admin/users/${userData?.user_id}/unblock/`
      );

      openNotification("success", "Success", "User enabled successfully");
      refetch?.();
      onClose();
    } catch (error) {
      openNotification(
        "error",
        "Error",
        `${error?.response?.data?.message || "Failed to enable user"}`
      );
    } finally {
      setDisableLoading(false);
    }
  };

  const handleUserDelete = async (userData) => {
    setDeleteLoading(true);
    try {
      await API.delete(
        `/admin-dashboard/admin/users/${userData?.user_id}/delete/`
      );

      openNotification("success", "Success", "User deleted successfully");
      refetch?.();
      onClose();
    } catch (error) {
      openNotification(
        "error",
        "Error",
        `${error?.response?.data?.message || "Failed to delete user"}`
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  const getGenderIcon = (gender) => {
    if (gender?.toLowerCase() === "male")
      return <ManOutlined style={{ color: "#1890ff" }} />;
    if (gender?.toLowerCase() === "female")
      return <WomanOutlined style={{ color: "#eb2f96" }} />;
    return null;
  };

  return (
    <Modal
      title={
        <Space>
          <UserOutlined />
          <span>User Details & Actions</span>
        </Space>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={600}
      styles={{
        body: { paddingTop: 24 },
      }}
    >
      {userDetailsData ? (
        <>
          <Descriptions
            bordered
            column={1}
            size="small"
            labelStyle={{ fontWeight: 600, width: "140px" }}
          >
            <Descriptions.Item
              label={
                <Space>
                  <UserOutlined /> Full Name
                </Space>
              }
            >
              {userDetailsData?.full_name || "-"}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <UserOutlined /> Username
                </Space>
              }
            >
              {userDetailsData?.username || "-"}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <MailOutlined /> Email
                </Space>
              }
            >
              {userDetailsData?.email || "-"}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <PhoneOutlined /> Phone
                </Space>
              }
            >
              {userDetailsData?.phone_number || "-"}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  {getGenderIcon(userDetailsData?.gender)}
                  Gender
                </Space>
              }
            >
              {userDetailsData?.gender || "-"}
            </Descriptions.Item>

            <Descriptions.Item
              label={
                <Space>
                  <CalendarOutlined /> Date of Birth
                </Space>
              }
            >
              {userDetailsData?.date_of_birth || "-"}
            </Descriptions.Item>

            <Descriptions.Item label="Status">
              <Tag color={userDetailsData?.is_active ? "success" : "error"}>
                {userDetailsData?.is_active ? "Active" : "Inactive"}
              </Tag>
            </Descriptions.Item>
          </Descriptions>

          <Divider style={{ margin: "24px 0" }} />

          <Space
            style={{
              width: "100%",
              justifyContent: "center",
            }}
            size="middle"
          >
            <Button
              type="primary"
              loading={disableLoading}
              onClick={() => handleUserDisable(userDetailsData)}
              disabled={userDetailsData?.is_active}
            >
              Enable User
            </Button>

            <Button
              danger
              type="default"
              loading={enableLoading}
              onClick={() => handleUserEnable(userDetailsData)}
              disabled={!userDetailsData?.is_active}
            >
              Disable User
            </Button>

            <Button
              danger
              type="primary"
              loading={deleteLoading}
              onClick={() => handleUserDelete(userDetailsData)}
            >
              Delete User
            </Button>
          </Space>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <Text type="secondary">No user data available</Text>
        </div>
      )}
    </Modal>
  );
}

export default ViewUser;
