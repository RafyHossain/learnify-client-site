import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../Context/AuthProvider";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import Swal from "sweetalert2";

const Login = () => {
  const [emailValue, setEmailValue] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const { setUser, logIn, googleLogIn } = React.useContext(AuthContext);

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (event) => {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;

    logIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);

        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(location.state || "/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid email or password",
        });
      });

    event.target.reset();
  };

  const handleGoogleLogin = () => {
    googleLogIn()
      .then((result) => {
        setUser(result.user);

        Swal.fire({
          title: "Login Successful!",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });

        navigate(location.state || "/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Google login failed",
        });
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
          Login Your Account
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              alue={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              required
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

         <div className="mb-3">
           <Link
            to="/auth/forgot-password"
            state={{ email: emailValue }}
            className="link link-hover text-sm text-primary "
          >
            Forgot password?
          </Link>
         </div>

          <button
            type="submit"
            className="btn btn-primary w-full animate__animated hover:animate__pulse"
          >
            Login
          </button>

          <p className="text-center font-semibold">or</p>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="btn bg-white text-black border w-full flex items-center justify-center gap-2"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Login with Google
          </button>
        </form>

        <p className="text-center pt-5 text-sm">
          Don't have an account?{" "}
          <Link to="/auth/register" className="text-primary font-semibold">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
