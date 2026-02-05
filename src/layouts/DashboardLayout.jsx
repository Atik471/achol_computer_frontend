import React, { useContext, useEffect, useState } from 'react';
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
import { Link, NavLink, useLocation, useNavigate } from 'react-router';
import { Toaster } from 'react-hot-toast';
import { Outlet } from "react-router";
// import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
// import { Outlet } from "react-router-dom";
import { AuthContext } from '../contexts/AuthProvider';
import { useLogout } from '../hooks/useAuth';

const DashboardLayout = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();
    const { user } = useContext(AuthContext);
    // const [showToast, setShowToast] = useState(false);
    const logoutMutation = useLogout();
    const navigate = useNavigate();

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
            await logoutMutation.mutateAsync();      // call API / clear session
            // setShowToast(true);
        } catch (err) {
            console.error(err);
        }
    };

    // Redirect + toast on success
    useEffect(() => {
        if (logoutMutation.isSuccess) {
            // show toast for 2s then redirect
            const timer = setTimeout(() => {
                // setShowToast(false);
                navigate("/");
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [logoutMutation.isSuccess, navigate]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <div className="min-h-screen bg-base-100 flex h-screen">
            <Toaster position="top-center" reverseOrder={false} />
            {/* Sidebar for desktop */}
            <div className="hidden lg:flex lg:flex-shrink-0 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
                <div className="w-64 flex flex-col">
                    <div className="flex-1 flex flex-col min-h-0 ">
                        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
                            <div className="flex items-center flex-shrink-0 px-4">
                                <Link to={"/"} className="text-xl font-bold text-slate-900 dark:text-white ml-4 tracking-tight">
                                    Achol Computer
                                </Link>
                            </div>
                            <nav className="mt-8 flex-1 px-4 space-y-1">
                                <NavLink
                                    to="/dashboard"
                                    end
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2.5 rounded-lg transition-colors duration-150 ${isActive ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                                        }`
                                    }
                                >
                                    <FiBarChart className="mr-3 h-5 w-5" />
                                    <span>Dashboard</span>
                                </NavLink>
                                <NavLink
                                    to="/dashboard/inventory"
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2.5 rounded-lg transition-colors duration-150 ${isActive ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                                        }`
                                    }
                                >
                                    <FiBox className="mr-3 h-5 w-5" />
                                    <span>Inventory</span>
                                </NavLink>
                                <NavLink
                                    to="/dashboard/orders"
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2.5 rounded-lg transition-colors duration-150 ${isActive ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                                        }`
                                    }
                                >
                                    <FiShoppingCart className="mr-3 h-5 w-5" />
                                    <span>Orders</span>
                                </NavLink>
                                <NavLink
                                    to="/dashboard/users"
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2.5 rounded-lg transition-colors duration-150 ${isActive ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                                        }`
                                    }
                                >
                                    <FiUsers className="mr-3 h-5 w-5" />
                                    <span>Users</span>
                                </NavLink>
                                <NavLink
                                    to="/dashboard/transactions"
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2.5 rounded-lg transition-colors duration-150 ${isActive ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                                        }`
                                    }
                                >
                                    <FiCreditCard className="mr-3 h-5 w-5" />
                                    <span>Transactions</span>
                                </NavLink>
                            </nav>
                        </div>
                        {/* Logout button */}
                        <div className="flex-shrink-0 border-t border-slate-200 dark:border-slate-800 p-4">
                            <button className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-150" onClick={handleLogout}>
                                <FiLogOut className="mr-2" />
                                <span>Logout</span>
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
                    <div className="relative flex-1 flex flex-col w-64 max-w-xs pt-5 pb-4 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                            <button
                                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none"
                                onClick={toggleSidebar}
                            >
                                <FiX className="h-6 w-6 text-base-content" />
                            </button>
                        </div>
                        <div className="flex-shrink-0 flex items-center px-4">
                            <Link to={"/"} className="text-xl font-bold text-slate-900 dark:text-white ml-4 tracking-tight">
                                Achol Computer
                            </Link>
                        </div>
                        <div className="mt-8 flex-1 h-0 overflow-y-auto">
                            <nav className="px-4 space-y-1">
                                <NavLink
                                    to="/dashboard"
                                    end
                                    onClick={toggleSidebar}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2.5 rounded-lg transition-colors duration-150 ${isActive ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                                        }`
                                    }
                                >
                                    <FiBarChart className="mr-3 h-5 w-5" />
                                    <span>Dashboard</span>
                                </NavLink>

                                <NavLink
                                    to="/dashboard/inventory"
                                    onClick={toggleSidebar}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2.5 rounded-lg transition-colors duration-150 ${isActive ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                                        }`
                                    }
                                >
                                    <FiBox className="mr-3 h-5 w-5" />
                                    <span>Inventory</span>
                                </NavLink>

                                <NavLink
                                    to="/dashboard/orders"
                                    onClick={toggleSidebar}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2.5 rounded-lg transition-colors duration-150 ${isActive ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                                        }`
                                    }
                                >
                                    <FiShoppingCart className="mr-3 h-5 w-5" />
                                    <span>Orders</span>
                                </NavLink>

                                <NavLink
                                    to="/dashboard/users"
                                    onClick={toggleSidebar}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2.5 rounded-lg transition-colors duration-150 ${isActive ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                                        }`
                                    }
                                >
                                    <FiUsers className="mr-3 h-5 w-5" />
                                    <span>Users</span>
                                </NavLink>

                                <NavLink
                                    to="/dashboard/transactions"
                                    onClick={toggleSidebar}
                                    className={({ isActive }) =>
                                        `flex items-center px-4 py-2.5 rounded-lg transition-colors duration-150 ${isActive ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-medium" : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800/50 hover:text-slate-900 dark:hover:text-white"
                                        }`
                                    }
                                >
                                    <FiCreditCard className="mr-3 h-5 w-5" />
                                    <span>Transactions</span>
                                </NavLink>

                            </nav>
                        </div>
                        <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                            <button className="w-full flex items-center justify-center px-4 py-2.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-150" onClick={handleLogout} disabled={logoutMutation.isPending}>
                                {logoutMutation.isPending ? (
                                    <>
                                        <span className="loading loading-spinner loading-sm"></span>
                                        <span className="ml-2">Logging out...</span>
                                    </>
                                ) : (
                                    <>
                                        <FiLogOut className="mr-2" />
                                        <span>Logout</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Main content */}
            <div className="flex flex-col w-0 flex-1 overflow-hidden">
                {/* Top navigation */}
                <div className="relative z-10 flex-shrink-0 flex h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
                    <button
                        className="px-4 border-r border-slate-200 dark:border-slate-800 focus:outline-none lg:hidden text-slate-700 dark:text-slate-300"
                        onClick={toggleSidebar}
                    >
                        <span className="sr-only">Open sidebar</span>
                        <FiMenu className="h-6 w-6" />
                    </button>
                    <div className="flex-1 px-4 flex justify-between items-center">
                        {/* Title instead of search bar */}
                        <h1 className="text-xl font-semibold text-slate-900 dark:text-white tracking-tight">{currentTitle}</h1>
                        <div className="ml-4 flex items-center lg:ml-6">
                            <ThemeComponent />
                            <div className="ml-3 relative">
                                <div>
                                    <button
                                        className="flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600"
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    >
                                        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center font-semibold text-white text-sm shadow-sm tooltip tooltip-bottom" data-tip={user?.name}>
                                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
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

            {/* Toasts on success */}
            {(logoutMutation.isSuccess) && (
                <div className="toast toast-top toast-end z-50">
                    <div className="alert alert-info">
                        <span>Logged out successfully.</span>
                    </div>
                    <div className="alert alert-success">
                        <span>Redirecting to Home Page...</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DashboardLayout;
