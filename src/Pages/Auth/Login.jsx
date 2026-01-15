import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import axiosPublic from "../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const { logIn, googleLogIn, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    logIn(email, password)
      .then((res) => {
        setUser(res.user);

        Swal.fire({
          icon: "success",
          title: "Login Successful",
          timer: 1400,
          showConfirmButton: false,
        });

        navigate(location.state || "/");
      })
      .catch(() => {
        Swal.fire("Error", "Invalid email or password", "error");
      });
  };

  const handleGoogleLogin = () => {
    googleLogIn().then((res) => {
      const user = res.user;
      setUser(user);

      const userInfo = {
        name: user.displayName,
        email: user.email,
        photo: user.photoURL,
        role: "student",
      };

      axiosPublic.post("/users", userInfo);

      Swal.fire({
        icon: "success",
        title: "Login Successful",
        timer: 1400,
        showConfirmButton: false,
      });

      navigate(location.state || "/");
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-base-200 to-secondary/10 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md rounded-2xl backdrop-blur-xl bg-base-100/80 shadow-xl border border-base-300"
      >
        <div className="p-8">
          {/* TITLE */}
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Welcome Back
          </motion.h2>

          {/* FORM */}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full rounded-xl"
              required
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="input input-bordered w-full rounded-xl"
              required
            />

            <div className="text-right">
            <Link
              to="/auth/forgot-password"
              state={{ email: "" }}
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="w-full py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-primary to-secondary
                shadow-lg hover:shadow-primary/40 transition-all"
            >
              Login
            </motion.button>
          </form>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-base-300"></div>
            <span className="text-sm text-base-content/60">or</span>
            <div className="flex-1 h-px bg-base-300"></div>
          </div>

          {/* GOOGLE LOGIN */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleGoogleLogin}
            className="w-full py-3 rounded-xl font-medium
              flex items-center justify-center gap-3
              border border-base-300 bg-base-100
              hover:bg-base-200 transition-all"
          >
            <FaGoogle className="text-lg" />
            Continue with Google
          </motion.button>

          {/* FOOTER */}
          <p className="text-center mt-6 text-sm text-base-content/70">
            New to Learnify?{" "}
            <Link
              to="/auth/register"
              className="font-semibold text-primary hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
