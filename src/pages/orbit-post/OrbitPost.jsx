import { Button, message, Modal, Tag } from "antd";
import React from "react";
import { FaPlus, FaRegEdit } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAllOrbitPost } from "../../api/api";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import { BiEdit } from "react-icons/bi";
import { DeleteFilled, EyeOutlined } from "@ant-design/icons";
import { LuPanelTopOpen, LuPanelBottomOpen } from "react-icons/lu";
import AddOrbit from "./AddOrbit";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineEdit,
} from "react-icons/ai";
import EditOrbit from "./EditOrbit";
import { MdDeleteOutline } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";

function OrbitPost() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const currentFilter = queryParams.get("filter") || "All";

  const { allOrbit, isLoading, isError, error, refetch } = useAllOrbitPost();

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  const handleFilterChange = (type) => {
    if (type === "All") {
      navigate("/orbit-post");
    } else {
      navigate(`/orbit-post?filter=${type}`);
    }
  };

  // Filter posts based on current filter
  const filteredPosts = allOrbit.filter((post) => {
    if (currentFilter === "All") return true;
    return post.status === currentFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Activated":
        return "green";
      case "Deactivated":
        return "red";
      default:
        return "red";
    }
  };

  const handleActivate = () => {
    message.success("Activated successfully!");
  };

  const handleDeactivate = () => {
    message.success("Deactivated successfully!");
  };

  const showDeleteConfirm = (postID) => {
    Modal.confirm({
      title: "Are you sure you want to delete this Orbit?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          // await API.post(`/admin/administrators/${postID}/action/`, {
          //   action: "delete",
          // });
          message.success("Orbit post deleted successfully!");
          refetch();
        } catch (err) {
          message.error(
            err.response?.data?.error || "Failed to delete orbit post"
          );
        }
      },
    });
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-2 mb-4">
          <Button
            type={currentFilter === "All" ? "primary" : "default"}
            onClick={() => handleFilterChange("All")}
            className={currentFilter === "All" ? "my-main-button" : ""}
          >
            All Posts
          </Button>
          <Button
            type={currentFilter === "Activated" ? "primary" : "default"}
            onClick={() => handleFilterChange("Activated")}
            className={currentFilter === "Activated" ? "my-main-button" : ""}
          >
            Activated
          </Button>
          <Button
            type={currentFilter === "Deactivated" ? "primary" : "default"}
            onClick={() => handleFilterChange("Deactivated")}
            className={currentFilter === "Deactivated" ? "my-main-button" : ""}
          >
            Archived
          </Button>
        </div>
        <AddOrbit refetch={refetch} />
      </div>

      <div className="bg-white p-4 rounded-md w-full">
        <h1 className="text-[24px] font-semibold mb-4">All Posts</h1>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {filteredPosts.map((orbt, index) => (
            <div
              className="bg-[#e6f0f5] w-full rounded-md p-2 relative"
              key={index}
            >
              {/* Status Tag on top of image */}
              <div className="relative">
                <div className="absolute top-2 right-1 z-10">
                  <Tag
                    color={getStatusColor(orbt?.status)}
                    className="text-[14px] font-semibold flex items-center gap-1"
                  >
                    {orbt?.status === "Activated" ? (
                      <AiOutlineCheckCircle className="!text-[14px] mt-[1px]" />
                    ) : (
                      <AiOutlineCloseCircle className="!text-[14px] mt-[1px]" />
                    )}

                    {orbt?.status}
                  </Tag>
                </div>
                <img
                  src={orbt?.image}
                  alt={orbt?.title}
                  className="w-full h-[160px] rounded object-cover"
                />
              </div>

              <div className="flex justify-between mt-1.5">
                <div className="text-[15px] flex items-center gap-1">
                  <EyeOutlined />
                  <span>{orbt?.views || 0}</span>
                </div>
                <div className="flex gap-2 text-[20px]">
                  <EditOrbit orbt={orbt} refetch={refetch} />

                  {orbt?.status === "Activated" ? (
                    <LuPanelTopOpen
                      onClick={handleActivate}
                      className="cursor-pointer hover:text-green-600"
                    />
                  ) : (
                    <LuPanelBottomOpen
                      onClick={handleDeactivate}
                      className="cursor-pointer hover:text-orange-600"
                    />
                  )}

                  <RiDeleteBin6Line
                    onClick={() => showDeleteConfirm(orbt.id)}
                    className="!text-red-500 cursor-pointer hover:text-red-700"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrbitPost;
