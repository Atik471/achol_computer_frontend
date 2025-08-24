import React, { useEffect } from "react";

const CookiesPolicy = () => {

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-6 py-12">
            <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
                Cookies Policy
            </h1>

            <p className="mb-4 text-gray-700 dark:text-gray-300">
                This Cookies Policy explains how we use cookies and similar tracking
                technologies when you visit our website.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100">
                1. What Are Cookies?
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Cookies are small text files placed on your device when you visit a
                website. They help us improve your browsing experience and remember your
                preferences.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100">
                2. How We Use Cookies
            </h2>
            <ul className="list-disc pl-6 mb-4 text-gray-700 dark:text-gray-300">
                <li>To remember your login and session preferences</li>
                <li>To analyze site traffic and performance</li>
                <li>To provide personalized product recommendations</li>
                <li>For marketing and advertising purposes</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100">
                3. Managing Cookies
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                Most browsers allow you to control or delete cookies through settings.
                However, disabling cookies may affect site functionality.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-3 text-gray-800 dark:text-gray-100">
                4. Updates to This Policy
            </h2>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
                We may update this Cookies Policy from time to time. Please review it
                periodically for changes.
            </p>
        </div>
    );
};

export default CookiesPolicy;
