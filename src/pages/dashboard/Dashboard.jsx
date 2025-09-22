import React from "react";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
// import { useAdminDashboard } from "../../api/api";
import IsLoading from "../../components/IsLoading";
import IsError from "../../components/IsError";
import { Link } from "react-router-dom";

function Dashboard() {
  // const { adminDashboard, isLoading, isError, error, refetch } =
  //   useAdminDashboard();

  const adminDashboard = {
    admin_profile: {
      name: "Sha Rukh Khan",
    },
    total_users: 100500,
    panic_request: 1930,
  };

  // if (isLoading) {
  //   return <IsLoading />;
  // }

  // if (isError) {
  //   return <IsError error={error} refetch={refetch} />;
  // }

  const bots = [
    {
      name: "Bot 1",
      profile:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2MnQiI6rU-prU3iJZg7AeRoScEHi99dqMaQ&s",
      status: "Grounding",
    },
    {
      name: "Bot 2",
      profile:
        "https://media.gettyimages.com/id/1479744011/vector/robot-artificial-intelligence-avatar-icon-profile-diverse-bot-face-for-chatbot-and-social.jpg?s=1024x1024&w=gi&k=20&c=tuNB_COx7UXujfHx5GXSKFIYQjeUwHT8Dr4Y84jez4o=",
      status: "Grounding",
    },
    {
      name: "Bot 3",
      profile:
        "https://static.vecteezy.com/ti/vetor-gratis/p1/10054157-chat-bot-robo-avatar-em-circulo-forma-redonda-isolado-em-fundo-branco-ilustracao-ai-tecnologia-futurista-auxiliar-comunicacao-conceito-de-conversacao-em-estilo-plano-vetor.jpg",
      status: "Grounding",
    },
    {
      name: "Bot 4",
      profile:
        "https://img.freepik.com/free-vector/chatbot-conversation-vectorart_78370-4107.jpg",
      status: "Grounding",
    },
    {
      name: "Bot 5",
      profile:
        "https://www.shutterstock.com/image-vector/chatbot-robo-advisor-adviser-chat-600nw-1222464061.jpg",
      status: "Grounding",
    },
    {
      name: "Bot 6",
      profile:
        "https://static.vecteezy.com/ti/vetor-gratis/p1/10054157-chat-bot-robo-avatar-em-circulo-forma-redonda-isolado-em-fundo-branco-ilustracao-ai-tecnologia-futurista-auxiliar-comunicacao-conceito-de-conversacao-em-estilo-plano-vetor.jpg",
      status: "Grounding",
    },
    {
      name: "Bot 7",
      profile:
        "https://img.freepik.com/free-vector/chatbot-conversation-vectorart_78370-4107.jpg",
      status: "Grounding",
    },
    {
      name: "Bot 8",
      profile:
        "https://www.shutterstock.com/image-vector/chatbot-robo-advisor-adviser-chat-600nw-1222464061.jpg",
      status: "Grounding",
    },
    {
      name: "Bot 9",
      profile:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2MnQiI6rU-prU3iJZg7AeRoScEHi99dqMaQ&s",
      status: "Grounding",
    },
    {
      name: "Bot 10",
      profile:
        "https://media.gettyimages.com/id/1479744011/vector/robot-artificial-intelligence-avatar-icon-profile-diverse-bot-face-for-chatbot-and-social.jpg?s=1024x1024&w=gi&k=20&c=tuNB_COx7UXujfHx5GXSKFIYQjeUwHT8Dr4Y84jez4o=",
      status: "Grounding",
    },
  ];

  const communities = [
    {
      name: "Community 1",
      profile:
        "https://m.media-amazon.com/images/S/pv-target-images/d6e25ce8c6cdf788ec947effcec7854aee7090812cb73e536adf6b75b9eb7ca6._SX1080_FMjpg_.jpg",
      users: "1000",
    },
    {
      name: "Community 2",
      profile:
        "https://www.uri.org/sites/default/files/styles/hero_banner/public/media/images/2017/AA-communitybuilding-Europe.JPG?h=5f0b0a9a",
      users: "1000",
    },
    {
      name: "Community 3",
      profile:
        "https://m.media-amazon.com/images/S/pv-target-images/d6e25ce8c6cdf788ec947effcec7854aee7090812cb73e536adf6b75b9eb7ca6._SX1080_FMjpg_.jpg",
      users: "1000",
    },
    {
      name: "Community 4",
      profile:
        "https://www.uri.org/sites/default/files/styles/hero_banner/public/media/images/2017/AA-communitybuilding-Europe.JPG?h=5f0b0a9a",
      users: "1000",
    },
    {
      name: "Community 5",
      profile:
        "https://m.media-amazon.com/images/S/pv-target-images/d6e25ce8c6cdf788ec947effcec7854aee7090812cb73e536adf6b75b9eb7ca6._SX1080_FMjpg_.jpg",
      users: "1000",
    },
  ];

  return (
    <div>
      <div className="bg-white w-full p-4 rounded-md">
        <p className="text-[16px] mt-2">Hi, Good Morning</p>
        <h2 className="text-[24px] font-semibold">
          {adminDashboard?.admin_profile?.name}
        </h2>
      </div>

      {/* dashboard overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
        <div className="bg-white p-4 rounded-md w-full">
          <h1 className="text-[24px] font-semibold">Dashboard Overview</h1>
          <div className="flex justify-between gap-4">
            <Link
              to="/user-management"
              className="bg-[#e6f0f5] w-full rounded-md p-4 flex flex-col items-center"
            >
              <FaUsers className="bgBlack text-[#FFF] h-[40px] rounded-full w-[40px] p-2" />
              <h2 className="text-[24px] font-semibold text-[#242424] mt-2">
                {adminDashboard?.total_users || 0}
              </h2>
              <p className="text-[16px] mt-3">Total Users</p>
            </Link>
            <Link
              to="/user-management?filter=Panic"
              className="bg-[#e6f0f5] w-full rounded-md p-4 flex flex-col items-center"
            >
              <AiOutlineUsergroupAdd className="bgBlack text-[#FFF] h-[40px] rounded-full w-[40px] p-2" />
              <h2 className="text-[24px] font-semibold text-[#242424] mt-2">
                {adminDashboard?.panic_request || 0}
              </h2>
              <p className="text-[16px] mt-3">Panic Request</p>
            </Link>
          </div>
        </div>
      </div>

      {/* bots */}
      <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-md w-full mt-6">
        <h1 className="text-[24px] font-semibold">All Bots</h1>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {bots.map((bot, index) => (
            <div
              className="bg-[#e6f0f5] w-full rounded-md p-4 flex flex-col items-center"
              key={index}
            >
              <img
                src={bot.profile}
                alt={bot.name}
                className="w-[40px] h-[40px] rounded-full"
              />
              <h1>{bot.name}</h1>
              <p>{bot.status}</p>
            </div>
          ))}
        </div>
      </div>

      {/* community */}
      <div className="col-span-1 md:col-span-2 bg-white p-4 rounded-md w-full mt-6">
        <h1 className="text-[24px] font-semibold">All Community</h1>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {communities.map((community, index) => (
            <Link
              to={`/community/${community.name}`}
              className="bg-[#e6f0f5] w-full rounded-md p-4 flex flex-col items-center"
              key={index}
            >
              <img
                src={community.profile}
                alt={community.name}
                className="w-[60px] h-[60px] rounded-full"
              />
              <h1 className="text-[18px]">{community.name}</h1>
              <p className="flex gap-1">
                <FaUsers /> {community.users}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
