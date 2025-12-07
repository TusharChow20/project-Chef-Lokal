import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecurity from "../../Hooks/useAxiosSecurity";
import { Link, useParams } from "react-router";
import { Star, Clock, MapPin, ChefHat, ShoppingCart } from "lucide-react";

const MealDetails = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecurity();

  const { data: mealDetail, isLoading } = useQuery({
    queryKey: ["mealDetails", id],
    queryFn: async () => await axiosSecure.get(`mealDetails/${id}`),
  });

  if (isLoading) {
    return (
      <div className="min-h-screen  py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="e rounded-2xl shadow-2xl overflow-hidden animate-pulse">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="h-96 md:h-full bg-gray-600"></div>
              <div className="p-8 md:p-12">
                <div className="h-10 bg-gray-600 rounded w-3/4 mb-4"></div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-5 h-5 bg-gray-600 rounded"></div>
                  <div className="flex-1">
                    <div className="h-3 bg-gray-600 rounded w-20 mb-2"></div>
                    <div className="h-4 bg-gray-600 rounded w-32"></div>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2 mb-8">
                  <div className="h-4 bg-gray-600 rounded w-full"></div>
                  <div className="h-4 bg-gray-600 rounded w-full"></div>
                  <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                </div>

                {/* Delivery Info */}
                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gray-700 rounded mt-1"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-700 rounded w-24 mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded w-32"></div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-gray-700 rounded mt-1"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-700 rounded w-24 mb-2"></div>
                      <div className="h-4 bg-gray-700 rounded w-40"></div>
                    </div>
                  </div>
                </div>

                {/* Price and Button */}
                <div className="flex items-center justify-between mb-6">
                  <div className="h-12 bg-gray-700 rounded w-24"></div>
                  <div className="h-12 bg-gray-700 rounded w-40"></div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 bg-gray-500">
              <div>
                <div className="h-6 bg-gray-700 rounded w-32 mb-4"></div>
                <div className="space-y-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="h-10 bg-gray-700 rounded"></div>
                  ))}
                </div>
              </div>

              {/* Chef Details */}
              <div>
                <div className="h-6 bg-gray-700 rounded w-32 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-700 rounded w-2/3"></div>
                  <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const meal = mealDetail?.data;

  if (!meal) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Meal not found</div>
      </div>
    );
  }

  const handleOrderNow = () => {
    // Add your order logic here
    alert("Order placed successfully!");
  };

  return (
    <div className="min-h-screen  py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className=" rounded-2xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            <div className="relative h-96 md:h-full">
              <img
                src={meal.foodImage}
                alt={meal.foodName}
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute top-4 right-4 bg-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-gray-800">{meal.rating}</span>
              </div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-between">
              <div>
                <h1 className="text-4xl font-bold  mb-4">{meal.foodName}</h1>

                <div className="flex items-center gap-3 mb-6">
                  <ChefHat className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm ">Prepared by</p>
                    <p className="font-semibold text-white">{meal.chefName}</p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed mb-8">
                  {meal.foodDescription}
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-200">Delivery Time</p>
                      <p className="font-semibold text-gray-100">
                        {meal.estimatedDeliveryTime}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-orange-500 mt-1" />
                    <div>
                      <p className="text-sm text-gray-200">Delivery Area</p>
                      <p className="font-semibold text-gray-100">
                        {meal.deliveryArea}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <p className="text-sm text-gray-200">Price</p>
                    <p className="text-4xl font-bold text-orange-600">
                      ${meal.price}
                    </p>
                  </div>
                  <Link
                    to={`/orders/${meal._id}`}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold flex items-center gap-2 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer"
                  >
                    <ShoppingCart className="w-5 h-5" />
                    Order Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 p-8 md:p-12 ">
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                <span className="text-orange-500">🥘</span>
                Ingredients
              </h2>
              <div className="space-y-2">
                {meal.ingredients.map((ingredient, index) => (
                  <div
                    key={index}
                    className=" px-4 py-3 rounded-lg shadow-sm border border-gray-500 flex items-center gap-3"
                  >
                    <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
                    <span className="text-white">{ingredient}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                <ChefHat className="w-6 h-6 text-orange-500" />
                Chef Details
              </h2>
              <div className="e p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">
                <div>
                  <p className="text-sm ">Chef Name</p>
                  <p className="text-lg font-semibold text-gray-400">
                    {meal.chefName}
                  </p>
                </div>
                <div>
                  <p className="text-sm ">Chef ID</p>
                  <p className="text-lg font-semibold text-gray-400">
                    {meal.chefId}
                  </p>
                </div>
                <div>
                  <p className="text-sm ">Experience</p>
                  <p className="text-lg font-semibold text-gray-400">
                    {meal.chefsExperience}
                  </p>
                </div>
              </div>
              {/* Add this as a third column or below Chef Details */}
              <div>
                <h2 className="text-2xl font-bold text-gray-100 mb-4 flex items-center gap-2">
                  <Star className="w-6 h-6 text-orange-500" />
                  Reviews
                </h2>
                <div className="p-6 rounded-lg shadow-sm border border-gray-200">
                  <p className="text-gray-400 mb-4">
                    See what others are saying about this meal
                  </p>
                  <Link
                    to={`/reviews/${meal._id}`}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2 transition-all duration-300"
                  >
                    <Star className="w-5 h-5" />
                    View All Reviews
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealDetails;
