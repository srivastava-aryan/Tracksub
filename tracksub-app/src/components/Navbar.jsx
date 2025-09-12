import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { dark, toggleDark } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  

  return (
    <nav className="bg-background text-foreground shadow-md px-6 py-4 flex justify-between items-center sticky top-0 z-50">
      <h1 className="text-2xl font-bold">TrackSub.</h1>
      <div className="space-x-6 flex items-center">
        <Link
          to="/"
          className={`px-3 py-1 rounded transition-colors ${location.pathname === "/" ? "bg-white text-black" : "hover:text-blue-600 dark:hover:text-blue-400"}`}
        >
          Home
        </Link>
        {user && (
          <>
            <Link
              to="/dashboard"
              className={`px-3 py-1 rounded transition-colors ${location.pathname === "/dashboard" ? "bg-white text-black" : "hover:text-blue-600 dark:hover:text-blue-400"}`}
            >
              Dashboard
            </Link>
            {/* <Link
              to="/add"
              className={`px-3 py-1 rounded transition-colors ${location.pathname === "/add" ? "bg-white text-black" : "hover:text-blue-600 dark:hover:text-blue-400"}`}
            >
              Add
            </Link> */}
            {/* <Link
              to="/tags"
              className={`px-3 py-1 rounded transition-colors ${location.pathname === "/tags" ? "bg-white text-black" : "hover:text-blue-600 dark:hover:text-blue-400"}`}
            >
              Tags
            </Link>
            <Link
              to="/profile"
              className={`px-3 py-1 rounded transition-colors ${location.pathname === "/profile" ? "bg-white text-black" : "hover:text-blue-600 dark:hover:text-blue-400"}`}
            >
              Profile
            </Link> */}
          </>
        )}
        {!user ? (
          <>
            <Link
              to="/login"
              className={`px-3 py-1 rounded transition-colors ${location.pathname === "/login" ? "bg-white text-black" : "hover:text-blue-600"}`}
            >
              Login
            </Link>
            <Link
              to="/signup"
              className={`px-3 py-1 rounded transition-colors ${location.pathname === "/signup" ? "bg-white text-black" : "hover:text-blue-600"}`}
            >
              Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-sky-600 text-white text-sm px-3 py-1 rounded hover:bg-sky-700"
          >
            Logout
          </button>
        )}
        <button
          onClick={toggleDark}
          className="bg-muted text-muted-foreground text-sm px-3 py-1 rounded hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {dark ? "☀️ Light" : "🌙 Dark"}
        </button>
      </div>
    </nav>
  );
};
export default Navbar;