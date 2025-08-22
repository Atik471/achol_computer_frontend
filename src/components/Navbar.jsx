import { useContext, useState } from "react";
import ThemeComponent from "./ThemeComponent";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);
  const { user, logout } = useContext(AuthContext);
  const [showToast, setShowToast] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    try {
      await logout();
      setShowToast(true); // show toast
      setTimeout(() => setShowToast(false), 3000); // hide after 3s
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div className="navbar bg-[#468A9A] dark:bg-[#393E46] text-white shadow-sm px-2 md:px-8 flex justify-between items-center">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {" "}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />{" "}
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-200 text-base-content rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <NavLink to="/products">Products</NavLink>
            </li>
            <li>
              <details>
                <summary>Our Shops</summary>
                <ul className="p-2">
                  <li><NavLink to="/products">Submenu 1</NavLink></li>
                  <li><NavLink to="/products">Submenu 2</NavLink></li>
                </ul>
              </details>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <NavLink to="/contact">Contact</NavLink>
            </li>
          </ul>
        </div>
        <a className="cursor-pointer font-bold text-xl">Achol Computer</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/products">Products</NavLink>
          </li>
          <li>
            <details>
              <summary>Our Shops</summary>
              <ul className="p-2 text-black dark:text-white shadow-lg">
                <li><NavLink to="/products">Submenu 1</NavLink></li>
                <li><NavLink to="/products">Submenu 2</NavLink></li>
              </ul>
            </details>
          </li>
          <li>
            <NavLink to="/about">About Us</NavLink>
          </li>
          <li>
            <NavLink to="/contact">Contact</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-3">
        <ThemeComponent />
        {user &&
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
                  <span className="font-semibold text-blue-500">{user?.name}</span>
                  <span className="text-xs opacity-70">{user?.email}</span>
                </li>
                <li>
                  <Link to={"/dashboard"}>Dashboard</Link>
                </li>
                <li className="border-t border-base-200 dark:border-gray-600 mt-2 pt-2" onClick={handleLogout}>
                  <a>Logout</a>
                </li>
              </ul>
            )}
          </div>

        }
      </div>
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-success">
            <span>Logout successful</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
