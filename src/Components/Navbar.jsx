import { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaUser, FaBars } from "react-icons/fa";
import Swal from "sweetalert2";
import logo from "../assets/logo.png";
import { AuthContext } from "../Context/AuthProvider";
import ThemeToggle from "./ThemeToggle";

/* ================= NAV ITEM ================= */
const NavItem = ({ to, label, end, mobile }) => (
  <NavLink to={to} end={end}>
    {({ isActive }) => (
      <motion.div
        whileHover={!mobile ? { scale: 1.05 } : {}}
        whileTap={mobile ? { scale: 0.95 } : {}}
        className={`
          relative px-5 py-2 rounded-full text-sm font-medium
          ${mobile ? "w-full text-center" : ""}
        `}
      >
        {isActive && (
          <motion.span
            layoutId="nav-pill"
            transition={{ type: "spring", stiffness: 500, damping: 35 }}
            className="
              absolute inset-0 rounded-full
              bg-gradient-to-r from-primary to-secondary
            "
          />
        )}
        <span
          className={`relative z-10 ${
            isActive
              ? "text-white"
              : "text-base-content/70 hover:text-base-content"
          }`}
        >
          {label}
        </span>
      </motion.div>
    )}
  </NavLink>
);

const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() =>
        Swal.fire({
          title: "Logged Out",
          icon: "success",
          timer: 1200,
          showConfirmButton: false,
        })
      )
      .catch(console.log);
  };

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
        <div className="navbar-start gap-2">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-sm">
              <FaBars />
            </label>

            <motion.div
              tabIndex={0}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              className="
                dropdown-content mt-3 p-4 space-y-2
                bg-base-100 rounded-2xl shadow-xl
                w-64 z-[999]
              "
            >
              <NavItem to="/" label="Home" end mobile />
              <NavItem to="/courses" label="Courses" mobile />
              {user && <NavItem to="/dashboard" label="Dashboard" mobile />}

              <div className="h-px bg-base-300 my-2" />
              <div className="flex justify-center">
                <ThemeToggle />
              </div>
            </motion.div>
          </div>

          <Link to="/" className="flex items-center gap-2">
            <img
              src={logo}
              alt="Learnify"
              className="w-10 h-16 rounded-xl object-cover"
            />
            <span className="text-xl font-extrabold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Learnify
            </span>
          </Link>
        </div>

        {/* ================= CENTER ================= */}
        <div className="navbar-center hidden lg:flex">
          <div className="relative flex gap-2 bg-base-200/70 p-1.5 rounded-full">
            <NavItem to="/" label="Home" end />
            <NavItem to="/courses" label="Courses" />
            {user && <NavItem to="/dashboard" label="Dashboard" />}
          </div>
        </div>

        {/* ================= RIGHT ================= */}
        <div className="navbar-end flex items-center gap-3">

          <div className="hidden lg:block">
            <ThemeToggle />
          </div>

          {user ? (
            <>
              <div
                className="tooltip tooltip-bottom"
                data-tip={user.displayName}
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="User"
                    referrerPolicy="no-referrer"
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
                className="
                  px-5 py-2 rounded-xl text-sm font-medium
                  bg-gradient-to-r from-primary to-secondary
                  text-white shadow-md
                  hover:shadow-xl hover:scale-[1.04]
                  transition-all duration-200
                "
              >
                Log out
              </button>
            </>
          ) : (
          <>
  {/* LOGIN → Mobile + Desktop */}
  <Link
    to="/auth/login"
    className="
      px-5 py-2 rounded-xl text-sm font-medium
      border border-primary/30
      hover:border-primary
      hover:bg-primary/5
      transition-all duration-200
    "
  >
    Login
  </Link>

  {/* SIGN UP → Desktop only */}
  <Link
    to="/auth/register"
    className="
      hidden md:inline-flex
      px-5 py-2 rounded-xl text-sm font-medium
      bg-gradient-to-r from-primary to-secondary
      text-white shadow-md
      hover:shadow-xl hover:scale-[1.04]
      transition-all duration-200
    "
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
