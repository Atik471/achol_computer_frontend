import { useEffect } from "react";
import { Link } from "react-router";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaWhatsapp,
  FaFacebook,
  FaEnvelope,
  FaCreditCard,
  FaMoneyBill,
  FaShoppingCart,
  FaCheckCircle,
  FaShieldAlt,
  FaTruck,
  FaHeadset,
  FaArrowRight
} from "react-icons/fa";

export default function ContactUs() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const contactMethods = [
    {
      icon: FaPhoneAlt,
      title: "Phone",
      description: "Call us directly",
      primary: "01712-076011",
      secondary: "01868-944455",
      color: "blue",
      action: { type: "tel", href: "tel:01712076011", label: "Call Now" }
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      description: "Chat with us instantly",
      primary: "+880 1712-076011",
      color: "green",
      action: { type: "link", href: "https://wa.me/8801712076011", label: "Start Chat" }
    },
    {
      icon: FaEnvelope,
      title: "Email",
      description: "Send us a message",
      primary: "achalcomputer12@gmail.com",
      color: "purple",
      action: { type: "mailto", href: "mailto:achalcomputer12@gmail.com", label: "Send Email" }
    },
    {
      icon: FaFacebook,
      title: "Facebook",
      description: "Follow us for updates",
      primary: "@AcholComputer",
      color: "blue",
      action: { type: "link", href: "https://www.facebook.com/sabuz.ahme", label: "Visit Page" }
    }
  ];

  const whyChooseUs = [
    { icon: FaCheckCircle, title: "Genuine Products", description: "100% authentic with warranty" },
    { icon: FaShieldAlt, title: "Competitive Prices", description: "Best deals in the market" },
    { icon: FaHeadset, title: "Expert Support", description: "Technical assistance available" },
    { icon: FaTruck, title: "Quick Delivery", description: "Fast and secure shipping" }
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-700" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-300 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            We're here to help you with the best electronics and accessories
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-10 pb-20">
        {/* Contact Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            const colorClasses = {
              blue: "from-blue-500 to-blue-600 shadow-blue-500/25",
              green: "from-green-500 to-green-600 shadow-green-500/25",
              purple: "from-purple-500 to-purple-600 shadow-purple-500/25"
            };

            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colorClasses[method.color]} flex items-center justify-center shadow-lg mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                  {method.title}
                </h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                  {method.description}
                </p>
                <p className="font-semibold text-slate-900 dark:text-white text-sm mb-1">
                  {method.primary}
                </p>
                {method.secondary && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                    {method.secondary}
                  </p>
                )}
                <a
                  href={method.action.href}
                  target={method.action.type === "link" ? "_blank" : undefined}
                  rel={method.action.type === "link" ? "noopener noreferrer" : undefined}
                  className={`inline-flex items-center gap-2 text-sm font-medium transition-colors ${method.color === "green"
                    ? "text-green-600 dark:text-green-400 hover:text-green-700"
                    : method.color === "purple"
                      ? "text-purple-600 dark:text-purple-400 hover:text-purple-700"
                      : "text-blue-600 dark:text-blue-400 hover:text-blue-700"
                    }`}
                >
                  {method.action.label}
                  <FaArrowRight className="w-3 h-3" />
                </a>
              </div>
            );
          })}
        </div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Why Choose Us */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/25">
                <FaShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  Why Choose Us?
                </h2>
                <p className="text-sm text-slate-500">Trusted since 2018</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {whyChooseUs.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-700/50">
                    <Icon className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border border-blue-100 dark:border-blue-800">
              <p className="text-sm text-slate-700 dark:text-slate-300">
                <span className="font-semibold">Payment Methods:</span> bKash, Nagad, Rocket, and Cash
              </p>
            </div>
          </div>

          {/* Purchase Guide */}
          <div className="bg-white dark:bg-slate-800 rounded-xl p-8 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/25">
                <FaCreditCard className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  How to Purchase
                </h2>
                <p className="text-sm text-slate-500">Simple and secure process</p>
              </div>
            </div>

            <ol className="space-y-4">
              {[
                "Browse our products online or visit our stores",
                "Contact us via WhatsApp or phone to confirm your order",
                "Choose your preferred payment method",
                "Get your product delivered or pick up from store"
              ].map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-slate-600 dark:text-slate-300 pt-0.5">{step}</p>
                </li>
              ))}
            </ol>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="https://wa.me/8801712076011"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary rounded-xl shadow-lg shadow-blue-500/25"
              >
                Order via WhatsApp
              </a>
              <Link to="/products" className="btn btn-outline rounded-xl">
                Browse Products
              </Link>
            </div>
          </div>
        </div>

        {/* Branches Section */}
        <div className="mb-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-2">
              Visit Our Branches
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Two convenient locations to serve you better
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Madhupur Branch */}
            <div className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-blue-500 to-blue-600" />
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Madhupur Branch
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      Tara Complex (2nd Floor), Mymensingh Road, Madhupur, Tangail
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://maps.google.com/?q=Achol+Computer,+Tara+Complex,+Mymensingh+Road,+Madhupur"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary rounded-lg"
                      >
                        Get Directions
                      </a>
                      <Link to="/madhupur" className="btn btn-sm btn-outline rounded-lg">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Dhanbari Branch */}
            <div className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 hover:border-primary/30 transition-all duration-300">
              <div className="h-2 bg-gradient-to-r from-green-500 to-green-600" />
              <div className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="w-5 h-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                      Dhanbari Branch
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300 mb-4">
                      Jamalpur Road (Purba Pash), Dhanbari Bus Stand, Tangail
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <a
                        href="https://maps.app.goo.gl/3MrtQxCqWnrdhTnf9"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm btn-primary rounded-lg"
                      >
                        Get Directions
                      </a>
                      <Link to="/dhanbari" className="btn btn-sm btn-outline rounded-lg">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}