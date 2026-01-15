import { motion } from "framer-motion";
import { FaTimes, FaImage } from "react-icons/fa";
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
      thumbnail: form.thumbnail.value,
      price: Number(form.price.value),
      duration: form.duration.value,
      category: form.category.value,
      description: form.description.value,
      isFeatured: form.isFeatured.checked,
      instructor: {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
      },
    };

    try {
      await axios.post("http://localhost:3000/courses", course);

      toast.success("Course added successfully ✅");

      form.reset();
      onAdded && onAdded();
      document.getElementById("addCourseModal").close();
    } catch (error) {
      toast.error("Failed to add course ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <dialog id="addCourseModal" className="modal">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="
          modal-box max-w-3xl
          bg-base-100/90 backdrop-blur-xl
          border border-base-300
          rounded-3xl shadow-2xl
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
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

        {/* FORM */}
        <form
          onSubmit={handleAddCourse}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {/* TITLE */}
          <input
            name="title"
            placeholder="Course Title"
            className="input input-bordered w-full col-span-2 rounded-xl"
            required
          />

          {/* IMAGE URL */}
          <div className="relative col-span-2">
            <FaImage className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40" />
            <input
              name="thumbnail"
              placeholder="Thumbnail Image URL"
              className="input input-bordered w-full pl-11 rounded-xl"
              required
            />
          </div>

          {/* PRICE */}
          <input
            name="price"
            type="number"
            placeholder="Price"
            className="input input-bordered w-full rounded-xl"
            required
          />

          {/* DURATION */}
          <input
            name="duration"
            placeholder="Duration (e.g. 12h 30m)"
            className="input input-bordered w-full rounded-xl"
          />

          {/* CATEGORY */}
          <select
            name="category"
            className="select select-bordered w-full rounded-xl"
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
          <textarea
            name="description"
            placeholder="Course Description"
            className="textarea textarea-bordered w-full col-span-2 rounded-xl"
            rows={3}
          />

          {/* INSTRUCTOR INFO */}
          <div className="bg-base-200/70 backdrop-blur-md p-4 rounded-2xl col-span-2 text-sm border border-base-300">
            <p>
              <span className="font-semibold">Instructor:</span>{" "}
              {user?.displayName}
            </p>
            <p className="text-base-content/70">
              <span className="font-semibold">Email:</span>{" "}
              {user?.email}
            </p>
          </div>

          {/* 🔥 GRADIENT SUBMIT BUTTON */}
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="
              col-span-2 py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-primary via-secondary to-primary
              bg-[length:200%_200%]
              
              shadow-lg hover:shadow-2xl
              transition-all 
            "
            disabled={loading}
          >
            {loading ? "Adding Course..." : "Add Course"}
          </motion.button>
        </form>
      </motion.div>
    </dialog>
  );
};

export default AddCourseModal;
