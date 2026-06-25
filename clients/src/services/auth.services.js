import api from "./axios";

export const register = async (data) => {
  const response = await api.post("/api/auth/register", data);
  return response.data;
};

// 🔥 FIXED LOGIN
export const login = async (data) => {
  const response = await api.post("/api/auth/login", data);

  console.log("LOGIN RESPONSE:", response.data);

  const token = response.data?.data?.token;

  if (token) {
    localStorage.setItem("token", token); // ✅ SAVE TOKEN
    console.log("TOKEN SAVED:", token);
  } else {
    console.error("TOKEN NOT FOUND IN RESPONSE");
  }

  return response.data;
};

export const logout = async () => {
  localStorage.removeItem("token"); // ✅ CLEAR TOKEN

  const response = await api.post("/api/auth/logout");
  return response.data;
};

export const getMe = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};