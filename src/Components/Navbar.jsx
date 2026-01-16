import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import { AuthContext } from "../Context/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

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

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-base-100/70 border-b border-base-300">
      <div className="navbar max-w-7xl mx-auto px-4 md:px-8">

        {/* ================= LEFT : LOGO ================= */}
        <div className="navbar-start">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Learnify"
              className="w-14 h-14 rounded-xl object-cover"
            />

            {/* Animated Gradient Brand Name */}
            <span
              className="
                text-xl font-extrabold
                bg-gradient-to-r from-primary via-secondary to-primary
                bg-[length:200%_200%]
                bg-clip-text text-transparent
                animate-gradient
              "
            >
              Learnify
            </span>
          </Link>
        </div>

        {/* ================= CENTER : ANIMATED TOGGLE ================= */}
        <div className="navbar-center hidden lg:flex">
          <div className="relative flex gap-2 bg-base-200/70 backdrop-blur-md p-1.5 rounded-full">

            {/* HOME */}
            <NavLink to="/" end className="relative">
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative px-5 py-2 rounded-full text-sm font-medium cursor-pointer"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive ? "text-white" : "text-base-content/70"
                    }`}
                  >
                    Home
                  </span>
                </motion.div>
              )}
            </NavLink>

            {/* COURSES */}
            <NavLink to="/courses" className="relative">
              {({ isActive }) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="relative px-5 py-2 rounded-full text-sm font-medium cursor-pointer"
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span
                    className={`relative z-10 ${
                      isActive ? "text-white" : "text-base-content/70"
                    }`}
                  >
                    Courses
                  </span>
                </motion.div>
              )}
            </NavLink>

            {/* DASHBOARD */}
            {user && (
              <NavLink to="/dashboard" className="relative">
                {({ isActive }) => (
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="relative px-5 py-2 rounded-full text-sm font-medium cursor-pointer"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      />
                    )}
                    <span
                      className={`relative z-10 ${
                        isActive ? "text-white" : "text-base-content/70"
                      }`}
                    >
                      Dashboard
                    </span>
                  </motion.div>
                )}
              </NavLink>
            )}
          </div>
        </div>

        {/* ================= RIGHT : AUTH ================= */}
        <div className="navbar-end gap-3">
          {user ? (
            <>
              <div
                className="tooltip tooltip-bottom"
                data-tip={user?.displayName || "User"}
              >
                {user?.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full border flex items-center justify-center">
                    <FaUser />
                  </div>
                )}
              </div>

              <button
                onClick={handleLogOut}
                className="px-5 py-2 rounded-xl text-sm font-medium
                  bg-gradient-to-r from-primary to-secondary
                  text-white shadow-md hover:shadow-xl hover:scale-[1.03]
                  transition-all"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="px-5 py-2 rounded-xl text-sm font-medium
                  border border-primary/30 hover:border-primary transition-all"
              >
                Login
              </Link>

              <Link
                to="/auth/register"
                className="px-5 py-2 rounded-xl text-sm font-medium
                  bg-gradient-to-r from-primary to-secondary
                  text-white shadow-md hover:shadow-xl hover:scale-[1.03]
                  transition-all"
              >
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
