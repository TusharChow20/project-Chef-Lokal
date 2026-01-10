import React from "react";
import { Search, ShoppingCart, CreditCard, Truck } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: <Search size={48} />,
      title: "Browse Menu",
      description:
        "Explore our diverse menu and select your favorite meals from top restaurants",
      step: "01",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <ShoppingCart size={48} />,
      title: "Add to Cart",
      description:
        "Choose your desired items and customize them according to your taste",
      step: "02",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <CreditCard size={48} />,
      title: "Secure Payment",
      description:
        "Complete your order with our safe and encrypted payment options",
      step: "03",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Truck size={48} />,
      title: "Fast Delivery",
      description:
        "Sit back and relax while we deliver hot food to your doorstep",
      step: "04",
      color: "from-orange-500 to-red-500",
    },
  ];

  return (
    <div className="py-20 px-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Order your favorite food in just 4 simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              {/* Connection Line (hidden on mobile, shown on desktop between cards) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-24 left-full w-full h-0.5 bg-gradient-to-r from-green-500/50 to-transparent z-0"></div>
              )}

              {/* Card */}
              <div className="relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20 z-10">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center font-bold text-2xl text-white shadow-lg">
                  {step.step}
                </div>

                {/* Icon */}
                <div
                  className={`w-24 h-24 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <div className="text-white">{step.icon}</div>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  {step.description}
                </p>

                {/* Bottom Accent */}
                <div
                  className={`mt-6 h-1 w-0 group-hover:w-full mx-auto transition-all duration-300 bg-gradient-to-r ${step.color} rounded-full`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <a
            href="/meals"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-green-500/50 hover:scale-105 transition-all duration-300"
          >
            Start Ordering Now
            <Search size={20} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
