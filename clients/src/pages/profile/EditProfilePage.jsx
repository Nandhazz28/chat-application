import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

import {
  getCurrentUser,
  updateProfile,
} from "../../services/user.services";

const EditProfilePage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const user = await getCurrentUser();

        setForm({
          name: user.name || "",
          email: user.email || "",
        });
      } catch (error) {
        console.error(error);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await updateProfile(form);

      navigate("/profile");
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow">

        <h2 className="text-2xl font-bold mb-6">
          Edit Profile
        </h2>

        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <Input
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <Button
          loading={loading}
          onClick={handleSubmit}
        >
          Save Changes
        </Button>

      </div>

    </div>
  );
};

export default EditProfilePage;