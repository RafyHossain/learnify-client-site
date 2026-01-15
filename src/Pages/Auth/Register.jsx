import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthProvider";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import Swal from "sweetalert2";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { createUser, setUser, updateUser } = useContext(AuthContext);

  const handleRegister = (event) => {
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const photo = event.target.photoURL.value;
    const password = event.target.password.value;

    if (password.length < 6) {
      return setError("Password must be at least 6 characters long");
    }
    if (!/[A-Z]/.test(password)) {
      return setError("Password must include one uppercase letter");
    }
    if (!/[a-z]/.test(password)) {
      return setError("Password must include one lowercase letter");
    }

    setError("");

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        updateUser({
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            setUser({ ...user, displayName: name, photoURL: photo });
          })
          .catch(() => {
            setUser(user);
          });

        Swal.fire({
          title: "Registration Successful!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-base-200">
      <div
        data-aos="zoom-in"
        className="
          card
          bg-base-100
          w-full
          max-w-sm
          shadow-2xl
          p-6
          animate__animated animate__fadeInUp
        "
      >
        <h2 className="font-semibold text-2xl text-center mb-4">
          Register Your Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input input-bordered w-full"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="label">Photo URL (optional)</label>
            <input
              name="photoURL"
              type="text"
              className="input input-bordered w-full"
              placeholder="Photo URL"
            />
          </div>

          <div className="relative">
            <label className="label">Password</label>
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              className="input input-bordered w-full pr-10"
              placeholder="Password"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[35px] cursor-pointer text-gray-500"
            >
              {showPassword ? <IoIosEyeOff size={20} /> : <IoMdEye size={20} />}
            </span>
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            className="btn btn-primary w-full animate__animated hover:animate__pulse"
          >
            Register
          </button>
        </form>

        <p className="text-center pt-5 text-sm">
          Already have an account?{" "}
          <Link to="/auth/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
