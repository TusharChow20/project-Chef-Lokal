import { useInfiniteQuery } from "@tanstack/react-query";
import React, { useState, useMemo } from "react";
import useAxiosSecurity from "../../Hooks/useAxiosSecurity";
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  X,
  Filter,
} from "lucide-react";
import { Link } from "react-router";

const Meals = () => {
  const axiosSecure = useAxiosSecurity();
  const limit = 10;
  const [sortOrder, setSortOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [ratingFilter, setRatingFilter] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const { data, isLoading, isFetchingNextPage, fetchNextPage, hasNextPage } =
    useInfiniteQuery({
      queryKey: ["meals", sortOrder],
      queryFn: async ({ pageParam = 0 }) => {
        const skip = pageParam * limit;
        let url = `/meals?limit=${limit}&skip=${skip}`;
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

  const filteredAndSortedMeals = useMemo(() => {
    if (!allMeals.length) return [];

    let mealsCopy = [...allMeals];

    // Search filter
    if (searchTerm) {
      mealsCopy = mealsCopy.filter(
        (meal) =>
          meal.foodName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          meal.chefName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          meal.deliveryArea.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Price range filter
    if (priceRange.min !== "" || priceRange.max !== "") {
      mealsCopy = mealsCopy.filter((meal) => {
        const price = parseFloat(meal.price);
        const min = priceRange.min === "" ? 0 : parseFloat(priceRange.min);
        const max =
          priceRange.max === "" ? Infinity : parseFloat(priceRange.max);
        return price >= min && price <= max;
      });
    }

    // Rating filter
    if (ratingFilter !== "") {
      const minRating = parseFloat(ratingFilter);
      mealsCopy = mealsCopy.filter(
        (meal) => parseFloat(meal.rating) >= minRating
      );
    }

    // Sorting
    if (sortOrder === "asc") {
      return mealsCopy.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      return mealsCopy.sort((a, b) => b.price - a.price);
    }

    return mealsCopy;
  }, [allMeals, sortOrder, searchTerm, priceRange, ratingFilter]);

  const handleSortToggle = () => {
    if (sortOrder === null) {
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else {
      setSortOrder(null);
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setPriceRange({ min: "", max: "" });
    setRatingFilter("");
    setSortOrder(null);
  };

  const hasActiveFilters =
    searchTerm || priceRange.min || priceRange.max || ratingFilter || sortOrder;

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
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Meals</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
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
    <div className="container mx-auto px-4 py-8">
      <title>Meals</title>
      <h1 className="text-4xl font-bold mb-8 text-center">Our Meals</h1>

      {/* Search and Filter Section */}
      <div className="mb-8 rounded-lg p-6 shadow-lg">
        {/* Search Bar */}
        <div className="relative mb-4">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by meal name, chef, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full pl-12 pr-12 text-lg"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Filter Toggle Button */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="btn btn-outline gap-2"
          >
            <Filter className="w-5 h-5" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </button>

          {hasActiveFilters && (
            <button onClick={clearFilters} className="btn btn-ghost gap-2">
              <X className="w-5 h-5" />
              Clear All Filters
            </button>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-lg">
            {/* Price Range Filter */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Price Range</span>
              </label>
              <div className="flex gap-2 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange.min}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, min: e.target.value })
                  }
                  className="input input-bordered w-full"
                  min="0"
                />
                <span className="text-gray-400">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange.max}
                  onChange={(e) =>
                    setPriceRange({ ...priceRange, max: e.target.value })
                  }
                  className="input input-bordered w-full"
                  min="0"
                />
              </div>
            </div>

            {/* Rating Filter */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Minimum Rating</span>
              </label>
              <select
                value={ratingFilter}
                onChange={(e) => setRatingFilter(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">All Ratings</option>
                <option value="4.5">4.5+ ⭐</option>
                <option value="4.0">4.0+ ⭐</option>
                <option value="3.5">3.5+ ⭐</option>
                <option value="3.0">3.0+ ⭐</option>
              </select>
            </div>

            {/* Sort */}
            <div>
              <label className="label">
                <span className="label-text font-semibold">Sort By</span>
              </label>
              <button
                onClick={handleSortToggle}
                className={`btn w-full gap-2 transition-all duration-300 ${
                  sortOrder ? "btn-primary text-white" : "btn-outline"
                }`}
              >
                {getSortIcon()}
                <span>{getSortText()}</span>
              </button>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-4 flex flex-wrap gap-2">
            {searchTerm && (
              <span className="badge badge-lg  gap-2">
                Search: {searchTerm}
                <X
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => setSearchTerm("")}
                />
              </span>
            )}
            {(priceRange.min || priceRange.max) && (
              <span className="badge badge-lg  gap-2">
                Price: ${priceRange.min || "0"} - ${priceRange.max || "∞"}
                <X
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => setPriceRange({ min: "", max: "" })}
                />
              </span>
            )}
            {ratingFilter && (
              <span className="badge badge-lg badge-accent gap-2">
                Rating: {ratingFilter}+ ⭐
                <X
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => setRatingFilter("")}
                />
              </span>
            )}
          </div>
        )}
      </div>

      {/* Results Count */}
      <div className="mb-4 text-center text-gray-400">
        Showing {filteredAndSortedMeals.length} meal
        {filteredAndSortedMeals.length !== 1 ? "s" : ""}
      </div>

      {/* Meals Grid */}
      {filteredAndSortedMeals.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-2xl text-gray-400 mb-4">No meals found</p>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredAndSortedMeals.map((meal) => (
            <div
              key={meal._id}
              className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <figure className="h-56 relative overflow-hidden">
                <img
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  src={meal.foodImage}
                  alt={meal.foodName}
                />
                <div className="absolute top-2 right-2 bg-yellow-400 text-black px-3 py-1 rounded-full font-bold flex items-center gap-1 shadow-lg">
                  ⭐ {meal.rating}
                </div>
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl line-clamp-1">
                  {meal.foodName}
                </h2>

                <p className="text-sm text-gray-300 line-clamp-2">
                  {meal.foodDescription}
                </p>

                <div className="my-3 space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">👨‍🍳 Chef:</span>
                    <span className="truncate">{meal.chefName}</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-semibold">📍 Delivery:</span>
                    <span className="text-gray-100 truncate">
                      {meal.deliveryArea}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                    <p className="font-bold text-3xl text-orange-500">
                      ${meal.price}
                    </p>
                  </div>
                </div>

                <div className="card-actions justify-end">
                  <Link
                    to={`/mealDetails/${meal._id}`}
                    className="btn btn-primary w-full text-white hover:scale-105 transition-transform"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Loading More */}
      {isFetchingNextPage && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {[...Array(4)].map((_, index) => (
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
                  <div className="flex justify-between pt-2">
                    <div className="h-8 bg-gray-700 rounded w-20"></div>
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

      {/* Load More Button */}
      <div className="flex justify-center mt-8 mb-10">
        {hasNextPage && (
          <button
            className="btn btn-primary btn-lg text-white px-12"
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
          >
            {isFetchingNextPage ? (
              <>
                <span className="loading loading-spinner"></span>
                Loading...
              </>
            ) : (
              "Load More Meals"
            )}
          </button>
        )}
      </div>
    </div>
  );
};

export default Meals;
