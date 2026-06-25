import api from "./axios";

// Fetches the authenticated node profile
export const getCurrentUser = async () => {
  // Fixed: removed duplicate '/api' prefix
  const response = await api.get("/users/me");
  return response; // Return the entire envelope to match component expectations
};

// Commits modification data to the database matrix
export const updateProfile = async (data) => {
  const response = await api.put("/users/me", data);
  return response;
};

// Resolves a specific peer node by its unique ID
export const getUserById = async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response;
};

// Queries the global directory network for matches
export const searchUsers = async (username) => {
  if (!username) return [];

  const res = await api.get(
    `/api/users/search?username=${username}`
  );

  return res.data.data; // ✅ ONLY USERS ARRAY
};

  