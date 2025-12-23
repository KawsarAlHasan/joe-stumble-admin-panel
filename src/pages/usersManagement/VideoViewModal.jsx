import React, { useEffect, useState } from "react";
import { Modal, Button, Spin, Empty, Tag } from "antd";
import {
  PlayCircleOutlined,
  ClockCircleOutlined,
  FileOutlined,
} from "@ant-design/icons";
import { useUsersVideos } from "../../api/api";

function VideoViewModal({ isOpen, onClose, userData }) {
  const [filter, setFilter] = useState({
    userID: userData?.user_id,
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    setFilter((prev) => ({
      ...prev,
      userID: userData?.user_id,
    }));
  }, [userData]);

  const { userVideos, isLoading, isError, error, refetch } = useUsersVideos(
    filter,
    { enabled: isOpen && !!userData?.user_id }
  );

  const videos = userVideos?.results?.videos || [];
  const totalVideos = userVideos?.results?.total_videos || 0;

  return (
    <Modal
      title={
        <div className="text-center">
          <div className="text-2xl font-semibold text-gray-800">
            {userData?.username}'s Videos
          </div>
          <div className="text-sm text-gray-500 mt-1">
            Total {totalVideos} video{totalVideos !== 1 ? "s" : ""} uploaded
          </div>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      centered
      width={800}
      className="video-modal"
    >
      <div className="max-h-[600px] overflow-y-auto px-2">
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Spin size="large" tip="Loading videos..." />
          </div>
        ) : isError ? (
          <div className="text-center py-10">
            <div className="text-red-500 text-lg">Error loading videos</div>
            <div className="text-gray-500 text-sm mt-2">{error?.message}</div>
            <Button type="primary" onClick={refetch} className="mt-4">
              Retry
            </Button>
          </div>
        ) : videos?.length > 0 ? (
          <div className="space-y-6 py-4">
            {videos.map((video, index) => (
              <div
                key={video.id}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                {/* Video Player */}
                <div className="relative bg-black">
                  <video
                    src={video.video_url}
                    controls
                    className="w-full aspect-video object-contain"
                    preload="metadata"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-white text-sm font-medium">
                      Video {index + 1}
                    </span>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-4 space-y-3">
                  {/* Description */}
                  {video.description && (
                    <div className="text-gray-700 text-sm leading-relaxed">
                      {video.description}
                    </div>
                  )}

                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-2 items-center">
                    <Tag
                      icon={<ClockCircleOutlined />}
                      color="blue"
                      className="m-0"
                    >
                      {video.uploaded_at}
                    </Tag>
                    <Tag icon={<FileOutlined />} color="green" className="m-0">
                      {video.file_size_formatted}
                    </Tag>
                    <Tag color="purple" className="m-0">
                      {video.mime_type}
                    </Tag>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-16">
            <Empty
              description={
                <div className="text-gray-500">
                  <div className="text-lg font-medium">No videos found</div>
                  <div className="text-sm mt-2">
                    This user hasn't uploaded any videos yet
                  </div>
                </div>
              }
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <Button block size="large" onClick={onClose} className="font-medium">
          Close
        </Button>
      </div>
    </Modal>
  );
}

export default VideoViewModal;
