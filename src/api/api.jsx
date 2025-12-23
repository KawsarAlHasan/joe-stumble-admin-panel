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
