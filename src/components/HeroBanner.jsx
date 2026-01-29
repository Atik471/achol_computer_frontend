import { Link } from "react-router";
import { FaBolt, FaArrowRight, FaShieldAlt, FaTruck, FaHeadset } from "react-icons/fa";

export default function HeroBanner() {
    return (
        <section className="relative min-h-[600px] lg:min-h-[700px] overflow-hidden">
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-purple-950" />

            {/* Animated Background Blobs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div
                    className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"
                />
                <div
                    className="absolute top-1/2 -left-40 w-80 h-80 bg-gradient-to-br from-cyan-400/15 to-blue-400/15 rounded-full blur-3xl animate-float-slow"
                    style={{ animationDelay: "1s" }}
                />
                <div
                    className="absolute -bottom-20 right-1/4 w-72 h-72 bg-gradient-to-br from-purple-400/15 to-pink-400/15 rounded-full blur-3xl animate-float"
                    style={{ animationDelay: "2s" }}
                />
            </div>

            {/* Grid Pattern Overlay */}
            <div
                className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

                    {/* Left: Text Content */}
                    <div className="flex-1 text-center lg:text-left space-y-8">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-200/50 dark:border-blue-500/20">
                            <FaBolt className="text-amber-500 text-sm" />
                            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                Trusted by 10,000+ customers since 2018
                            </span>
                        </div>

                        {/* Heading */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
                            <span className="text-slate-900 dark:text-white">Your Premier</span>
                            <br />
                            <span className="text-gradient">Electronics Store</span>
                        </h1>

                        {/* Description */}
                        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Discover quality laptops, accessories, routers & more at unbeatable prices.
                            Visit our stores in <span className="font-semibold text-blue-600 dark:text-blue-400">Madhupur</span> & <span className="font-semibold text-blue-600 dark:text-blue-400">Dhanbari</span>.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <Link
                                to="/products"
                                className="btn btn-primary btn-lg gap-2 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                Shop Now
                                <FaArrowRight className="text-sm" />
                            </Link>
                            <Link
                                to="/contact"
                                className="btn btn-outline btn-lg rounded-xl border-2 border-slate-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                            >
                                Contact Us
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4">
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-bold text-slate-900 dark:text-white">10K+</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">Happy Customers</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-bold text-slate-900 dark:text-white">500+</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">Products</div>
                            </div>
                            <div className="text-center lg:text-left">
                                <div className="text-3xl font-bold text-slate-900 dark:text-white">7+</div>
                                <div className="text-sm text-slate-500 dark:text-slate-400">Years Trust</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Illustration */}
                    <div className="flex-1 flex justify-center relative">
                        {/* Floating Device Cards */}
                        <div className="relative w-full max-w-md lg:max-w-lg">
                            {/* Main Card */}
                            <div className="relative bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8 transform hover:scale-[1.02] transition-transform duration-500">
                                {/* Laptop SVG */}
                                <svg
                                    viewBox="0 0 400 300"
                                    className="w-full h-auto"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    {/* Laptop Screen */}
                                    <rect x="50" y="30" width="300" height="180" rx="10" className="fill-slate-800 dark:fill-slate-700" />
                                    <rect x="60" y="40" width="280" height="160" rx="5" className="fill-gradient-to-br from-blue-500 to-purple-500" fill="url(#screenGradient)" />

                                    {/* Screen Content */}
                                    <text x="200" y="110" fontFamily="Inter, system-ui" fontSize="18" fill="white" textAnchor="middle" fontWeight="bold">
                                        Achol Computer
                                    </text>
                                    <text x="200" y="135" fontFamily="Inter, system-ui" fontSize="12" fill="rgba(255,255,255,0.8)" textAnchor="middle">
                                        Quality Electronics
                                    </text>

                                    {/* Laptop Base */}
                                    <path d="M30 210 L50 210 L50 230 L350 230 L350 210 L370 210 L370 240 C370 250 360 260 350 260 L50 260 C40 260 30 250 30 240 Z" className="fill-slate-300 dark:fill-slate-600" />
                                    <ellipse cx="200" cy="245" rx="40" ry="5" className="fill-slate-400 dark:fill-slate-500" />

                                    {/* Gradient Definitions */}
                                    <defs>
                                        <linearGradient id="screenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                            <stop offset="0%" stopColor="#3B82F6" />
                                            <stop offset="100%" stopColor="#8B5CF6" />
                                        </linearGradient>
                                    </defs>
                                </svg>

                                {/* Decorative Badge */}
                                <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                                    NEW ARRIVALS
                                </div>
                            </div>

                            {/* Floating Elements */}
                            <div className="absolute -top-8 -left-8 bg-white dark:bg-slate-700 rounded-2xl p-4 shadow-xl animate-float hidden lg:block">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                                        <FaShieldAlt className="text-green-600 dark:text-green-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white text-sm">Warranty</p>
                                        <p className="text-xs text-slate-500">Guaranteed</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute -bottom-4 -left-4 bg-white dark:bg-slate-700 rounded-2xl p-4 shadow-xl animate-float-slow hidden lg:block" style={{ animationDelay: "0.5s" }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                                        <FaTruck className="text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white text-sm">Delivery</p>
                                        <p className="text-xs text-slate-500">Nationwide</p>
                                    </div>
                                </div>
                            </div>

                            <div className="absolute top-1/2 -right-6 bg-white dark:bg-slate-700 rounded-2xl p-4 shadow-xl animate-float hidden lg:block" style={{ animationDelay: "1s" }}>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                                        <FaHeadset className="text-purple-600 dark:text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white text-sm">Support</p>
                                        <p className="text-xs text-slate-500">24/7 Help</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Wave */}
            <div className="absolute bottom-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path
                        d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                        className="fill-white dark:fill-slate-900"
                    />
                </svg>
            </div>
        </section>
    );
}