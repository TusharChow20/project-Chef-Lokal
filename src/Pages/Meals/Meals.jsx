import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import useAxiosSecurity from "../../Hooks/useAxiosSecurity";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { Link } from "react-router";

const Meals = () => {
  const axiosSecure = useAxiosSecurity();
  const limit = 10;
  const [sortOrder, setSortOrder] = useState(null);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["meals", sortOrder],
      queryFn: async ({ pageParam = 0 }) => {
        const skip = pageParam * limit;
        let url = `/meals?limit=${limit}&skip=${skip}`;
        // const res = await axiosSecure.get(`/meals?limit=${limit}&skip=${skip}`);
        if (sortOrder) {
          url += `&sortBy=price&sortOrder=${sortOrder}`;
        }

        const res = await axiosSecure.get(url);
        return res.data;
      },
      getNextPageParam: (lastPage, allPages) => {
        const totalFetched = allPages.length * limit;
        return totalFetched < lastPage.total ? allPages.length : undefined;
      },
    });

  const allMeals = data?.pages.flatMap((page) => page.meals) || [];

  const sortedMeals = useMemo(() => {
    if (!allMeals.length) return [];

    const mealsCopy = [...allMeals];

    if (sortOrder === "asc") {
      return mealsCopy.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      return mealsCopy.sort((a, b) => b.price - a.price);
    }

    return mealsCopy;
  }, [allMeals, sortOrder]);

  const handleSortToggle = () => {
    if (sortOrder === null) {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder(null);
    }
  };

  const getSortIcon = () => {
    if (sortOrder === "asc") return <ArrowUp className="w-5 h-5" />;
    if (sortOrder === "desc") return <ArrowDown className="w-5 h-5" />;
    return <ArrowUpDown className="w-5 h-5" />;
  };

  const getSortText = () => {
    if (sortOrder === "asc") return "Price: Low to High";
    if (sortOrder === "desc") return "Price: High to Low";
    return "Sort by Price";
  };

  if (isLoading) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6 px-3">Our Meals</h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 px-3">
          {[...Array(10)].map((_, index) => (
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
      <title>Meals</title>
      <h1 className="text-3xl font-bold mb-6 px-3 mt-3 md:mt-4 text-center">
        Our Meals
      </h1>

      {/* Sort Button */}
      <div className="flex justify-center mb-6 px-3">
        <button
          onClick={handleSortToggle}
          className={`btn gap-2 transition-all duration-300 text-amber-200 ${
            sortOrder
              ? "btn-primary text-white shadow-lg scale-105"
              : "btn-outline btn-primary hover:scale-105"
          }`}
        >
          {getSortIcon()}
          <span className="font-semibold">{getSortText()}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-3">
        {sortedMeals.map((meal) => (
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
                  <p className="font-bold text-2xl text-gray-200">
                    ${meal.price}
                  </p>
                  <p className="flex items-center justify-end gap-1 text-lg">
                    <span className="text-yellow-400">⭐</span>
                    <span className="font-semibold">{meal.rating}</span>
                  </p>
                </div>
              </div>

              <div className="card-actions justify-end">
                <Link
                  to={`/mealDetails/${meal._id}`}
                  className="btn btn-primary w-full text-white"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isFetchingNextPage && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 mt-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={`loading-${index}`}
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
      )}

      <div className="flex justify-center mt-6 mb-10">
        {hasNextPage && (
          <button
            className="btn btn-primary text-white"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? "Loading..." : "View More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Meals;
