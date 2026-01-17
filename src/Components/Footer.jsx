import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaWhatsapp,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const Footer = () => {
  return (
    <footer className="mt-24 bg-base-200/60 backdrop-blur-xl border-t border-base-300">
      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* ================= BRAND ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-3 mb-4">
            <img
              src={logo}
              alt="Learnify Logo"
              className="w-12 h-12 rounded-xl object-contain"
            />
            <h2 className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Learnify
            </h2>
          </div>

          <p className="text-sm leading-relaxed text-base-content/70 max-w-xs">
            Learnify is a modern learning platform where learners and instructors
            connect, share skills, and grow together through practical,
            real-world knowledge.
          </p>
        </motion.div>

        {/* ================= QUICK LINKS ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {[
              { name: "Home", to: "/" },
              { name: "Courses", to: "/courses" },
              { name: "Dashboard", to: "/dashboard" },
              { name: "Contact", to: "/contact" },
            ].map((link, i) => (
              <li key={i}>
                <Link
                  to={link.to}
                  className="inline-block text-base-content/70 hover:text-primary hover:translate-x-1 transition-all"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* ================= SUPPORT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          <h3 className="font-semibold text-lg mb-4">Support</h3>
          <ul className="space-y-2 text-sm text-base-content/70">
            {["Help Center", "Privacy Policy", "Terms & Conditions", "FAQs"].map(
              (item, i) => (
                <li
                  key={i}
                  className="hover:text-primary hover:translate-x-1 transition-all cursor-pointer"
                >
                  {item}
                </li>
              )
            )}
          </ul>
        </motion.div>

        {/* ================= CONTACT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="font-semibold text-lg mb-4">Contact</h3>

          <div className="space-y-3 text-sm text-base-content/70">
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-primary" />
              support@learnify.com
            </p>

            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-primary" />
              +880 1784 038 430
            </p>

            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-primary" />
              Dhaka, Bangladesh
            </p>
          </div>

          {/* ================= SOCIAL ================= */}
          <div className="flex gap-4 mt-6 flex-wrap">
            {[
              {
                Icon: FaWhatsapp,
                link: "https://wa.me/8801784038430",
              },
              {
                Icon: FaFacebookF,
                link: "https://www.facebook.com/rafy.hossain.ndc",
              },
              {
                Icon: FaTwitter,
                link: "https://twitter.com/",
              },
              {
                Icon: FaYoutube,
                link: "https://www.youtube.com/",
              },
            ].map(({ Icon, link }, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.15, rotate: 3 }}
                whileTap={{ scale: 0.9 }}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  w-10 h-10 rounded-full flex items-center justify-center
                  bg-base-100 border border-base-300 text-base-content/70
                  hover:bg-gradient-to-r hover:from-primary hover:to-secondary
                  hover:text-white hover:border-transparent
                  transition-all
                "
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-base-300">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 py-5 flex flex-col sm:flex-row gap-2 justify-between items-center text-sm text-base-content/60">
          <p>
            Developed by{" "}
            <span className="font-semibold text-primary">
              Rafy Hossain
            </span>
          </p>
          <p>© {new Date().getFullYear()} Learnify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
