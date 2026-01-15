import React, { use } from "react";
import logo from "../assets/logo.png";
import { Link, NavLink } from "react-router-dom";

import { FaUser } from "react-icons/fa";
import Swal from "sweetalert2";
import { AuthContext } from "../Context/AuthProvider";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  // Modern active link style
  const navLinkClass = ({ isActive }) =>
    `relative px-2 py-1 transition-all duration-300
     ${
       isActive
         ? "text-primary font-semibold after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-full after:h-[2px] after:bg-primary after:rounded-full"
         : "text-gray-600 hover:text-primary"
     }`;

  const handleLogOut = () => {
    logOut()
      .then(() => {
        Swal.fire({
          title: "Log Out Successful!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div
      data-aos="fade-down"
      className="navbar bg-base-100 shadow-sm w-full px-4 md:px-8 sticky top-0 z-50"
    >
      {/* LEFT */}
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>

          {/* MOBILE MENU */}
          <ul className="menu menu-sm dropdown-content bg-base-100 rounded-box z-20 mt-3 w-52 p-3 shadow animate__animated animate__fadeInDown">
            <li>
              <NavLink to="/" end className={navLinkClass}>
                Home
              </NavLink>
            </li>
            <li>
              <NavLink to="/courses" className={navLinkClass}>
                Courses
              </NavLink>
            </li>
            {user && (
              <li>
                <NavLink to="/dashboard" className={navLinkClass}>
                  Dashboard
                </NavLink>
              </li>
            )}
          </ul>
        </div>

        <img
          src={logo}
          alt="Logo"
          className="w-[70px] h-[60px] ml-2 rounded-full object-fill"
        />
      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal gap-6 text-sm font-medium">
          <li>
            <NavLink to="/" end className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/courses" className={navLinkClass}>
              Courses
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/dashboard" className={navLinkClass}>
                Dashboard
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end flex items-center gap-3">
        {user ? (
          <>
            <div
              className="tooltip tooltip-left"
              data-tip={user?.displayName || "User"}
            >
              {user?.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User"
                  className="w-11 h-11 rounded-full object-cover border cursor-pointer"
                />
              ) : (
                <div className="w-11 h-11 rounded-full border flex items-center justify-center cursor-pointer">
                  <FaUser />
                </div>
              )}
            </div>

            <button
              onClick={handleLogOut}
              className="btn btn-primary rounded-xl btn-sm px-5 animate__animated hover:animate__pulse"
            >
              Log Out
            </button>
          </>
        ) : (
          <>
            <Link
              to="/auth/login"
              className="btn btn-primary rounded-xl btn-sm px-5"
            >
              Login
            </Link>
            <Link
              to="/auth/register"
              className="btn btn-primary rounded-xl btn-sm px-5"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
