import { Link } from "react-router";

export default function FAQSection() {
  const faqs = [
    {
      question: "Do you provide warranty on products?",
      answer:
        "Yes, all our products are covered by a warranty. This means if you face any issues due to manufacturing defects or unexpected faults, you can reach out to us and we’ll assist with repair, replacement, or service depending on the situation. We always aim to make the process as hassle-free as possible, so that you can shop with peace of mind knowing your purchase is protected."
    },
    {
      question: "How can I buy products from your shop?",
      answer:
        "Purchasing from us is very simple. You can contact us directly through WhatsApp or phone to confirm your order, and our team will guide you step by step. Once you select the product you want, we will explain the available payment options, arrange delivery, and keep you updated throughout the process. If you prefer, you can also visit our physical shops and buy in person. Just reach out to us and we’ll help finalize everything smoothly."
    },
    {
      question: "Where are your physical shops located?",
      answer:
        "We currently operate from two physical locations, one in Madhupur and another in Dhanbari. Both stores are fully equipped to showcase our products, answer your questions, and help with after-sales support. For your convenience, we have included detailed addresses and directions on our Shop Locations page so you can easily find us. Whether you want to see the products before buying or need face-to-face assistance, visiting our shops is always a good option."
    },
    {
      question: "How can I contact customer service?",
      answer:
        "Our customer service team is always ready to help. You can get in touch with us through the Contact page on our website, or directly via WhatsApp at 01712-076011. If you prefer calling, you can reach us at our primary number (01712-076011) or our secondary number (01868-944455). Whether you have a question about products, delivery, warranty, or just need guidance before making a purchase, we’ll make sure you get a helpful and timely response."
    }
  ];


  return (
    <section id="faq" className="py-16 px-6 lg:px-20 bg-gradient-to-b from-[#f7fafc] to-[#edf2f7] dark:from-[#202121] dark:to-[#181919]">
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-[#468a9a] dark:text-[#88a0b8]">
            Frequently Asked Questions
          </h2>
          <p className="text-[#4a5568] dark:text-[#cbd5e0] max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and policies.
          </p>
        </div>

        {/* FAQ Accordion - DaisyUI Style */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="collapse collapse-arrow border border-[#468a9a]/20 dark:border-[#88a0b8]/30 bg-white dark:bg-[#383f46]">
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={idx === 0}
              />
              <div className="collapse-title font-semibold text-[#2d3748] dark:text-white">
                {faq.question}
              </div>
              <div className="collapse-content text-sm text-[#4a5568] dark:text-[#cbd5e0]">
                <p>{faq.answer}</p>

                {/* Add links for specific answers */}
                {faq.question.includes("physical shops") && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href="/madhupur" className="px-3 py-1 bg-[#468a9a] text-white rounded text-sm hover:bg-[#3a7583] transition-colors">
                      Madhupur Shop
                    </a>
                    <a href="/dhanbari" className="px-3 py-1 bg-[#468a9a] text-white rounded text-sm hover:bg-[#3a7583] transition-colors">
                      Dhanbari Shop
                    </a>
                  </div>
                )}

                {faq.question.includes("contact customer service") && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a href="/contact" className="px-3 py-1 bg-[#468a9a] text-white rounded text-sm hover:bg-[#3a7583] transition-colors">
                      Contact Page
                    </a>
                    <a href="https://wa.me/8801712076011" className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 transition-colors">
                      WhatsApp
                    </a>
                    <a href="https://www.facebook.com/sabuz.ahme" className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                      Facebook
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Support */}
        <div className="mt-12 p-6 bg-[#468a9a] dark:bg-[#383f46] rounded-lg text-center">
          <h3 className="text-xl font-semibold text-white dark:text-[#88a0b8] mb-3">
            Still have questions?
          </h3>
          <p className="text-white dark:text-[#cbd5e0] mb-4">
            Contact us directly for personalized assistance
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="tel:01712076011" className="px-4 py-2 bg-white text-[#468a9a] rounded font-medium hover:bg-gray-100 transition-colors">
              Call: 01712-076011
            </a>
            <a href="https://wa.me/8801712076011" className="px-4 py-2 bg-green-500 text-white rounded font-medium hover:bg-green-600 transition-colors">
              WhatsApp
            </a>
            <Link to="/contact" className="px-4 py-2 bg-transparent border border-white text-white rounded font-medium hover:bg-white hover:text-[#468a9a] transition-colors">
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}