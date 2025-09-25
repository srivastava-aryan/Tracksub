import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { toast } from "sonner";
import { useState } from "react";

const Navbar = () => {
  const { dark, toggleDark } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
      toast.success("Logged out successfully", {
        description: "You have been logged out."
      });
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-background text-foreground shadow-md sticky top-0 z-50">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl sm:text-2xl font-bold">TrackSub.</h1>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link
              to="/"
              className={`px-3 py-1 rounded transition-colors ${location.pathname === "/" ? "bg-white text-black" : "hover:text-blue-600 dark:hover:text-blue-400"}`}
            >
              Home
            </Link>
            {user && (
              <Link
                to="/dashboard"
                className={`px-3 py-1 rounded transition-colors ${location.pathname === "/dashboard" ? "bg-white text-black" : "hover:text-blue-600 dark:hover:text-blue-400"}`}
              >
                Dashboard
              </Link>
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

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} 
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 border-t border-gray-200 dark:border-gray-700 pt-4">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className={`block px-3 py-2 rounded transition-colors text-base ${
                location.pathname === "/" 
                  ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" 
                  : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              Home
            </Link>
            {user && (
              <Link
                to="/dashboard"
                onClick={closeMobileMenu}
                className={`block px-3 py-2 rounded transition-colors text-base ${
                  location.pathname === "/dashboard" 
                    ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-800"
                }`}
              >
                Dashboard
              </Link>
            )}
            {!user ? (
              <>
                <Link
                  to="/login"
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 rounded transition-colors text-base ${
                    location.pathname === "/login" 
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className={`block px-3 py-2 rounded transition-colors text-base ${
                    location.pathname === "/signup" 
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300" 
                      : "hover:bg-gray-100 dark:hover:bg-gray-800"
                  }`}
                >
                  Signup
                </Link>
              </>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  closeMobileMenu();
                }}
                className="block w-full text-left px-3 py-2 rounded text-sky-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-base"
              >
                Logout
              </button>
            )}
            <button
              onClick={() => {
                toggleDark();
                closeMobileMenu();
              }}
              className="block w-full text-left px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-base"
            >
              {dark ? "☀️ Switch to Light Mode" : "🌙 Switch to Dark Mode"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;