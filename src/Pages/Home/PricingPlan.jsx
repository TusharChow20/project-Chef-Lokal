import React, { useState } from "react";
import { Check, Zap, Crown, Rocket, Star } from "lucide-react";
import { Link } from "react-router";

const PricingPlans = () => {
  const [billingCycle, setBillingCycle] = useState("monthly"); // monthly or yearly

  const plans = [
    {
      name: "Basic",
      icon: <Zap size={32} />,
      color: "from-blue-500 to-cyan-500",
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: "Perfect for trying out our service",
      features: [
        "5 orders per month",
        "Standard delivery",
        "Basic customer support",
        "Access to daily menu",
        "Mobile app access",
      ],
      limitations: [
        "No free delivery",
        "No priority support",
        "Limited menu access",
      ],
      popular: false,
      cta: "Get Started",
    },
    {
      name: "Premium",
      icon: <Crown size={32} />,
      color: "from-purple-500 to-pink-500",
      monthlyPrice: 29,
      yearlyPrice: 290,
      description: "Best for regular food lovers",
      features: [
        "Unlimited orders",
        "Free delivery on all orders",
        "Priority 24/7 support",
        "Access to exclusive menu",
        "Early access to new dishes",
        "10% off on all orders",
        "Personalized recommendations",
        "Loyalty rewards program",
      ],
      limitations: [],
      popular: true,
      cta: "Start Premium",
    },
    {
      name: "Enterprise",
      icon: <Rocket size={32} />,
      color: "from-orange-500 to-red-500",
      monthlyPrice: 99,
      yearlyPrice: 990,
      description: "For teams and businesses",
      features: [
        "Everything in Premium",
        "Team/Corporate accounts",
        "Bulk order discounts (20%)",
        "Dedicated account manager",
        "Custom meal planning",
        "Catering services",
        "Invoice billing",
        "Analytics dashboard",
        "Priority chef assignments",
      ],
      limitations: [],
      popular: false,
      cta: "Contact Sales",
    },
  ];

  const calculateSavings = (monthlyPrice) => {
    const yearlyTotal = monthlyPrice * 12;
    const yearlyPrice =
      plans.find((p) => p.monthlyPrice === monthlyPrice)?.yearlyPrice || 0;
    const savings = yearlyTotal - yearlyPrice;
    return savings > 0 ? savings : 0;
  };

  return (
    <div className="py-20 px-4 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-6 py-2 rounded-full border border-purple-500/30 mb-4">
            <span className="text-purple-400 font-semibold text-sm">
              FLEXIBLE PRICING
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
            Save more with yearly billing and enjoy exclusive perks
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm rounded-full p-1 border border-white/10">
            <button
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                billingCycle === "monthly"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 relative ${
                billingCycle === "yearly"
                  ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                plan.popular
                  ? "border-purple-500/50 shadow-purple-500/20 scale-105 md:scale-110"
                  : "border-white/10 hover:border-green-500/50 hover:shadow-green-500/20"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-bl-2xl font-bold text-sm flex items-center gap-1 shadow-lg">
                  <Star size={14} fill="white" />
                  MOST POPULAR
                </div>
              )}

              <div className="p-8">
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4 shadow-lg`}
                >
                  <div className="text-white">{plan.icon}</div>
                </div>

                {/* Plan Name */}
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">
                      $
                      {billingCycle === "monthly"
                        ? plan.monthlyPrice
                        : Math.floor(plan.yearlyPrice / 12)}
                    </span>
                    <span className="text-gray-400">/month</span>
                  </div>
                  {billingCycle === "yearly" && plan.monthlyPrice > 0 && (
                    <p className="text-green-400 text-sm mt-2">
                      Save ${calculateSavings(plan.monthlyPrice)} per year
                    </p>
                  )}
                  {billingCycle === "yearly" && plan.yearlyPrice > 0 && (
                    <p className="text-gray-500 text-xs mt-1">
                      Billed ${plan.yearlyPrice} annually
                    </p>
                  )}
                </div>

                {/* Features */}
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-start gap-3">
                      <div
                        className={`flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br ${plan.color} flex items-center justify-center mt-0.5`}
                      >
                        <Check size={14} className="text-white" />
                      </div>
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link
                  to="/meals"
                  className={`block w-full py-4 rounded-lg font-bold text-center transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:shadow-2xl hover:shadow-purple-500/50 hover:scale-105"
                      : "bg-white/10 text-white border border-white/20 hover:bg-white hover:text-gray-900"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>

              {/* Bottom Accent */}
              <div className={`h-1 bg-gradient-to-r ${plan.color}`}></div>
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gradient-to-r from-gray-800/50 to-gray-900/50 rounded-2xl p-8 border border-white/10">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">
              30 Days
            </div>
            <div className="text-sm text-gray-400">Money Back Guarantee</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">
              Cancel
            </div>
            <div className="text-sm text-gray-400">Anytime, No Questions</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-pink-400 mb-1">24/7</div>
            <div className="text-sm text-gray-400">Premium Support</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-400 mb-1">Secure</div>
            <div className="text-sm text-gray-400">SSL Encrypted Payment</div>
          </div>
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-12">
          <p className="text-gray-400 mb-4">Have questions about our plans?</p>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 text-green-400 font-semibold hover:text-green-300 transition-colors"
          >
            View Pricing FAQ
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingPlans;
