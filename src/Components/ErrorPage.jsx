import { motion } from "framer-motion";
import { Link, useRouteError } from "react-router-dom";
import { FaHome, FaArrowLeft, FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = () => {
  const error = useRouteError();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="
          max-w-lg w-full text-center
          bg-base-200/70 backdrop-blur
          border border-base-300
          rounded-3xl p-10 shadow-2xl
        "
      >
        {/* ICON */}
        <motion.div
          initial={{ rotate: -10 }}
          animate={{ rotate: 0 }}
          transition={{ duration: 0.4 }}
          className="
            w-20 h-20 mx-auto mb-6
            rounded-full flex items-center justify-center
            bg-gradient-to-r from-primary to-secondary
            text-white text-3xl
          "
        >
          <FaExclamationTriangle />
        </motion.div>

        {/* TITLE */}
        <h1 className="text-5xl font-extrabold mb-3">
          Oops!
        </h1>

        {/* MESSAGE */}
        <p className="text-base-content/70 mb-2">
          Something went wrong or the page doesn’t exist.
        </p>

        {/* ERROR STATUS */}
        {error?.status && (
          <p className="text-sm text-error mb-6">
            Error Code: {error.status}
          </p>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="
              flex items-center justify-center gap-2
              px-6 py-3 rounded-xl
              bg-gradient-to-r from-primary to-secondary
              text-white font-medium
              shadow-lg hover:shadow-xl
              transition-all
            "
          >
            <FaHome />
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="
              flex items-center justify-center gap-2
              px-6 py-3 rounded-xl
              border border-base-300
              hover:bg-base-300
              transition-all
            "
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
