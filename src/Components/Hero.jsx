import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaPlayCircle } from "react-icons/fa";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-base-100">
      {/* BACKGROUND BLUR */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary/30 rounded-full blur-3xl"></div>
      <div className="absolute top-40 -right-32 w-96 h-96 bg-secondary/30 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* ================= LEFT CONTENT ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          {/* BADGE */}
          <span className="
            inline-block px-4 py-1 rounded-full text-sm font-medium
            bg-gradient-to-r from-primary to-secondary
            text-white shadow-md
          ">
             Learn. Build. Grow.
          </span>

          {/* TITLE */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            Learn Skills That <br />
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-gradient">
              Shape Your Future
            </span>
          </h1>

          {/* DESCRIPTION */}
          <p className="text-base-content/70 text-lg max-w-xl">
            Learnify is a modern learning platform where you can explore,
            enroll, and master real-world skills taught by industry experts.
          </p>

          {/* CTA */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/courses">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="
                  px-8 py-3 rounded-xl font-semibold text-white
                  bg-gradient-to-r from-primary to-secondary
                  shadow-lg hover:shadow-2xl transition-all
                "
              >
                Explore Courses <FaArrowRight className="inline ml-2" />
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="
                px-6 py-3 rounded-xl font-medium
                border border-base-300
                flex items-center gap-2
                hover:bg-base-200 transition-all
              "
            >
              <FaPlayCircle className="text-primary text-xl" />
              Watch Demo
            </motion.button>
          </div>
        </motion.div>

        {/* ================= RIGHT IMAGE CARD ================= */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative flex justify-center"
        >
          {/* IMAGE CARD */}
          <motion.div
            
            className="
              w-full max-w-md
              rounded-3xl
              bg-base-100
              border
              shadow-xl
              hover:shadow-2xl
              transition-all
              overflow-hidden
            "
          >
            <img
              src="https://i.ibb.co.com/TMhJLQjC/pexels-julia-m-cameron-4145191.jpg"
              alt="Learnify Learning"
              className="w-full h-90 object-cover"
            />
          </motion.div>

         
         
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
