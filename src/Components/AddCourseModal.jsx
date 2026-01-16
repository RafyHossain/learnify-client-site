import { motion } from "framer-motion";
import { FaTimes, FaImage, FaUser } from "react-icons/fa";
import { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../Context/AuthProvider";

const AddCourseModal = ({ onAdded }) => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    const course = {
      title: form.title.value,
      image: form.image.value,
      price: Number(form.price.value),
      duration: form.duration.value,
      category: form.category.value,
      description: form.description.value,
      isFeatured: form.isFeatured.checked,

      //  AUTO-FILLED FROM FIREBASE
      instructor: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
      },
    };

    try {
      await axios.post("http://localhost:3000/courses", course);
      toast.success("Course added successfully ✅");

      form.reset();
      onAdded && onAdded();
      document.getElementById("addCourseModal").close();
    } catch {
      toast.error("Failed to add course ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="addCourseModal" className="modal">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="
          modal-box max-w-3xl
          bg-base-100/90 backdrop-blur-xl
          border border-base-300
          rounded-3xl shadow-2xl
        "
      >
        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl  font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Add New Course
          </h3>

          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost"
            onClick={() =>
              document.getElementById("addCourseModal").close()
            }
          >
            <FaTimes />
          </button>
        </div>

        {/* ===== FORM ===== */}
        <form
          onSubmit={handleAddCourse}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >

          {/* ================= INSTRUCTOR INFO (AUTO-FILL) ================= */}
          <div className="col-span-2 bg-base-200/60 p-4 rounded-xl flex items-center gap-4">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Instructor"
                className="w-14 h-14 rounded-full object-cover border"
              />
            ) : (
              <div className="w-14 h-14 rounded-full border flex items-center justify-center">
                <FaUser />
              </div>
            )}

            <div>
              <p className="font-semibold">{user?.displayName}</p>
              <p className="text-sm text-base-content/70">{user?.email}</p>
            </div>
          </div>

          {/* TITLE */}
          <div className="col-span-2">
            <input
              name="title"
              placeholder="Course Title"
              className="input input-bordered w-full rounded-xl"
              required
            />
          </div>

          {/* IMAGE */}
          <div className="relative col-span-2">
            <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
            <input
              name="image"
              placeholder="Course Image URL"
              className="input input-bordered w-full pl-11 rounded-xl"
              required
            />
          </div>

          {/* PRICE */}
          <input
            name="price"
            type="number"
            placeholder="Price"
            className="input input-bordered rounded-xl"
            required
          />

          {/* DURATION */}
          <input
            name="duration"
            placeholder="Duration (e.g. 12h)"
            className="input input-bordered rounded-xl"
          />

          {/* CATEGORY */}
          <select
            name="category"
            className="select select-bordered rounded-xl"
          >
            <option>Web Development</option>
            <option>Frontend Development</option>
            <option>Backend Development</option>
            <option>Database</option>
            <option>DevOps</option>
          </select>

          {/* FEATURED */}
          <label className="flex items-center gap-3 text-sm font-medium">
            <input
              type="checkbox"
              name="isFeatured"
              className="checkbox checkbox-primary"
            />
            Featured Course
          </label>

          {/* DESCRIPTION */}
          <div className="col-span-2">
            <textarea
              name="description"
              placeholder="Course Description"
              className="textarea textarea-bordered w-full rounded-xl"
              rows={3}
            />
          </div>

          {/* SUBMIT */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={loading}
            className="
              col-span-2 py-3 rounded-xl
              font-semibold text-white
              bg-gradient-to-r from-primary via-secondary to-primary
              shadow-lg hover:shadow-2xl
              transition-all
            "
          >
            {loading ? "Adding Course..." : "Add Course"}
          </motion.button>
        </form>
      </motion.div>
    </dialog>
  );
};

export default AddCourseModal;
