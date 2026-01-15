import React, { useContext, useState } from "react";
import { Link, useLocation } from "react-router";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";

const ForgotPassword = () => {
  const location = useLocation();
  const { forgotPassword } = useContext(AuthContext);

  const [email, setEmail] = useState(location.state?.email || "");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = (event) => {
    event.preventDefault();
    setLoading(true);

    forgotPassword(email)
      .then(() => {
        Swal.fire({
          title: "Reset Email Sent!",
          text: "Check your inbox",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });

        setTimeout(() => {
          window.location.href = "https://mail.google.com";
        }, 2000);
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Failed to send reset email",
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 bg-base-200">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl p-6 rounded-2xl">
        
        <h2 className="font-semibold text-2xl text-center mb-5">
          Reset Your Password
        </h2>

        <form onSubmit={handleResetPassword} className="space-y-4">
          <div>
            <label className="label text-sm font-medium">Email</label>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="
              btn w-full rounded-xl
              bg-gradient-to-r from-primary to-secondary
              text-white shadow-md
              hover:shadow-xl hover:scale-[1.02]
              transition-all
            "
          >
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>

        <p className="text-center pt-5 text-sm">
          Remember password?{" "}
          <Link to="/auth/login" className="text-primary font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
