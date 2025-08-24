import { useState } from "react";

const faqs = [
  {
    question: "Do you provide warranty on products?",
    answer: "Yes, all electronics come with at least a 1-year warranty. Specific terms may vary by product."
  },
  {
    question: "Can I return a product?",
    answer: "Products can be returned within 7 days of purchase if unopened and in original condition."
  },
  {
    question: "Do you offer cash on delivery?",
    answer: "Yes, we support COD in most regions along with online payments."
  },
  {
    question: "How long does shipping take?",
    answer: "Shipping usually takes 2–5 business days depending on your location."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-16 px-6 lg:px-20"
      style={{ backgroundColor: "var(--faq-bg)" }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Heading */}
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-10"
            style={{ color: "var(--faq-accent)" }}>
          Frequently Asked Questions
        </h2>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-sm"
              style={{ borderColor: "var(--faq-accent)" }}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-5 py-4 text-left font-medium"
                style={{ backgroundColor: "var(--faq-card-bg)", color: "var(--faq-text)" }}
              >
                <span>{faq.question}</span>
                <span>{openIndex === index ? "−" : "+"}</span>
              </button>
              {openIndex === index && (
                <div className="px-5 py-3 text-sm"
                     style={{ backgroundColor: "var(--faq-card-bg)", color: "var(--faq-text)" }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Theme styles */}
      <style jsx>{`
        :root {
          --faq-bg: #f9f9f9;
          --faq-accent: #468a9a;
          --faq-card-bg: #ffffff;
          --faq-text: #383f46;
        }
        [data-theme='dark'] {
          --faq-bg: #383f46;
          --faq-accent: #468a9a;
          --faq-card-bg: #2c3136;
          --faq-text: #e4e4e4;
        }
      `}</style>
    </section>
  );
}
