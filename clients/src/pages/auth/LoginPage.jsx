import { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoginForm from "../../components/auth/LoginForm";
import { login } from "../../services/auth.services";

const LoginPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleLogin = async (formData) => {
    try {
      setLoading(true);

      const response = await login(formData);

      localStorage.setItem(
        "token",
        response.accessToken
      );

      navigate("/chat");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginForm
      onSubmit={handleLogin}
      loading={loading}
    />
  );
};

export default LoginPage;