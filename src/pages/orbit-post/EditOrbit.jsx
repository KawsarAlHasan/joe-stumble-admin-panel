import React, { useState } from "react";
import { EditOutlined, UserOutlined, CameraOutlined } from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  Select,
  Avatar,
  Upload,
  Space,
} from "antd";
import { FaRegEdit } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { API } from "../../api/api";

// import { API } from "../../api/api";

const { Option } = Select;

const EditOrbit = ({ orbt, refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setSelectedImage(null);
    setImageFile(null);
    setIsModalOpen(false);
  };

  const handleImageSelect = (file) => {
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);

    return false;
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageFile(null);
  };

  const handleFinish = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("id", orbt.id);
      formData.append("title", values.title);

      if (imageFile) {
        formData.append("image", imageFile);
      }

      await API.patch(`/authentication/admin/orbit-post-create/`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Orbit updated successfully!");
      refetch?.();

      setSelectedImage(null);
      setImageFile(null);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err, "err");
      message.error(err.response?.data?.message || "Failed to update Orbit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TbEdit
        onClick={showModal}
        className="cursor-pointer !text-[21px] hover:text-blue-600"
      />

      <Modal
        title="Update Orbit Post"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={500}
      >
        <Form
          layout="vertical"
          onFinish={handleFinish}
          initialValues={{
            id: orbt?.id,
            title: orbt?.title,
          }}
        >
          <Form.Item
            label="Orbit Title"
            name="title"
            rules={[{ required: true, message: "Please enter orbit title" }]}
          >
            <Input placeholder="Enter orbit title" />
          </Form.Item>

          {/* Image Upload - AddOrbit এর মতোই */}
          <Form.Item label="Upload Image">
            <Upload
              beforeUpload={handleImageSelect}
              showUploadList={false}
              accept="image/*"
            >
              {selectedImage ? (
                <Space direction="vertical" align="center">
                  <Avatar
                    shape="square"
                    size={120}
                    src={selectedImage}
                    alt="Orbit"
                  />
                  <Button danger onClick={handleRemoveImage}>
                    Remove
                  </Button>
                </Space>
              ) : (
                <Space direction="vertical" align="center">
                  <Avatar
                    shape="square"
                    size={120}
                    src={orbt?.image}
                    icon={<UserOutlined />}
                    alt="Orbit"
                  />
                  <Button icon={<CameraOutlined />}>Select New Image</Button>
                </Space>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <div className="grid grid-cols-2 gap-2">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button
                type="primary"
                className="my-main-button"
                htmlType="submit"
                loading={loading}
                icon={<EditOutlined />}
              >
                Update Orbit Post
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditOrbit;
