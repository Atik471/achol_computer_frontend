import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <div className="min-h-[calc(100vh-200px)] pt-16">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default MainLayout;