import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecurity from "../../Hooks/useAxiosSecurity";

const DailyMenu = () => {
  const axiosSecure = useAxiosSecurity();
  const { data: meals = [] } = useQuery({
    queryKey: ["/meals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/meals");
      return res.data;
    },
  });

  return (
    <div>
      <h1>Today's Menu</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 px-3">
        {meals
          .filter((meal) => {
            const mealDate = new Date(meal.createdDate).toLocaleDateString(
              "en-CA"
            );
            const today = new Date().toLocaleDateString("en-CA");

            return mealDate === today;
          })
          .map((meal) => (
            <div
              key={meal._id}
              className="card bg-base-100 image-full w-96 h-96 shadow-sm"
            >
              <figure className="w-full h-full">
                <img
                  className="w-full h-full object-cover"
                  src={meal.foodImage}
                  alt={meal.foodName}
                />
              </figure>
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              <div className="card-body bg-blur">
                <h2 className="card-title">{meal.foodName}</h2>

                {/* Chef Information */}
                <div className="text-sm">
                  <p className="font-semibold">Chef: {meal.chefName}</p>
                  <p className="text-xs opacity-75">Chef ID: {meal.chefId}</p>
                </div>

                {/* Food Details */}
                <div className="text-sm space-y-1">
                  <p className="font-bold text-lg">${meal.price}</p>
                  <p className="flex items-center gap-1">
                    <span className="text-yellow-400">⭐</span>
                    {meal.rating}
                  </p>
                </div>

                {/* Description */}
                <p className="text-xs">
                  {meal.foodDescription.split(".").slice(1).join("......")}
                </p>

                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-sm">Details</button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default DailyMenu;
