import React, { useEffect, useState } from "react";
import { Modal, Typography, Input, Button, Avatar, message } from "antd";
import { useUsersJournals } from "../../api/api";

function JournalsViewModal({ isOpen, onClose, userData }) {
  const [filter, setFilter] = useState({
    userID: userData?.user_id,
    page: 1,
    limit: 10,
  });

  const { userJournals, isLoading, isError, error, refetch } = useUsersJournals(
    filter,
    { enabled: isOpen }
  );

  // console.log(userJournals, "userJournals");

  return (
    <Modal
      title={
        <span className="text-[28px] flex flex-col items-center">
          My Statements
        </span>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={650}
    >
      <div className="max-h-[550px] overflow-y-auto">
        {userData?.length > 0 ? (
          userData.map((jrnl, index) => (
            <div
              key={index}
              className=" gap-2 mb-2 border p-2 rounded-md bg-gray-200 hover:bg-gray-100"
            >
              <h1 className="text-lg">{jrnl.title}</h1>
              <p>{jrnl.description}</p>
            </div>
          ))
        ) : (
          <div className="text-center p-2 border text-[18px]">
            No Statements
          </div>
        )}
      </div>
      <Button block onClick={onClose} className="mt-2">
        Close
      </Button>
    </Modal>
  );
}

export default JournalsViewModal;
