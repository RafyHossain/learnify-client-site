import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaLaptopCode, FaCertificate, FaUsers } from "react-icons/fa";

const features = [
  {
    icon: <FaLaptopCode />,
    title: "Industry Relevant Courses",
    desc: "Learn skills that match real-world industry demands and job markets."
  },
  {
    icon: <FaChalkboardTeacher />,
    title: "Expert Instructors",
    desc: "Courses are taught by experienced professionals and educators."
  },
  {
    icon: <FaCertificate />,
    title: "Certified Learning",
    desc: "Receive certificates that add value to your professional career."
  },
  {
    icon: <FaUsers />,
    title: "Growing Community",
    desc: "Join thousands of learners growing together every day."
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        

         <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-center mb-12
        bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
      >
         Why Choose Learnify
      </motion.h1>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="
                bg-base-100 rounded-2xl p-6
                shadow-md hover:shadow-xl
                transition-all text-center
              "
            >
              <div className="
                w-14 h-14 mx-auto mb-4
                rounded-xl flex items-center justify-center
                bg-gradient-to-r from-primary to-secondary
                text-white text-2xl
              ">
                {item.icon}
              </div>

              <h3 className="font-semibold text-lg mb-2">
                {item.title}
              </h3>

              <p className="text-sm text-base-content/70">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
