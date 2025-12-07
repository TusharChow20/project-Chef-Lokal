import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecurity from "../../Hooks/useAxiosSecurity";
import { UtensilsCrossed, ChefHat, Calendar } from "lucide-react";

const DailyMenu = () => {
  const axiosSecure = useAxiosSecurity();
  const { data } = useQuery({
    queryKey: ["/meals"],
    queryFn: async () => {
      const res = await axiosSecure.get("/meals");
      return res.data;
    },
  });

  return (
    <div>
      <div className="text-center py-8 px-4">
        <div className="flex items-center justify-center gap-3 mb-2">
          <UtensilsCrossed className="w-8 h-8 text-primary animate-pulse" />
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Today's Menu
          </h1>
          <ChefHat className="w-8 h-8 text-secondary animate-pulse" />
        </div>
        <div className="flex items-center justify-center gap-2 text-sm opacity-75">
          <Calendar className="w-4 h-4" />
          <p>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 px-3">
        {data?.meals.map((meal) => (
          <div
            key={meal._id}
            className="card bg-base-100 image-full  h-80 shadow-sm"
          >
            <figure className="w-full h-full">
              <img
                className="w-full h-full object-cover"
                src={meal.foodImage}
                alt={meal.foodName}
              />
            </figure>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
            <div className="card-body bg-blur flex flex-col justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-3">{meal.foodName}</h2>

                {/* Chef Information */}
                <div className="text-sm mb-2">
                  <p className="font-semibold">Chef: {meal.chefName}</p>
                </div>

                {/* Description */}
                <p className="text-xs">
                  {meal.foodDescription.split(".").slice(1).join("......")}
                </p>
              </div>

              <div className="flex justify-between">
                {/* Food Details at Bottom */}
                <div className="flex items-center justify-between gap-3 mb-3">
                  <p className="font-bold text-2xl">${meal.price}</p>
                  <p className="flex items-center gap-1 text-lg">
                    <span className="text-yellow-400">⭐</span>
                    {meal.rating}
                  </p>
                </div>

                <div className="card-actions justify-end">
                  <button className="btn btn-primary btn-lg text-white">
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DailyMenu;
