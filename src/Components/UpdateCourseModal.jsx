import { motion } from "framer-motion";
import { FaTimes, FaSave } from "react-icons/fa";
import { useState } from "react";
import axiosPublic from "../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const UpdateCourseModal = ({ course, onClose, onUpdate }) => {
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const updatedData = {
      title: form.title.value,
      price: Number(form.price.value),
      duration: form.duration.value,
      category: form.category.value,
      description: form.description.value,
      // ❌ image intentionally excluded
    };

    try {
      await axiosPublic.put(`/courses/${course._id}`, updatedData);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Course updated successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      onUpdate({ ...course, ...updatedData }); // 🔥 instant UI update
      onClose();
    } catch {
      Swal.fire("Error", "Failed to update course", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="
          bg-base-100 w-full max-w-2xl
          rounded-3xl shadow-2xl p-6
          border border-base-300
        "
      >
        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Update Course
          </h3>

          <button
            onClick={onClose}
            className="btn btn-sm btn-circle btn-ghost"
          >
            <FaTimes />
          </button>
        </div>

        {/* ===== FORM ===== */}
        <form
          onSubmit={handleUpdate}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* TITLE */}
          <input
            name="title"
            defaultValue={course.title}
            className="input input-bordered w-full col-span-2 rounded-xl"
            placeholder="Course Title"
            required
          />

          {/* PRICE */}
          <input
            name="price"
            type="number"
            defaultValue={course.price}
            className="input input-bordered w-full rounded-xl"
            placeholder="Price"
            required
          />

          {/* DURATION */}
          <input
            name="duration"
            defaultValue={course.duration}
            className="input input-bordered w-full rounded-xl"
            placeholder="Duration"
          />

          {/* CATEGORY */}
          <select
            name="category"
            defaultValue={course.category}
            className="select select-bordered w-full rounded-xl"
          >
            <option>Web Development</option>
            <option>Frontend Development</option>
            <option>Backend Development</option>
            <option>Database</option>
            <option>DevOps</option>
          </select>

          {/* DESCRIPTION */}
          <textarea
            name="description"
            defaultValue={course.description}
            className="textarea textarea-bordered w-full col-span-2 rounded-xl"
            rows={3}
            placeholder="Course Description"
          />

          {/* ===== ACTION BUTTONS ===== */}
          <div className="col-span-2 flex justify-end gap-3 pt-4">
            {/* CANCEL */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={onClose}
              className="
                px-5 py-2 rounded-xl
                text-sm font-medium
                border border-base-300
                hover:bg-base-200
                transition-all
              "
            >
              Cancel
            </motion.button>

            {/* SAVE */}
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.96 }}
              disabled={loading}
              className="
                flex items-center gap-2
                px-6 py-2 rounded-xl
                text-sm font-semibold text-white
                bg-gradient-to-r from-primary to-secondary
                shadow-md hover:shadow-xl
                transition-all
              "
            >
              <FaSave />
              {loading ? "Updating..." : "Save Changes"}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default UpdateCourseModal;
