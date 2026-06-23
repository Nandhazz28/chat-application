import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">

      <h1 className="text-6xl font-bold text-red-500">
        401
      </h1>

      <h2 className="text-2xl font-semibold mt-4">
        Unauthorized
      </h2>

      <p className="text-gray-500 mt-2 text-center">
        You need to login to access this page.
      </p>

      <Link
        to="/login"
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Go to Login
      </Link>

    </div>
  );
};

export default UnauthorizedPage;