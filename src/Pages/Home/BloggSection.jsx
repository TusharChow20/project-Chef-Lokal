import React from "react";
import { Calendar, Clock, ArrowRight, Tag } from "lucide-react";
import { Link } from "react-router";

const BlogSection = () => {
  const blogs = [
    {
      id: 1,
      title: "10 Healthy Meal Prep Ideas for Busy Weekdays",
      excerpt: "Discover time-saving meal prep strategies that keep you healthy and satisfied throughout the week. Perfect for professionals on the go.",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&h=600&fit=crop",
      category: "Health & Wellness",
      date: "2024-01-15",
      readTime: "5 min read",
      author: "Sarah Johnson",
      tags: ["Meal Prep", "Healthy Eating"]
    },
    {
      id: 2,
      title: "The Ultimate Guide to International Cuisines",
      excerpt: "Take your taste buds on a global journey. Explore authentic recipes and cooking techniques from around the world.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",
      category: "Culinary Guide",
      date: "2024-01-12",
      readTime: "8 min read",
      author: "Chef Marco",
      tags: ["International", "Recipes"]
    },
    {
      id: 3,
      title: "5 Secret Ingredients Chefs Use to Elevate Every Dish",
      excerpt: "Professional chefs share their go-to secret ingredients that transform ordinary meals into extraordinary culinary experiences.",
      image: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=800&h=600&fit=crop",
      category: "Chef Tips",
      date: "2024-01-10",
      readTime: "6 min read",
      author: "Chef Maria",
      tags: ["Tips", "Cooking"]
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="py-20 px-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-2 rounded-full border border-blue-500/30 mb-4">
            <span className="text-blue-400 font-semibold text-sm">FROM OUR KITCHEN</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Latest Food Stories & Tips
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore culinary insights, recipes, and food trends from our expert chefs
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl overflow-hidden border border-white/10 hover:border-green-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/20"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-4 text-xs text-gray-400 mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formatDate(blog.date)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{blog.readTime}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors line-clamp-2">
                  {blog.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {blog.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="flex items-center gap-1 text-xs text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20"
                    >
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Author & Read More */}
                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <span className="text-sm text-gray-400">by {blog.author}</span>
                  <Link
                    to={`/blog/${blog.id}`}
                    className="flex items-center gap-1 text-green-400 font-semibold text-sm group-hover:gap-2 transition-all"
                  >
                    Read More
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>

              {/* Bottom Accent */}
              <div className="h-1 w-0 group-hover:w-full transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-600"></div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:shadow-2xl hover:shadow-green-500/50 hover:scale-105 transition-all duration-300"
          >
            View All Articles
            <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogSection;