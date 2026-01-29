import { Link } from "react-router";
import { FaFacebook, FaWhatsapp, FaGithub, FaPhone, FaEnvelope, FaMapMarkerAlt, FaArrowRight } from "react-icons/fa";
import logo from "../assets/logo.png";

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-slate-900 text-slate-300">
            {/* Top Wave */}
            <div className="absolute top-0 left-0 right-0 -translate-y-[99%]">
                <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
                    <path
                        d="M0 60L60 55C120 50 240 40 360 35C480 30 600 30 720 32.5C840 35 960 40 1080 42.5C1200 45 1320 45 1380 45L1440 45V60H1380C1320 60 1200 60 1080 60C960 60 840 60 720 60C600 60 480 60 360 60C240 60 120 60 60 60H0Z"
                        className="fill-slate-900"
                    />
                </svg>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Newsletter Section */}
                <div className="py-12 border-b border-slate-800">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                        <div className="text-center lg:text-left">
                            <h3 className="text-2xl font-bold text-white mb-2">
                                Stay Updated with Our Offers
                            </h3>
                            <p className="text-slate-400">
                                Get the latest deals and product updates directly to your inbox.
                            </p>
                        </div>
                        <div className="flex w-full max-w-md gap-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 px-5 py-3 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                            />
                            <button className="btn btn-primary rounded-xl px-6 shadow-lg shadow-blue-500/25">
                                <FaArrowRight />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Footer Content */}
                <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="flex items-center gap-3">
                            <img src={logo} alt="Achol Computer" className="w-10 h-10" />
                            <span className="text-xl font-bold text-white">Achol Computer</span>
                        </Link>
                        <p className="text-slate-400 leading-relaxed">
                            Your one-stop solution for all computer and electronics needs.
                            Quality products with expert service since 2018.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://www.facebook.com/sabuz.ahme"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
                            >
                                <FaFacebook className="w-5 h-5" />
                            </a>
                            <a
                                href="https://wa.me/8801712076011"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-green-500 hover:text-white transition-all duration-300"
                            >
                                <FaWhatsapp className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Products Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Products</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="/products"
                                    className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300" />
                                    All Products
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?category=laptop"
                                    className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300" />
                                    Laptops
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?category=desktop"
                                    className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300" />
                                    Desktops
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/products?category=accessories"
                                    className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300" />
                                    Accessories
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company Links */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    to="/contact"
                                    className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300" />
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/madhupur"
                                    className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300" />
                                    Madhupur Branch
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/dhanbari"
                                    className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300" />
                                    Dhanbari Branch
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/privacy-policy"
                                    className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300" />
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/terms-of-use"
                                    className="text-slate-400 hover:text-white transition-colors inline-flex items-center gap-2 group"
                                >
                                    <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300" />
                                    Terms of Use
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-semibold text-white mb-6">Get in Touch</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                                    <FaPhone className="w-4 h-4 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">01712-076011</p>
                                    <p className="text-slate-500 text-sm">Primary Line</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                                    <FaEnvelope className="w-4 h-4 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium text-sm">achalcomputer12@gmail.com</p>
                                    <p className="text-slate-500 text-sm">Email Us</p>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center flex-shrink-0">
                                    <FaMapMarkerAlt className="w-4 h-4 text-blue-400" />
                                </div>
                                <div>
                                    <p className="text-white font-medium">Madhupur, Tangail</p>
                                    <p className="text-slate-500 text-sm">Main Branch</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-sm">
                        © {currentYear} Achol Computer. All rights reserved.
                    </p>
                    <div className="flex items-center gap-2 text-sm text-slate-500">
                        <span>Crafted by</span>
                        <a
                            href="https://github.com/Atik471"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
                        >
                            Atikur Rahman
                            <FaGithub className="w-3.5 h-3.5" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;