import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../Components/CourseCard";
import { FaSearch, FaFilter } from "react-icons/fa";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  /* ===== FETCH COURSES ===== */
  useEffect(() => {
    axios.get("http://localhost:3000/courses").then((res) => {
      setCourses(res.data);
      setFilteredCourses(res.data);
    });
  }, []);

  /* ===== FILTER LOGIC ===== */
  useEffect(() => {
    let data = [...courses];

    // 🔍 search
    if (search) {
      data = data.filter((course) =>
        course.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🗂️ category
    if (category !== "all") {
      data = data.filter((course) => course.category === category);
    }

    setFilteredCourses(data);
  }, [search, category, courses]);

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* ===== TITLE ===== */}
      <h1 className="text-3xl font-bold mb-8 text-center">
        All Courses
      </h1>

      {/* ===== FILTER BAR ===== */}
      <div className="
        bg-base-200/70 backdrop-blur
        p-4 rounded-2xl mb-10
        flex flex-col md:flex-row gap-4 items-center justify-between
      ">
        {/* SEARCH */}
        <div className="relative w-full md:w-1/2">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
          <input
            className="input input-bordered w-full pl-11 rounded-xl"
            placeholder="Search course..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* CATEGORY */}
        <div className="relative w-full md:w-1/3">
          <FaFilter className="absolute left-4 top-1/2 -translate-y-1/2 opacity-50" />
          <select
            className="select select-bordered w-full pl-11 rounded-xl"
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
      </div>

      {/* ===== COURSES GRID ===== */}
      {filteredCourses.length === 0 ? (
        <p className="text-center opacity-60 text-lg">
          No courses found
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
