"use client";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

const Footer = () => {
  // Array of locations
  const locations = [
    { name: "Dehradun", slug: "dehradun" },
    { name: "Haridwar", slug: "haridwar" },
    { name: "Nainital", slug: "nainital" },
    { name: "Mussoorie", slug: "mussoorie" },
    { name: "Roorkee", slug: "roorkee" },
  ];

  // Array of property types
  const propertyTypes = [
    { name: "1RK", slug: "1rk" },
    { name: "1BHK", slug: "1bhk" },
    { name: "2BHK", slug: "2bhk" },
    { name: "3BHK", slug: "3bhk" },
  ];

  // Social media links
  const socialLinks = [
    {
      name: "Facebook",
      url: "https://www.facebook.com/share/15obCLp4gg/?mibextid=wwXIfr",
      icon: "https://img.icons8.com/ios/50/ffffff/facebook-new.png",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/ghar_padharo?igsh=OHBuOWNydzVqazFz",
      icon: "https://img.icons8.com/ios/50/ffffff/instagram-new.png",
    },
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/gharpadharo/",
      icon: "https://img.icons8.com/ios/50/ffffff/linkedin.png",
    },
    {
      name: "Twitter",
      url: "https://twitter.com",
      icon: "https://img.icons8.com/ios/50/ffffff/twitter.png",
    },
    {
      name: "YouTube",
      url: "https://youtube.com",
      icon: "https://img.icons8.com/ios/50/ffffff/youtube-play.png",
    },
  ];

  // Footer links
  const footerLinks = [
    { name: "Sitemap", url: "/sitemap.xml" },
    { name: "Refund Policy", url: "/refund-policy" },
    { name: "Privacy Policy", url: "/privacy-policy" },
    { name: "Blog", url: "https://blog.gharpadharo.com" },
    { name: "Properties", url: "/properties" },
    { name: "Pricing", url: "/pricing" },
    { name: "Sales Enquiry", url: "/contact" },
    { name: "Login", url: "/login" },
    { name: "Who we are", url: "/about" },

  ];

  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-6 relative">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About Gharpadharo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="col-span-1 md:col-span-1"
          >
            <h3 className="text-xl font-bold mb-4">About Gharpadharo</h3>
            <p className="text-gray-300 text-sm mb-4">
              As the leading platform connecting property seekers and owners in
              Uttarakhand,
              <br className="hidden sm:block" /> Gharpadharo aims to simplify
              the housing experience with technology-driven solutions.
            </p>
            <Link
              href="/about"
              className="text-buttons hover:underline text-sm"
            >
              Read more
            </Link>
          </motion.div>

          {/* Properties in Uttarakhand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="col-span-1 md:col-span-1"
          >
            <h3 className="text-xl font-bold mb-4">
              Properties in Uttarakhand
            </h3>
            <ul className="space-y-2 text-sm">
              {locations.map((location) => (
                <li key={location.slug}>
                  <Link
                    href={`/properties?search=${location.slug}`}
                    className="text-gray-300 hover:text-buttons"
                  >
                    Property in {location.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Property Types */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-1 md:col-span-1"
          >
            <h3 className="text-xl font-bold mb-4">Property Types</h3>
            <ul className="space-y-2 text-sm">
              {propertyTypes.map((type) => (
                <li key={type.slug}>
                  <Link
                    href={`/accommodationType?type=${type.slug}`}
                    className="text-gray-300 hover:text-buttons"
                  >
                    {type.name} Properties
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="col-span-1 md:col-span-1"
          >
            <h3 className="text-xl font-bold mb-4">Contact Information</h3>
            <div className="text-gray-300 flex flex-col space-y-3 mb-6">
              <p className="flex items-start gap-2 text-sm">
                <MapPinIcon className="w-5 h-5 text-gray-300 mt-1 flex-shrink-0" />
                <span>
                  Gharpadharo HQ, Nanda Ki Chowki-Premnagar, Dehradun,
                  <br className="hidden sm:block" /> Uttarakhand, India
                </span>
              </p>
              <Link
                href="tel:79032669007"
                className="text-gray-300 flex items-center gap-2 hover:text-buttons text-sm"
              >
                <PhoneIcon className="w-5 h-5" />
                +91 7903266907
              </Link>
              <Link
                href="mailto:gharpadharo@gmail.com"
                className="text-gray-300 flex items-center gap-2 hover:text-buttons text-sm"
              >
                <EnvelopeIcon className="w-5 h-5" />
                gharpadharo@gmail.com
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Links Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm border-t border-gray-700 pt-6 pb-6">
            {footerLinks.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                className="text-gray-400 hover:text-white"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <hr className="border-gray-700 my-6" />

        {/* Bottom Footer */}
        <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Logo and company description */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center space-x-3"
          >
            <span className="font-bold text-xl">GharPadharo</span>
            <span className="text-gray-400 text-sm">Real Estate</span>
          </motion.div>

          {/* Social Media Icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center lg:items-end gap-4"
          >
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition-transform"
                >
                  <Image
                    width={24}
                    height={24}
                    alt={social.name}
                    src={social.icon}
                    className="w-6 h-6"
                  />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-8 text-xs text-gray-500"
        >
          <p>
            Disclaimer: Gharpadharo is only an intermediary offering its
            platform to advertise properties of Seller for a
            <br className="hidden sm:block" /> Customer/Buyer/User coming on its
            Website and is not and cannot be a party to or privy to or control
            in any manner
            <br className="hidden sm:block" /> any transactions between the
            Seller and the Customer/Buyer/User.
          </p>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-center text-black text-xs mt-8 bg-white py-1 absolute bottom-0 left-0 right-0"
        >
          © 2025 All rights reserved Zestos ventures Pvt.Ltd.
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
