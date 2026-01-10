import React from "react";
import {
  Pizza,
  Coffee,
  Salad,
  Soup,
  IceCream,
  Cake,
  Fish,
  Beef,
} from "lucide-react";
import { Link } from "react-router";

const FeaturedCategories = () => {
  const categories = [
    {
      icon: <Pizza size={40} />,
      name: "Pizza",
      count: "45+ dishes",
      color: "from-red-500 to-orange-500",
      bgColor: "bg-red-500/10",
    },
    {
      icon: <Coffee size={40} />,
      name: "Beverages",
      count: "30+ items",
      color: "from-amber-700 to-yellow-600",
      bgColor: "bg-amber-500/10",
    },
    {
      icon: <Salad size={40} />,
      name: "Salads",
      count: "25+ fresh",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: <Soup size={40} />,
      name: "Soups",
      count: "20+ varieties",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-500/10",
    },
    {
      icon: <IceCream size={40} />,
      name: "Desserts",
      count: "35+ sweet",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-500/10",
    },
    {
      icon: <Cake size={40} />,
      name: "Bakery",
      count: "40+ fresh",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: <Fish size={40} />,
      name: "Seafood",
      count: "28+ dishes",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: <Beef size={40} />,
      name: "Meat",
      count: "50+ items",
      color: "from-red-600 to-rose-600",
      bgColor: "bg-red-600/10",
    },
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Explore Our Categories
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover a world of flavors from our carefully curated menu
            categories
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link
              key={index}
              to="/meals"
              className="group relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer"
            >
              {/* Background Gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
              ></div>

              {/* Icon Container */}
              <div
                className={`relative ${category.bgColor} w-20 h-20 rounded-2xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300`}
              >
                <div
                  className={`bg-gradient-to-br ${category.color} bg-clip-text text-transparent`}
                >
                  {category.icon}
                </div>
              </div>

              {/* Content */}
              <div className="relative text-center">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-green-400 transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-400">{category.count}</p>
              </div>

              {/* Hover Effect Line */}
              <div
                className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300 bg-gradient-to-r ${category.color}`}
              ></div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedCategories;
