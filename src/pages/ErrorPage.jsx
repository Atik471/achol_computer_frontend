import { FiAlertTriangle } from "react-icons/fi";
import { Link } from "react-router";

const ErrorPage = ({ code = 404, message = "Page not found" }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-6 text-center">
      <FiAlertTriangle className="text-6xl text-error mb-4" />
      
      <h1 className="text-6xl font-bold text-error">{code}</h1>
      <h2 className="text-2xl font-semibold mt-2">{message}</h2>
      <p className="text-gray-600 mt-2">
        {code === 404
          ? "Sorry, the page you are looking for does not exist."
          : "Something went wrong on our end."}
      </p>

      <Link to="/" className="btn btn-primary mt-6">
        Back to Home
      </Link>
    </div>
  );
};

export default ErrorPage;
