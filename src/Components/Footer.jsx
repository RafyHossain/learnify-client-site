import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="mt-24 bg-base-200/60 backdrop-blur-xl border-t border-base-300">
      {/* ================= MAIN ================= */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-14">

        {/* BRAND */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Learnify
          </h2>

          <p className="text-sm leading-relaxed text-base-content/70 max-w-xs">
            Learnify is a modern learning platform where learners and instructors
            connect, share skills, and grow together through real-world knowledge.
          </p>
        </motion.div>

        {/* QUICK LINKS */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
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
                  className="text-base-content/70 hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* SUPPORT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="font-semibold text-lg mb-4">Support</h3>

          <ul className="space-y-2 text-sm text-base-content/70">
            {[
              "Help Center",
              "Privacy Policy",
              "Terms & Conditions",
              "FAQs",
            ].map((item, i) => (
              <li
                key={i}
                className="hover:text-primary transition cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* CONTACT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <h3 className="font-semibold text-lg mb-4">Contact</h3>

          <div className="space-y-3 text-sm text-base-content/70">
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-primary" />
              support@learnify.com
            </p>

            <p className="flex items-center gap-3">
              <FaPhoneAlt className="text-primary" />
              +880 1234 567 890
            </p>

            <p className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-primary" />
              Dhaka, Bangladesh
            </p>
          </div>

          {/* SOCIAL ICONS */}
          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaTwitter, FaYoutube].map((Icon, i) => (
              <motion.a
                key={i}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
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

      {/* ================= BOTTOM ================= */}
      <div className="border-t border-base-300">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row gap-2 justify-between items-center text-sm text-base-content/60">
          <p>
            Developed by{" "}
            <span className="font-semibold text-primary">
              Rafy Hossain
            </span>
          </p>

          <p>
            © {new Date().getFullYear()} Learnify. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
