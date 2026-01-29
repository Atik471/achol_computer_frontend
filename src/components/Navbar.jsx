import { useContext, useEffect, useState } from "react";
import ThemeComponent from "./ThemeComponent";
import { FaUserCircle, FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, NavLink, useNavigate } from "react-router";
import logo from "../assets/logo.png";
import { useLogout } from "../hooks/useAuth";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user } = useContext(AuthContext);
  const logoutMutation = useLogout();
  const navigate = useNavigate();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      setShowToast(true);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (logoutMutation.isSuccess) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [logoutMutation.isSuccess]);

  const navLinks = [
    { to: "/home", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/contact", label: "Contact" },
  ];

  const shopLinks = [
    { to: "/madhupur", label: "Madhupur Branch" },
    { to: "/dhanbari", label: "Dhanbari Branch" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
            ? "navbar-glass shadow-lg"
            : "bg-white/70 dark:bg-slate-900/70 backdrop-blur-md"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 group"
            >
              <img
                src={logo}
                alt="Achol Computer"
                className="w-9 h-9 transition-transform group-hover:scale-105"
              />
              <span className="font-bold text-xl text-slate-900 dark:text-white tracking-tight hidden sm:block">
                Achol Computer
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive
                      ? "bg-blue-500 text-white shadow-md shadow-blue-500/25"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Shops Dropdown */}
              <div className="dropdown dropdown-hover">
                <div
                  tabIndex={0}
                  role="button"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200 cursor-pointer"
                >
                  Our Shops
                  <svg
                    className="w-4 h-4 inline-block ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-50 mt-2 p-2 shadow-xl bg-white dark:bg-slate-800 rounded-xl w-52 border border-slate-200 dark:border-slate-700"
                >
                  {shopLinks.map((link) => (
                    <li key={link.to}>
                      <NavLink
                        to={link.to}
                        className="block px-4 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        {link.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              {/* Search Button */}
              <button
                onClick={() => navigate("/products")}
                className="p-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Search Products"
              >
                <FaSearch className="w-4 h-4" />
              </button>

              {/* Theme Toggle */}
              <ThemeComponent />

              {/* User Menu */}
              {user && (
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                  </div>

                  <ul
                    tabIndex={0}
                    className="dropdown-content z-50 mt-3 p-3 shadow-xl bg-white dark:bg-slate-800 rounded-xl w-56 border border-slate-200 dark:border-slate-700"
                  >
                    <li className="px-3 py-2 border-b border-slate-200 dark:border-slate-700 mb-2">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user?.email}
                      </p>
                    </li>
                    <li>
                      <Link
                        to="/dashboard"
                        className="block px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        Dashboard
                      </Link>
                    </li>
                    <li className="mt-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {mobileMenuOpen ? (
                  <FaTimes className="w-5 h-5" />
                ) : (
                  <FaBars className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? "max-h-screen" : "max-h-0"
            }`}
        >
          <div className="px-4 py-4 space-y-2 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-700">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive
                    ? "bg-blue-500 text-white"
                    : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700">
              <p className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wide">
                Our Shops
              </p>
              {shopLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-xl text-sm text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Logout Toast */}
      {logoutMutation.isSuccess && showToast && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert bg-green-500 text-white border-none shadow-lg">
            <span>Logged out successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
