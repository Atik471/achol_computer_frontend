import React from 'react';
import {
    FiHome,
    FiBox,
    FiUsers,
    FiFileText,
    FiShoppingCart,
    FiMenu,
} from 'react-icons/fi';
import ThemeComponent from '../components/ThemeComponent';
import { Link } from 'react-router';
import { Outlet } from "react-router"

const DashboardLayout = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />

            {/* Main Content */}
            <div className="drawer-content flex flex-col">
                {/* Navbar */}
                <div className="w-full navbar bg-base-200 shadow-md px-4">
                    <div className="flex-none lg:hidden">
                        <label
                            htmlFor="my-drawer"
                            className="btn btn-square btn-ghost drawer-button"
                        >
                            <FiMenu size={22} />
                        </label>
                    </div>
                    <div className="flex-1">
                        <h1 className="text-xl font-bold">
                            Achol Computer Admin
                        </h1>
                    </div>
                    <div className="flex-none">
                        {/* Theme Toggle Button (Placeholder) */}
                        <ThemeComponent />
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-6">
                    <Outlet />
                    {/* Add your dashboard content here */}
                </div>
            </div>

            {/* Sidebar */}
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <aside className="bg-base-100 w-48 min-h-full border-r">
                    <ul className="menu p-4 text-base">
                        <li>
                            <Link
                                to="/dashboard"
                                className="flex items-center gap-2"
                            >
                                <FiHome /> Dashboard
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/dashboard/inventory"
                                className="flex items-center gap-2"
                            >
                                <FiBox /> Inventory
                            </Link>
                        </li>
                        <li>
                            <Link
                                // to="/orders"
                                className="flex items-center gap-2"
                            >
                                <FiShoppingCart /> Orders
                            </Link>
                        </li>
                        <li>
                            <Link
                                // to="/users"
                                className="flex items-center gap-2"
                            >
                                <FiUsers /> Users
                            </Link>
                        </li>
                        <li>
                            <Link
                                // to="/reports"
                                className="flex items-center gap-2"
                            >
                                <FiFileText /> Reports
                            </Link>
                        </li>
                    </ul>
                </aside>
            </div>
        </div>
    );
};

export default DashboardLayout;
