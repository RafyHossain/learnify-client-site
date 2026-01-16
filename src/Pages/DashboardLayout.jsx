import { useContext, useState } from "react";
import {
  NavLink,
  Outlet,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBookOpen,
  FaPlusCircle,
  FaLayerGroup,
  FaChartLine,
  FaChevronLeft,
  FaChevronRight,
  FaHome,
} from "react-icons/fa";
import AddCourseModal from "../Components/AddCourseModal";
import { AuthContext } from "../Context/AuthProvider";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user} = useContext(AuthContext);

  const openModal = () => {
    document.getElementById("addCourseModal").showModal();
  };

  const baseStyle =
    "relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all";

  const inactiveStyle =
    "text-base-content/70 hover:bg-base-300";

  const activeStyle =
    "text-primary-content font-semibold";

  return (
    <div className="min-h-screen flex bg-base-100">
      {/* ================= SIDEBAR ================= */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 260 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="bg-base-200/80 backdrop-blur-xl p-4 flex flex-col border-r border-base-300 shadow-lg"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-6">
         {!collapsed && (
  <div>
    <h2 className="text-xl text-center font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
      My Dashboard
    </h2>

    <p className="text-sm text-center mt-1 text-base-content opacity-70">
      {user?.displayName}
    </p>
  </div>
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

          {/* BACK TO HOME */}
          <li>
            <button
              onClick={() => navigate("/")}
              className={`${baseStyle} ${inactiveStyle} w-full`}
            >
              <FaHome />
              {!collapsed && "Back to Home"}
            </button>
          </li>

          {/* MY ENROLLED COURSES (DEFAULT ACTIVE) */}
          <li>
            <NavLink
              to="/dashboard/enrolled-courses"
              className={() =>
                `${baseStyle} ${
                  location.pathname === "/dashboard" ||
                  location.pathname === "/dashboard/enrolled-courses"
                    ? activeStyle
                    : inactiveStyle
                }`
              }
            >
              {(location.pathname === "/dashboard" ||
                location.pathname === "/dashboard/enrolled-courses") && (
                <motion.span
                  layoutId="dashboard-active"
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}

              <FaBookOpen />
              {!collapsed && "My Enrolled Courses"}
            </NavLink>
          </li>

          {/* ADD COURSE (MODAL ONLY) */}
          <li>
            <button
              onClick={openModal}
              className={`${baseStyle} ${inactiveStyle} w-full`}
            >
              <FaPlusCircle />
              {!collapsed && "Add Course"}
            </button>
          </li>

          {/* MY ADDED COURSES */}
          <li>
            <NavLink
              to="/dashboard/my-courses"
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              {({ isActive }) =>
                isActive && (
                  <motion.span
                    layoutId="dashboard-active"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary -z-10"
                  />
                )
              }

              <FaLayerGroup />
              {!collapsed && "My Added Courses"}
            </NavLink>
          </li>

          {/* ANALYTICS */}
          <li>
            <NavLink
              to="/dashboard/analytics"
              className={({ isActive }) =>
                `${baseStyle} ${isActive ? activeStyle : inactiveStyle}`
              }
            >
              {({ isActive }) =>
                isActive && (
                  <motion.span
                    layoutId="dashboard-active"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-secondary -z-10"
                  />
                )
              }

              <FaChartLine />
              {!collapsed && "Analytics"}
            </NavLink>
          </li>
        </ul>

        {/* FOOTER */}
        {!collapsed && (
          <p className="text-xs text-center opacity-60 mt-4">
            © Learnify Dashboard
          </p>
        )}
      </motion.aside>

      {/* ================= CONTENT ================= */}
      <main className="flex-1 p-6 overflow-y-auto bg-base-100">
        <Outlet />
      </main>

      {/* ================= MODAL ================= */}
      <AddCourseModal />
    </div>
  );
};

export default DashboardLayout;
