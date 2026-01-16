import { Link } from "react-router-dom";
import { FaStar, FaUserGraduate } from "react-icons/fa";
import { motion } from "framer-motion";

const CourseCard = ({ course }) => {
  const {
    _id,
    title,
    image,
    price,
    discountPrice,
    rating,
    enrolledCount,
    category,
  } = course;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25 }}
      className="
        bg-base-100 rounded-3xl overflow-hidden
        border border-base-200
        shadow-sm hover:shadow-2xl
        transition-all
        flex flex-col
      "
    >
      {/* ================= IMAGE ================= */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="
            w-full h-full object-cover
            transition-transform duration-500
            group-hover:scale-110
          "
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Category Badge */}
        <span
          className="
            absolute top-4 left-4
            px-3 py-1 rounded-full
            text-xs font-semibold
            bg-primary text-white
          "
        >
          {category}
        </span>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="p-5 flex flex-col flex-grow">
        {/* TITLE */}
        <h2 className="text-lg font-semibold leading-snug line-clamp-2 mb-3">
          {title}
        </h2>

        {/* META */}
        <div className="flex items-center justify-between text-sm opacity-70 mb-4">
          <span className="flex items-center gap-1">
            <FaStar className="text-warning" />
            {rating || 4.5}
          </span>

          <span className="flex items-center gap-1">
            <FaUserGraduate />
            {enrolledCount || 0} students
          </span>
        </div>

        {/* PRICE */}
        <div className="flex items-center gap-2 mb-5">
          <span className="text-xl font-bold text-primary">
            ${discountPrice || price}
          </span>

          {discountPrice && (
            <span className="line-through text-sm opacity-50">
              ${price}
            </span>
          )}
        </div>

        {/* ================= BUTTON  ================= */}
        <Link
          to={`/courses/${_id}`}
          className="
            mt-auto
            inline-flex items-center justify-center
            w-full py-2.5 rounded-xl
            font-medium text-white
            bg-gradient-to-r from-primary to-secondary
            shadow-md hover:shadow-xl
            transition-all
          "
        >
          View Details
        </Link>
      </div>
    </motion.div>
  );
};

export default CourseCard;
