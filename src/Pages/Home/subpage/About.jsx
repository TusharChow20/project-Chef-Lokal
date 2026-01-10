import React from "react";
import {
  ChefHat,
  Target,
  Eye,
  Award,
  Users,
  Heart,
  Sparkles,
} from "lucide-react";

const About = () => {
  const stats = [
    { number: "500+", label: "Happy Customers" },
    { number: "50+", label: "Expert Chefs" },
    { number: "1000+", label: "Meals Delivered" },
    { number: "4.8", label: "Average Rating" },
  ];

  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Quality First",
      description:
        "We never compromise on the quality of our ingredients and service.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Driven",
      description:
        "Supporting local chefs and bringing communities together through food.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Excellence",
      description:
        "Striving for excellence in every meal we prepare and deliver.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Innovation",
      description:
        "Constantly innovating to bring you the best culinary experiences.",
    },
  ];

  const team = [
    {
      name: "Tushar Chowdhury",
      role: "Founder & CEO",
      image: "https://i.ibb.co.com/LR8H0qY/pp.jpg",
      description:
        "Passionate about connecting food lovers with talented local chefs.",
    },
    {
      name: "Chef Rahman",
      role: "Head Chef",
      image: "https://i.ibb.co.com/hBnW3Ff/chef1.jpg",
      description:
        "15+ years of culinary experience in traditional and fusion cuisine.",
    },
    {
      name: "Sarah Ahmed",
      role: "Operations Manager",
      image: "https://i.ibb.co.com/ZXqYvYT/team2.jpg",
      description:
        "Ensuring smooth operations and exceptional customer service.",
    },
  ];

  return (
    <div className="min-h-screen">
      <title>About Us - Chef Lokal</title>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About Chef Lokal
          </h1>
          <p className="text-xl text-white/90 leading-relaxed">
            Connecting food lovers with passionate local chefs, one delicious
            meal at a time.
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-orange-500 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-300 text-lg leading-relaxed">
                <p>
                  Chef Lokal was born from a simple idea: to bridge the gap
                  between talented local chefs and food enthusiasts seeking
                  authentic, homemade meals.
                </p>
                <p>
                  Founded in 2024, we started as a small platform connecting a
                  handful of chefs with their neighbors. Today, we've grown into
                  a thriving community of culinary artists and food lovers.
                </p>
                <p>
                  We believe that great food brings people together, and every
                  chef has a unique story to tell through their cuisine. Our
                  mission is to empower these culinary talents while delivering
                  exceptional dining experiences to your doorstep.
                </p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800"
                alt="Our Story"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="py-16 px-4 bg-base-200">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 p-8 rounded-2xl border border-orange-500/20">
              <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Our Mission</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                To create a platform where local chefs can showcase their
                culinary skills and food lovers can discover authentic, homemade
                meals. We're committed to supporting local talent while
                delivering exceptional dining experiences.
              </p>
            </div>

            {/* Vision */}
            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-8 rounded-2xl border border-purple-500/20">
              <div className="bg-purple-500 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold mb-4">Our Vision</h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                To become the leading platform connecting food enthusiasts with
                passionate local chefs across Bangladesh, celebrating culinary
                diversity and fostering a community built around the love of
                great food.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-gray-400 text-lg">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-base-200 p-6 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                <div className="bg-orange-500 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-white">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 px-4 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center">
          <ChefHat className="w-16 h-16 text-white mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience Chef Lokal?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join our community and discover amazing meals from talented local
            chefs.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="/meals"
              className="btn btn-lg bg-white text-orange-500 hover:bg-gray-100 border-none"
            >
              Browse Meals
            </a>
            <a
              href="/contact"
              className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-orange-500"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
