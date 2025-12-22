import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const BASE_URL = "https://joeapi.dsrt321.online";

export const API = axios.create({
  baseURL: BASE_URL + "/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// get admin profile
export const useAdminProfile = () => {
  const getData = async () => {
    const response = await API.get("/admin-dashboard/admin/profile/");
    return response.data.data;
  };

  const {
    data: adminProfile = null,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["adminProfile"],
    queryFn: getData,
  });

  return { adminProfile, isLoading, isError, error, refetch };
};

// sign out
export const signOutAdmin = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};

// get  dashboard overview
export const useDashboardOverview = () => {
  const getData = async () => {
    const response = await API.get(
      "/admin-dashboard/admin/dashboard/overview/"
    );
    return response.data.data;
  };

  const {
    data: dashboardOverview = null,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dashboardOverview"],
    queryFn: getData,
  });

  return { dashboardOverview, isLoading, isError, error, refetch };
};

// get all admins
export const useAllAdmins = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await API.get(`/admin-dashboard/admin/administrators/`, {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  };

  const {
    data: admins = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["admins", page, limit],
    queryFn: getData,
  });

  return { admins, isLoading, isError, error, refetch };
};

// get all orbit post
export const useAllOrbitPost = () => {
  const getData = async () => {
    const response = await API.get("/authentication/admin/orbit-post-create/");
    return response.data.data;
  };

  const {
    data: allOrbit = null,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allOrbit"],
    queryFn: getData,
  });

  return { allOrbit, isLoading, isError, error, refetch };
};

// get all users
export const useAllUsersList = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await API.get(`/admin-dashboard/admin/users/`, {
      params: {
        page,
        limit,
      },
    });

    return response.data;
  };

  const {
    data: allUsersList = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allUsersList", page, limit],
    queryFn: getData,
  });

  return { allUsersList, isLoading, isError, error, refetch };
};

// get user videos
export const useUsersVideos = (
  { userID, page = 1, limit = 10 },
  options = {}
) => {
  const getData = async () => {
    const response = await API.get(
      `/admin-dashboard/admin/users/videos/${userID}/`,
      {
        params: {
          page,
          limit,
        },
      }
    );

    return response.data;
  };

  const {
    data: userVideos = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userVideos", userID, page, limit],
    queryFn: getData,
    enabled: options.enabled ?? true,
  });

  return { userVideos, isLoading, isError, error, refetch };
};

// get user Journals
export const useUsersJournals = (
  { userID, page = 1, limit = 10 },
  options = {}
) => {
  const getData = async () => {
    const response = await API.get(
      `/admin-dashboard/admin/users/${userID}/journals/`,
      {
        params: {
          page,
          limit,
        },
      }
    );

    return response.data;
  };

  const {
    data: userJournals = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userJournals", userID, page, limit],
    queryFn: getData,
    enabled: options.enabled ?? true,
  });

  return { userJournals, isLoading, isError, error, refetch };
};

// get all community
export const useAllCommunity = () => {
  const getData = async () => {
    const response = await API.get("/chatbot/tribes/available/");
    return response.data.data;
  };

  const {
    data: allCommunity = null,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["allCommunity"],
    queryFn: getData,
  });

  return { allCommunity, isLoading, isError, error, refetch };
};

// get community massages
export const useCommunityMessages = ({ tribeID, page = 1 }, options = {}) => {
  const getData = async () => {
    const response = await API.get(
      `/admin-dashboard/admin/tribes/${tribeID}/messages/`,
      {
        params: {
          page,
        },
      }
    );

    return response.data;
  };

  const {
    data: communityMessages = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["communityMessages", tribeID, page],
    queryFn: getData,
    enabled: options.enabled ?? true,
  });

  return { communityMessages, isLoading, isError, error, refetch };
};

// not uses api

// users list
export const getMockUsers = async ({ page = 1, limit = 10 }) => {
  const res = await axios.get("/users_100.json");
  const allUsers = res.data || [];

  // Fake filtering (if status or role is provided)
  let filteredUsers = allUsers;

  // Fake pagination
  const totalUser = filteredUsers.length;
  const totalPages = Math.ceil(totalUser / limit);
  const paginatedUsers = filteredUsers.slice((page - 1) * limit, page * limit);

  return {
    data: paginatedUsers,
    pagination: {
      totalUser,
      page,
      limit,
      totalPages,
    },
  };
};

// get all users
export const useUsers = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await API.get(`/admin/users/?page=${page}&limit=${limit}`);

    return response.data;
  };

  const {
    data: users = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["users", page, limit],
    queryFn: getData,
  });

  return { users, isLoading, isError, error, refetch };
};

// get all payments
export const useStripePayments = ({ page = 1, limit = 10 }) => {
  const getData = async () => {
    const response = await API.get(
      `/admin/stripe-payments/?page=${page}&limit=${limit}`
    );

    return response.data;
  };

  const {
    data: stripePayments = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["stripePayments", page, limit],
    queryFn: getData,
  });

  return { stripePayments, isLoading, isError, error, refetch };
};

// administrators
export const getMockAdministrators = async () => {
  const response = await axios.get("/administrators_8.json");

  return response.data;
};

// payments
export const getMockPayments = async ({ page = 1, limit = 10 }) => {
  const res = await axios.get("/payments.json");
  const allData = res.data || [];

  // Fake pagination
  const totalPayments = allData.length;
  const totalPages = Math.ceil(totalPayments / limit);
  const paginatedPayments = allData.slice((page - 1) * limit, page * limit);

  return {
    data: paginatedPayments,
    pagination: {
      totalPayments,
      page,
      limit,
      totalPages,
    },
  };
};

// get message
export const getMockMessages = async () => {
  const response = await axios.get("/user_chat.json");

  return response.data;
};

// get previous scans
export const getMockPreviousScans = async () => {
  const response = await axios.get("/previousScans.json");

  return response.data;
};

// get Single scans
export const getMockSingleScans = async () => {
  const response = await axios.get("/singleScan.json");

  return response.data;
};

// get Saved Recipes
export const getMockSavedRecipes = async () => {
  const response = await axios.get("/recipes.json");

  return response.data;
};

// users list for messages
export const getMockUsersForMessages = async () => {
  const response = await axios.get("/messageUserList.json");

  return response.data;
};

export const useUsersForMessage = () => {
  const {
    data: usersForMessage = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["usersForMessage"],
    queryFn: getMockUsersForMessages,
  });

  return { usersForMessage, isLoading, isError, error, refetch };
};

// community
export const getMockCommunity = async () => {
  const response = await axios.get("/user_messages.json");

  return response.data;
};

export const useCommunityMessages2 = () => {
  const {
    data: communityMessage2 = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["communityMessage2"],
    queryFn: getMockCommunity,
  });

  return { communityMessage2, isLoading, isError, error, refetch };
};
