import { Link } from "react-router";
import { FaBolt, FaArrowRight } from "react-icons/fa";

export default function HeroBanner() {
    return (
        <section className="px-4 md:px-12 relative bg-gradient-to-br from-green-50 via-white to-green-100 dark:from-base-200 dark:via-base-100 dark:to-base-200">
            <div className="container mx-auto flex flex-col md:flex-row items-center gap-8 px-6 py-12 md:py-20">

                {/* Left: Text Content */}
                <div className="flex-1 text-center md:text-left space-y-6 z-10">
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-[#468a9a]/20 text-[#2c5c68] dark:bg-[#383f46] dark:text-[#a3b2c5] shadow">
                        <FaBolt /> Best Deals Everyday
                    </span>

                    <h1 className="text-3xl md:text-5xl font-bold leading-tight text-[#2c3e50] dark:text-[#e2e8f0]">
                        Your Trusted <span className="text-[#468a9a] dark:text-[#88a0b8]">Electronics Shop</span>
                    </h1>

                    <p className="text-[#4a5568] dark:text-[#cbd5e0] text-sm md:text-base max-w-md mx-auto md:mx-0">
                        Find the latest laptops, headphones, routers, and accessories at unbeatable prices.
                        Shop online or visit our stores in Madhupur & Dhanbari.
                    </p>

                    <div className="flex flex-wrap justify-center md:justify-start gap-4">
                        <Link to="/products" className="btn bg-[#468a9a] hover:bg-[#3a7583] border-[#468a9a] text-white gap-2">
                            Shop Now <FaArrowRight />
                        </Link>
                        <Link to="/contact" className="btn btn-outline border-[#468a9a] text-[#468a9a] hover:bg-[#468a9a] hover:text-white dark:border-[#88a0b8] dark:text-[#88a0b8] dark:hover:bg-[#383f46]">
                            Contact Us
                        </Link>
                    </div>
                </div>

                {/* Right: Illustration */}
                <div className="flex-1 flex justify-center relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 800 600"
                        className="w-72 md:w-[30rem] drop-shadow-xl"
                    >
                        {/* Subtle background elements */}
                        <circle cx="100" cy="100" r="60" fill="#468a9a" opacity="0.1" className="dark:fill-[#383f46] dark:opacity-30" />
                        <circle cx="700" cy="500" r="50" fill="#468a9a" opacity="0.1" className="dark:fill-[#383f46] dark:opacity-30" />
                        <circle cx="650" cy="100" r="40" fill="#468a9a" opacity="0.1" className="dark:fill-[#383f46] dark:opacity-30" />
                        <circle cx="150" cy="500" r="45" fill="#468a9a" opacity="0.1" className="dark:fill-[#383f46] dark:opacity-30" />

                        {/* Laptop Base */}
                        <rect x="100" y="300" width="600" height="200" rx="20" fill="#468a9a" opacity="0.9" className="dark:fill-[#383f46]" />
                        <rect x="120" y="320" width="560" height="160" rx="15" fill="white" className="dark:fill-gray-800" />

                        {/* Laptop Screen */}
                        <rect x="150" y="120" width="500" height="180" rx="12" fill="#1f2937" className="dark:fill-gray-700" />
                        <rect x="165" y="135" width="470" height="150" rx="8" fill="url(#screenGradient)" />

                        {/* Screen content - simplified */}
                        <circle cx="400" cy="210" r="50" fill="white" opacity="0.1" />
                        <text x="400" y="200" fontFamily="system-ui, sans-serif" fontSize="16" fill="white" textAnchor="middle" opacity="0.9">
                            Achol Computer
                        </text>
                        <text x="400" y="230" fontFamily="system-ui, sans-serif" fontSize="12" fill="white" textAnchor="middle" opacity="0.7">
                            Best Products
                        </text>

                        {/* Keyboard details */}
                        {Array.from({ length: 4 }).map((_, i) => (
                            <g key={`row-${i}`}>
                                {Array.from({ length: 12 }).map((_, j) => (
                                    <rect
                                        key={`key-${i}-${j}`}
                                        x={140 + j * 45}
                                        y={340 + i * 35}
                                        width="35"
                                        height="25"
                                        rx="5"
                                        fill="#f3f4f6"
                                        className="dark:fill-gray-600"
                                    />
                                ))}
                            </g>
                        ))}

                        {/* Touchpad */}
                        <rect x="340" y="430" width="120" height="40" rx="8" fill="#e5e7eb" className="dark:fill-gray-600" />

                        {/* Floating Electronics */}
                        <g className="animate-float">
                            {/* Headphones */}
                            <circle cx="220" cy="80" r="22" fill="#468a9a" opacity="0.8" className="dark:fill-[#383f46]" />
                            <path d="M200 85 Q215 65 240 85" stroke="white" strokeWidth="3" fill="none" opacity="0.7" />
                        </g>

                        <g className="animate-float" style={{ animationDelay: '0.5s' }}>
                            {/* Router */}
                            <rect x="630" y="60" width="40" height="20" rx="4" fill="#468a9a" opacity="0.8" className="dark:fill-[#383f46]" />
                            {[0, 1, 2].map(i => (
                                <line
                                    key={`router-line-${i}`}
                                    x1={650}
                                    y1={60}
                                    x2={650 + (i - 1) * 15}
                                    y2={40 - i * 3}
                                    stroke="#468a9a"
                                    strokeWidth="2"
                                    opacity="0.8"
                                    className="dark:stroke-white dark:opacity-60"
                                />
                            ))}
                        </g>

                        <g className="animate-float" style={{ animationDelay: '1s' }}>
                            {/* Smartphone */}
                            <rect x="690" y="180" width="30" height="55" rx="6" fill="#468a9a" opacity="0.8" className="dark:fill-[#383f46]" />
                            <rect x="695" y="190" width="20" height="35" rx="2" fill="black" opacity="0.3" />
                            <circle cx="705" cy="240" r="2" fill="white" opacity="0.6" />
                        </g>

                        {/* Gradient definitions */}
                        <defs>
                            <linearGradient id="screenGradient" x1="0" y1="0" x2="1" y2="1">
                                <stop offset="0%" stopColor="#468a9a" />
                                <stop offset="100%" stopColor="#3a7583" />
                            </linearGradient>

                            <style>
                                {`
                                    @keyframes float {
                                        0% { transform: translateY(0px); }
                                        50% { transform: translateY(-5px); }
                                        100% { transform: translateY(0px); }
                                    }
                                    .animate-float {
                                        animation: float 4s ease-in-out infinite;
                                    }
                                `}
                            </style>
                        </defs>
                    </svg>
                </div>

            </div>

            {/* Decorative glowing background blobs */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-to-br from-[#468a9a]/30 to-[#5fa8bc]/20 dark:from-[#383f46]/40 dark:to-[#4a5562]/30 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-[#468a9a]/20 to-[#6bb5cc]/10 dark:from-[#383f46]/30 dark:to-[#535d6b]/20 rounded-full blur-2xl pointer-events-none"></div>
        </section>
    );
}