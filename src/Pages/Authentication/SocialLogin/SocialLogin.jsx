import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import React from "react";
import auth from "../../../Firebase/firebase.config";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router";

const provider = new GoogleAuthProvider();

const SocialLogin = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from || "/";
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Success alert
      Swal.fire({
        title: "Welcome!",
        text: `Successfully logged in as ${user.displayName || user.email}`,
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#10b981",
        timer: 2000,
        timerProgressBar: true,
      });
      navigate(from, { replace: true });

      // Optional: Redirect or do something with the user data
      // console.log("User:", user);
    } catch (error) {
      // Error alert
      let errorMessage = "Failed to login with Google. Please try again.";

      // Handle specific Firebase errors
      if (error.code === "auth/popup-closed-by-user") {
        errorMessage = "Login popup was closed. Please try again.";
      } else if (error.code === "auth/cancelled-popup-request") {
        errorMessage = "Login was cancelled.";
      } else if (error.code === "auth/popup-blocked") {
        errorMessage = "Popup was blocked by browser. Please allow popups.";
      } else if (
        error.code === "auth/account-exists-with-different-credential"
      ) {
        errorMessage =
          "An account already exists with this email using a different sign-in method.";
      } else if (error.code === "auth/network-request-failed") {
        errorMessage = "Network error. Please check your internet connection.";
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
    <div>
      <button
        onClick={handleGoogleLogin}
        className="btn text-white border-[#e5e5e5] w-full text-l"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
