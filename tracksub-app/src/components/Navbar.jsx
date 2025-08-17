import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const html = document.documentElement;
    if (dark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [dark]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md px-6 py-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600 dark:text-white">SubTrack</h1>
      <div className="space-x-4 flex items-center">
        <Link to="/" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">
          Home
        </Link>
        {user && (
          <>
            <Link to="/dashboard" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/add" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">
              Add
            </Link>
            <Link to="/tags" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">
              Tags
            </Link>
            <Link to="/profile" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">
              Profile
            </Link>
          </>
        )}
        {!user ? (
          <>
            <Link to="/login" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">
              Login
            </Link>
            <Link to="/signup" className="text-gray-700 dark:text-gray-200 hover:text-blue-600">
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white text-sm px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
        <button
          onClick={() => setDark(!dark)}
          className="bg-gray-200 dark:bg-gray-700 text-sm px-3 py-1 rounded"
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;