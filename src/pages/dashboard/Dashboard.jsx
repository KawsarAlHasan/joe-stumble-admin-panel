import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { MdOutlineEmergency } from "react-icons/md";
import { IoWarningOutline } from "react-icons/io5";
import { BiTimer } from "react-icons/bi";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import { Link } from "react-router-dom";
import { useDashboardOverview } from "../../api/api";

function Dashboard() {
  const { dashboardOverview, isLoading, isError, error, refetch } =
    useDashboardOverview();

  if (isLoading) {
    return <IsLoading />;
  }

  if (isError) {
    return <IsError error={error} refetch={refetch} />;
  }

  const hour = new Date().getHours();
  let message = "";

  if (hour >= 5 && hour < 12) {
    message = "Good morning";
  } else if (hour >= 12 && hour < 16) {
    message = "Good afternoon";
  } else if (hour >= 16 && hour < 19) {
    message = "Good evening";
  } else {
    message = "Good night";
  }

  return (
    <div>
      {/* Admin Info */}
      <div className="bg-white w-full p-4 rounded-md">
        <p className="text-[16px] mt-2">Hi, {message}</p>
        <h2 className="text-[24px] font-semibold">
          {dashboardOverview?.admin?.full_name || "Admin"}
        </h2>
        <p className="text-sm text-gray-600">
          {dashboardOverview?.admin?.email} | {dashboardOverview?.admin?.role}
        </p>
      </div>

      {/* Dashboard Overview - Main Stats */}
      <div className="bg-white p-4 rounded-md w-full mt-4">
        <h1 className="text-[24px] font-semibold mb-4">Dashboard Overview</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            to="/user-management"
            className="bg-[#e6f0f5] w-full rounded-md p-4 flex flex-col items-center hover:shadow-md transition-shadow"
          >
            <FaUsers className="bgBlack text-[#FFF] h-[40px] rounded-full w-[40px] p-2" />
            <h2 className="text-[24px] font-semibold text-[#242424] mt-2">
              {dashboardOverview?.overview?.total_users || 0}
            </h2>
            <p className="text-[16px] mt-3">Total Users</p>
          </Link>

          <div className="bg-[#e6f0f5] w-full rounded-md p-4 flex flex-col items-center">
            <FaUsers className="bg-blue-500 text-[#FFF] h-[40px] rounded-full w-[40px] p-2" />
            <h2 className="text-[24px] font-semibold text-[#242424] mt-2">
              {dashboardOverview?.overview?.total_bots || 0}
            </h2>
            <p className="text-[16px] mt-3">Total Bots</p>
          </div>

          <div className="bg-[#e6f0f5] w-full rounded-md p-4 flex flex-col items-center">
            <FaUsers className="bg-green-500 text-[#FFF] h-[40px] rounded-full w-[40px] p-2" />
            <h2 className="text-[24px] font-semibold text-[#242424] mt-2">
              {dashboardOverview?.overview?.total_tribes || 0}
            </h2>
            <p className="text-[16px] mt-3">Total Communities</p>
          </div>

          <Link
            to="/user-management?filter=Panic"
            className="bg-[#ffe6e6] w-full rounded-md p-4 flex flex-col items-center hover:shadow-md transition-shadow"
          >
            <AiOutlineUsergroupAdd className="bg-red-500 text-[#FFF] h-[40px] rounded-full w-[40px] p-2" />
            <h2 className="text-[24px] font-semibold text-[#242424] mt-2">
              {dashboardOverview?.overview?.total_panic_requests || 0}
            </h2>
            <p className="text-[16px] mt-3">Total Panic Requests</p>
          </Link>
        </div>
      </div>

      {/* Panic Requests Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {/* Panic Request Stats */}
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-[24px] font-semibold mb-4">
            Panic Request Statistics
          </h1>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-[#fff3e6] rounded-md p-4 flex flex-col items-center">
              <BiTimer className="bg-orange-500 text-[#FFF] h-[35px] rounded-full w-[35px] p-2" />
              <h2 className="text-[20px] font-semibold text-[#242424] mt-2">
                {dashboardOverview?.panic_requests?.active || 0}
              </h2>
              <p className="text-[14px] mt-2">Active Requests</p>
            </div>

            <div className="bg-[#ffe6e6] rounded-md p-4 flex flex-col items-center">
              <MdOutlineEmergency className="bg-red-600 text-[#FFF] h-[35px] rounded-full w-[35px] p-2" />
              <h2 className="text-[20px] font-semibold text-[#242424] mt-2">
                {dashboardOverview?.panic_requests?.emergency || 0}
              </h2>
              <p className="text-[14px] mt-2">Emergency</p>
            </div>

            <div className="bg-[#e6f7ff] rounded-md p-4 flex flex-col items-center">
              <IoWarningOutline className="bg-blue-500 text-[#FFF] h-[35px] rounded-full w-[35px] p-2" />
              <h2 className="text-[20px] font-semibold text-[#242424] mt-2">
                {dashboardOverview?.panic_requests?.today || 0}
              </h2>
              <p className="text-[14px] mt-2">Today's Requests</p>
            </div>

            <div className="bg-[#e6ffe6] rounded-md p-4 flex flex-col items-center">
              <FaUsers className="bg-green-500 text-[#FFF] h-[35px] rounded-full w-[35px] p-2" />
              <h2 className="text-[20px] font-semibold text-[#242424] mt-2">
                {dashboardOverview?.panic_requests?.total || 0}
              </h2>
              <p className="text-[14px] mt-2">Total</p>
            </div>
          </div>
        </div>

        {/* Panic Request by Mode & Status */}
        <div className="bg-white p-4 rounded-md">
          <h1 className="text-[24px] font-semibold mb-4">Request Details</h1>

          <div className="mb-4">
            <h2 className="text-[18px] font-semibold mb-2">By Mode</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-green-50 p-2 rounded">
                <span>Gentle</span>
                <span className="font-semibold">
                  {dashboardOverview?.panic_requests?.by_mode?.gentle || 0}
                </span>
              </div>
              <div className="flex justify-between items-center bg-orange-50 p-2 rounded">
                <span>Critical</span>
                <span className="font-semibold">
                  {dashboardOverview?.panic_requests?.by_mode?.critical || 0}
                </span>
              </div>
              <div className="flex justify-between items-center bg-red-50 p-2 rounded">
                <span>Urgent</span>
                <span className="font-semibold">
                  {dashboardOverview?.panic_requests?.by_mode?.urgent || 0}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-[18px] font-semibold mb-2">By Status</h2>
            <div className="space-y-2">
              <div className="flex justify-between items-center bg-yellow-50 p-2 rounded">
                <span>Pending</span>
                <span className="font-semibold">
                  {dashboardOverview?.panic_requests?.by_status?.pending || 0}
                </span>
              </div>
              <div className="flex justify-between items-center bg-blue-50 p-2 rounded">
                <span>Responded</span>
                <span className="font-semibold">
                  {dashboardOverview?.panic_requests?.by_status?.responded || 0}
                </span>
              </div>
              <div className="flex justify-between items-center bg-green-50 p-2 rounded">
                <span>Resolved</span>
                <span className="font-semibold">
                  {dashboardOverview?.panic_requests?.by_status?.resolved || 0}
                </span>
              </div>
              <div className="flex justify-between items-center bg-red-50 p-2 rounded">
                <span>Escalated</span>
                <span className="font-semibold">
                  {dashboardOverview?.panic_requests?.by_status?.escalated || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bots */}
      <div className="bg-white p-4 rounded-md w-full mt-6">
        <h1 className="text-[24px] font-semibold mb-4">All Bots</h1>
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
          {dashboardOverview?.bots?.map((bot, index) => (
            <div
              className="bg-[#e6f0f5] w-full rounded-md p-4 flex flex-col items-center hover:shadow-md transition-shadow"
              key={index}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-2">
                {bot?.display_name?.charAt(0)}
              </div>
              <h1 className="text-[18px] font-semibold">{bot?.display_name}</h1>
              <p className="font-medium text-sm text-gray-600">
                {bot?.persona}
              </p>
              <p
                className="text-xs text-gray-500 text-center mt-1"
                title={bot?.description}
              >
                {bot?.description
                  ? bot.description.length > 50
                    ? `${bot.description.slice(0, 50)}...`
                    : bot.description
                  : ""}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Community */}
      <div className="bg-white p-4 rounded-md w-full mt-6">
        <h1 className="text-[24px] font-semibold mb-4">All Communities</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {dashboardOverview?.tribes?.map((community, index) => (
            <Link
              to={`/community/${community.name}`}
              className="bg-[#e6f0f5] w-full rounded-md p-4 flex flex-col items-center hover:shadow-md transition-shadow"
              key={index}
            >
              {community.image_url ? (
                <img
                  src={community?.image_url}
                  alt={community?.display_name}
                  className="w-[60px] h-[60px] rounded-full object-cover"
                />
              ) : (
                <div className="w-[60px] h-[60px] bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center">
                  <FaUsers className="text-white w-[30px] h-[30px]" />
                </div>
              )}

              <h1 className="text-[18px] mt-2 font-semibold text-center">
                {community?.display_name}
              </h1>
              <p
                className="text-xs text-gray-500 text-center mt-1"
                title={community?.description}
              >
                {community?.description
                  ? community.description.length > 60
                    ? `${community.description.slice(0, 60)}...`
                    : community.description
                  : ""}
              </p>
              <p className="flex gap-1 items-center mt-2 text-sm font-medium">
                <FaUsers /> {community?.member_count} members
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
