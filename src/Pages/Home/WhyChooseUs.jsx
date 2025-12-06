import React from "react";
import { Truck, Shield, Clock, Headphones, Star, Wallet } from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      icon: <Truck size={40} />,
      title: "Fast Delivery",
      description:
        "Get your food delivered in 30 minutes or less. We value your time!",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Star size={40} />,
      title: "Quality Food",
      description:
        "Fresh ingredients and top-rated chefs ensure every meal is perfect.",
      color: "from-amber-500 to-orange-500",
    },
    {
      icon: <Shield size={40} />,
      title: "Secure Payment",
      description:
        "Multiple payment options with 100% secure and encrypted transactions.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Clock size={40} />,
      title: "Live Tracking",
      description:
        "Track your order in real-time from kitchen to your doorstep.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Headphones size={40} />,
      title: "24/7 Support",
      description:
        "Our customer support team is always ready to help you anytime.",
      color: "from-red-500 to-rose-500",
    },
    {
      icon: <Wallet size={40} />,
      title: "Best Prices",
      description:
        "Enjoy delicious meals at competitive prices with regular deals.",
      color: "from-indigo-500 to-violet-500",
    },
  ];

  return (
    <div className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Us?
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto">
            We're committed to providing the best food delivery experience with
            exceptional service and quality
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group  rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border  hover:border-transparent hover:-translate-y-2"
            >
              <div
                className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
              >
                <div className="text-white">{feature.icon}</div>
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white leading-relaxed">
                {feature.description}
              </p>

              <div
                className={`mt-6 h-1 w-0 group-hover:w-full transition-all duration-300 bg-gradient-to-r ${feature.color} rounded-full`}
              ></div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <h4 className="text-4xl font-bold text-white mb-2">500+</h4>
            <p className="text-white">Restaurants</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-bold text-white mb-2">50K+</h4>
            <p className="text-white">Happy Customers</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-bold text-white mb-2">100K+</h4>
            <p className="text-white">Deliveries</p>
          </div>
          <div className="text-center">
            <h4 className="text-4xl font-bold text-white mb-2">4.8★</h4>
            <p className="text-white">Average Rating</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
