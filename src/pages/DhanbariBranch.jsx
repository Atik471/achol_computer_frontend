import { FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaFacebook, FaEnvelope, FaClock } from "react-icons/fa";

export default function DhanbariBranch() {
  return (
    <div className="min-h-screen bg-base-200 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-blue-500 mb-4">Dhanbari Branch</h1>
          <p className="text-lg md:text-xl text-base-content/90 max-w-2xl mx-auto">
            Visit our Dhanbari branch for the best electronics and accessories with expert service and support
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Info Cards */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Location */}
              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300">
                <div className="card-body">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/15 p-3 rounded-full">
                      <FaMapMarkerAlt className="text-2xl text-primary" />
                    </div>
                    <div>
                      <h2 className="card-title text-base-content mb-2">Location</h2>
                      <p className="text-base-content/90 mb-3">
                        Jamalpur Road (Purba Pash), Dhanbari Bus stand, Tangail
                      </p>
                      <a
                        href="https://maps.google.com/?q=Achol+Computer,+Tara+Complex,+Mymensingh+Road,+Madhupur"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary btn-sm mt-2"
                      >
                        View on Google Maps
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-base-300">
                <div className="card-body">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/15 p-3 rounded-full">
                      <FaPhoneAlt className="text-2xl text-primary" />
                    </div>
                    <div className="w-full">
                      <h2 className="card-title text-base-content mb-2">Contact</h2>
                      <div className="space-y-3 text-base-content/90">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold min-w-[60px]">Phone:</span> 
                          <span className="font-medium">01712076011, 01868944455</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FaWhatsapp className="text-green-500 text-lg flex-shrink-0" />
                          <a
                            href="https://wa.me/8801712076011"
                            className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 transition-colors break-words"
                          >
                            Chat on WhatsApp
                          </a>
                        </div>
                        <div className="flex items-start gap-2">
                          <FaEnvelope className="text-blue-600 text-lg mt-1 flex-shrink-0" />
                          <a
                            href="mailto:achalcomputer12@gmail.com"
                            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors break-all"
                          >
                            achalcomputer12@gmail.com
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Facebook */}
              <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2 border border-base-300">
                <div className="card-body">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/15 p-3 rounded-full">
                      <FaFacebook className="text-2xl text-primary" />
                    </div>
                    <div>
                      <h2 className="card-title text-base-content mb-2">Facebook</h2>
                      <p className="text-base-content/90 mb-3">Follow us for updates, offers & more</p>
                      <a
                        href="https://www.facebook.com/share/16m3MctQ6g/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-sm bg-[#1877F2] text-white border-0 hover:bg-[#166FE5] transition-colors"
                      >
                        Visit Our Facebook Page
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours */}
              {/* <div className="card bg-base-100 shadow-lg hover:shadow-xl transition-shadow duration-300 md:col-span-2 border border-base-300">
                <div className="card-body">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/15 p-3 rounded-full">
                      <FaClock className="text-2xl text-primary" />
                    </div>
                    <div>
                      <h2 className="card-title text-base-content mb-2">Opening Hours</h2>
                      <div className="space-y-2 text-base-content/90">
                        <p className="flex justify-between max-w-xs">
                          <span className="font-semibold">Saturday – Thursday:</span>
                          <span>10:00 AM – 9:00 PM</span>
                        </p>
                        <p className="flex justify-between max-w-xs">
                          <span className="font-semibold">Friday:</span>
                          <span className="text-error">Closed</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="flex-1">
            <div className="card bg-base-100 shadow-lg h-full border border-base-300">
              <div className="card-body">
                <h2 className="card-title text-base-content mb-4">Find Us Here</h2>
                <div className="rounded-lg overflow-hidden h-96 border border-base-300">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3625.456534473334!2d89.94972497507536!3d24.67682825258156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39fd89efd405070f%3A0x7e01914e53bf95bb!2sDhanbari%20Bus%20Terminal!5e0!3m2!1sen!2sbd!4v1755925455108!5m2!1sen!2sbd" width="500" height="450" style={{border:0}} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}