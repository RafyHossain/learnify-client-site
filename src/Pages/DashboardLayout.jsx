import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaPlusCircle,
  FaLayerGroup,
  FaChartLine,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const linkStyle = ({ isActive }) =>
    `relative flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300
     ${
       isActive
         ? "bg-primary text-primary-content font-semibold shadow-md"
         : "text-base-content hover:bg-base-300"
     }`;

  return (
    <div className="min-h-screen flex bg-base-100">
      {/* SIDEBAR */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ duration: 0.25 }}
        className="bg-base-200 p-4 flex flex-col shadow-lg"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          {!collapsed && (
            <h2 className="text-xl font-bold text-primary">
              Dashboard
            </h2>
          )}

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="btn btn-sm btn-ghost"
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        {/* MENU */}
        <ul className="space-y-2 flex-1">
          <li>
            <NavLink
              to="/dashboard/enrolled-courses"
              className={linkStyle}
            >
              <FaBookOpen size={18} />
              {!collapsed && "My Enrolled Courses"}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/add-course"
              className={linkStyle}
            >
              <FaPlusCircle size={18} />
              {!collapsed && "Add Course"}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/my-courses"
              className={linkStyle}
            >
              <FaLayerGroup size={18} />
              {!collapsed && "My Added Courses"}
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/dashboard/analytics"
              className={linkStyle}
            >
              <FaChartLine size={18} />
              {!collapsed && "Analytics"}
            </NavLink>
          </li>
        </ul>

        {/* FOOTER */}
        {!collapsed && (
          <p className="text-xs text-center opacity-60">
            © Learnify Dashboard
          </p>
        )}
      </motion.aside>

      {/* CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
