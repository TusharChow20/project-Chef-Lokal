import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";
import SocialLogin from "../SocialLogin/SocialLogin";

const Registration = () => {
  const axiosSecure = useAxiosSecurity();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const { signUp, updateUserProfile } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const handleRegSubmit = async (data) => {
    const profileImage = data.photo[0];

    // Validate image file exists
    if (!profileImage) {
      Swal.fire({
        title: "Error!",
        text: "Please select a profile picture",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
      return;
    }

    setIsLoading(true);

    try {
      // STEP 1: Upload image to ImgBB FIRST
      // console.log("Uploading image...");
      const formData = new FormData();
      formData.append("image", profileImage);

      const imageUploadResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`,
        formData
      );

      if (!imageUploadResponse.data.success) {
        throw new Error("Image upload failed");
      }

      const photoURL = imageUploadResponse.data.data.url;
      // console.log("Image uploaded successfully:", photoURL);

      // STEP 2: Create Firebase account
      // console.log("Creating Firebase account...");
      const userCredential = await signUp(data.email, data.password);
      // console.log("Firebase account created");

      // STEP 3: Update Firebase profile
      const userProfile = {
        displayName: data.name,
        photoURL: photoURL,
      };
      await updateUserProfile(userProfile);
      // console.log("Firebase profile updated");

      // STEP 4: Save to MongoDB
      // console.log("Saving to MongoDB...");
      const userDataForMongo = {
        email: data.email,
        displayName: data.name,
        photoURL: photoURL,
        address: data.address,
        role: "user",
        userStatus: "active",
      };

      const mongoResponse = await axiosSecure.post("/users", userDataForMongo);
      // console.log("MongoDB save response:", mongoResponse.data);

      // Success!
      Swal.fire({
        title: "Success!",
        text: "Your account has been created successfully!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#10b981",
      });

      setIsLoading(false);
      navigate(from, { replace: true });
    } catch (error) {
      setIsLoading(false);
      console.error("Registration error:", error);

      let errorMessage = "Failed to create account. Please try again.";

      // Image upload errors
      if (error.response && error.response.config?.url?.includes("imgbb")) {
        errorMessage =
          "Failed to upload profile picture. Please try a different image.";
      }
      // Firebase errors
      else if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      }
      // Axios/MongoDB errors
      else if (error.response?.status === 400) {
        errorMessage = "Invalid user data. Please check all fields.";
        console.error("Backend error:", error.response.data);
      } else if (error.response?.status === 500) {
        errorMessage = "Server error. Please try again later.";
      }
      // Generic error message
      else if (error.message) {
        errorMessage = error.message;
      }

      Swal.fire({
        title: "Registration Failed!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Create Account</h1>
          <p className="text-gray-400">Join us and start your journey</p>
        </div>

        <form onSubmit={handleSubmit(handleRegSubmit)}>
          <div className="bg-base-200 rounded-2xl shadow-2xl p-8 space-y-6">
            {/* Email */}
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
                disabled={isLoading}
              />
              {errors.email && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Full Name
                </span>
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is required",
                  minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters",
                  },
                })}
                className="input input-bordered w-full text-lg"
                placeholder="Enter your full name"
                disabled={isLoading}
              />
              {errors.name && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Profile Picture */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Profile Picture
                </span>
              </label>
              <input
                type="file"
                {...register("photo", {
                  required: "Profile picture is required",
                })}
                className="file-input file-input-bordered w-full"
                accept="image/*"
                disabled={isLoading}
              />
              {errors.photo && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.photo.message}
                </span>
              )}
              <p className="text-xs text-gray-500 mt-1">
                Max file size: 5MB. Supported formats: JPG, PNG, GIF
              </p>
            </div>

            {/* Address */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Address
                </span>
              </label>
              <input
                type="text"
                {...register("address", {
                  required: "Address is required",
                  minLength: {
                    value: 5,
                    message: "Address must be at least 5 characters",
                  },
                })}
                className="input input-bordered w-full text-lg"
                placeholder="Enter your address"
                disabled={isLoading}
              />
              {errors.address && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.address.message}
                </span>
              )}
            </div>

            {/* Password */}
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
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                    message:
                      "Password must contain uppercase, lowercase and number",
                  },
                })}
                className="input input-bordered w-full text-lg"
                placeholder="Create a strong password"
                disabled={isLoading}
              />
              {errors.password && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="label">
                <span className="label-text font-semibold text-lg">
                  Confirm Password
                </span>
              </label>
              <input
                type="password"
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: (value) =>
                    value === password || "Passwords do not match",
                })}
                className="input input-bordered w-full text-lg"
                placeholder="Confirm your password"
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm mt-1 block">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Register Button */}
            <button
              className="btn btn-primary w-full text-lg text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="loading loading-spinner"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Divider */}
            <div className="divider">OR</div>

            {/* Social Login */}
            <SocialLogin />

            {/* Login Link */}
            <div className="text-center pt-4">
              <p className="text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary font-semibold">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
