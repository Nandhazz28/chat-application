import { useEffect, useState } from "react";
import ProfileCard from "../../components/profile/ProfileCard";
import Loader from "../../components/ui/Loader";
import { getCurrentUser } from "../../services/user.services";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          My Profile
        </h1>

        <ProfileCard user={user} />

        <div className="mt-6">
          <Link
            to="/profile/edit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Edit Profile
          </Link>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;