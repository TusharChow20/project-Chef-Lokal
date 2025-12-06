import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Registration = () => {
  const { register, handleSubmit } = useForm();
  const handleRegSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="mt-[10vh] text-xl">
      <form onSubmit={handleSubmit(handleRegSubmit)}>
        <fieldset className="  border-base-300 rounded-box max-w-2xl mx-auto border p-6 flex flex-col gap-3">
          <legend className="fieldset-legend text-2xl">Registration</legend>
          {/* email  */}
          <label className="label text-white">Email</label>
          <input
            type="email"
            {...register("email")}
            className="input w-full"
            placeholder="Email"
          />
          {/* name  */}
          <label className="label text-white">Name</label>
          <input
            type="text"
            {...register("name")}
            className="input w-full"
            placeholder="Your Name"
          />

          {/* photo image field  */}
          <legend className="fieldset-legend text-white text-xl">
            Add You Profile Picture
          </legend>
          <input
            type="file"
            {...register("photo")}
            className="file-input w-full"
          />

          {/* address
           */}
          <label className="label text-white">Address</label>
          <input
            type="text"
            {...register("address")}
            className="input w-full"
            placeholder="Address"
          />

          {/* password  */}

          <label className="label text-white">Password</label>
          <input
            type="password"
            {...register("password")}
            className="input w-full"
            placeholder="Password"
          />

          {/* confirm password  */}
          <label className="label text-white">Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword")}
            className="input w-full"
            placeholder="Confirm Password"
          />

          <button className="btn btn-neutral mt-4 w-full">Login</button>

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
