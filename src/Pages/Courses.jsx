import { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "../Components/CourseCard";
import { FaSearch } from "react-icons/fa";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // filter states
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [priceType, setPriceType] = useState("all");

  useEffect(() => {
    axios.get("http://localhost:3000/courses").then(res => {
      setCourses(res.data);
      setFilteredCourses(res.data);
      setLoading(false);
    });
  }, []);

  /* ================= FILTER LOGIC ================= */
  useEffect(() => {
    let data = [...courses];

    // search by title
    if (search) {
      data = data.filter(course =>
        course.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // category filter
    if (category !== "all") {
      data = data.filter(course => course.category === category);
    }

    // price filter
    if (priceType === "free") {
      data = data.filter(course => course.price === 0);
    }
    if (priceType === "paid") {
      data = data.filter(course => course.price > 0);
    }

    setFilteredCourses(data);
  }, [search, category, priceType, courses]);

  if (loading) {
    return (
      <div className="flex justify-center mt-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* HEADER */}
      <h1 className="text-3xl font-bold mb-8 text-center">
        All Courses
      </h1>

      {/* FILTER BAR */}
      <div className="bg-base-200 p-4 rounded-xl mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* SEARCH */}
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute left-3 top-3 opacity-50" />
          <input
            type="text"
            placeholder="Search course..."
            className="input input-bordered w-full pl-10"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* CATEGORY */}
        <select
          className="select select-bordered w-full md:w-1/4"
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

        {/* PRICE */}
        <select
          className="select select-bordered w-full md:w-1/4"
          value={priceType}
          onChange={(e) => setPriceType(e.target.value)}
        >
          <option value="all">All Prices</option>
          <option value="free">Free</option>
          <option value="paid">Paid</option>
        </select>
      </div>

      {/* COURSE GRID */}
      {filteredCourses.length === 0 ? (
        <p className="text-center opacity-60">
          No courses found.
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCourses.map(course => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Courses;
