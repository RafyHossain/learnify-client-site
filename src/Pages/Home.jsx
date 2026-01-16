import { motion } from "framer-motion";
import Hero from "../Components/Hero";
import PopularCourses from "../Components/PopularCourses";
import TopInstructors from "../Components/TopInstructors";
import WhyChooseUs from "../Components/WhyChooseUs";

const sectionVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const Home = () => {
  return (
    <div className="relative overflow-hidden">

    
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-base-100 via-base-200 to-base-100"></div>

      
      <div className="absolute -top-32 -left-32 w-80 h-80 bg-primary/20 rounded-full blur-2xl"></div>
      <div className="absolute top-1/3 -right-32 w-80 h-80 bg-secondary/20 rounded-full blur-2xl"></div>

      <div className="relative z-10">

        <Hero />

        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
        >
          <PopularCourses />
        </motion.section>

        <Divider />

        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
        >
          <TopInstructors />
        </motion.section>

        <Divider />

        <motion.section
          variants={sectionVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
        >
          <WhyChooseUs />
        </motion.section>

      </div>
    </div>
  );
};

const Divider = () => (
  <div className="max-w-7xl mx-auto px-6">
    <div className="h-px bg-base-300/60"></div>
  </div>
);

export default Home;
