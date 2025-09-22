import React, { useEffect, useState } from "react";
import { Modal, Typography, Input, Button, Avatar, message } from "antd";
import video1 from "../../assets/video1.mp4";
import video2 from "../../assets/video2.mp4";

function VideoViewModal({ isOpen, onClose, userData }) {
  const videos = [video1, video2];
  return (
    <Modal
      title={
        <span className="text-[28px] flex flex-col items-center">Videos</span>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={650}
    >
      <div className="max-h-[550px] overflow-y-auto">
        {videos?.length > 0 ? (
          videos.map((video, index) => (
            <div key={index}>
              <video src={video} controls className="w-full my-4" />
            </div>
          ))
        ) : (
          <div className="text-center p-2 border text-[18px]">No Videos</div>
        )}
      </div>
      <Button block onClick={onClose} className="mt-2">
        Close
      </Button>
    </Modal>
  );
}

export default VideoViewModal;
