import React, { useEffect } from "react";

const TermsOfUse = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Terms of Use
            </h1>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Welcome to our website. By accessing and using our services, you agree
                to comply with the following Terms of Use. Please read them carefully.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100">
                1. Acceptance of Terms
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                By accessing this site, you confirm that you are at least 18 years old
                or have the consent of a parent/guardian, and you agree to follow these
                terms and all applicable laws.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100">
                2. Use of Our Services
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                You may not misuse our services. This includes attempting to gain
                unauthorized access, interfering with normal operations, or using our
                content without permission.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100">
                3. Intellectual Property
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                All content on this site, including text, images, and logos, is owned by
                us or our licensors. You may not copy, modify, or redistribute it
                without permission.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100">
                4. Limitation of Liability
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                We are not responsible for any damages arising from the use or inability
                to use our services. Use of this website is at your own risk.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100">
                5. Changes to Terms
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                We may update these Terms of Use at any time. Continued use of the site
                after changes means you accept the revised terms.
            </p>
        </div>
    );
};

export default TermsOfUse;
