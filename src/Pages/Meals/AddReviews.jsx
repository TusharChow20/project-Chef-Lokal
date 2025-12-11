import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Star } from "lucide-react";
import useAxiosSecurity from "../../Hooks/useAxiosSecurity";
import { useAuth } from "../../Hooks/useAuth";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import Reviews from "../Home/Reviews";
import PerFoodReview from "./PerFoodReview";

const AddReviews = () => {
  const queryClient = useQueryClient();

  const axiosSecure = useAxiosSecurity();
  const { user } = useAuth();
  const { id: mealId } = useParams();

  const [rating, setRating] = useState(0);

  const { register, handleSubmit, reset } = useForm();
  const { data: userInfo } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });

  const { data: mealDetails } = useQuery({
    queryKey: ["meal", mealId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/mealDetails/${mealId}`);
      return res.data;
    },
  });

  const mealName = mealDetails?.foodName;
  // console.log(mealName);

  // --- USE MUTATION FOR SENDING DATA ---
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (payload) => {
      const res = await axiosSecure.post("/reviews", payload);
      return res.data;
    },
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Review Submitted Successfully!",
        text: "Thank you for sharing your experience.",
        timer: 1500,
        showConfirmButton: false,
      });

      reset();
      setRating(0);
      queryClient.invalidateQueries(["reviews", mealId]);
    },
    onError: (error) => {
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: error.message || "Something went wrong",
      });
    },
  });

  // --- FORM HANDLER ---
  const handleForm = async (data) => {
    if (rating === 0) {
      return Swal.fire({
        icon: "warning",
        title: "Please select a rating",
      });
    }
    if (!mealName) {
      return Swal.fire({
        icon: "error",
        title: "Error",
        text: "Meal information is loading. Please try again.",
      });
    }

    const payload = {
      userName: user.displayName,
      userEmail: user.email,
      userImage: user.photoURL,
      mealId: mealId,
      reviewText: data.comment,
      rating: rating,
      mealName: mealName,
      reviewDate: new Date().toISOString(),
    };

    await mutateAsync(payload);
  };

  return (
    <div className="min-h-screen py-12 px-4">
      <title>Add Review</title>
      <PerFoodReview></PerFoodReview>
      <div className="max-w-lg mx-auto bg-base-200 p-8 rounded-2xl shadow-xl border border-gray-700">
        <h1 className="text-3xl font-bold text-center mb-6">Leave a Review</h1>

        {/* USER INFO */}
        <div className="flex items-center gap-4 mb-6">
          <img
            src={user.photoURL}
            className="w-14 h-14 rounded-full border-2 border-orange-500"
            alt="User"
          />
          <div>
            <p className="text-lg font-semibold">{user.displayName}</p>
            <p className="text-gray-400 text-sm">{user.email}</p>
          </div>
        </div>

        {/* RATING */}
        <div className="mb-5">
          <label className="block font-semibold mb-2">Your Rating:</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((num) => (
              <Star
                key={num}
                className={`w-8 h-8 cursor-pointer ${
                  rating >= num
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-500"
                }`}
                onClick={() => setRating(num)}
              />
            ))}
          </div>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit(handleForm)} className="space-y-4">
          <div>
            <label className="label font-semibold">Comment</label>
            <textarea
              {...register("comment", { required: true })}
              className="textarea textarea-bordered w-full h-32"
              placeholder="Write your feedback..."
            ></textarea>
          </div>

          {userInfo?.userStatus === "active" ? (
            <button
              disabled={isPending}
              className="btn btn-neutral w-full mt-4"
            >
              {isPending ? "Submitting..." : "Submit Review"}
            </button>
          ) : (
            <>
              <span className="btn btn-neutral w-full mt-4">
                Account Restricted
              </span>
            </>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddReviews;
