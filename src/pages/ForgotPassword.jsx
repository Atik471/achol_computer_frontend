import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { FaEnvelope } from "react-icons/fa";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authServices";

const ForgotPassword = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const forgotPasswordMutation = useMutation({
        mutationFn: authService.forgotPassword
    });

    const onSubmit = (data) => {
        forgotPasswordMutation.mutate(data);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-950 px-4 py-12 pt-24">
            <div className="bg-[#FEFCF9] dark:bg-slate-800 rounded-3xl shadow-2xl p-8 border border-amber-100/50 dark:border-slate-700 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Forgot Password?</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Enter your email to receive reset instructions</p>
                </div>

                {forgotPasswordMutation.isSuccess ? (
                    <div className="text-center">
                        <div className="p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-xl mb-6">
                            Check your email for the reset link!
                        </div>
                        <Link to="/login" className="btn btn-primary w-full rounded-xl">Back to Login</Link>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaEnvelope className="w-4 h-4 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    className={`input w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-slate-700 border-amber-100 dark:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${errors.email ? "border-red-500" : ""}`}
                                    placeholder="Enter your email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                                    })}
                                />
                            </div>
                            {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                        </div>

                        {forgotPasswordMutation.isError && (
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                                {forgotPasswordMutation.error?.response?.data?.message || "Something went wrong"}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={forgotPasswordMutation.isPending}
                            className="btn btn-primary w-full py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                        >
                            {forgotPasswordMutation.isPending ? "Sending..." : "Send Reset Link"}
                        </button>

                        <div className="text-center">
                            <Link to="/login" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
                                ← Back to Login
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
