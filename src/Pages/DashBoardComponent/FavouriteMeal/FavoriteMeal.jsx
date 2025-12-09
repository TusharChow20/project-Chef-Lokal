import React from "react";
import useAxiosSecurity from "../../../Hooks/useAxiosSecurity";
import { useAuth } from "../../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Trash2, Heart, ChefHat, DollarSign, Calendar } from "lucide-react";
import Swal from "sweetalert2";

const FavoriteMeal = () => {
  const axiosSecure = useAxiosSecurity();
  const { user } = useAuth();

  const {
    data: allFavItem = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["favorites", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`favorites/all/${user.email}`);
      return res.data;
    },
    enabled: !!user?.email,
  });

  const handleDelete = async (id, mealName) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to remove "${mealName}" from your favorites?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#f97316",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, remove it!",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axiosSecure.delete(`/favorites/${id}`);
          if (response.data) {
            refetch();
            Swal.fire({
              title: "Removed!",
              text: `${mealName} has been removed from your favorites.`,
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          console.error("Error deleting favorite:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to remove from favorites. Please try again.",
            icon: "error",
            confirmButtonColor: "#f97316",
          });
        }
      }
    });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-600 rounded w-64 mb-8"></div>
            <div className="bg-gray-700 rounded-lg overflow-hidden">
              <div className="h-16 bg-gray-600"></div>
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="h-20 bg-gray-700 border-t border-gray-600"
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-red-500 fill-red-500" />
            <h1 className="text-4xl font-bold text-white">My Favorite Meals</h1>
          </div>
          <p className="text-gray-400 ml-11">
            {allFavItem.length === 0
              ? "You haven't added any favorites yet"
              : `You have ${allFavItem.length} favorite ${
                  allFavItem.length === 1 ? "meal" : "meals"
                }`}
          </p>
        </div>

        {/* Empty State */}
        {allFavItem.length === 0 ? (
          <div className="bg-gray-800 rounded-2xl p-12 text-center">
            <Heart className="w-24 h-24 text-gray-600 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-300 mb-2">
              No favorites yet
            </h2>
            <p className="text-gray-400 mb-6">
              Start adding meals to your favorites to see them here!
            </p>
          </div>
        ) : (
          <>
            {/* Desktop Table View */}
            <div className="hidden md:block bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-900">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Meal Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Chef Name
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Date Added
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {allFavItem.map((item) => (
                      <tr
                        key={item._id}
                        className="hover:bg-gray-700 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                            <span className="text-white font-medium">
                              {item.mealName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <ChefHat className="w-4 h-4 text-orange-500" />
                            <span className="text-gray-300">
                              {item.chefName}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4 text-green-500" />
                            <span className="text-green-400 font-semibold">
                              {item.price}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-500" />
                            <span className="text-gray-400">
                              {formatDate(item.addedTime)}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() =>
                              handleDelete(item._id, item.mealName)
                            }
                            className="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300 hover:scale-105"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Mobile Card View */}
            <div className="md:hidden space-y-4">
              {allFavItem.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                      <h3 className="text-xl font-bold text-white">
                        {item.mealName}
                      </h3>
                    </div>
                    <div className="flex items-center gap-1 bg-green-500/20 px-3 py-1 rounded-full">
                      <DollarSign className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-bold">
                        {item.price}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2">
                      <ChefHat className="w-4 h-4 text-orange-500" />
                      <span className="text-sm text-gray-400">Chef:</span>
                      <span className="text-gray-300">{item.chefName}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      <span className="text-sm text-gray-400">Added:</span>
                      <span className="text-gray-300">
                        {formatDate(item.addedTime)}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDelete(item._id, item.mealName)}
                    className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-all duration-300"
                  >
                    <Trash2 className="w-5 h-5" />
                    Remove from Favorites
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default FavoriteMeal;
