import { useContext, useEffect, useState } from "react";
import ThemeComponent from "./ThemeComponent";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, NavLink } from "react-router";
// import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { useLogout } from "../hooks/useAuth";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const { user } = useContext(AuthContext);
  const logoutMutation = useLogout();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync(); // call API / clear session
      setShowToast(true);
    } catch (err) {
      console.error(err);
    }
  };

  // Redirect + toast on success
  useEffect(() => {
    if (logoutMutation.isSuccess) {
      // show toast for 2s then redirect
      const timer = setTimeout(() => {
        setShowToast(false);
        // navigate("/");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [logoutMutation.isSuccess]);

  return (
    <div className="navbar bg-[#468A9A] dark:bg-[#393E46] text-white shadow-sm px-2 md:px-8 flex justify-between items-center fixed top-0 z-40">
      <div className="navbar-start gap-2">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6" // slightly bigger for better tap area
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          <input type="checkbox" id="mobile-menu" className="hidden peer" />

          <ul
            tabIndex={0}
            className="menu menu-md dropdown-content bg-base-200 text-base-content rounded-box z-50 mt-3 w-80 p-3 shadow-lg"
          >
            <li>
              <NavLink to="/home" onClick={() => (document.getElementById("mobile-menu").checked = false)} >Home</NavLink>
            </li>
            <li>
              <NavLink to="/products" onClick={() => (document.getElementById("mobile-menu").checked = false)} >Products</NavLink>
            </li>
            <li>
              <details>
                <summary>Our Shops</summary>
                <ul className="p-2">
                  <li>
                    <NavLink to="/madhupur" onClick={() => (document.getElementById("mobile-menu").checked = false)} >Madhupur</NavLink>
                  </li>
                  <li>
                    <NavLink to="/dhanbari" onClick={() => (document.getElementById("mobile-menu").checked = false)} >Dhanbari</NavLink>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <NavLink to="/contact" onClick={() => (document.getElementById("mobile-menu").checked = false)} >Contact</NavLink>
            </li>
          </ul>
        </div>

        <Link
          to="/"
          className="cursor-pointer flex flex-row items-start md:items-center gap-3 md:gap-3"
        >
          <img src={logo} alt="Achol Computer" className="w-9 md:w-8" />
          <span className="translate-y-1 md:translate-y-1.5 font-display font-light text-sm md:text-2xl tracking-wide text-white leading-tight md:leading-normal">
            Achol Computer
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/home">Home</NavLink>
          </li>
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li className="z-30">
            <details>
              <summary>Our Shops</summary>
              <ul className="p-2 text-black dark:text-white shadow-lg">
                <li>
                  <NavLink to="/madhupur">Madhupur</NavLink>
                </li>
                <li>
                  <NavLink to="/dhanbari">Dhanbari</NavLink>
                </li>
              </ul>
            </details>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-3">
        <ThemeComponent />
        {user && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar placeholder"
              onClick={toggleDropdown}
            >
              <div className="bg-primary text-primary-content rounded-full w-8 h-8 flex items-center justify-center">
                <FaUserCircle className="w-8 h-8" />
              </div>
            </div>

            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border border-base-200 text-base-content"
              >
                <li className="menu-title text-base-content">
                  <span className="font-semibold text-blue-500">
                    {user?.name}
                  </span>
                  <span className="text-xs opacity-70">{user?.email}</span>
                </li>
                <li>
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li
                  className="border-t border-base-200 dark:border-gray-600 mt-2 pt-2"
                  onClick={handleLogout}
                >
                  <a>Logout</a>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
      {/* Toasts on success */}
      {logoutMutation.isSuccess && showToast && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert alert-info">
            <span>Goodbye!</span>
          </div>
          <div className="alert alert-success">
            <span>Logged out successfully.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
