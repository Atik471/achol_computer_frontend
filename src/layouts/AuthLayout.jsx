import { Outlet } from "react-router";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router";
import ThemeComponent from "../components/ThemeComponent";
import Footer from "../components/Footer";

const AuthLayout = () => {
    return (

        <div className="min-h-screen">
            {/* Navbar */}
            <div className="navbar bg-base-100 shadow-sm px-2 md:px-8">
                <div className="navbar-start">
                    <Link to="/" className="btn btn-ghost text-xl">Achol Computer</Link>
                </div>
                <div className="navbar-end">
                    <ThemeComponent />
                </div>
            </div>

            <Outlet />

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default AuthLayout;