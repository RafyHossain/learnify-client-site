import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthProvider";
import { Link } from "react-router-dom";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);

  const fetchMyCourses = () => {
    axios
      .get(`http://localhost:3000/my-courses/${user.email}`)
      .then((res) => setCourses(res.data));
  };

  useEffect(() => {
    if (!user?.email) return;
    fetchMyCourses();
  }, [user?.email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete Course?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Yes, Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:3000/courses/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Course removed successfully.", "success");
            fetchMyCourses(); // ✅ AUTO UPDATE
          });
      }
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">My Added Courses</h2>

      {courses.length === 0 ? (
        <p className="text-center opacity-60">
          You haven’t added any course yet.
        </p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-x-auto bg-base-100 rounded-2xl shadow-lg border"
        >
          <table className="table">
            <thead className="bg-base-200">
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Price</th>
                <th>Category</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course, index) => (
                <tr key={course._id}>
                  <td>{index + 1}</td>
                  <td className="font-semibold">{course.title}</td>
                  <td className="text-primary font-semibold">${course.price}</td>
                  <td>{course.category}</td>
                  <td className="flex justify-center gap-3">
                    <Link
                      to={`/courses/${course._id}`}
                      className="btn btn-sm btn-outline"
                    >
                      <FaEye />
                    </Link>

                    <Link
                      to={`/dashboard/update-course/${course._id}`}
                      className="btn btn-sm btn-info text-white"
                    >
                      <FaEdit />
                    </Link>

                    <button
                      onClick={() => handleDelete(course._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
};

export default MyCourses;
