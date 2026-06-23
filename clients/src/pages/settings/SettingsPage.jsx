import { Link } from "react-router-dom";

const SettingsPage = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow p-6">

        <h1 className="text-3xl font-bold mb-6">
          Settings
        </h1>

        <div className="space-y-4">

          <Link
            to="/profile"
            className="block p-4 border rounded-lg hover:bg-gray-50"
          >
            👤 Profile
          </Link>

          <Link
            to="/privacy"
            className="block p-4 border rounded-lg hover:bg-gray-50"
          >
            🔒 Privacy
          </Link>

          <button
            onClick={handleLogout}
            className="w-full text-left p-4 border rounded-lg text-red-500 hover:bg-red-50"
          >
            🚪 Logout
          </button>

        </div>

      </div>

    </div>
  );
};

export default SettingsPage;