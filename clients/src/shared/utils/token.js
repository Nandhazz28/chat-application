export const getToken = () => localStorage.getItem("token");

export const setToken = (token) => localStorage.setItem("token", token);

export const removeToken = () => localStorage.removeItem("token");

export const getRefreshToken = () => localStorage.getItem("refreshToken");

export const setRefreshToken = (token) =>
  localStorage.setItem("refreshToken", token);

export const removeRefreshToken = () =>
  localStorage.removeItem("refreshToken");

export const clearAuth = () => {
  removeToken();
  removeRefreshToken();
};