import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-[#FEFCF9] dark:bg-slate-900 text-gray-800 dark:text-slate-100 transition-colors duration-300">
            <Navbar />
            <div className="min-h-[calc(100vh-200px)] pt-16">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;