import { Button } from "antd";
import React from "react";
import { FaPlus } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { useAllOrbitPost } from "../../api/api";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import { BiEdit } from "react-icons/bi";
import { DeleteFilled, EyeOutlined } from "@ant-design/icons";
import AddOrbit from "./AddOrbit";

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
            type={currentFilter === "Archived" ? "primary" : "default"}
            onClick={() => handleFilterChange("Archived")}
            className={currentFilter === "Archived" ? "my-main-button" : ""}
          >
            Archived
          </Button>
        </div>
        <AddOrbit refetch={refetch} />
      </div>

      <div className=" bg-white p-4 rounded-md w-full">
        <h1 className="text-[24px] font-semibold">All Posts</h1>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {allOrbit.map((orbt, index) => (
            <div className="bg-[#e6f0f5] w-full rounded-md p-2 " key={index}>
              <img
                src={orbt?.image}
                alt={orbt?.title}
                className="w-full h-[130px] rounded"
              />
              <h1 className="mt-1">{orbt?.title}</h1>
              <div className="flex justify-between">
                <div className="text-[14px]">
                  <EyeOutlined /> {orbt?.views || 0}
                </div>
                <div className="flex gap-2 text-[14px]">
                  <BiEdit />
                  <DeleteFilled className="!text-red-500" />
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
