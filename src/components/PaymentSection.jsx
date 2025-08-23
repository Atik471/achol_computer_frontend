import { FaFacebook, FaWhatsapp, FaStore } from "react-icons/fa";

const PaymentSection = () => {
  return (
    <div className="mt-12 rounded-2xl shadow-md border bg-base-100 p-8">
      <h2 className="text-3xl font-bold mb-4 text-center">🛒 How to Buy</h2>
      <p className="text-center text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
        {/* We currently don’t support direct online payments.   */}
        To purchase this product, please reach us through Facebook or WhatsApp,  
        or visit one of our physical shops.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
        {/* Facebook */}
        <a
          href="https://www.facebook.com/sabuz.ahme?rdid=HtJGhBuogmOv8Lde&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16oADisM53%2F#"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary w-full flex items-center gap-2 justify-center rounded-xl shadow-sm"
        >
          <FaFacebook className="w-5 h-5" /> Message on Facebook
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/01712076011"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success w-full flex items-center gap-2 justify-center rounded-xl shadow-sm"
        >
          <FaWhatsapp className="w-5 h-5" /> Chat on WhatsApp
        </a>
      </div>

      <div className="mt-10">
        <h3 className="text-xl font-semibold mb-3 text-center">📍 Visit Our Shops</h3>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/madhupur"
            className="btn btn-outline btn-info w-full sm:w-64 flex items-center gap-2 justify-center rounded-xl shadow-sm"
          >
            <FaStore className="w-5 h-5" /> Madhupur Branch
          </a>
          <a
            href="/dhanbari"
            className="btn btn-outline btn-info w-full sm:w-64 flex items-center gap-2 justify-center rounded-xl shadow-sm"
          >
            <FaStore className="w-5 h-5" /> Dhanbari Branch
          </a>
        </div>
      </div>

      <p className="mt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
        Trusted service • Secure transactions • Direct communication
      </p>
    </div>
  );
};

export default PaymentSection;
