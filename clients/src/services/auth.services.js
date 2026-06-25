import api from "./axios";

export const register = async (data) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post("/api/auth/login", data);
  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("token");
  try {
    await api.post("/api/auth/logout");
  } catch (_) {}
};

export const getMe = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};