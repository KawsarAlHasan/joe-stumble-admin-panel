import { Avatar, Image, message, Modal, Space, Table } from "antd";
import IsError from "../../components/IsError";
import IsLoading from "../../components/IsLoading";
import { DeleteOutlined } from "@ant-design/icons";
import AddAdmin from "./AddAmin";
import AdminEdit from "./AdminEdit";
import { API, useAllAdmins } from "../../api/api";
import { useState } from "react";

function Administrators() {
  const [filter, setFilter] = useState({
    page: 1,
    limit: 10,
  });

  const { admins, isLoading, isError, error, refetch } = useAllAdmins(filter);

  const handleTableChange = (pagination, filters, sorter) => {
    setFilter((prev) => ({
      ...prev,
      page: pagination.current,
      limit: pagination.pageSize,
    }));
  };

  // 🗑️ delete confirm modal
  const showDeleteConfirm = (adminId) => {
    Modal.confirm({
      title: "Are you sure you want to delete this admin?",
      content: "This action cannot be undone.",
      okText: "Yes, Delete",
      okType: "danger",
      cancelText: "Cancel",
      async onOk() {
        try {
          await API.delete(
            `/admin-dashboard/admin/administrators/${adminId}/delete/`
          );

          message.success("Admin deleted successfully!");
          refetch();
        } catch (err) {
          console.log("err", err);
          message.error(
            err?.response?.data?.message || "Failed to delete admin"
          );
        }
      },
    });
  };

  const columns = [
    {
      title: <span>Sl no.</span>,
      dataIndex: "id",
      key: "id",
      render: (text, record, index) => (
        <span>{index + 1 + (filter.page - 1) * filter.limit}</span>
      ),
    },
    {
      title: <span>Name</span>,
      dataIndex: "full_name",
      key: "full_name",
      render: (_, record) => (
        <div className="flex gap-2 items-center">
          <Image
            src={record?.profile_picture_url}
            className="!w-[50px] !h-[50px] rounded-full object-cover"
          />
          <h2>{record?.full_name}</h2>
        </div>
      ),
    },
    {
      title: <span>Email</span>,
      dataIndex: "email",
      key: "email",
      render: (email) => <span className="">{email}</span>,
    },
    {
      title: <span>Phone</span>,
      dataIndex: "contact_number",
      key: "contact_number",
      render: (contact_number) => (
        <span className="">{contact_number || "N/A"}</span>
      ),
    },
    {
      title: <span>Has Access To</span>,
      dataIndex: "role",
      key: "role",
      render: (role) => <span className="">{role}</span>,
    },
    {
      title: <span>Action</span>,
      key: "action",
      render: (_, record) => {
        const isSuperAdmin = record.role === "superadmin";

        return (
          <Space size="middle">
            <AdminEdit adminProfile={record} refetch={refetch} />

            <DeleteOutlined
              className={`text-[23px] bg-[#E30000] p-1 rounded-sm text-white ${
                isSuperAdmin
                  ? "cursor-not-allowed opacity-50"
                  : "hover:text-red-300 cursor-pointer"
              }`}
              onClick={
                isSuperAdmin
                  ? undefined
                  : () => showDeleteConfirm(record?.user_id)
              }
            />
          </Space>
        );
      },
    },
  ];

  const dataSource = admins?.results?.administrators || [];

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  return (
    <div className="p-4">
      <AddAdmin refetch={refetch} />

      <Table
        columns={columns}
        dataSource={dataSource}
        rowKey="user_id"
        loading={isLoading}
        pagination={{
          current: filter.page,
          pageSize: filter.limit,
          total: admins?.count,
          showSizeChanger: false,
          pageSizeOptions: ["10", "20", "50", "100"],
        }}
        onChange={handleTableChange}
      />
    </div>
  );
}

export default Administrators;
