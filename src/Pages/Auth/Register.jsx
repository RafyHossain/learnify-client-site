import { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import axiosPublic from "../../hooks/useAxiosPublic";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import Swal from "sweetalert2";
import { motion } from "framer-motion";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const { createUser, updateUser, setUser } = useContext(AuthContext);

  //  redirect path (course details or home)
  const from = location.state?.from || "/";

  //  scroll to top on page load
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  /* ================= REGISTER ================= */
  const handleRegister = (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const email = e.target.email.value;
    const photo = e.target.photoURL.value;
    const password = e.target.password.value;

    // 🔐 Password validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain at least one uppercase letter");
      return;
    }
    if (!/[a-z]/.test(password)) {
      setError("Password must contain at least one lowercase letter");
      return;
    }

    setError("");

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        return updateUser({
          displayName: name,
          photoURL: photo,
        }).then(() => {
          setUser({
            ...user,
            displayName: name,
            photoURL: photo,
          });

          const userInfo = {
            name,
            email,
            photo,
            role: "student",
          };

          return axiosPublic.post("/users", userInfo);
        });
      })
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Registration Successful 🎉",
          timer: 1400,
          showConfirmButton: false,
        });

        navigate(from, { replace: true });
      })
      .catch((err) => {
        setError(err.message || "Registration failed");
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
          {/* ===== TITLE ===== */}
          <motion.h2
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          >
            Create Account
          </motion.h2>

          {/* ===== FORM ===== */}
          <form onSubmit={handleRegister} className="space-y-4">
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full rounded-xl"
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email Address"
              className="input input-bordered w-full rounded-xl"
              required
            />

            <input
              name="photoURL"
              type="text"
              placeholder="Photo URL (optional)"
              className="input input-bordered w-full rounded-xl"
            />

            {/* PASSWORD */}
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full pr-10 rounded-xl"
                required
              />
              <motion.span
                whileTap={{ scale: 0.8 }}
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 cursor-pointer text-base-content/60"
              >
                {showPassword ? (
                  <IoIosEyeOff size={20} />
                ) : (
                  <IoMdEye size={20} />
                )}
              </motion.span>
            </div>

            {/* ERROR */}
            {error && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-error"
              >
                {error}
              </motion.p>
            )}

            {/* SUBMIT */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="
                w-full py-3 rounded-xl font-semibold text-white
                bg-gradient-to-r from-primary to-secondary
                shadow-lg hover:shadow-primary/40 transition-all
              "
            >
              Register
            </motion.button>
          </form>

          {/* FOOTER */}
          <p className="text-center mt-6 text-sm text-base-content/70">
            Already have an account?{" "}
            <Link
              to="/auth/login"
              state={{ from }}
              className="font-semibold text-primary hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
