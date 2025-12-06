import React from "react";
import { ArrowRight, Utensils, ChefHat, Clock } from "lucide-react";

const OrderNow = () => {
  const handleOrderNow = () => {
    window.location.href = "/meals";
  };

  const handleBrowseRestaurants = () => {
    window.location.href = "/restaurants";
  };

  return (
    <div className="relative py-24 px-4 overflow-hidden">
      <div className="absolute inset-0 "></div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Ready to Order Your Favorite Meal?
            </h2>

            <p className="text-xl text-white/90 mb-8 leading-relaxed">
              Get{" "}
              <span className="font-bold text-yellow-300">FREE delivery</span>{" "}
              on your first order! Browse hundreds of restaurants and order
              delicious food now.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={handleOrderNow}
                className="group bg-white text-purple-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-purple-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-2xl hover:shadow-yellow-300/50 hover:scale-105"
              >
                Order Now
                <ArrowRight
                  className="group-hover:translate-x-1 transition-transform"
                  size={24}
                />
              </button>

              <button
                onClick={handleBrowseRestaurants}
                className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-bold text-lg border-2 border-white hover:bg-white hover:text-purple-600 transition-all duration-300 flex items-center justify-center gap-2"
              >
                Browse Menu
              </button>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                <span>30 Min Delivery</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                <span>Live Tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-300 rounded-full"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
            <h3 className="text-white text-2xl font-bold mb-6">
              Why Order With Us?
            </h3>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-yellow-300 p-3 rounded-xl flex-shrink-0">
                  <Utensils size={24} className="text-purple-700" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">
                    Fresh & Quality Food
                  </h4>
                  <p className="text-white/80 text-sm">
                    Every meal is prepared fresh with premium ingredients
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-yellow-300 p-3 rounded-xl flex-shrink-0">
                  <ChefHat size={24} className="text-purple-700" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">
                    Expert Chefs
                  </h4>
                  <p className="text-white/80 text-sm">
                    Prepared by professional chefs with years of experience
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-yellow-300 p-3 rounded-xl flex-shrink-0">
                  <Clock size={24} className="text-purple-700" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg mb-1">
                    Quick Delivery
                  </h4>
                  <p className="text-white/80 text-sm">
                    Hot food delivered to your doorstep in 30 minutes
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-6 border-t border-white/20 grid grid-cols-2 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300 mb-1">
                  500+
                </div>
                <div className="text-white/80 text-sm">Restaurants</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-300 mb-1">
                  50K+
                </div>
                <div className="text-white/80 text-sm">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-4 bg-white/20 backdrop-blur-sm px-8 py-4 rounded-full text-white">
            <span className="text-lg font-semibold">Use code:</span>
            <span className="bg-yellow-300 text-purple-700 px-6 py-2 rounded-full font-bold text-xl">
              FIRST25
            </span>
            <span className="text-lg">for 25% off your first order!</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderNow;
