import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import { motion } from "framer-motion";
import Loading from "./Loading";

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const PopularCourses = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("https://learnify-server-omega.vercel.app/courses").then((res) => {
      const featuredLatest = res.data
        .filter(course => course.isFeatured === true)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);

      setPopularCourses(featuredLatest);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">

        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold text-center mb-12
          bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Featured Courses
        </motion.h1>

        {/* GRID WITH STAGGER */}
        <motion.div
          variants={containerVariant}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-120px" }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {popularCourses.map(course => (
            <motion.div
              key={course._id}
              variants={cardVariant}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default PopularCourses;
