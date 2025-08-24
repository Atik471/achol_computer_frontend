import { useEffect } from "react";
// import { Helmet } from "react-helmet-async";
import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaFacebook, FaEnvelope, FaClock, FaCreditCard, FaMoneyBill, FaShoppingCart } from "react-icons/fa";

export default function ContactUs() {

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className="min-h-screen bg-base-100 py-10 px-4">
      {/* <Helmet>
        <title>Achol Computer | Contact</title>
        <meta name="description" content="Trusted electronics store in Bangladesh." />
      </Helmet> */}
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get in touch with us for the best electronics and accessories with expert service and support
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Contact Info */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Phone Numbers */}
              <div className="card bg-gradient-to-br from-blue-50 to-pink-50 dark:from-[#393E46] dark:to-[#2D3238] shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-100 dark:border-gray-700">
                <div className="card-body">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                      <FaPhoneAlt className="text-2xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className="card-title text-gray-800 dark:text-white mb-2">Phone Numbers</h2>
                      <div className="space-y-2 text-gray-700 dark:text-gray-300">
                        <p className="flex items-center gap-2">
                          <span className="font-semibold">Primary:</span>
                          <span className="font-medium">01712-076011</span>
                        </p>
                        <p className="flex items-center gap-2">
                          <span className="font-semibold">Secondary:</span>
                          <span className="font-medium">01868-944455</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="card bg-gradient-to-br from-blue-50 to-pink-50 dark:from-[#393E46] dark:to-[#2D3238] shadow-lg hover:shadow-xl transition-shadow duration-300 border border-green-100 dark:border-gray-700">
                <div className="card-body">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                      <FaWhatsapp className="text-2xl text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <h2 className="card-title text-gray-800 dark:text-white mb-2">WhatsApp</h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">Chat with us directly</p>
                      <a
                        href="https://wa.me/8801712076011"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm bg-green-600 hover:bg-green-700 text-white border-0 transition-colors"
                      >
                        Start Chat
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="card bg-gradient-to-br from-blue-50 to-pink-50 dark:from-[#393E46] dark:to-[#2D3238] shadow-lg hover:shadow-xl transition-shadow duration-300 border border-purple-100 dark:border-gray-700">
                <div className="card-body">
                  <div className="flex items-start space-x-4">
                    <div className="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-full">
                      <FaEnvelope className="text-2xl text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="w-full">
                      <h2 className="card-title text-gray-800 dark:text-white mb-2">Email</h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">Send us an email anytime</p>
                      <a
                        href="mailto:achalcomputer12@gmail.com"
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors break-all font-medium"
                      >
                        achalcomputer12@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Facebook */}
              <div className="card bg-gradient-to-br from-blue-50 to-pink-50 dark:from-[#393E46] dark:to-[#2D3238] shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-100 dark:border-gray-700">
                <div className="card-body">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                      <FaFacebook className="text-2xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h2 className="card-title text-gray-800 dark:text-white mb-2">Facebook</h2>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">Follow us for updates, offers & more</p>
                      <a
                        href="https://www.facebook.com/sabuz.ahme?rdid=HtJGhBuogmOv8Lde&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16oADisM53%2F#"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm bg-[#1877F2] hover:bg-[#166FE5] text-white border-0 transition-colors"
                      >
                        Visit Page
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours */}
              {/* <div className="card bg-gradient-to-br from-orange-50 to-amber-50 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2 border border-orange-100 dark:border-gray-700">
                <div className="card-body">
                  <div className="flex items-start space-x-4">
                    <div className="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-full">
                      <FaClock className="text-2xl text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <h2 className="card-title text-gray-800 dark:text-white mb-2">Opening Hours</h2>
                      <div className="space-y-2 text-gray-700 dark:text-gray-300">
                        <p className="flex justify-between max-w-xs">
                          <span className="font-semibold">Saturday – Thursday:</span>
                          <span>10:00 AM – 9:00 PM</span>
                        </p>
                        <p className="flex justify-between max-w-xs">
                          <span className="font-semibold">Friday:</span>
                          <span className="text-red-600 dark:text-red-400">Closed</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Right Column - Payment Information */}
          <div className="flex-1">
            <div className="card bg-gradient-to-br from-blue-50 to-pink-50 dark:from-[#393E46] dark:to-[#2D3238] shadow-lg h-full border border-teal-100 dark:border-gray-700">
              <div className="card-body">
                <h2 className="card-title text-gray-800 dark:text-white mb-4 flex items-center gap-2">
                  <FaShoppingCart className="text-teal-600 dark:text-teal-400" />
                  Payment & Purchase Information
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                      <FaCreditCard className="text-teal-600 dark:text-teal-400" />
                      How to Purchase
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                      Interested in our products? Contact us through any of the methods provided, and our representatives will assist you with your purchase.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2 flex items-center gap-2">
                      <FaMoneyBill className="text-teal-600 dark:text-teal-400" />
                      Payment Methods
                    </h3>
                    <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                      {/* <li>Cash on Delivery</li> */}
                      <li>Mobile Banking (bKash, Nagad, Rocket)</li>
                      {/* <li>Bank Transfer</li> */}
                      {/* <li>Credit/Debit Cards</li> */}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                      Why Choose Us?
                    </h3>
                    <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300 space-y-1">
                      <li>Genuine products with warranty</li>
                      <li>Competitive prices</li>
                      <li>Expert technical support</li>
                      <li>Quick delivery service</li>
                      <li>Secure payment options</li>
                    </ul>
                  </div>

                  <div className="bg-teal-50 dark:bg-teal-900/20 p-4 rounded-lg border border-teal-100 dark:border-teal-800">
                    <h3 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">Need Assistance?</h3>
                    <p className="text-teal-700 dark:text-teal-300 text-sm">
                      Our customer service team is available during business hours to help with any questions about products, orders, or technical support.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Branches Section */}
        <div className="mt-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">Our Branches</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Madhupur Branch */}
            <div className="card bg-gradient-to-br from-gray-50 to-blue-50 dark:from-[#393E46] dark:to-[#2D3238] shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="card-body">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-2xl text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Madhupur Branch</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      Tara Complex (2nd Floor), Mymensingh Road, Madhupur, Tangail
                    </p>
                    <a
                      href="https://maps.google.com/?q=Achol+Computer,+Tara+Complex,+Mymensingh+Road,+Madhupur"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white dark:border-blue-400 dark:text-blue-400 dark:hover:bg-blue-400 dark:hover:text-gray-900"
                    >
                      View on Map
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Dhanbari Branch */}
            <div className="card bg-gradient-to-br from-gray-50 to-green-50 dark:from-[#393E46] dark:to-[#2D3238] shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="card-body">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-full">
                    <FaMapMarkerAlt className="text-2xl text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">Dhanbari Branch</h3>
                    <p className="text-gray-700 dark:text-gray-300 mb-3">
                      Jamalpur Road (Purba Pash), Dhanbari Bus stand, Tangail
                    </p>
                    <a
                      href="https://maps.app.goo.gl/3MrtQxCqWnrdhTnf9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-sm btn-outline border-green-600 text-green-600 hover:bg-green-600 hover:text-white dark:border-green-400 dark:text-green-400 dark:hover:bg-green-400 dark:hover:text-gray-900"
                    >
                      View on Map
                    </a>
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