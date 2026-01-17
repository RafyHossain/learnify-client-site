import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaUsers,
  FaChartLine,
  FaLayerGroup,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const Analytics = () => {
  const { user } = useContext(AuthContext);

  const [enrollments, setEnrollments] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (!user?.email) return;

    // student analytics
    axios
      .get(`https://learnify-server-omega.vercel.app/enroll/${user.email}`)
      .then((res) => setEnrollments(res.data));

    // instructor analytics
    axios
      .get(`https://learnify-server-omega.vercel.app/my-courses/${user.email}`)
      .then((res) => setMyCourses(res.data));
  }, [user?.email]);

  /* ================= DERIVED DATA ================= */

  const enrolledCount = enrollments.length;
  const addedCoursesCount = myCourses.length;

  const enrollmentChartData = enrollments.map((e, i) => ({
    name: `Course ${i + 1}`,
    enrolled: i + 1,
  }));

  const coursePriceChart = myCourses.map((c) => ({
    name: c.title.slice(0, 10),
    price: c.price,
  }));

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}
      <div>
         <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-4xl font-extrabold text-center mb-12
        bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
      >
        Analytics Overview
      </motion.h1>
        
        
      </div>

      {/* ================= STATS CARDS ================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

        <StatCard
          icon={<FaBookOpen />}
          title="Enrolled Courses"
          value={enrolledCount}
        />

        <StatCard
          icon={<FaLayerGroup />}
          title="Added Courses"
          value={addedCoursesCount}
        />

        
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/* STUDENT ENROLLMENT TIMELINE */}
        <div className="bg-base-200 p-6 rounded-2xl border">
          <h3 className="font-semibold mb-4">
            Enrollment Timeline
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={enrollmentChartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="enrolled"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* COURSE PRICE DISTRIBUTION */}
        <div className="bg-base-200 p-6 rounded-2xl border">
          <h3 className="font-semibold mb-4">
            Course Price Distribution
          </h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={coursePriceChart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="price" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
};

/* ================= STAT CARD ================= */
const StatCard = ({ icon, title, value }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        bg-base-200 rounded-2xl p-5
        border shadow-sm
        flex items-center gap-4
      "
    >
      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary text-white flex items-center justify-center text-xl">
        {icon}
      </div>
      <div>
        <p className="text-sm opacity-70">{title}</p>
        <h3 className="text-xl font-bold">{value}</h3>
      </div>
    </motion.div>
  );
};

export default Analytics;
