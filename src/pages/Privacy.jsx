import { useEffect } from "react";


const Privacy = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-200">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

            <p className="mb-6">
                At <span className="font-semibold">Achol Computer</span>, we value your
                privacy and are committed to protecting your personal information. This
                Privacy Policy explains how we collect, use, and safeguard your data
                when you use our website and services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">1. Information We Collect</h2>
            <p className="mb-4">
                We may collect personal information such as your name, email address,
                phone number, billing/shipping address, and payment details when you
                interact with our site. Additionally, we collect non-personal data such
                as browser type, device information, and browsing activity for analytics
                purposes.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-6 space-y-2">
                <li>To process and deliver your orders.</li>
                <li>To communicate with you regarding purchases, promotions, or support.</li>
                <li>To improve our website, products, and customer experience.</li>
                <li>To comply with legal and regulatory requirements.</li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">3. Sharing of Information</h2>
            <p className="mb-4">
                We do not sell, rent, or trade your personal data to third parties.
                However, we may share information with trusted service providers (such
                as payment gateways, delivery services, and IT support) only to the
                extent necessary to provide our services.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">4. Data Security</h2>
            <p className="mb-4">
                We take reasonable technical and organizational measures to protect your
                data from unauthorized access, alteration, disclosure, or destruction.
                However, please note that no online transmission or storage system is
                100% secure.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">5. Cookies & Tracking</h2>
            <p className="mb-4">
                Our website uses cookies to enhance your browsing experience, analyze
                traffic, and personalize content. You can disable cookies in your
                browser settings, but this may affect site functionality.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">6. Your Rights</h2>
            <ul className="list-disc pl-6 space-y-2">
                <li>You may request access to the personal data we hold about you.</li>
                <li>You may request corrections or updates to your information.</li>
                <li>
                    You may request deletion of your personal data, subject to legal or
                    contractual obligations.
                </li>
                <li>
                    You may opt out of promotional emails at any time by clicking “Unsubscribe.”
                </li>
            </ul>

            <h2 className="text-2xl font-semibold mt-8 mb-3">7. Third-Party Links</h2>
            <p className="mb-4">
                Our site may contain links to third-party websites. We are not
                responsible for the privacy practices or content of those websites. We
                encourage you to review their privacy policies before sharing personal
                information.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">8. Updates to This Policy</h2>
            <p className="mb-4">
                We may update this Privacy Policy from time to time. Any changes will be
                posted on this page with the updated date. Please review this policy
                periodically to stay informed about how we protect your data.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-3">9. Contact Us</h2>
            <p>
                If you have any questions or concerns about this Privacy Policy, please
                contact us at:
                <br />
                <span className="block mt-2">
                    📞 Phone: 01712-076011 <br />
                    📧 Email: achalcomputer12@gmail.com <br />
                    {/* 📍 Address: [Your Shop Address Here] */}
                </span>
            </p>
        </div>
    );
}

export default Privacy;
