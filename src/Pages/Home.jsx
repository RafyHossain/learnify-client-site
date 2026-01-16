import { motion } from "framer-motion";
import Hero from "../Components/Hero";
import PopularCourses from "../Components/PopularCourses";
import TopInstructors from "../Components/TopInstructors";
import WhyChooseUs from "../Components/WhyChooseUs";

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const Home = () => {
  return (
    <div className="relative overflow-hidden">

      {/*  Animated Gradient Background */}
      <div className="absolute inset-0 -z-10 bg-animated-gradient"></div>

      {/*  Decorative Blur Blobs */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-3xl"></div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10">

        {/* HERO */}
        <Hero />

        {/* POPULAR COURSES */}
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <PopularCourses />
        </motion.section>

        {/* DIVIDER */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-base-300 to-transparent"></div>
        </div>

        {/* TOP INSTRUCTORS */}
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <TopInstructors />
        </motion.section>

        {/* DIVIDER */}
        <div className="max-w-7xl mx-auto px-6">
          <div className="h-px bg-gradient-to-r from-transparent via-base-300 to-transparent"></div>
        </div>

        {/* WHY CHOOSE US */}
        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <WhyChooseUs />
        </motion.section>

      </div>
    </div>
  );
};

export default Home;
