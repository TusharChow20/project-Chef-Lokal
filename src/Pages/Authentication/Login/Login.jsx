import React from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router";

const Login = () => {
  const { register, handleSubmit } = useForm();
  const handleLoginSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="mt-[20vh] text-xl ">
      <form onSubmit={handleSubmit(handleLoginSubmit)}>
        <fieldset className="  border-base-300 rounded-box max-w-2xl mx-auto border p-6 flex flex-col gap-3">
          <legend className="fieldset-legend text-2xl">Login</legend>

          <label className="label text-white">Email</label>
          <input
            type="email"
            {...register("email")}
            className="input w-full"
            placeholder="Email"
          />

          <label className="label text-white">Password</label>
          <input
            type="password"
            {...register("password")}
            className="input w-full"
            placeholder="Password"
          />
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
        </fieldset>
      </form>
    </div>
  );
};

export default Login;
