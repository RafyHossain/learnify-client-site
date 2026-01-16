import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import { motion } from "framer-motion";
import Loading from "./Loading";

const PopularCourses = () => {
  const [popularCourses, setPopularCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3000/courses").then((res) => {
      const featuredLatest = res.data
        .filter(course => course.isFeatured === true)   // ✅ only featured
        .sort(
          (a, b) =>
            new Date(b.createdAt) - new Date(a.createdAt)
        )                                               // ✅ latest first
        .slice(0, 6);                                   // ✅ top 6

      setPopularCourses(featuredLatest);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loading />;

  return (
    <section className="py-20 bg-base-100">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-center mb-12"
        >
          Featured Courses
        </motion.h2>

        {/* GRID */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {popularCourses.map(course => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCourses;
