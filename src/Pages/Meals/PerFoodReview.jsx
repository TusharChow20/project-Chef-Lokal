import React from "react";
import useAxiosSecurity from "../../Hooks/useAxiosSecurity";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Star } from "lucide-react";

const PerFoodReview = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecurity();

  const { data: allReview = [], isLoading } = useQuery({
    queryKey: ["reviews", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/meal/${id}`);
      return res.data;
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-5 h-5 ${
          index < rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-gray-300 text-gray-300"
        }`}
      />
    ));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading reviews...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-100">
        Food Reviews ({allReview.length})
      </h1>

      {allReview.length === 0 ? (
        <div className="text-center py-12 rounded-lg">
          <p className="text-lg">No reviews yet for this meal.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allReview.map((review) => (
            <div
              key={review._id}
              className="rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow flex flex-col"
            >
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={review.userImage}
                  alt={review.userName}
                  className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-200 truncate">
                    {review.userName}
                  </h3>
                  <span className="text-xs text-gray-300">
                    {formatDate(review.reviewDate)}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {renderStars(review.rating)}
                <span className="ml-2 text-sm text-gray-200 font-medium">
                  {review.rating}/5
                </span>
              </div>

              <p className="text-gray-400 leading-relaxed flex-1 mb-3">
                {review.reviewText}
              </p>

              <div className="text-xs text-gray-500 truncate pt-3 border-t border-gray-100">
                {review.userEmail}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PerFoodReview;
