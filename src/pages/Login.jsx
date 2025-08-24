import { useForm } from "react-hook-form";
import { useLogin } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaEnvelope, FaLock } from "react-icons/fa";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
// import { Helmet } from "react-helmet-async";

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

  // Redirect + toast on success
  useEffect(() => {
    if (loginMutation.isSuccess) {
      // show toast for 2s then redirect
      const timer = setTimeout(() => {
        navigate("/");
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loginMutation.isSuccess, navigate]);

  return (
    <div className="card bg-base-100 dark:bg-base-200 shadow-xl rounded-2xl p-6 mx-auto max-w-md my-8 mb-[5rem]">
      {/* <Helmet>
        <title>Achol Computer | Login</title>
        <meta name="description" content="Trusted electronics store in Bangladesh." />
      </Helmet> */}
      <div className="flex justify-center items-start ">
        <div className="w-full max-w-md bg-transparent shadow-none">
          <div className="p-6 md:p-8 flex flex-col items-center">
            {/* Header */}
            <div className="w-full text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-primary dark:text-primary-content">
                Welcome Back
              </h2>
              <p className="text-base-content/70 mt-2 text-sm md:text-base">
                Sign in to your corporate account
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              {/* Email */}
              <div className="form-control w-full">
                <label className="label justify-center pb-2">
                  <span className="label-text font-semibold text-base-content">
                    Email Address
                  </span>
                </label>
                <div
                  className={`flex items-center gap-2 w-full ${errors.email ? "input-error" : ""
                    }`}
                >
                  <div className="relative w-full">
                    <FaEnvelope className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 text-base-content/60 w-4 h-4" />
                    <input
                      type="email"
                      className="input input-bordered w-full pl-10 dark:bg-base-300 dark:text-base-content"
                      placeholder="Enter your corporate email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value:
                            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                          message: "Please enter a valid email",
                        },
                      })}
                    />
                  </div>
                </div>
                {errors.email && (
                  <label className="label pt-1 justify-center">
                    <span className="label-text-alt text-error-content">
                      {errors.email.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Password */}
              <div className="form-control w-full">
                <label className="label justify-center pb-2">
                  <span className="label-text font-semibold text-base-content">
                    Password
                  </span>
                </label>
                <div
                  className={`flex items-center gap-2 w-full ${errors.password ? "input-error" : ""
                    }`}
                >
                  <div className="relative w-full">
                    <FaLock className="absolute z-10 left-3 top-1/2 transform -translate-y-1/2 text-base-content/60 w-4 h-4" />
                    <input
                      type={showPassword ? "text" : "password"}
                      className="input input-bordered w-full pl-10 pr-10 dark:bg-base-300 dark:text-base-content"
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
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-base-content/70 hover:text-base-content"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <FaEyeSlash className="z-10 w-4 h-4  text-base-content/70" />
                      ) : (
                        <FaEye className="z-10 w-4 h-4  text-base-content/70" />
                      )}
                    </button>
                  </div>
                </div>
                {errors.password && (
                  <label className="label pt-1 justify-center">
                    <span className="label-text-alt text-error-content">
                      {errors.password.message}
                    </span>
                  </label>
                )}
                <div className="text-center mt-2">
                  <Link
                    to="/forgot-password"
                    className="text-sm link link-primary"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Error Message */}
              {loginMutation.isError && (
                <div className="alert alert-error dark:bg-red-800 dark:text-red-200">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="stroke-current shrink-0 h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-sm">
                    {loginMutation.error.response?.data?.message ||
                      "Login failed. Please try again."}
                  </span>
                </div>
              )}

              {/* Submit */}
              <div className="form-control w-full">
                <button
                  type="submit"
                  className="btn btn-primary w-full dark:bg-primary dark:text-primary-content dark:hover:bg-primary-focus"
                  disabled={loginMutation.isPending}
                >
                  {loginMutation.isPending ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      <span className="ml-2">Logging in...</span>
                    </>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>

            {/* Sign up link */}
            {/* <div className="text-center mt-8 w-full">
              <p className="text-base-content/70 text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  to="/register"
                  className="link link-primary font-semibold"
                >
                  Create account
                </Link>
              </p>
            </div> */}
          </div>
        </div>
      </div>

      {/* Toasts on success */}
      {loginMutation.isSuccess && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-info">
            <span>Welcome back!</span>
          </div>
          <div className="alert alert-success">
            <span>Login successful. Redirecting...</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
