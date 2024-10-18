import React from "react";

const Footer: React.FC = () => {
    return (
        <footer className="border-t-2 border-zinc-500 text-gray-400 py-6">
            <div className="container mx-auto text-center">
                <div className="mb-4">
                    <h1 className="text-2xl font-bold">Ex-Tracker</h1>
                    <p className="my-2 text-xs">
                        Your go-to app for seamless expense management.
                    </p>
                </div>

                <div className="flex justify-center text-xs space-x-4">
                    <a href="/about" className="hover:underline">
                        About Us
                    </a>
                    <a href="/contact" className="hover:underline">
                        Contact Us
                    </a>
                    <a href="/privacy" className="hover:underline">
                        Privacy Policy
                    </a>
                    <a href="/terms" className="hover:underline">
                        Terms of Service
                    </a>
                </div>

                <div className="mt-4 text-xs">
                    <p>Follow us on:</p>
                    <div className="flex justify-center space-x-4">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Facebook
                        </a>
                        <a
                            href="https://twitter.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Twitter
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Instagram
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            LinkedIn
                        </a>
                    </div>
                </div>

                <div className="mt-4 text-xs">
                    <p>&copy; 2024 Ex-Tracker. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
