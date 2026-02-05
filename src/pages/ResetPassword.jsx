import { useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router";
import { FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../services/authServices";

const ResetPassword = () => {
    const { resettoken } = useParams();
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const password = watch("password");

    const resetPasswordMutation = useMutation({
        mutationFn: (data) => authService.resetPassword(resettoken, data)
    });

    const onSubmit = (data) => {
        resetPasswordMutation.mutate({ password: data.password });
    };

    if (resetPasswordMutation.isSuccess) {
        setTimeout(() => navigate('/login'), 2000);
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-950 px-4 py-12 pt-24">
            <div className="bg-[#FEFCF9] dark:bg-slate-800 rounded-3xl shadow-2xl p-8 border border-amber-100/50 dark:border-slate-700 w-full max-w-md">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Reset Password</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-1">Enter your new password below</p>
                </div>

                {resetPasswordMutation.isSuccess ? (
                    <div className="alert bg-green-500 text-white border-none shadow-xl rounded-xl">
                        <span>Password reset successful! Redirecting to login...</span>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">New Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaLock className="w-4 h-4 text-slate-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`input w-full pl-11 pr-12 py-3 rounded-xl bg-white dark:bg-slate-700 border-amber-100 dark:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${errors.password ? "border-red-500" : ""}`}
                                    placeholder="New password"
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Must be at least 6 characters" }
                                    })}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-600"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Confirm Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <FaLock className="w-4 h-4 text-slate-400" />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className={`input w-full pl-11 pr-4 py-3 rounded-xl bg-white dark:bg-slate-700 border-amber-100 dark:border-slate-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all ${errors.confirmPassword ? "border-red-500" : ""}`}
                                    placeholder="Confirm new password"
                                    {...register("confirmPassword", {
                                        required: "Please confirm your password",
                                        validate: value => value === password || "Passwords do not match"
                                    })}
                                />
                            </div>
                            {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
                        </div>

                        {resetPasswordMutation.isError && (
                            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-600 dark:text-red-400">
                                {resetPasswordMutation.error?.response?.data?.message || "Failed to reset password"}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={resetPasswordMutation.isPending}
                            className="btn btn-primary w-full py-3 rounded-xl font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                        >
                            {resetPasswordMutation.isPending ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
