import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../Components/CourseCard";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";
import { motion } from "framer-motion";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("default");

  /* ===== FETCH COURSES ===== */
  useEffect(() => {
    axios.get("http://localhost:3000/courses").then((res) => {
      setCourses(res.data);
      setFilteredCourses(res.data);
    });
  }, []);

  /* ===== FILTER + SORT LOGIC ===== */
  useEffect(() => {
    let data = [...courses];

    // SEARCH
    if (search) {
      data = data.filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // CATEGORY
    if (category !== "all") {
      data = data.filter((course) => course.category === category);
    }

    //  SORT
    if (sort === "priceLow") {
      data.sort((a, b) => a.price - b.price);
    }
    if (sort === "priceHigh") {
      data.sort((a, b) => b.price - a.price);
    }
    if (sort === "popular") {
      data.sort((a, b) => b.enrolledCount - a.enrolledCount);
    }

    setFilteredCourses(data);
  }, [search, category, sort, courses]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      {/* ===== TITLE ===== */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-center mb-12
        bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
      >
        Explore All Courses
      </motion.h1>

      {/* ===== FILTER BAR ===== */}
      
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
  className="
    flex flex-col lg:flex-row
    items-stretch lg:items-center
    justify-between gap-4
    mb-12
  "
>
  {/*  SEARCH (LEFT) */}
  <div className="relative w-full lg:w-[45%]">
    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
    <input
      className="
        input input-bordered w-full pl-11 rounded-xl
        bg-base-100
        focus:outline-none focus:ring-2 focus:ring-primary/40
        transition-all
      "
      placeholder="Search courses..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  </div>

  {/* RIGHT SIDE CONTROLS */}
  <div className="flex gap-3 w-full lg:w-auto">

    {/*  CATEGORY */}
    <div className="relative w-full lg:w-56">
      <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
      <select
        className="
          select select-bordered w-full pl-11 rounded-xl
          bg-base-100
          focus:outline-none focus:ring-2 focus:ring-primary/40
          transition-all
        "
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="all">All Categories</option>
        <option value="Web Development">Web Development</option>
        <option value="Frontend Development">Frontend Development</option>
        <option value="Backend Development">Backend Development</option>
        <option value="Database">Database</option>
        <option value="DevOps">DevOps</option>
      </select>
    </div>

    {/* SORT */}
    <div className="relative w-full lg:w-56">
      <FaSortAmountDown className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
      <select
        className="
          select select-bordered w-full pl-11 rounded-xl
          bg-base-100
          focus:outline-none focus:ring-2 focus:ring-primary/40
          transition-all
        "
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="default">Sort</option>
        <option value="popular">Most Popular</option>
        <option value="priceLow">Price: Low → High</option>
        <option value="priceHigh">Price: High → Low</option>
      </select>
    </div>

  </div>
</motion.div>




      {/* ===== COURSES GRID ===== */}
      {filteredCourses.length === 0 ? (
        <p className="text-center opacity-60 text-lg">
          No courses found
        </p>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 },
            },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {filteredCourses.map((course) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <CourseCard course={course} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default Courses;
