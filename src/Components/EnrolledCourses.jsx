import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";
import { FaTrash, FaArrowRight, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const EnrolledCourses = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://learnify-server-omega.vercel.app/enroll/${user.email}`)
      .then(res => setEnrollments(res.data));

    axios
      .get("https://learnify-server-omega.vercel.app/courses")
      .then(res => setCourses(res.data));
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Unenroll from course?",
      text: "You will lose access to this course.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Unenroll",
      confirmButtonColor: "#ef4444",
    }).then(result => {
      if (result.isConfirmed) {
        axios.delete(`https://learnify-server-omega.vercel.app/enroll/${id}`).then(() => {
          setEnrollments(enrollments.filter(e => e._id !== id));
          Swal.fire("Removed!", "Enrollment deleted.", "success");
        });
      }
    });
  };

  const enrolledCourses = enrollments.map(enroll => ({
    ...enroll,
    course: courses.find(c => c._id === enroll.courseId),
  }));

  return (
    <div className="p-6">

      {/* ===== HEADER BAR ===== */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        
         <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-center mb-12
        bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
      >
        Enrolled Courses ({enrolledCourses.length})
      </motion.h1>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/courses")}
          className="
            flex items-center gap-2
            px-5 py-2 rounded-xl
            text-sm font-medium text-white
            bg-gradient-to-r from-primary to-secondary
            shadow-md hover:shadow-xl
            transition-all
          "
        >
          Enroll More Course
        </motion.button>
      </div>

      {/* ===== TABLE ===== */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="overflow-x-auto bg-base-100/80 backdrop-blur rounded-2xl shadow-lg border"
      >
        <table className="table">
          <thead className="bg-base-200 text-sm">
            <tr>
              <th>#</th>
              <th>Course</th>
              <th>Price</th>
              <th>Enrolled Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {enrolledCourses.map((item, index) => (
              <motion.tr
                key={item._id}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
              >
                <td className="font-medium">{index + 1}</td>

                <td className="font-semibold">
                  {item.course?.title || "Course removed"}
                </td>

                <td className="text-primary font-semibold">
                  ${item.course?.price ?? "--"}
                </td>

                <td className="text-sm opacity-70">
                  {new Date(item.enrolledAt).toLocaleDateString()}
                </td>

                {/* ACTIONS */}
                <td>
                  <div className="flex justify-center items-center gap-3">

                    {/* VIEW */}
                    <button
                      onClick={() =>
                        navigate(`/courses/${item.course?._id}`)
                      }
                      className="
                        flex items-center justify-center
                        w-9 h-9 rounded-full
                        bg-primary/10 text-primary
                        hover:bg-primary hover:text-white
                        transition-all
                      "
                      title="View Course"
                    >
                      <FaEye />
                    </button>

                    {/* UNENROLL */}
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="
                        flex items-center justify-center
                        w-9 h-9 rounded-full
                        bg-red-500/10 text-red-500
                        hover:bg-red-500 hover:text-white
                        transition-all
                      "
                      title="Unenroll"
                    >
                      <FaTrash />
                    </button>

                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>

        {enrolledCourses.length === 0 && (
          <div className="p-10 text-center opacity-60">
            <p className="text-lg font-medium">
              You are not enrolled in any course yet.
            </p>
            <p className="text-sm mt-1">
              Click <b>Enroll More</b> to start learning
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default EnrolledCourses;
