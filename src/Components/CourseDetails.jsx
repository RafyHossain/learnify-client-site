import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../Context/AuthProvider";
import { motion } from "framer-motion";
import { FaClock, FaTag, FaUser } from "react-icons/fa";

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:3000/courses/${id}`).then(res => {
      setCourse(res.data);
    });

    if (user?.email) {
      axios
        .get(`http://localhost:3000/enroll/${user.email}`)
        .then(res => {
          const enrolled = res.data.find(e => e.courseId === id);
          if (enrolled) setIsEnrolled(true);
        });
    }
  }, [id, user?.email]);

  const handleEnroll = async () => {
    await axios.post("http://localhost:3000/enroll", {
      courseId: course._id,
      studentEmail: user.email,
    });

    toast.success("Enrolled successfully 🎉");
    setIsEnrolled(true);
  };

  if (!course) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-base-100 rounded-2xl shadow-xl overflow-hidden"
      >
        {/* IMAGE */}
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-[380px] object-cover"
        />

        {/* CONTENT */}
        <div className="p-8 space-y-6">

          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl font-bold">
            {course.title}
          </h1>

          {/* META */}
          <div className="flex flex-wrap items-center gap-6 text-sm opacity-80">
            {course.category && (
              <span className="flex items-center gap-2">
                <FaTag className="text-primary" />
                {course.category}
              </span>
            )}

            {course.duration && (
              <span className="flex items-center gap-2">
                <FaClock className="text-primary" />
                {course.duration}
              </span>
            )}

            {/* ✅ INSTRUCTOR */}
            {course.instructor?.name && (
              <span className="flex items-center gap-2">
                <FaUser className="text-primary" />
                {course.instructor.name}
              </span>
            )}
          </div>

          {/* DESCRIPTION */}
          <p className="leading-relaxed text-base-content/80">
            {course.description}
          </p>

          {/* PRICE + ACTION */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-4 border-t">
            <p className="text-3xl font-bold text-primary">
              ${course.price}
            </p>

            <motion.button
              whileHover={!isEnrolled ? { scale: 1.05 } : {}}
              whileTap={!isEnrolled ? { scale: 0.95 } : {}}
              disabled={isEnrolled}
              onClick={handleEnroll}
              className={`
                px-8 py-3 rounded-xl text-sm font-semibold transition-all
                ${
                  isEnrolled
                    ? "bg-base-300 text-base-content cursor-not-allowed"
                    : "bg-gradient-to-r from-primary to-secondary text-white shadow-lg hover:shadow-xl"
                }
              `}
            >
              {isEnrolled ? "Already Enrolled" : "Enroll Now"}
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseDetails;
