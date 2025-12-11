import React, { useState } from "react";
import { useAuth } from "../../../Hooks/useAuth";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const MyReviews = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecurity();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [editedRating, setEditedRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const {
    data: myReview = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["reviews", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/reviews/${user.email}`);
      return res.data;
    },
  });

  // Handle Delete Review
  const handleDelete = async (reviewId, mealName) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete your review for "${mealName}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      console.log(reviewId);

      try {
        await axiosSecure.delete(`/reviews/${reviewId}`);
        refetch();
        Swal.fire({
          title: "Deleted!",
          text: "Your review has been deleted.",
          icon: "success",
          confirmButtonColor: "#f97316",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete review. Please try again.",
          icon: "error",
          confirmButtonColor: "#ef4444",
        });
      }
    }
  };

  // Handle Open Update Modal
  const handleOpenUpdateModal = (review) => {
    setSelectedReview(review);
    setEditedRating(review.rating);
    reset({
      comment: review.reviewText,
    });
    setIsModalOpen(true);
  };

  // Handle Update Review with React Hook Form
  const onSubmit = async (data) => {
    // Validate rating
    if (editedRating === 0) {
      Swal.fire({
        title: "Rating Required!",
        text: "Please select a rating before updating.",
        icon: "warning",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    try {
      const updatedReview = {
        rating: editedRating,
        comment: data.comment,
      };

      console.log("Updating review:", updatedReview); // Debug log

      const response = await axiosSecure.patch(
        `/reviews/${selectedReview._id}`,
        updatedReview
      );

      console.log("Update response:", response.data); // Debug log

      refetch();
      setIsModalOpen(false);
      reset();

      Swal.fire({
        title: "Updated!",
        text: "Your review has been updated successfully.",
        icon: "success",
        confirmButtonColor: "#f97316",
      });
    } catch (error) {
      console.error("Update error:", error); // Debug log
      Swal.fire({
        title: "Error!",
        text:
          error.response?.data?.message ||
          "Failed to update review. Please try again.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  // Handle Modal Close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    reset();
  };

  // Render Stars
  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? "text-yellow-400 fill-current" : "text-gray-300"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    );
  };

  // Render Interactive Stars for Modal
  const renderInteractiveStars = (rating, setRating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            className="focus:outline-none"
          >
            <svg
              className={`w-8 h-8 transition-colors ${
                star <= rating
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300 hover:text-yellow-200"
              }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          </button>
        ))}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <title>My Reviews</title>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-white">My Reviews</h1>

        {/* Custom Scrollbar Styles */}
        <style jsx>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 6px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #374151;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: #f97316;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: #ea580c;
          }
        `}</style>

        {myReview.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-xl">
              You haven't written any reviews yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myReview.map((review) => (
              <div
                key={review._id}
                className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-700 hover:border-orange-500 transition-all duration-300 flex flex-col h-80"
              >
                {/* Meal Image */}
                
                <div className="p-6 flex flex-col flex-1 overflow-hidden">
                  {/* Meal Name */}
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 flex-shrink-0">
                    {review.mealName || review.mealTitle}
                  </h2>

                  {/* Rating */}
                  <div className="mb-3 flex-shrink-0">
                    {renderStars(review.rating)}
                  </div>

                  {/* Comment - Scrollable */}
                  <div className="flex-1 overflow-y-auto mb-4 pr-2 custom-scrollbar">
                    <p className="text-gray-300 whitespace-pre-wrap break-words">
                      {review.reviewText}
                    </p>
                  </div>

                  {/* Date */}
                  <p className="text-sm text-gray-400 mb-4 flex-shrink-0">
                    {new Date(
                      review.reviewDate || review.date || review.createdAt
                    ).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  {/* Action Buttons */}
                  <div className="flex gap-3 flex-shrink-0">
                    <button
                      onClick={() => handleOpenUpdateModal(review)}
                      className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                      Update
                    </button>
                    <button
                      onClick={() =>
                        handleDelete(
                          review._id,
                          review.mealName || review.mealTitle
                        )
                      }
                      className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-lg shadow-xl max-w-md w-full p-6">
            <h2 className="text-2xl font-bold text-white mb-4">
              Update Review
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Meal Name (Read-only) */}
              <div className="mb-4">
                <label className="block text-gray-300 font-medium mb-2">
                  Meal Name
                </label>
                <p className="text-white font-semibold">
                  {selectedReview.mealName || selectedReview.mealTitle}
                </p>
              </div>

              {/* Rating */}
              <div className="mb-4">
                <label className="block text-gray-300 font-medium mb-2">
                  Rating
                </label>
                {renderInteractiveStars(editedRating, setEditedRating)}
                {editedRating === 0 && (
                  <p className="text-red-400 text-sm mt-1">
                    Please select a rating
                  </p>
                )}
              </div>

              {/* Comment */}
              <div className="mb-6">
                <label className="block text-gray-300 font-medium mb-2">
                  Comment
                </label>
                <textarea
                  {...register("comment", {
                    required: "Comment is required",
                    minLength: {
                      value: 10,
                      message: "Comment must be at least 10 characters",
                    },
                    maxLength: {
                      value: 500,
                      message: "Comment must not exceed 500 characters",
                    },
                  })}
                  className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                  rows="4"
                  placeholder="Write your review here..."
                />
                {errors.comment && (
                  <p className="text-red-400 text-sm mt-1">
                    {errors.comment.message}
                  </p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 cursor-pointer"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;
