import api from "./axios";
import { setToken, setRefreshToken, clearAuth } from "../shared/utils/token";

export const register = async (data) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

export const login = async (data) => {
  const response = await api.post("/api/auth/login", data);
  const { accessToken, refreshToken } = response.data?.data || {};
  if (accessToken) setToken(accessToken);
  if (refreshToken) setRefreshToken(refreshToken);
  return response.data;
};

export const logout = async () => {
  const refreshToken = localStorage.getItem("refreshToken");
  try {
    await api.post("/api/auth/logout", { refreshToken });
  } catch (_) {
  } finally {
    clearAuth();
  }
};

export const getMe = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};