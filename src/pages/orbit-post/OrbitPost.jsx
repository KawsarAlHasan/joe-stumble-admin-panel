import { Button, message, Modal, Tag } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { API, useAllOrbitPost } from "../../api/api";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import { EyeOutlined } from "@ant-design/icons";
import { LuPanelTopOpen, LuPanelBottomOpen } from "react-icons/lu";
import AddOrbit from "./AddOrbit";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";
import EditOrbit from "./EditOrbit";
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
  const filteredPosts = allOrbit?.posts?.filter((post) => {
    if (currentFilter === "All") return true;
    return post.status === currentFilter;
  });

  console.log("filteredPosts", filteredPosts);

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "green";
      case "archived":
        return "blue";
      default:
        return "red";
    }
  };

  const handleChangeStatus = async (post, status) => {
    try {
      const res = await API.post("authentication/admin/orbit-posts/status/", {
        id: post?.id,
        action: status,
      });

      const action = status === "active" ? "Activated" : "Archived";
      message.success(`${action} successfully!`);
      refetch();
    } catch (error) {
      const action = status === "active" ? "Activated" : "Archived";

      message.error(error?.response?.data?.message || `${action} failed`);
    }
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
          await API.delete(`/authentication/admin/orbit-post-create/`, {
            data: { id: postID },
          });
          message.success("Orbit post deleted successfully!");
          refetch();
        } catch (err) {
          console.log("err", err);
          message.error(
            err.response?.data?.message || "Failed to delete orbit post"
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
            type={currentFilter === "active" ? "primary" : "default"}
            onClick={() => handleFilterChange("active")}
            className={currentFilter === "active" ? "my-main-button" : ""}
          >
            Activated
          </Button>
          <Button
            type={currentFilter === "archived" ? "primary" : "default"}
            onClick={() => handleFilterChange("archived")}
            className={currentFilter === "archived" ? "my-main-button" : ""}
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
                    {orbt?.status === "active" ? (
                      <AiOutlineCheckCircle className="!text-[14px] mt-[1px]" />
                    ) : (
                      <AiOutlineCloseCircle className="!text-[14px] mt-[1px]" />
                    )}

                    {orbt?.status == "active" ? "Activated" : "Archived"}
                  </Tag>
                </div>
                <img
                  src={orbt?.image}
                  alt={orbt?.title}
                  className="w-full h-[200px] rounded object-cover"
                />
              </div>

              <div className="flex justify-between mt-1.5">
                <div className="text-[15px] flex items-center gap-1">
                  <EyeOutlined />
                  <span>{orbt?.view_count || 0}</span>
                </div>
                <div className="flex gap-2 text-[20px]">
                  <EditOrbit orbt={orbt} refetch={refetch} />

                  {orbt?.status === "active" ? (
                    <LuPanelTopOpen
                      onClick={() => handleChangeStatus(orbt, "archive")}
                      className="cursor-pointer hover:text-orange-600"
                    />
                  ) : (
                    <LuPanelBottomOpen
                      onClick={() => handleChangeStatus(orbt, "activate")}
                      className="cursor-pointer hover:text-green-600"
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
