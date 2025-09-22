import React, { useEffect, useState } from "react";
import { Modal, Typography, Input, Button, Avatar, message } from "antd";

function JournalsViewModal({ isOpen, onClose, journalData }) {
  console.log(journalData, "journalData");

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
        {journalData?.length > 0 ? (
          journalData.map((jrnl, index) => (
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
