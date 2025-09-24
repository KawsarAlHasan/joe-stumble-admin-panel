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

  const handleFinish = async (values) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", values.title);

      if (imageFile) {
        formData.append("profile", imageFile);
      }

      console.log("Updating Orbit with data:", {
        title: values.title,
        hasNewImage: !!imageFile,
      });

      // await API.put(
      //   `/admin/administrators/${orbt.id}/update/`,
      //   formData,
      //   {
      //     headers: {
      //       'Content-Type': 'multipart/form-data',
      //     },
      //   }
      // );

      message.success("Orbit updated successfully!");
      refetch();

      setSelectedImage(null);
      setImageFile(null);
      setIsModalOpen(false);
    } catch (err) {
      console.log(err, "err");
      message.error(err.response?.data?.error || "Failed to update Orbit");
    } finally {
      setLoading(false);
    }
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
      return false;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
      return false;
    }
    return true;
  };

  return (
    <>
      <FaRegEdit
        onClick={showModal}
        className="cursor-pointer hover:text-blue-600"
      />

      <Modal
        title="Update Orbit Post"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={500}
      >
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-4">
            <Avatar
              size={100}
              src={selectedImage || orbt?.image}
              icon={<UserOutlined />}
              className="border-2 border-gray-200"
            />

            <Upload
              name="avatar"
              showUploadList={false}
              beforeUpload={beforeUpload}
              accept="image/jpeg,image/png"
              customRequest={({ file, onSuccess }) => {
                onSuccess("ok");
              }}
              onChange={(info) => {
                if (info.file.status === "done") {
                  handleImageSelect(info.file.originFileObj);
                }
              }}
            >
              <Button
                type="primary"
                shape="circle"
                icon={<CameraOutlined />}
                size="small"
                className="absolute -bottom-1 -right-1 shadow-md"
                style={{ backgroundColor: "#1890ff" }}
              />
            </Upload>
          </div>

          {selectedImage && (
            <p className="text-green-600 text-sm mb-2">
              New image selected. Click "Update" to save changes.
            </p>
          )}
        </div>

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
                Update
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default EditOrbit;
