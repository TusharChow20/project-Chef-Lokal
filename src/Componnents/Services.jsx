import { motion } from "framer-motion";
import { ChefHat, Clock, Shield, Star, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router";

const Services = () => {
  const services = [
    {
      icon: <ChefHat className="w-12 h-12" />,
      title: "Home Chef Connection",
      description:
        "Connect with talented local home chefs who prepare authentic, homemade meals with love and traditional recipes.",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: <Clock className="w-12 h-12" />,
      title: "Real-Time Order Tracking",
      description:
        "Track your order from preparation to delivery with live updates and estimated delivery times.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Shield className="w-12 h-12" />,
      title: "Secure Payments",
      description:
        "Safe and secure payment processing with multiple payment options and encrypted transactions.",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Quality Assurance",
      description:
        "All chefs are verified and rated by customers. Read reviews and ratings before placing your order.",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <TrendingUp className="w-12 h-12" />,
      title: "Chef Empowerment",
      description:
        "Empowering home cooks to turn their passion into profit without the need for a physical restaurant.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Community Building",
      description:
        "Join a thriving community of food lovers and talented chefs sharing authentic local cuisines.",
      color: "from-indigo-500 to-purple-500",
    },
  ];

  const features = [
    "Daily Fresh Menu Updates",
    "Multiple Cuisine Options",
    "Customizable Meal Plans",
    "Chef Profile & Experience",
    "Ingredient Transparency",
    "Flexible Delivery Options",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative text-white py-20 px-4 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <motion.h1
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-5xl md:text-6xl font-bold mb-6"
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed"
          >
            Bringing homemade deliciousness to your doorstep with seamless
            technology and trusted local chefs
          </motion.p>
        </div>
      </motion.section>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.3 },
              }}
              className=" rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div
                className={` ${service.color} p-6 flex items-center justify-center`}
              >
                <div className="text-white">{service.icon}</div>
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold  mb-3">{service.title}</h3>
                <p className="text-gray-200 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">Platform Features</h2>
            <p className="text-xl text-gray-200">
              Everything you need for a delightful homemade meal experience
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex items-center gap-3  p-4 rounded-xl hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">✓</span>
                </div>
                <span className=" font-medium">{feature}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold  mb-4">How It Works</h2>
            <p className="text-xl text-gray-100">
              Simple steps to enjoy delicious homemade meals
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Browse Menus",
                desc: "Explore daily meals from local chefs",
              },
              {
                step: "2",
                title: "Place Order",
                desc: "Select your favorite and order online",
              },
              {
                step: "3",
                title: "Track Delivery",
                desc: "Get real-time updates on your order",
              },
              {
                step: "4",
                title: "Enjoy & Review",
                desc: "Savor your meal and share feedback",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span className="text-white text-3xl font-bold">
                    {item.step}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-100 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-200">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r  text-white py-16 px-4"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Experience Authentic Home Cooking?
          </h2>
          <p className="text-xl mb-8">
            Join thousands of satisfied customers enjoying delicious homemade
            meals daily
          </p>
          <Link
            to={"/meals"}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            Browse Meals Now
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Services;
