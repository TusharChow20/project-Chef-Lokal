import React, { useState } from "react";
import { useAuth } from "../../../Hooks/useAuth";
import { useForm } from "react-hook-form";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";
import { ChefHat, Upload, Plus, X } from "lucide-react";
import Swal from "sweetalert2";
import { useQuery } from "@tanstack/react-query";

const CreateMeal = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecurity();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { data: userInfo } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user.email}`);
      return res.data;
    },
  });
  console.log(userInfo);

  const [ingredients, setIngredients] = useState([]);
  const [currentIngredient, setCurrentIngredient] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Handle ingredient addition
  const addIngredient = () => {
    if (currentIngredient.trim()) {
      setIngredients([...ingredients, currentIngredient.trim()]);
      setCurrentIngredient("");
    }
  };

  // Handle ingredient removal
  const removeIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  // Handle image selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Upload image to ImgBB
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_HOST}`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        return data.data.url;
      }
      throw new Error("Image upload failed");
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };

  const handleFormSubmit = async (data) => {
    if (ingredients.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Missing Ingredients",
        text: "Please add at least one ingredient",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    if (!imageFile) {
      Swal.fire({
        icon: "warning",
        title: "Missing Image",
        text: "Please upload a food image",
        confirmButtonColor: "#f97316",
      });
      return;
    }

    setIsUploading(true);

    try {
      const imageUrl = await uploadImage(imageFile);

      const mealData = {
        foodName: data.foodName,
        chefName: data.chefName,
        foodImage: imageUrl,
        price: parseFloat(data.price),
        rating: 0,
        ingredients: ingredients,
        estimatedDeliveryTime: data.estimatedDeliveryTime,
        foodDescription: data.foodDescription,
        chefsExperience: data.chefExperience,
        chefId: data.chefId,
        userEmail: user.email,
        deliveryArea: user.deliveryArea,
        createdDate: new Date().toISOString(),
      };

      const response = await axiosSecure.post("/meals", mealData);

      if (response.data) {
        Swal.fire({
          icon: "success",
          title: "Meal Created!",
          text: "Your meal has been successfully added to the platform",
          confirmButtonColor: "#f97316",
        });

        // Reset form
        reset();
        setIngredients([]);
        setImageFile(null);
        setImagePreview(null);
      }
    } catch (error) {
      console.error("Error creating meal:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to create meal. Please try again.",
        confirmButtonColor: "#f97316",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      {userInfo?.userStatus === "fraud" ? (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
          <div className="max-w-md w-full bg-gray-800 p-8 rounded-2xl shadow-2xl text-center border border-red-600/40">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-16 h-16 text-red-500 animate-pulse"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 4h.01M4.93 19h14.14a2 2 0 001.74-3l-7.07-12.2a2 2 0 00-3.48 0L3.19 16a2 2 0 001.74 3z"
                />
              </svg>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-red-500 mb-3">
              Account Restricted
            </h1>

            {/* Description */}
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your account has been flagged for suspicious activity. Creating
              meals, posting, and selling are temporarily disabled.
            </p>

            {/* Contact Support */}
            <div className="bg-gray-700 p-4 rounded-lg border border-gray-600 mb-6">
              <p className="text-gray-200 text-sm">
                If you believe this was a mistake, please contact our support
                team.
              </p>
            </div>

            {/* Button */}
            <button
              onClick={() => (window.location.href = "/support")}
              className="w-full py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
            >
              Contact Support
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-screen py-12 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <ChefHat className="w-10 h-10 text-orange-500" />
                <h1 className="text-4xl font-bold text-white">
                  Create New Meal
                </h1>
              </div>
              <p className="text-gray-200">
                Add a delicious meal to share with customers
              </p>
            </div>

            <form
              onSubmit={handleSubmit(handleFormSubmit)}
              className=" rounded-2xl p-8 shadow-2xl"
            >
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    Food Name *
                  </label>
                  <input
                    type="text"
                    {...register("foodName", {
                      required: "Food name is required",
                    })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Enter food name"
                  />
                  {errors.foodName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.foodName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    Chef Name *
                  </label>
                  <input
                    type="text"
                    {...register("chefName", {
                      required: "Chef name is required",
                    })}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={user?.displayName || ""}
                  />
                  {errors.chefName && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.chefName.message}
                    </p>
                  )}
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-gray-300 font-medium mb-2">
                    Food Image *
                  </label>
                  <div className="flex flex-col items-center gap-4">
                    {imagePreview ? (
                      <div className="relative w-full h-64 rounded-lg overflow-hidden">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="w-full h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                        <Upload className="w-12 h-12 text-gray-400 mb-2" />
                        <span className="text-gray-400">
                          Click to upload food image
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Price and Delivery Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Price ($) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      {...register("price", {
                        required: "Price is required",
                        min: {
                          value: 0.01,
                          message: "Price must be greater than 0",
                        },
                      })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="0.00"
                    />
                    {errors.price && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.price.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-gray-300 font-medium mb-2">
                      Estimated Delivery Time *
                    </label>
                    <input
                      type="text"
                      {...register("estimatedDeliveryTime", {
                        required: "Delivery time is required",
                      })}
                      className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., 30 minutes"
                    />
                    {errors.estimatedDeliveryTime && (
                      <p className="text-red-400 text-sm mt-1">
                        {errors.estimatedDeliveryTime.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Ingredients */}
                <div>
                  <label className="block text-gray-100 font-medium mb-2">
                    Ingredients *
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={currentIngredient}
                      onChange={(e) => setCurrentIngredient(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          addIngredient();
                        }
                      }}
                      className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="Add an ingredient"
                    />
                    <button
                      type="button"
                      onClick={addIngredient}
                      className="px-4 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-5 h-5" />
                      Add
                    </button>
                  </div>

                  {/* Ingredients List */}
                  {ingredients.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {ingredients.map((ingredient, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 bg-gray-700 px-3 py-2 rounded-lg"
                        >
                          <span className="text-white">{ingredient}</span>
                          <button
                            type="button"
                            onClick={() => removeIngredient(index)}
                            className="text-red-400 hover:text-red-500"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                {/* food description  */}
                <div>
                  <label className="block text-gray-100 font-medium mb-2">
                    Food Details *
                  </label>
                  <textarea
                    {...register("foodDescription", {
                      required: "Give Food Description is required",
                    })}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Describe your food"
                  />
                  {errors.foodDescription && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.foodDescription.message}
                    </p>
                  )}
                </div>
                {/* Chef Experience */}
                <div>
                  <label className="block text-gray-100 font-medium mb-2">
                    Chef's Experience *
                  </label>
                  <textarea
                    {...register("chefExperience", {
                      required: "Chef's experience is required",
                    })}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Describe your culinary experience"
                  />
                  {errors.chefExperience && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.chefExperience.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-gray-100 font-medium mb-2">
                    Delivery Area *
                  </label>
                  <textarea
                    {...register("deliveryArea", {
                      required: "Chef's experience is required",
                    })}
                    rows="3"
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Give Your Delivery Location"
                  />
                  {errors.deliveryArea && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.deliveryArea.message}
                    </p>
                  )}
                </div>

                {/* Chef ID */}
                <div>
                  <label className="block text-gray-100 font-medium mb-2">
                    Chef ID
                  </label>
                  <input
                    type="text"
                    {...register("chefId", {
                      required: "Chef ID is required",
                    })}
                    className="w-full cursor-not-allowed px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    value={userInfo?.chefId || ""}
                    readOnly
                  />
                  {errors.chefId && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.chefId.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-gray-100 font-medium mb-2">
                    User Email
                  </label>
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="w-full px-4 py-3 bg-gray-600 border border-gray-600 rounded-lg text-gray-300 cursor-not-allowed"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isUploading}
                  className={`w-full py-4 rounded-lg font-semibold text-white transition-all duration-300 ${
                    isUploading
                      ? "bg-gray-600 cursor-not-allowed"
                      : "bg-orange-500 hover:bg-orange-600 hover:shadow-lg"
                  }`}
                >
                  {isUploading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Creating Meal...
                    </span>
                  ) : (
                    "Create Meal"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateMeal;
