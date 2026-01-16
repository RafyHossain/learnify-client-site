import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import axiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import Loading from "./Loading";
import UpdateCourseModal from "./UpdateCourseModal";
import AddCourseModal from "./AddCourseModal";
import { FaTrash, FaEdit, FaArrowRight, FaEye } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);

  /* ================= FETCH ================= */
  const fetchMyCourses = async () => {
    if (!user?.email) return;
    setLoading(true);
    const res = await axiosPublic.get(`/my-courses/${user.email}`);
    setCourses(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMyCourses();
  }, [user?.email]);

  /* ================= DELETE ================= */
  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete this course?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete",
      confirmButtonColor: "#ef4444",
    }).then((res) => {
      if (res.isConfirmed) {
        axiosPublic.delete(`/courses/${id}`).then(() => {
          setCourses(courses.filter((c) => c._id !== id));
          Swal.fire("Deleted!", "Course removed successfully.", "success");
        });
      }
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="p-6">

      {/* ================= HEADER ================= */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h2 className="text-2xl font-bold">
          My Added Courses ({courses.length})
        </h2>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            document.getElementById("addCourseModal").showModal()
          }
          className="
            flex items-center gap-2
            px-5 py-2 rounded-xl
            text-sm font-medium text-white
            bg-gradient-to-r from-primary to-secondary
            shadow-md hover:shadow-xl
            transition-all
          "
        >
          Add New Course <FaArrowRight className="text-xs" />
        </motion.button>
      </div>

      {/* ================= TABLE ================= */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="
          overflow-x-auto
          bg-base-100/80 backdrop-blur
          rounded-2xl shadow-lg border
        "
      >
        <table className="table">
          <thead className="bg-base-200 text-sm">
            <tr>
              <th>#</th>
              <th>Course Title</th>
              <th>Category</th>
              <th>Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => (
              <motion.tr
                key={course._id}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.03)" }}
              >
                <td className="font-medium">{index + 1}</td>

                <td className="font-semibold">
                  {course.title}
                </td>

                <td className="text-sm opacity-80">
                  {course.category}
                </td>

                <td className="text-primary font-semibold">
                  ${course.price}
                </td>

                <td>
  <div className="flex items-center justify-center gap-3">

    {/* VIEW */}
    <button
      onClick={() => navigate(`/courses/${course._id}`)}
      className="
        flex items-center justify-center
        w-9 h-9 rounded-full
        bg-primary/10 text-primary
        hover:bg-primary hover:text-white
        transition-all duration-200
      "
      title="View"
    >
      <FaEye />
    </button>

    {/* UPDATE */}
    <button
      onClick={() => setSelectedCourse(course)}
      className="
        flex items-center justify-center
        w-9 h-9 rounded-full
        bg-blue-500/10 text-blue-500
        hover:bg-blue-500 hover:text-white
        transition-all duration-200
      "
      title="Edit"
    >
      <FaEdit />
    </button>

    {/* DELETE */}
    <button
      onClick={() => handleDelete(course._id)}
      className="
        flex items-center justify-center
        w-9 h-9 rounded-full
        bg-red-500/10 text-red-500
        hover:bg-red-500 hover:text-white
        transition-all duration-200
      "
      title="Delete"
    >
      <FaTrash />
    </button>

  </div>
</td>

              </motion.tr>
            ))}
          </tbody>
        </table>

        {courses.length === 0 && (
          <div className="p-10 text-center opacity-60">
            <p className="text-lg font-medium">
              You haven't added any course yet.
            </p>
            <p className="text-sm mt-1">
              Click <b>Add New Course</b> to get started
            </p>
          </div>
        )}
      </motion.div>

      {/* ================= MODALS ================= */}
      <AddCourseModal onAdded={fetchMyCourses} />

      {selectedCourse && (
        <UpdateCourseModal
          course={selectedCourse}
          onClose={() => setSelectedCourse(null)}
          onUpdate={(updated) =>
            setCourses(
              courses.map((c) =>
                c._id === updated._id ? updated : c
              )
            )
          }
        />
      )}
    </div>
  );
};

export default MyCourses;
