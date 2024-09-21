'use client'
import React from 'react';
import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-gray-300 p-8 mt-10 border-t border-gray-700 ml-64">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                {/* Logo and Description */}
                <div className="text-center md:text-left">
                    <p className="font-bold text-lg text-white">Pet Adoption</p>
                    <p className="text-sm text-gray-400">Helping you find your new best friend.</p>
                </div>

                {/* Navigation Links */}
                <div className="flex space-x-6 text-sm">
                    <Link href="/about">
                        <span className="hover:text-white cursor-pointer">About Us</span>
                    </Link>
                    <Link href="/contact">
                        <span className="hover:text-white cursor-pointer">Contact</span>
                    </Link>
                    <Link href="/privacy-policy">
                        <span className="hover:text-white cursor-pointer">Privacy Policy</span>
                    </Link>
                </div>

                {/* Social Media Links */}
                <div className="flex space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <FaFacebook size={24} />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <FaTwitter size={24} />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-gray-400 hover:text-white transition-colors">
                        <FaInstagram size={24} />
                    </a>
                </div>
            </div>

            <div className="text-center mt-6 text-xs text-gray-500">
                &copy; {new Date().getFullYear()} Pet Adoption. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
