import { useState } from "react";
import { useNavigate } from "react-router-dom";

import RegisterForm from "../../components/auth/RegisterForm";
import { register } from "../../services/auth.services";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const handleRegister = async (formData) => {
    try {
      setLoading(true);

      await register(formData);

      navigate("/login");
    } catch (error) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisterForm
      onSubmit={handleRegister}
      loading={loading}
    />
  );
};

export default RegisterPage;