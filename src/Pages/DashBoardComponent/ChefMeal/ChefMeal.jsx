import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { X, Pencil, Trash2, Star } from "lucide-react";
import Swal from "sweetalert2";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";
import { useAuth } from "../../../Hooks/useAuth";

const ChefMeal = () => {
  const { user } = useAuth();

  const axiosSecure = useAxiosSecurity();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Fetch user info
  const { data: userInfo } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Fetch meals
  const { data: myMeals = [], isLoading } = useQuery({
    queryKey: ["meals", userInfo?.chefId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/meals/chef/${userInfo.chefId}`);
      return res.data;
    },
    enabled: !!userInfo?.chefId,
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (mealId) => {
      const res = await axiosSecure.delete(`/meals/${mealId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["meals"]);
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Meal deleted successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to delete meal. Please try again.",
      });
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ mealId, mealData }) => {
      const res = await axiosSecure.put(`/meals/meal/${mealId}`, mealData);
      // console.log(res, "mealid", mealId);

      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["meals"]);
      setIsModalOpen(false);
      setSelectedMeal(null);
      reset();
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Meal updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    onError: () => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Failed to update meal. Please try again.",
      });
    },
  });

  const handleDelete = (mealId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMutation.mutate(mealId);
      }
    });
  };

  const handleUpdate = (meal) => {
    setSelectedMeal(meal);
    reset({
      foodName: meal.foodName,
      foodImage: meal.foodImage,
      price: meal.price,
      ingredients: Array.isArray(meal.ingredients)
        ? meal.ingredients.join(", ")
        : meal.ingredients,
      estimatedDeliveryTime: meal.estimatedDeliveryTime,
      foodDescription: meal.foodDescription,
    });
    setIsModalOpen(true);
  };

  const onSubmit = (data) => {
    const mealData = {
      foodName: data.foodName,
      foodImage: data.foodImage,
      price: parseFloat(data.price),
      ingredients: data.ingredients.split(",").map((item) => item.trim()),
      estimatedDeliveryTime: data.estimatedDeliveryTime,
      foodDescription: data.foodDescription,
      rating: selectedMeal.rating,
      chefName: selectedMeal.chefName,
      chefId: selectedMeal.chefId,
      userEmail: selectedMeal.userEmail,
      chefsExperience: selectedMeal.chefsExperience,
      createdDate: selectedMeal.createdDate,
    };
    updateMutation.mutate({ mealId: selectedMeal._id, mealData });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMeal(null);
    reset();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading meals...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <title>My Meals</title>
      <h1 className="text-3xl font-bold mb-8 text-white">My Meals</h1>

      {myMeals.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-200">
            No meals found. Create your first meal!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myMeals.map((meal) => (
            <div
              key={meal._id}
              className=" rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-white">
                  {meal.foodName}
                </h2>

                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl font-bold text-green-600">
                    ${meal.price}
                  </span>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">
                      {meal.rating || "N/A"}
                    </span>
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-sm text-gray-200 mb-1">
                    <span className="font-semibold">Ingredients:</span>{" "}
                    {Array.isArray(meal.ingredients)
                      ? meal.ingredients.join(", ")
                      : meal.ingredients}
                  </p>
                  <p className="text-sm text-gray-200 mb-1">
                    <span className="font-semibold">Delivery Time:</span>{" "}
                    {meal.estimatedDeliveryTime} mins
                  </p>
                  <p className="text-sm text-gray-200 mb-1">
                    <span className="font-semibold">Chef:</span> {meal.chefName}
                  </p>
                  <p className="text-sm text-gray-100 mb-1">
                    <span className="font-semibold">Experience:</span>{" "}
                    {meal.chefsExperience} years
                  </p>
                  <p className="text-sm text-gray-100">
                    <span className="font-semibold">Chef ID:</span>{" "}
                    {meal.chefId}
                  </p>
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => handleUpdate(meal)}
                    className="flex-1 flex items-center justify-center gap-2 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(meal._id)}
                    className="flex-1 flex items-center justify-center gap-2 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Update Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className=" rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0  border-b px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white ">Update Meal</h2>
              <button
                onClick={closeModal}
                className="text-gray-300 hover:text-gray-300"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Food Name *
                  </label>
                  <input
                    {...register("foodName", {
                      required: "Food name is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter food name"
                  />
                  {errors.foodName && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.foodName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Food Image URL *
                  </label>
                  <input
                    {...register("foodImage", {
                      required: "Image URL is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter image URL"
                  />
                  {errors.foodImage && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.foodImage.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Price *
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("price", {
                      required: "Price is required",
                      min: { value: 0, message: "Price must be positive" },
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter price"
                  />
                  {errors.price && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.price.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Ingredients * (comma-separated)
                  </label>
                  <textarea
                    {...register("ingredients", {
                      required: "Ingredients are required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Enter ingredients (e.g., Chicken, Garlic, Tomato)"
                  />
                  {errors.ingredients && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.ingredients.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Estimated Delivery Time *
                  </label>
                  <input
                    {...register("estimatedDeliveryTime", {
                      required: "Delivery time is required",
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 30-45 minutes"
                  />
                  {errors.estimatedDeliveryTime && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.estimatedDeliveryTime.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-300">
                    Food Description
                  </label>
                  <textarea
                    {...register("foodDescription")}
                    className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Enter food description"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={closeModal}
                  className="flex-1 px-6 py-3 border border-gray-300 rounded text-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleFormSubmit}
                  disabled={updateMutation.isPending}
                  className="flex-1 px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50"
                >
                  {updateMutation.isPending ? "Updating..." : "Update Meal"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChefMeal;
