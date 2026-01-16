import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";
import { motion } from "framer-motion";
import { toast } from "react-hot-toast";

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [course, setCourse] = useState(null);
  const [isEnrolled, setIsEnrolled] = useState(false);

  /* always open from top */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

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
      <div className="flex justify-center mt-24">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-base-100 rounded-3xl shadow-2xl overflow-hidden border"
      >
        {/* ================= IMAGE ================= */}
        <div className="h-[380px] w-full  overflow-hidden rounded-3xl">
  <img
    src={course.image}
    alt={course.title}
    className="w-full h-full  object-cover"
  />
</div>


        {/* ================= CONTENT ================= */}
        <div className="p-8 md:p-10 space-y-10">

          {/* TITLE */}
          <h1 className="text-3xl md:text-4xl font-bold">
            {course.title}
          </h1>

          {/* DETAILS */}
          <div className="grid sm:grid-cols-2 gap-6 text-base">

            <p><b>Category :</b> {course.category}</p>

            <p><b>Duration :</b> {course.duration || "N/A"}</p>

            <p>
              <b>Instructor :</b>{" "}
              {course.instructor?.name || "Unknown"}
            </p>

            <p>
              <b>Price :</b>{" "}
              <span className="text-primary font-semibold">
                ${course.price}
              </span>
            </p>

            <p>
              <b>Total Enrolled :</b> {course.enrolledCount}
            </p>

            <p>
              <b>Rating :</b> ⭐ {course.rating || 4.5}
            </p>

            <p className="sm:col-span-2">
              <b>Published Date :</b>{" "}
              {new Date(course.createdAt).toLocaleDateString()}
            </p>
          </div>

          {/* DESCRIPTION */}
          <div className="space-y-3">
            <h2 className="text-xl font-semibold">
              Description
            </h2>
            <p className="leading-relaxed text-base-content/80">
              {course.description}
            </p>
          </div>

          {/* ACTION */}
          <div className="flex justify-end pt-6 border-t">
            <motion.button
              whileHover={!isEnrolled ? { scale: 1.05 } : {}}
              whileTap={!isEnrolled ? { scale: 0.95 } : {}}
              disabled={isEnrolled}
              onClick={handleEnroll}
              className={`
                px-8 py-3 rounded-xl font-semibold transition-all
                ${
                  isEnrolled
                    ? "bg-base-300 cursor-not-allowed"
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
