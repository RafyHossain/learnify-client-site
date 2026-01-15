import { Link } from "react-router-dom";
import { FaStar, FaUserGraduate } from "react-icons/fa";
import { motion } from "framer-motion";

const CourseCard = ({ course }) => {
  const {
    _id,
    title,
    thumbnail,
    price,
    discountPrice,
    rating,
    enrolledCount,
    category,
  } = course;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="group bg-base-100 rounded-2xl overflow-hidden border shadow-sm hover:shadow-2xl transition-all"
    >
      {/* IMAGE */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />

        {/* CATEGORY BADGE */}
        <span className="absolute top-3 left-3 badge badge-primary">
          {category}
        </span>
      </div>

      {/* BODY */}
      <div className="p-5 space-y-3">
        {/* TITLE */}
        <h2 className="text-lg font-semibold leading-snug line-clamp-2">
          {title}
        </h2>

        {/* RATING */}
        <div className="flex items-center gap-4 text-sm opacity-80">
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
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">
            ${discountPrice || price}
          </span>

          {discountPrice && (
            <span className="line-through text-sm opacity-50">
              ${price}
            </span>
          )}
        </div>

        {/* MODERN BUTTON */}
        <Link
          to={`/courses/${_id}`}
          className="
            inline-flex items-center justify-center w-full
            py-2.5 rounded-xl font-medium
            bg-gradient-to-r from-primary to-secondary
            text-white
            hover:opacity-90
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
