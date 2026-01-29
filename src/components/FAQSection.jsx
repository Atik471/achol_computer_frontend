import { Link } from "react-router";
import { FaQuestionCircle, FaChevronDown } from "react-icons/fa";

export default function FAQSection() {
  const faqs = [
    {
      question: "Do you provide warranty on products?",
      answer:
        "Yes, all our products are covered by warranty. If you face any issues due to manufacturing defects or unexpected faults, reach out to us and we'll assist with repair, replacement, or service. We aim to make the process hassle-free so you can shop with peace of mind."
    },
    {
      question: "How can I buy products from your shop?",
      answer:
        "Purchasing from us is simple! Contact us through WhatsApp or phone to confirm your order. We'll guide you through payment options, arrange delivery, and keep you updated. You can also visit our physical shops in Madhupur or Dhanbari for in-person purchases."
    },
    {
      question: "Where are your physical shops located?",
      answer:
        "We operate from two locations: Madhupur and Dhanbari in Tangail district. Both stores are fully equipped to showcase products, answer questions, and provide after-sales support. Check our Shop Locations page for detailed addresses and directions."
    },
    {
      question: "How can I contact customer service?",
      answer:
        "Our customer service team is always ready to help! Reach us through WhatsApp at 01712-076011 or call our primary number (01712-076011) or secondary number (01868-944455). You can also visit our Contact page for more options."
    }
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-white dark:from-slate-800 dark:to-slate-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
            <FaQuestionCircle />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Find answers to common questions about our products, services, and policies.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="collapse collapse-arrow bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow duration-300"
            >
              <input
                type="radio"
                name="faq-accordion"
                defaultChecked={idx === 0}
              />
              <div className="collapse-title text-lg font-semibold text-slate-900 dark:text-white pr-12">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed pt-2">
                  {faq.answer}
                </p>

                {/* Contextual Links */}
                {faq.question.includes("physical shops") && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      to="/madhupur"
                      className="px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      Madhupur Branch
                    </Link>
                    <Link
                      to="/dhanbari"
                      className="px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      Dhanbari Branch
                    </Link>
                  </div>
                )}

                {faq.question.includes("contact customer service") && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <Link
                      to="/contact"
                      className="px-4 py-2 rounded-lg bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      Contact Page
                    </Link>
                    <a
                      href="https://wa.me/8801712076011"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg bg-green-50 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-sm font-medium hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Card */}
        <div className="mt-12 p-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl text-center text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-3">
            Still have questions?
          </h3>
          <p className="text-blue-100 mb-6 max-w-md mx-auto">
            Contact us directly for personalized assistance. We're here to help!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:01712076011"
              className="px-6 py-3 rounded-xl bg-white text-blue-600 font-semibold hover:bg-blue-50 transition-colors"
            >
              Call: 01712-076011
            </a>
            <a
              href="https://wa.me/8801712076011"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-green-500 text-white font-semibold hover:bg-green-600 transition-colors"
            >
              WhatsApp Us
            </a>
            <Link
              to="/contact"
              className="px-6 py-3 rounded-xl bg-transparent border-2 border-white text-white font-semibold hover:bg-white hover:text-blue-600 transition-all"
            >
              Contact Page
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}