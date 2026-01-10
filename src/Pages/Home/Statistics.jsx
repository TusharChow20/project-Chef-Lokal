import React, { useState, useEffect, useRef } from "react";
import { TrendingUp, Users, Package, Award } from "lucide-react";

const Statistics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  const stats = [
    {
      icon: <Users size={48} />,
      value: 50000,
      suffix: "+",
      label: "Happy Customers",
      color: "from-blue-500 to-cyan-500",
      description: "Satisfied foodies worldwide",
    },
    {
      icon: <Package size={48} />,
      value: 100000,
      suffix: "+",
      label: "Orders Delivered",
      color: "from-green-500 to-emerald-500",
      description: "Hot meals at your doorstep",
    },
    {
      icon: <Award size={48} />,
      value: 500,
      suffix: "+",
      label: "Partner Restaurants",
      color: "from-purple-500 to-pink-500",
      description: "Curated dining options",
    },
    {
      icon: <TrendingUp size={48} />,
      value: 98,
      suffix: "%",
      label: "Customer Satisfaction",
      color: "from-orange-500 to-red-500",
      description: "5-star ratings & reviews",
    },
  ];

  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    stats.forEach((stat, index) => {
      let currentStep = 0;
      const increment = stat.value / steps;

      const timer = setInterval(() => {
        currentStep++;
        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = Math.min(
            Math.round(increment * currentStep),
            stat.value
          );
          return newCounters;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  }, [isVisible]);

  return (
    <div ref={sectionRef} className="py-20 px-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-green-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Achievements in Numbers
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Trusted by thousands, delivering excellence every single day
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20"
            >
              {/* Icon */}
              <div
                className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <div className="text-white">{stat.icon}</div>
              </div>

              {/* Counter */}
              <div className="text-center mb-3">
                <div className="text-5xl font-bold text-white mb-1">
                  {counters[index].toLocaleString()}
                  {stat.suffix}
                </div>
                <h3 className="text-xl font-semibold text-green-400 mb-2">
                  {stat.label}
                </h3>
                <p className="text-sm text-gray-400">{stat.description}</p>
              </div>

              {/* Decorative Line */}
              <div
                className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300 bg-gradient-to-r ${stat.color} rounded-full`}
              ></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <p className="text-2xl text-white mb-4">
              Join thousands of satisfied customers today
            </p>
            <a
              href="/meals"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-green-500/50 hover:scale-105 transition-all duration-300"
            >
              Start Ordering Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
