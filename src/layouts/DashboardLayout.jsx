import React, { useContext, useState } from 'react';
import {
    FiHome,
    FiBox,
    FiUsers,
    FiFileText,
    FiShoppingCart,
    FiMenu,
    FiLogOut,
    FiCreditCard,
    FiBarChart,
    FiX
} from 'react-icons/fi';
import ThemeComponent from '../components/ThemeComponent';
import { Link, NavLink, useLocation } from 'react-router';
import { Outlet } from "react-router";
import { AuthContext } from '../contexts/AuthProvider';

const DashboardLayout = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { user, logout } = useContext(AuthContext);

    // Simple mapping of routes to page titles
    const pageTitles = {
        "/dashboard": "Dashboard",
        "/dashboard/inventory": "Inventory",
        "/dashboard/orders": "Orders",
        "/dashboard/users": "Users",
        "/dashboard/reports": "Reports",
        "/settings": "Settings",
        "/profile": "Profile"
    };

    const currentTitle = pageTitles[location.pathname] || "Dashboard";

    const handleLogout = async () => {
        try {
            await logout();
            setShowToast(true); // show toast
            setTimeout(() => setShowToast(false), 3000); // hide after 3s
        } catch (err) {
            console.error(err);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="min-h-screen bg-base-100 flex h-screen">
            {/* Sidebar for desktop */}
            <div className="hidden lg:flex lg:flex-shrink-0 bg-base-200 ">
                <div className="w-64 flex flex-col">
                    <div className="flex-1 flex flex-col min-h-0 border-r border-base-300">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div className="flex items-center flex-shrink-0 px-4">
                                <Link to={"/"} className="text-2xl font-bold text-blue-600 ml-4">
                                    Achol Computer
                                </Link>
                            </div>
                            <nav className="mt-8 flex-1 px-4 space-y-1">
                                <NavLink
                                    to="/dashboard"
                                    end 
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 rounded-lg group hover:bg-base-300 ${isActive ? "bg-base-200 text-blue-500 font-semibold" : ""
                                        }`
                                    }
                                >
                                    <FiBarChart className="mr-3 h-5 w-5" />
                                    Dashboard
                                </NavLink>
                                <NavLink
                                    to="/dashboard/inventory"
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 rounded-lg group hover:bg-base-300 ${isActive ? "bg-base-200 text-blue-500 font-semibold" : ""
                                        }`
                                    }
                                >
                                    <FiBox className="mr-3 h-5 w-5" />
                                    Inventory
                                </NavLink>
                                <NavLink
                                    to="/dashboard/orders"
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 rounded-lg group hover:bg-base-300 ${isActive ? "bg-base-200 text-blue-500 font-semibold" : ""
                                        }`
                                    }
                                >
                                    <FiShoppingCart className="mr-3 h-5 w-5" />
                                    Orders
                                </NavLink>
                                <NavLink
                                    to="/dashboard/users"
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 rounded-lg group hover:bg-base-300 ${isActive ? "bg-base-200 text-blue-500 font-semibold" : ""
                                        }`
                                    }
                                >
                                    <FiUsers className="mr-3 h-5 w-5" />
                                    Users
                                </NavLink>
                                <NavLink
                                    to="/dashboard/transactions"
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 rounded-lg group hover:bg-base-300 ${isActive ? "bg-base-200 text-blue-500 font-semibold" : ""
                                        }`
                                    }
                                >
                                    <FiCreditCard className="mr-3 h-5 w-5" />
                                    Transactions
                                </NavLink>
                            </nav>
                        </div>
                        {/* Logout button instead of admin info */}
                        <div className="flex-shrink-0 border-t border-base-300 p-4">
                            <button className="cursor-pointer w-full flex items-center justify-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600" onClick={handleLogout}>
                                <FiLogOut className="mr-2" />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile sidebar */}
            {sidebarOpen && (
                <div className="lg:hidden fixed inset-0 flex z-40">
                    <div className="fixed inset-0" onClick={toggleSidebar}>
                        <div className="absolute inset-0 opacity-75 bg-base-content"></div>
                    </div>
                    <div className="relative flex-1 flex flex-col w-64 max-w-xs pt-5 pb-4 bg-base-100">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
                                onClick={toggleSidebar}
                            >
                                <FiX className="h-6 w-6 text-base-content" />
                            </button>
                        </div>
                        <div className="flex-shrink-0 flex items-center px-4">
                            <Link to={"/"} className="text-xl font-bold text-blue-500 ml-4">
                                Achol Computer
                            </Link>
                        </div>
                        <div className="mt-8 flex-1 h-0 overflow-y-auto">
                            <nav className="px-4 space-y-1">
                                <NavLink
                                    to="/dashboard"
                                    end 
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 rounded-lg group hover:bg-base-300 ${isActive ? "bg-base-200 text-blue-500 font-semibold" : ""
                                        }`
                                    }
                                >
                                    <FiBarChart className="mr-3 h-5 w-5" />
                                    Dashboard
                                </NavLink>

                                <NavLink
                                    to="/dashboard/inventory"
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 rounded-lg group hover:bg-base-300 ${isActive ? "bg-base-200 text-blue-500 font-semibold" : ""
                                        }`
                                    }
                                >
                                    <FiBox className="mr-3 h-5 w-5" />
                                    Inventory
                                </NavLink>

                                <NavLink
                                    to="/dashboard/orders"
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 rounded-lg group hover:bg-base-300 ${isActive ? "bg-base-200 text-blue-500 font-semibold" : ""
                                        }`
                                    }
                                >
                                    <FiShoppingCart className="mr-3 h-5 w-5" />
                                    Orders
                                </NavLink>

                                <NavLink
                                    to="/dashboard/users"
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 rounded-lg group hover:bg-base-300 ${isActive ? "bg-base-200 text-blue-500 font-semibold" : ""
                                        }`
                                    }
                                >
                                    <FiUsers className="mr-3 h-5 w-5" />
                                    Users
                                </NavLink>

                                <NavLink
                                    to="/dashboard/transactions"
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2 rounded-lg group hover:bg-base-300 ${isActive ? "bg-base-200 text-blue-500 font-semibold" : ""
                                        }`
                                    }
                                >
                                    <FiCreditCard className="mr-3 h-5 w-5" />
                                    Transactions
                                </NavLink>

                            </nav>
                        </div>
                        <div className="p-4 border-t border-base-300">
                            <button className="cursor-pointer w-full flex items-center justify-center px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600">
                                <FiLogOut className="mr-2" onClick={handleLogout} />
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main content */}
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                {/* Top navigation */}
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-base-200 border-b border-base-300">
                    <button
                        className="px-4 border-r border-base-300 focus:outline-none lg:hidden"
                        onClick={toggleSidebar}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <FiMenu className="h-6 w-6" />
                    </button>
                    <div className="flex-1 px-4 flex justify-between items-center">
                        {/* Title instead of search bar */}
                        <h1 className="text-xl font-bold mt-2">{currentTitle}</h1>
                        <div className="ml-4 flex items-center lg:ml-6">
                            <ThemeComponent />
                            <div className="ml-3 relative">
                                <div>
                                    <button
                                        className="max-w-xs flex items-center text-sm rounded-full focus:outline-none"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <div className="h-8 w-8 m-2 rounded-full bg-primary text-primary-content flex items-center justify-center font-bold tooltip tooltip-bottom" data-tip={user?.name}>
                                            AC
                                        </div>

                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Page content */}
                <main className="flex-1 relative overflow-y-auto focus:outline-none">
                    <div className="py-6">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <Outlet />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
