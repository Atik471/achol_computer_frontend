import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
    return (
        <div>
            <Navbar />
            <h1 className="text-3xl font-bold underline">
                Main Layout
            </h1>
            <Outlet />
        </div>
    );
};

export default MainLayout;