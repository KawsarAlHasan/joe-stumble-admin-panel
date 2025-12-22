import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  Upload,
  Avatar,
  Space,
} from "antd";
import { UserOutlined, CameraOutlined } from "@ant-design/icons";
import { FaPlus } from "react-icons/fa";
import { API } from "../../api/api";

const AddOrbit = ({ refetch }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  const [form] = Form.useForm();

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    form.resetFields();
    setSelectedImage(null);
    setImageFile(null);
    setIsModalOpen(false);
  };

  // image select handler
  const handleImageSelect = (file) => {
    setImageFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
    };
    reader.readAsDataURL(file);

    return false; // prevent auto upload by antd
  };

  // image remove handler
  const handleRemoveImage = () => {
    setSelectedImage(null);
    setImageFile(null);
  };

  const handleFinish = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", values.title);

      if (imageFile) {
        formData.append("image", imageFile);
      }


      await API.post("/authentication/admin/orbit-post-create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      message.success("Orbit post created successfully!");
      refetch?.();

      form.resetFields();
      setSelectedImage(null);
      setImageFile(null);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err, "error");
      message.error(
        err.response?.data?.message || "Failed to create Orbit post"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        type="primary"
        onClick={showModal}
        icon={<FaPlus />}
        className="my-main-button"
      >
        New Post Creation
      </Button>

      <Modal
        title="Create Orbit Post"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={500}
      >
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item
            label="Orbit Title"
            name="title"
            rules={[{ required: true, message: "Please enter orbit title" }]}
          >
            <Input placeholder="Enter orbit title" />
          </Form.Item>

          {/* Image Upload */}
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
                <Button icon={<CameraOutlined />}>Select Image</Button>
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
                icon={<FaPlus />}
              >
                Create Orbit Post
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AddOrbit;
