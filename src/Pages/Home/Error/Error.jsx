import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import { useRouteError, useNavigate } from "react-router";

const Error404 = () => {
  const [animationData, setAnimationData] = useState(null);
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/error.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="text-center max-w-5xl px-4">
        <div className="">
          {animationData && (
            <Lottie animationData={animationData} loop={true} />
          )}
        </div>
        <h1 className="text-3xl font-bold  mt-6 mb-2">
          Oops! Something went wrong
        </h1>
        <p className="text-gray-200 mb-6">
          {error?.message || error?.data || "An unexpected error occurred."}
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Go Home
          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Error404;
