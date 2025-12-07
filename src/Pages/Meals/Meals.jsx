import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecurity from "../../Hooks/useAxiosSecurity";

const Meals = () => {
  const axiosSecure = useAxiosSecurity();
  const { data: meals = [], isLoading } = useQuery({
    queryKey: ["meals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/meals");
      return res.data;
    },
  });
  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6 px-3">Our Meals</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-3">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="card bg-base-100 shadow-xl animate-pulse"
            >
              <figure className="h-56 bg-gray-600"></figure>
              <div className="card-body">
                <div className="h-8 bg-gray-700 rounded w-3/4 mb-3"></div>
                <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6 mb-4"></div>

                <div className="space-y-2">
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/3"></div>
                  <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                  <div className="flex justify-between pt-2">
                    <div className="h-8 bg-gray-700 rounded w-20"></div>
                    <div className="h-6 bg-gray-700 rounded w-16"></div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="h-12 bg-gray-600 rounded w-full"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 px-3">Our Meals</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-3">
        {meals.map((meal) => (
          <div
            key={meal._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-shadow"
          >
            <figure className="h-56">
              <img
                className="w-full h-full object-cover"
                src={meal.foodImage}
                alt={meal.foodName}
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title text-2xl">{meal.foodName}</h2>

              <p className="text-sm text-gray-300 line-clamp-2">
                {meal.foodDescription}
              </p>

              <div className="my-3 space-y-2">
                {/* Chef Information */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">👨‍🍳 Chef:</span>
                  <span>{meal.chefName}</span>
                </div>

                {/* Chef ID */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">🆔 Chef ID:</span>
                  <span className="text-white">{meal.chefId}</span>
                </div>

                {/* Delivery Area */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-semibold">📍 Delivery:</span>
                  <span className="text-gray-100">{meal.deliveryArea}</span>
                </div>

                {/* Price and Rating */}
                <div className="flex items-center justify-between pt-2">
                  <p className="font-bold text-2xl text-primary">
                    ${meal.price}
                  </p>
                  <p className="flex items-center justify-end gap-1 text-lg">
                    <span className="text-yellow-400">⭐</span>
                    <span className="font-semibold">{meal.rating}</span>
                  </p>
                </div>
              </div>

              <div className="card-actions justify-end">
                <button className="btn btn-primary w-full text-white">
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Meals;
