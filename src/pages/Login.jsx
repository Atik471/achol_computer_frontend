import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock, FaShieldAlt } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const loginMutation = useLogin();
  const navigate = useNavigate();
  const { user, setUser, setAccessToken } = useContext(AuthContext);

  const onSubmit = async (credentials) => {
    try {
      const data = await loginMutation.mutateAsync(credentials);
      setUser(data.user);
      setAccessToken(data.accessToken);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    if (loginMutation.isSuccess && user) {
      const timer = setTimeout(() => {
        if (user.role === 'admin') {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loginMutation.isSuccess, navigate, user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-950 px-4 py-12">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-lg shadow-blue-500/25 mb-4">
            <FaShieldAlt className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Welcome Back
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Sign in to your admin account
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#FEFCF9] dark:bg-slate-800 rounded-3xl shadow-2xl p-8 border border-amber-100/50 dark:border-slate-700">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            {/* ... fields ... */}

            {/* ... existing form fields ... */}

            {/* Email Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaEnvelope className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type="email"
                  className={`input w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-slate-700 border-amber-100 dark:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${errors.email ? "border-red-500 focus:border-red-500" : ""
                    }`}
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="w-4 h-4 text-slate-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input w-full pl-11 pr-12 py-3 rounded-xl bg-white dark:bg-slate-700 border-amber-100 dark:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${errors.password ? "border-red-500 focus:border-red-500" : ""
                    }`}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="w-4 h-4" />
                  ) : (
                    <FaEye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <Link
                to="/forgot-password"
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {/* Error Message */}
            {loginMutation.isError && (
              <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-600 dark:text-red-400">
                  {loginMutation.error.response?.data?.message ||
                    "Login failed. Please check your credentials."}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-full py-3 rounded-xl text-base font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="loading loading-spinner loading-sm" />
                  Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-amber-100 dark:border-slate-700" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-[#FEFCF9] dark:bg-slate-800 text-slate-500">
                Or continue with
              </span>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center">
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-600 dark:text-blue-400 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>

          {/* Back to Home */}
          <div className="text-center mt-4">
            <Link
              to="/"
              className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-slate-400 mt-6">
          This is a secure admin portal. Unauthorized access is prohibited.
        </p>
      </div>

      {/* Success Toast */}
      {loginMutation.isSuccess && (
        <div className="toast toast-top toast-end z-50">
          <div className="alert bg-green-500 text-white border-none shadow-xl rounded-xl">
            <span className="font-medium">Welcome back! Redirecting...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
