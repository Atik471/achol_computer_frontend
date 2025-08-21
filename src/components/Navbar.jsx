import { useContext, useState } from "react";
import ThemeComponent from "./ThemeComponent";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";

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
    <div className="navbar bg-base-200 text-base-content shadow-sm px-2 md:px-8 flex justify-between items-center">
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
              <a>Products</a>
            </li>
            <li>
              <details>
                <summary>Our Shops</summary>
                <ul className="p-2">
                  <li><a>Submenu 1</a></li>
                  <li><a>Submenu 2</a></li>
                </ul>
              </details>
            </li>
            <li>
              <a>About Us</a>
            </li>
            <li>
              <a>Contact</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Achol Computer</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <a>Products</a>
          </li>
          <li>
            <details>
              <summary>Our Shops</summary>
              <ul className="p-2">
                <li><a>Submenu 1</a></li>
                <li><a>Submenu 2</a></li>
              </ul>
            </details>
          </li>
          <li>
            <a>About Us</a>
          </li>
          <li>
            <a>Contact</a>
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
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 border"
              >
                <li className="menu-title">
                  <span>{user?.name}</span>
                  <span className="text-xs text-gray-500">{user?.email}</span>
                </li>
                <li><a>Profile</a></li>
                <li><a>Settings</a></li>
                {/* <li><a>Billing</a></li> */}
                <li className="border-t mt-2 pt-2" onClick={handleLogout}><a>Logout</a></li>
              </ul>
            )}
          </div>}
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
