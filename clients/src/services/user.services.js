import api from "./axios";

export const getCurrentUser = async () => {
  const response = await api.get("/api/users/me");
  return response.data;
};

export const updateProfile = async (data) => {
  const response = await api.put("/api/users/me", data);
  return response.data;
};

export const getUserById = async (userId) => {
  const response = await api.get(`/api/users/${userId}`);
  return response.data;
};

export const searchUsers = async (username) => {
  if (!username.trim()) return [];

  const response = await api.get("/api/users/search", {
    params: {
      username,
    },
  });

  return response.data.data;
};