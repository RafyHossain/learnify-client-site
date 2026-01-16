import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import { AuthContext } from "../Context/AuthProvider";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);

  /* ================= LOGOUT ================= */
  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Logged Out",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        });
      })
      .catch(console.log);
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <header className="sticky top-0 z-50 bg-base-100 border-b">
        <div className="navbar max-w-7xl mx-auto px-4">
          <span className="font-bold text-lg">Learnify</span>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-base-100/70 border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-4 md:px-8">

        {/* ================= LEFT ================= */}
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Learnify"
              className="w-10 h-10 rounded-xl object-cover"
            />
            <span className="text-xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Learnify
            </span>
          </Link>
        </div>

        {/* ================= CENTER ================= */}
        <div className="navbar-center hidden lg:flex">
          <div className="relative flex gap-2 bg-base-200/70 p-1.5 rounded-full">

            <NavLink to="/" end>
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative px-5 py-2 rounded-full text-sm font-medium"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-white" : ""}`}>
                    Home
                  </span>
                </motion.div>
              )}
            </NavLink>

            <NavLink to="/courses">
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative px-5 py-2 rounded-full text-sm font-medium"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? "text-white" : ""}`}>
                    Courses
                  </span>
                </motion.div>
              )}
            </NavLink>

            {user && (
              <NavLink to="/dashboard">
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative px-5 py-2 rounded-full text-sm font-medium"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                      />
                    )}
                    <span className={`relative z-10 ${isActive ? "text-white" : ""}`}>
                      Dashboard
                    </span>
                  </motion.div>
                )}
              </NavLink>
            )}
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="navbar-end flex items-center gap-3">

          {/* 🌙 THEME TOGGLE */}
          <ThemeToggle />

          {user ? (
            <>
              {/* USER AVATAR */}
              <div className="tooltip tooltip-bottom" data-tip={user.displayName}>
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover border"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full border flex items-center justify-center">
                    <FaUser />
                  </div>
                )}
              </div>

              {/* LOGOUT */}
              <button
                onClick={handleLogOut}
                className="
                  px-5 py-2 rounded-xl text-sm font-medium
                  bg-gradient-to-r from-primary to-secondary
                  text-white shadow-md hover:shadow-xl
                  transition-all
                "
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="btn btn-ghost btn-sm">
                Login
              </Link>
              <Link to="/auth/register" className="btn btn-primary btn-sm">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
