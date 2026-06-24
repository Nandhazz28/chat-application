import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../../components/auth/LoginForm";

import { login } from "../../services/auth.services";

import { connectSocket, userOnline } from "../../socket/socketManager";

const LoginPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData) => {
    try {
      setLoading(true);

      const response = await login(formData);

      console.log("LOGIN RESPONSE", response);

      const token = response?.data?.accessToken;

      const user = response?.data?.user;

      if (!token) {
        throw new Error("Access token not found");
      }

      localStorage.setItem("token", token);

      connectSocket();

      if (user?._id) {
        userOnline(user._id);
      }

      navigate("/chat");
    } catch (error) {
      console.error(error);

      alert(error?.response?.data?.message || error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LoginForm onSubmit={handleLogin} loading={loading} />
    </div>
  );
};

export default LoginPage;
