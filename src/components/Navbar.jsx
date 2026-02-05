import { useContext, useEffect, useState } from "react";
import ThemeComponent from "./ThemeComponent";
import { FaSearch, FaBars, FaTimes } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, NavLink, useNavigate } from "react-router";
import { useLogout } from "../hooks/useAuth";
import CartIcon from "./CartIcon";
import WishlistIcon from "./WishlistIcon";

// Custom SVG Logo Component
const AcholLogo = ({ className = "" }) => (
  <svg
    viewBox="0 0 40 40"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#3B82F6" />
        <stop offset="100%" stopColor="#8B5CF6" />
      </linearGradient>
    </defs>
    {/* Main circle */}
    <circle cx="20" cy="20" r="18" fill="url(#logoGradient)" />
    {/* Letter A stylized as computer/monitor */}
    <path
      d="M12 28L20 12L28 28M15 23H25"
      stroke="white"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    />
    {/* Small dot representing power/tech */}
    <circle cx="20" cy="17" r="1.5" fill="white" />
  </svg>
);

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
          ? "bg-[#FEFCF9]/95 dark:bg-slate-900/95 backdrop-blur-lg shadow-lg shadow-slate-900/5 dark:shadow-black/20 border-b border-amber-100/50 dark:border-slate-700/50"
          : "bg-transparent"
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
            >
              <AcholLogo className="w-9 h-9 transition-transform group-hover:scale-105" />
              <div className="hidden sm:block">
                <span className={`font-bold text-lg tracking-tight transition-colors ${scrolled
                  ? "text-slate-900 dark:text-white"
                  : "text-slate-900 dark:text-white"
                  }`}>
                  Achol
                </span>
                <span className={`font-bold text-lg tracking-tight transition-colors ${scrolled
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-blue-600 dark:text-blue-400"
                  }`}>
                  Computer
                </span>
              </div>
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
                      : scrolled
                        ? "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                        : "text-slate-700 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-slate-800/50"
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
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer flex items-center gap-1 ${scrolled
                    ? "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                    : "text-slate-700 dark:text-slate-300 hover:bg-white/20 dark:hover:bg-slate-800/50"
                    }`}
                >
                  Our Shops
                  <svg
                    className="w-4 h-4"
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
                  className="dropdown-content z-50 mt-2 p-2 shadow-xl bg-[#FEFCF9] dark:bg-slate-800 rounded-xl w-52 border border-amber-100 dark:border-slate-700"
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
            <div className="flex items-center gap-1">
              {/* Search Button */}
              <button
                onClick={() => navigate("/products")}
                className={`p-2.5 rounded-lg transition-colors ${scrolled
                  ? "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  : "text-slate-600 dark:text-slate-400 hover:bg-white/20 dark:hover:bg-slate-800/50"
                  }`}
                title="Search Products"
              >
                <FaSearch className="w-4 h-4" />
              </button>

              {/* Wishlist Icon */}
              {user && <WishlistIcon />}

              {/* Cart Icon */}
              {user && <CartIcon />}

              {/* Theme Toggle */}
              <ThemeComponent scrolled={scrolled} />

              {/* User Menu or Auth Buttons */}
              {user ? (
                <div className="dropdown dropdown-end">
                  <button
                    tabIndex={0}
                    className="relative flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 via-blue-500 to-purple-600 hover:from-blue-700 hover:via-blue-600 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  >
                    <span className="text-white font-bold text-lg leading-none select-none">
                      {user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </span>
                  </button>

                  <ul
                    tabIndex={0}
                    className="dropdown-content z-50 mt-3 p-3 shadow-xl bg-[#FEFCF9] dark:bg-slate-800 rounded-xl w-56 border border-amber-100 dark:border-slate-700"
                  >
                    <li className="px-3 py-2 border-b border-amber-100 dark:border-slate-700 mb-2">
                      <p className="font-semibold text-slate-900 dark:text-white">
                        {user?.name}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        {user?.email}
                      </p>
                    </li>
                    <li>
                      <Link
                        to="/orders"
                        className="block px-3 py-2 rounded-lg text-sm text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"
                      >
                        My Orders
                      </Link>
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
              ) : (
                <div className="hidden sm:flex items-center gap-2">
                  <Link
                    to="/login"
                    className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-sm shadow-blue-500/25"
                  >
                    Register
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`lg:hidden p-2.5 rounded-lg transition-colors ${scrolled
                  ? "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  : "text-slate-600 dark:text-slate-400 hover:bg-white/20 dark:hover:bg-slate-800/50"
                  }`}
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
          <div className="px-4 py-4 space-y-2 bg-[#FEFCF9] dark:bg-slate-900 border-t border-amber-100 dark:border-slate-700">
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
          <div className="alert bg-green-500 text-white border-none shadow-lg rounded-xl">
            <span>Logged out successfully!</span>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
