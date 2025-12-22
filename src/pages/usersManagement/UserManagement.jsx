import { useState } from "react";
import { Table, Space, Image, Button } from "antd";
import { MdBlock } from "react-icons/md";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import { EyeOutlined } from "@ant-design/icons";
import ViewUser from "./ViewUser";
import JournalsViewModal from "./JournalsViewModal";
import VideoViewModal from "./VideoViewModal";
import { useLocation, useNavigate } from "react-router-dom";
import { useAllUsersList } from "../../api/api";

function UserManagement() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const currentFilter = queryParams.get("filter") || "All";

  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
    type: currentFilter,
  });

  const [userDetailsData, setUserDetailsData] = useState(null);
  const [userData, setUserData] = useState([]);

  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isJournalViewModalOpen, setIsJournalViewModalOpen] = useState(false);
  const [isVideoViewModalOpen, setIsVideoViewModalOpen] = useState(false);

  const { allUsersList, isLoading, isError, error, refetch } =
    useAllUsersList(filter);

  const handleUserDetails = (userData) => {
    setUserDetailsData(userData);
    setIsViewModalOpen(true);
  };

  const handleViewJournal = (data) => {
    setUserData(data);
    setIsJournalViewModalOpen(true);
  };

  const handleViewVideo = (userData) => {
    setUserDetailsData(userData);
    setIsVideoViewModalOpen(true);
  };

  const handleModalClose = () => {
    setUserDetailsData(null);

    setIsViewModalOpen(false);
  };

  const handleTableChange = (pagination, filters, sorter) => {
    setFilter((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  const handleFilterChange = (type) => {
    if (type === "All") {
      navigate("/user-management");
    } else {
      navigate(`/user-management?filter=${type}`);
    }
  };

  const columns = [
    {
      title: <span>Sl no.</span>,
      dataIndex: "id",
      key: "id",
      render: (_, record, index) => (
        <span>#{index + 1 + (filter.page - 1) * filter.limit}</span>
      ),
    },
    {
      title: <span>User</span>,
      dataIndex: "full_name",
      key: "full_name",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          {/* <Image
            src={record?.profile}
            className="!w-[40px] !h-[40px] rounded-full mt-[-5px]"
          /> */}
          <div className="mt-1">
            <h2>{record?.full_name || "-"}</h2>
            <p className="text-sm">{record?.email}</p>
          </div>
        </div>
      ),
    },
    {
      title: <span>Gender</span>,
      dataIndex: "gender",
      key: "gender",
      render: (gender) => <span>{gender}</span>,
    },
    {
      title: <span>Date of Birth</span>,
      dataIndex: "date_of_birth",
      key: "date_of_birth",
      render: (date_of_birth) => <span>{date_of_birth}</span>,
    },
    {
      title: <span>Phone</span>,
      dataIndex: "phone_number",
      key: "phone_number",
      render: (phone_number) => <span>{phone_number || "-"}</span>,
    },
    {
      title: <span>Journal</span>,
      key: "journal",
      render: (_, record) => (
        <Button
          onClick={() => handleViewJournal(record)}
          icon={<EyeOutlined />}
        >
          View Journal
        </Button>
      ),
    },

    ...(currentFilter === "Panic"
      ? [
          {
            title: <span>Video</span>,
            key: "Video",
            render: (_, record) => (
              <Button
                onClick={() => handleViewVideo(record)}
                icon={<EyeOutlined />}
              >
                View Video
              </Button>
            ),
          },
        ]
      : []),

    {
      title: <span>Action</span>,
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <MdBlock
            className="text-[23px] text-red-400 hover:text-red-300 cursor-pointer"
            onClick={() => handleUserDetails(record)}
          />
        </Space>
      ),
    },
  ];

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  const dataSource = allUsersList?.results?.users;

  return (
    <div className="p-4">
      <div className="flex gap-2 mb-4">
        <Button
          type={currentFilter === "All" ? "primary" : "default"}
          onClick={() => handleFilterChange("All")}
          className={currentFilter === "All" ? "my-main-button" : ""}
        >
          All
        </Button>
        <Button
          type={currentFilter === "Panic" ? "primary" : "default"}
          onClick={() => handleFilterChange("Panic")}
          className={currentFilter === "Panic" ? "my-main-button" : ""}
        >
          Panic
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="user_id"
        pagination={{
          current: filter.page,
          pageSize: filter.limit,
          total: allUsersList?.count,
          showSizeChanger: false,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
        loading={isLoading}
      />

      <ViewUser
        userDetailsData={userDetailsData}
        isOpen={isViewModalOpen}
        onClose={handleModalClose}
        refetch={refetch}
      />

      <JournalsViewModal
        isOpen={isJournalViewModalOpen}
        onClose={() => setIsJournalViewModalOpen(false)}
        userData={userData}
      />

      <VideoViewModal
        isOpen={isVideoViewModalOpen}
        onClose={() => setIsVideoViewModalOpen(false)}
        userData={userDetailsData}
      />
    </div>
  );
}

export default UserManagement;
