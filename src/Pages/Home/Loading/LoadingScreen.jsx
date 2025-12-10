import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const LoadingFallback = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch("/public/loading.json")
      .then((res) => res.json())
      .then((data) => setAnimationData(data));
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-64 h-64">
        {animationData && <Lottie animationData={animationData} loop={true} />}
        <p className="text-center text-gray-600 mt-4 text-lg">
          <span className="loading loading-spinner loading-xl"></span>
        </p>
      </div>
    </div>
  );
};

export default LoadingFallback;
