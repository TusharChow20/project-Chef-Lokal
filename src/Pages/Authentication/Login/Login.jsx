import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { signIn } = useAuth();

  // Demo credentials
  const demoCredentials = {
    email: "demo@example.com",
    password: "Demo123",
  };

  const handleDemoLogin = () => {
    // Auto-fill the form with demo credentials
    setValue("email", demoCredentials.email);
    setValue("password", demoCredentials.password);

    // Automatically submit
    handleLoginSubmit(demoCredentials);
  };

  const handleLoginSubmit = async (data) => {
    try {
      await signIn(data.email, data.password);

      Swal.fire({
        title: "Welcome Back!",
        text: "You have successfully logged in!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#10b981",
        timer: 2000,
        timerProgressBar: true,
      });
      navigate(from, { replace: true });
    } catch (error) {
      let errorMessage = "Failed to login. Please try again.";

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
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Welcome Back</h1>
          <p className="text-gray-400">Login to continue to your account</p>
        </div>

        <form onSubmit={handleSubmit(handleLoginSubmit)}>
          <div className="bg-base-200 rounded-2xl shadow-2xl p-8 space-y-6">
            {/* Email Field */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-lg">Email</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="input input-bordered w-full text-lg"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Password
                </span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="input input-bordered w-full text-lg"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button type="button" className="link link-primary text-sm">
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <button className="btn btn-primary w-full text-lg text-white">
              Login
            </button>

            {/* Demo Login Button */}
            <button
              type="button"
              onClick={handleDemoLogin}
              className="btn btn-outline btn-secondary w-full text-lg"
            >
              🎭 Try Demo Login
            </button>

            {/* Divider */}
            <div className="divider">OR</div>

            {/* Social Login */}
            <SocialLogin />

            {/* Register Link */}
            <div className="text-center pt-4">
              <p className="text-gray-400">
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="link link-primary font-semibold"
                >
                  Register here
                </Link>
              </p>
            </div>
          </div>
        </form>

        {/* Demo Credentials Info */}
        <div className="mt-6 p-4 bg-info bg-opacity-10 rounded-lg border border-info">
          <p className="text-sm text-center text-info-content">
            💡 <strong>Demo Credentials:</strong> Click "Try Demo Login" to test
            the app
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
