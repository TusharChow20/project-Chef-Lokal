import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { useAuth } from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";

const Registration = () => {
  const axiosSecure = useAxiosSecurity();
  const { signUp, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = watch("password");

  const handleRegSubmit = async (data) => {
    const profileImage = data.photo[0];
    try {
      await signUp(data.email, data.password);
      const formData = new FormData();
      // photourl generation from store server
      formData.append("image", profileImage);
      axios
        .post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_IMAGE_HOST
          }`,
          formData
        )
        .then(async (res) => {
          //update registration
          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateUserProfile(userProfile);

          const userDataForMongo = {
            email: data.email,
            displayName: data.name,
            photoURL: res.data.data.url,
            address: data.address,
            role: "user",
            userStatus: "active",
          };
          await axiosSecure.post("/users", userDataForMongo);
        });
      // Success alert
      Swal.fire({
        title: "Success!",
        text: "Your account has been created successfully!",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#10b981",
      });
    } catch (error) {
      // Error alert
      let errorMessage = "Failed to create account. Please try again.";

      // Handle specific Firebase errors
      if (error.code === "auth/email-already-in-use") {
        errorMessage = "This email is already registered.";
      } else if (error.code === "auth/weak-password") {
        errorMessage = "Password is too weak.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage = "Invalid email address.";
      } else if (error.message) {
        errorMessage = error.message;
      }

      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  return (
    <div className="mt-[10vh] text-xl">
      <form onSubmit={handleSubmit(handleRegSubmit)}>
        <fieldset className="border-base-300 rounded-box max-w-2xl mx-auto border p-6 flex flex-col gap-3">
          <legend className="fieldset-legend text-2xl">Registration</legend>

          {/* email */}
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
            className="input w-full text-xl"
            placeholder="Email"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}

          {/* name */}
          <label className="label text-white ">Name</label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 2,
                message: "Name must be at least 2 characters",
              },
            })}
            className="input w-full text-xl"
            placeholder="Your Name"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}

          {/* photo image field */}
          <legend className="fieldset-legend text-white text-xl">
            Add Your Profile Picture
          </legend>
          <input
            type="file"
            {...register("photo", {
              required: "Profile picture is required",
            })}
            className="file-input w-full"
          />
          {errors.photo && (
            <span className="text-red-500 text-sm">{errors.photo.message}</span>
          )}

          {/* address */}
          <label className="label text-white">Address</label>
          <input
            type="text"
            {...register("address", {
              required: "Address is required",
              minLength: {
                value: 5,
                message: "Address must be at least 5 characters",
              },
            })}
            className="input w-full text-xl"
            placeholder="Address"
          />
          {errors.address && (
            <span className="text-red-500 text-sm">
              {errors.address.message}
            </span>
          )}

          {/* password */}
          <label className="label text-white">Password</label>
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
            className="input w-full"
            placeholder="Password"
          />
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}

          {/* confirm password */}
          <label className="label text-white">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            className="input w-full"
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <span className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </span>
          )}

          <button className="btn btn-neutral mt-4 w-full">Register</button>

          {/* Extra actions */}
          <div className="flex justify-between mt-2">
            <button type="button" className="btn btn-link p-0">
              Forgot Password?
            </button>
            <Link to={"/login"} type="button" className="btn btn-link p-0">
              Login
            </Link>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Registration;
