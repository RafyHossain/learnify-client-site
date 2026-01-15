import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";
import { FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import Swal from "sweetalert2";

const EnrolledCourses = () => {
  const { user } = useContext(AuthContext);
  const [enrollments, setEnrollments] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`http://localhost:3000/enroll/${user.email}`)
      .then(res => setEnrollments(res.data));

    axios
      .get("http://localhost:3000/courses")
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
        axios.delete(`http://localhost:3000/enroll/${id}`).then(() => {
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
      <h2 className="text-2xl font-bold mb-6">
        My Enrolled Courses
      </h2>

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
              <th className="text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {enrolledCourses.map((item, index) => (
              <motion.tr
                key={item._id}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
                transition={{ duration: 0.2 }}
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

                <td className="text-center">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="
                      inline-flex items-center justify-center
                      w-9 h-9 rounded-full
                      bg-red-500/10 text-red-500
                      hover:bg-red-500 hover:text-white
                      transition-all
                    "
                  >
                    <FaTrash />
                  </button>
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
              Explore courses and start learning 🚀
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default EnrolledCourses;
