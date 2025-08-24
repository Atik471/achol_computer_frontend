import { Link } from 'react-router';
import { FaFacebook, FaWhatsapp, FaGithub } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="footer bg-base-200 text-base-content p-10 mt-10 md:mt-30">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-gray-600 pb-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center mb-4">
                            <svg
                                width="40"
                                height="40"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fillRule="evenodd"
                                clipRule="evenodd"
                                className="fill-current text-primary"
                            >
                                <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
                            </svg>
                            <span className="text-xl font-bold ml-2">Achol Computer</span>
                        </div>
                        <p className="mb-4">
                            Your one-stop solution for all computer needs. Quality products and services since 2010.
                        </p>
                        <div className="flex space-x-4">
                            <a
                                href="https://www.facebook.com/sabuz.ahme?rdid=HtJGhBuogmOv8Lde&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16oADisM53%2F"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-blue-600 transition-colors duration-300"
                            >
                                <FaFacebook className="w-6 h-6" />
                            </a>
                            <a
                                href="https://wa.me/8801712076011"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-gray-600 hover:text-green-500 transition-colors duration-300"
                            >
                                <FaWhatsapp className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Products & Services */}
                    <div>
                        <h6 className="footer-title">Products</h6>
                        <Link to="/products" className="link link-hover block mb-2">All Products</Link>
                        <Link to="/products?category=laptops" className="link link-hover block mb-2">Laptops</Link>
                        <Link to="/products?category=desktops" className="link link-hover block mb-2">Desktops</Link>
                        <Link to="/products?category=accessories" className="link link-hover block mb-2">Accessories</Link>
                        {/* <Link to="/products?category=repair" className="link link-hover block mb-2">Repair Services</Link> */}
                    </div>

                    {/* Company & Branches */}
                    <div>
                        <h6 className="footer-title">Company & Branches</h6>
                        {/* <Link to="/contact" className="link link-hover block mb-2">About Us</Link> */}
                        <Link to="/contact" className="link link-hover block mb-2">Contact Us</Link>
                        <Link to="/madhupur" className="link link-hover block mb-2">Madhupur Branch</Link>
                        <Link to="/dhanbari" className="link link-hover block mb-2">Dhanbari Branch</Link>
                        {/* <Link to="/careers" className="link link-hover block mb-2">Careers</Link> */}
                    </div>

                    {/* Legal & Support */}
                    <div>
                        <h6 className="footer-title">Legal & Support</h6>
                        <Link to="/terms-of-use" className="link link-hover block mb-2">Terms of use</Link>
                        <Link to="/privacy-policy" className="link link-hover block mb-2">Privacy policy</Link>
                        <Link to="/cookie-policy" className="link link-hover block mb-2">Cookie policy</Link>
                        {/* <Link to="/warranty" className="link link-hover block mb-2">Warranty Information</Link> */}
                        {/* <Link to="/support" className="link link-hover block mb-2">Technical Support</Link> */}
                    </div>
                </div>

                {/* Copyright and Developer Credit */}
                <div className=" pt-6 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-xs text-gray-500 font-medium">© {new Date().getFullYear()} Achol Computer. All rights reserved.</p>
                    <div className="flex items-center mt-2 md:mt-0 space-x-1">
                        <span className="text-xs text-gray-500 font-medium"> Crafted by</span>
                        <a
                            href="https://github.com/Atik471"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center bg-gradient-to-r from-purple-50 to-blue-50 px-2 py-0.5 rounded-full shadow-sm hover:shadow-md transition-all duration-300 group text-gray-600 hover:text-gray-800 text-xs font-medium mt-[2px] ml-1"
                        >
                            <span>Atikur Rahman</span>
                            <FaGithub className="w-3 h-3 ml-1" />
                        </a>
                    </div>


                </div>
            </div>
        </footer>
    );
};

export default Footer;