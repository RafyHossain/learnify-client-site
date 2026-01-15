import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-16">
      <div
        data-aos="fade-up"
        className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
      >
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3 text-primary">Learnify</h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            Learnify is a modern learning and skill-sharing platform where people
            learn, teach, and grow together by sharing real-world knowledge and
            experience.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link className="link link-hover" to="/">
                Home
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="/allProducts">
                Explore Skills
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="/profile">
                My Profile
              </Link>
            </li>
            <li>
              <Link className="link link-hover" to="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="link link-hover">Help Center</a>
            </li>
            <li>
              <a className="link link-hover">Privacy Policy</a>
            </li>
            <li>
              <a className="link link-hover">Terms & Conditions</a>
            </li>
            <li>
              <a className="link link-hover">FAQs</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Us</h3>

          <div className="space-y-2 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-primary" />
              support@learnify.com
            </p>
            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-primary" />
              +880 1234 567 890
            </p>
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-primary" />
              Dhaka, Bangladesh
            </p>
          </div>

          <div className="flex gap-3 mt-4">
            <a className="btn btn-circle btn-sm hover:bg-primary hover:text-white transition">
              <FaFacebookF />
            </a>
            <a className="btn btn-circle btn-sm hover:bg-primary hover:text-white transition">
              <FaTwitter />
            </a>
            <a className="btn btn-circle btn-sm hover:bg-primary hover:text-white transition">
              <FaYoutube />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-base-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
          <p className="mt-1 sm:mt-0">
            Developed by{" "}
            <span className="font-semibold text-primary">Rafy Hossain</span>
          </p>
          <p>© {new Date().getFullYear()} Learnify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
