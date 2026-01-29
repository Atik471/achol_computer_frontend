import { Link, useParams } from "react-router";
import {
  FaWhatsapp,
  FaFacebook,
  FaStar,
  FaHeart,
  FaPhone,
  FaShare,
} from "react-icons/fa";
import { useProduct } from "../hooks/useProducts";
import LoadingSpinner from "../components/LoadingSpinner";
import Breadcrumbs from "../components/Breadcrumbs";
import PaymentSection from "../components/PaymentSection";
import { useEffect, useState } from "react";
import bkash from "../assets/bkash-logo.jpg";
import nagad from "../assets/nagad-logo.jpg";

const ProductDetails = () => {
  const { slug } = useParams();
  const { data, isLoading, isError } = useProduct(slug);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (isLoading) return <LoadingSpinner variant="inline" message="Loading product details..." />;
  if (isError)
    return (
      <div className="flex justify-center py-20 text-red-500">
        Error loading product.
      </div>
    );

  const product = data;

  // Handle placeholder image if not available
  const getImageUrl = (img) => {
    if (!img || img === "") {
      return "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='none'%3E%3Crect width='400' height='300' fill='%23F3F4F6'/%3E%3Cpath d='M150 100H250V200H150V100Z' fill='%23E5E7EB'/%3E%3Cpath d='M175 125V175H225V125H175Z' fill='%23D1D5DB'/%3E%3C/svg%3E";
    }
    return img;
  };

  return (
    <div className="max-w-6xl mx-auto p-4 lg:p-8">
      {/* Breadcrumb */}
      <Breadcrumbs
        categoryslug={product.category.slug}
        subcategoryslug={product.subcategory.slug}
        productNameslug={product.name}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left: Product Images */}
        <div className="space-y-4">
          {/* Main Image */}
          <div className="rounded-2xl overflow-hidden shadow-lg bg-gray-50 flex items-center justify-center p-8">
            <img
              src={getImageUrl(product.images[selectedImage])}
              alt={product.name}
              className="w-full h-80 object-contain"
              onError={(e) => {
                e.target.src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300' fill='none'%3E%3Crect width='400' height='300' fill='%23F3F4F6'/%3E%3Cpath d='M150 100H250V200H150V100Z' fill='%23E5E7EB'/%3E%3Cpath d='M175 125V175H225V125H175Z' fill='%23D1D5DB'/%3E%3C/svg%3E";
              }}
            />
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, idx) => (
                <div
                  key={idx}
                  className={`cursor-pointer border-2 rounded-lg overflow-hidden bg-gray-50 p-2 transition-all ${selectedImage === idx
                      ? "border-primary"
                      : "border-transparent hover:border-primary"
                    }`}
                  onClick={() => setSelectedImage(idx)}
                >
                  <img
                    src={getImageUrl(img)}
                    alt={`${product.name} view ${idx + 1}`}
                    className="h-20 w-full object-contain"
                    onError={(e) => {
                      e.target.src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='80' viewBox='0 0 100 80' fill='none'%3E%3Crect width='100' height='80' fill='%23F3F4F6'/%3E%3Cpath d='M35 30H65V50H35V30Z' fill='%23E5E7EB'/%3E%3Cpath d='M42 36V46H58V36H42Z' fill='%23D1D5DB'/%3E%3C/svg%3E";
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Info */}
        <div className="space-y-6">
          <div className="flex justify-between items-start">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">
              {product.name}
            </h1>
            <div className="flex space-x-2">
              {/* <button className="btn btn-ghost btn-circle">
                                <FaHeart className="text-gray-500 hover:text-red-500" />
                            </button>
                            <button className="btn btn-ghost btn-circle">
                                <FaShare className="text-gray-500 hover:text-blue-500" />
                            </button> */}
            </div>
          </div>

          {/* Brand and Category */}
          <div className="flex items-center gap-4 text-sm text-gray-200">
            <span className="bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
              {product.brand}
            </span>
            <span>
              {product.category.name} / {product.subcategory.name}
            </span>
          </div>

          {/* Ratings */}
          <div className="flex items-center gap-2">
            <div className="flex">
              {Array.from({ length: 5 }, (_, i) => (
                <FaStar
                  key={i}
                  className={
                    i < Math.floor(product.ratings.average)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }
                  size={18}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {product.ratings.average.toFixed(1)} ({product.ratings.count}{" "}
              reviews)
            </span>
          </div>

          {/* Price */}
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              {product.discountPrice ? (
                <>
                  <span className="text-3xl font-bold text-blue-500 dark:text-yellow-200">
                    ৳{product.discountPrice.toLocaleString()}
                  </span>
                  <span className="line-through text-gray-400 text-xl">
                    ৳{product.price.toLocaleString()}
                  </span>
                  <span className="badge badge-success">
                    {Math.round(
                      (1 - product.discountPrice / product.price) * 100
                    )}
                    % OFF
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-gray-900">
                  ৳{product.price.toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Stock Information */}
          <div className="bg-base-200 p-4 rounded-lg">
            <div className="flex justify-between items-center">
              <span className="font-medium">Availability:</span>
              <span
                className={
                  product.stock.available > 0
                    ? "text-success font-semibold"
                    : "text-error font-semibold"
                }
              >
                {product.stock.available > 0 ? `In Stock` : "Out of Stock"}
                {console.log(product.stock.available)}
              </span>
            </div>
            {product.stock.incoming > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                {product.stock.incoming} units arriving soon
              </div>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h3 className="font-semibold text-lg mb-2">Colors</h3>
              <div className="flex gap-2">
                {product.colors.map((color, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div
                      className="w-8 h-8 rounded-full border"
                      style={{
                        backgroundColor:
                          color.toLowerCase() === "silver"
                            ? "#c0c0c0"
                            : color.toLowerCase(),
                      }}
                      title={color}
                    ></div>
                    <span className="text-xs mt-1">{color}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Key Features */}
          {product.keyFeatures && product.keyFeatures.length > 0 && (
            <div className="pt-4">
              <h3 className="font-semibold text-lg mb-2">Key Features</h3>
              <ul className="list-disc pl-5 text-gray-600 dark:text-gray-300 space-y-1">
                {product.keyFeatures.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          {/* CTA Buttons */}
          <div className="rounded-2xl bg-base-100 p-6 shadow-sm">
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Interested in{" "}
              <span className="font-semibold">{product.name}</span>? Reach us
              via WhatsApp, Facebook, or call directly.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-between mb-6">
              <a
                href={`https://wa.me/+8801712076011?text=Hi, I'm interested in ${encodeURIComponent(
                  product.name
                )}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-success gap-2 flex-1 sm:flex-none"
              >
                <FaWhatsapp size={20} /> WhatsApp Inquiry
              </a>
              <a
                href="https://www.facebook.com/sabuz.ahme?rdid=HtJGhBuogmOv8Lde&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F16oADisM53%2F#"
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary gap-2 flex-1 sm:flex-none"
              >
                <FaFacebook size={20} /> Message on Facebook
              </a>
            </div>

            {/* Direct Contact */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mt-6">
              {/* Phone Numbers */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:01712076011"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-base-100 dark:bg-base-300 shadow-sm hover:shadow-md transition-shadow"
                >
                  <FaPhone className="text-green-500" />
                  <span className="font-medium">01712076011</span>
                </a>
                <a
                  href="tel:01868944455"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-base-100 dark:bg-base-300 shadow-sm hover:shadow-md transition-shadow"
                >
                  <FaPhone className="text-green-500" />
                  <span className="font-medium">01868944455</span>
                </a>
              </div>

              {/* WhatsApp Numbers */}
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://wa.me/+8801712076011"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-green-50 dark:bg-green-900/20 shadow-sm hover:shadow-md transition-shadow"
                >
                  <FaWhatsapp className="text-green-600" />
                  <span className="font-medium">01712076011</span>
                </a>
              </div>
            </div>

            <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
              Visit our physical shops at{" "}
              <Link
                to="/madhupur"
                className="underline decoration-primary hover:text-primary transition-colors duration-200"
              >
                Madhupur
              </Link>{" "}
              or{" "}
              <Link
                to="/dhanbari"
                className="underline decoration-primary hover:text-primary transition-colors duration-200"
              >
                Dhanbari
              </Link>{" "}
              for direct purchase
            </p>

            {/* Payment Instructions */}
            <div className="mt-8 border-t pt-6">
              <h3 className="text-lg font-semibold mb-3 text-center">
                Send Money Payment Options
              </h3>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                <div className="bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-700 rounded-xl px-6 py-3 flex items-center gap-3">
                  <img
                    src={bkash}
                    alt="Bkash Logo"
                    className="w-7 h-7"
                  />
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-pink-600 dark:text-pink-300">
                      Bkash (Send Money)
                    </span>
                    <span className="text-gray-700 dark:text-gray-200 font-semibold">
                      01712-076011
                    </span>
                  </div>
                </div>

                <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-700 rounded-xl px-6 py-3 flex items-center gap-3">
                  <img
                    src={nagad}
                    alt="Nagad Logo"
                    className="w-7 h-7"
                  />
                  <div className="flex flex-col items-start">
                    <span className="font-medium text-amber-600 dark:text-amber-300">
                      Nagad (Send Money)
                    </span>
                    <span className="text-gray-700 dark:text-gray-200 font-semibold">
                      01712-076011
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
                ⚠️ Please{" "}
                <span className="font-semibold text-green-600 dark:text-green-400">
                  contact us on WhatsApp, Facebook, or phone{" "}
                </span>
                before sending money to confirm product availability.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      {product.specifications && product.specifications.length > 0 && (
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 pb-2 border-b">
            Specifications
          </h2>
          <div className="bg-base-100 rounded-2xl shadow-sm overflow-hidden">
            {product.specifications.map((spec, index) => (
              <div key={index} className="border-b last:border-b-0">
                <h3 className="font-semibold text-lg p-4 bg-base-200">
                  {spec.key}
                </h3>
                <div className="p-4">
                  {typeof spec.value === "object" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(spec.value).map(([key, value], i) => (
                        <div key={i} className="flex">
                          <span className="font-medium w-1/2 capitalize">
                            {key}:
                          </span>
                          <span className="w-1/2">{value}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>{spec.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <PaymentSection />
    </div>
  );
};

export default ProductDetails;
