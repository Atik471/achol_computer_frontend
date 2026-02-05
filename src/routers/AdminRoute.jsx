import { Navigate, useLocation } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

const AdminRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (loading) {
        return <LoadingSpinner />;
    }

    if (user && user.role === 'admin') {
        return children;
    }

    // If user is logged in but not admin, redirect to home
    if (user) {
        return <Navigate to="/" state={{ from: location }} replace />;
    }

    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default AdminRoute;
