import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLoginSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);

      // Success alert
      Swal.fire({
        title: "Welcome Back!",
        text: "You have successfully logged in!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#10b981",
        timer: 2000,
        timerProgressBar: true,
      });

      // Optional: Redirect after successful login
      // navigate("/dashboard");
    } catch (error) {
      // Error alert
      let errorMessage = "Failed to login. Please try again.";

      // Handle specific Firebase errors
      if (error.code === "auth/user-not-found") {
        errorMessage = "No account found with this email.";
      } else if (error.code === "auth/wrong-password") {
        errorMessage = "Incorrect password.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.code === "auth/user-disabled") {
        errorMessage = "This account has been disabled.";
      } else if (error.code === "auth/too-many-requests") {
        errorMessage = "Too many failed attempts. Please try again later.";
      } else if (error.code === "auth/invalid-credential") {
        errorMessage = "Invalid email or password.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      Swal.fire({
        title: "Login Failed!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="mt-[20vh] text-xl ">
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <fieldset className="border-base-300 rounded-box max-w-2xl mx-auto border p-6 flex flex-col gap-3">
          <legend className="fieldset-legend text-2xl">Login</legend>

          <label className="label text-white">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            className="input w-full"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          <label className="label text-white">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className="input w-full"
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}

          <button className="btn btn-neutral mt-4 w-full">Login</button>

          {/* Extra actions */}
          <div className="flex justify-between mt-2">
            <button type="button" className="btn btn-link p-0">
              Forgot Password?
            </button>
            <Link to={"/register"} type="button" className="btn btn-link p-0">
              Register
            </Link>
          </div>
          <SocialLogin></SocialLogin>
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
