import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSecurity from "../../Hooks/useAxiosSecurity";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import {
  Star,
  Quote,
  Utensils,
  PenBoxIcon,
  MessageCircleCode,
} from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";

const Reviews = () => {
  const axiosSecure = useAxiosSecurity();
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosSecure.get("/reviews");
      return res.data;
    },
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={18}
            className={`${
              index < rating
                ? "text-amber-400 fill-amber-400"
                : "text-gray-400 fill-gray-400"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="py-16 px-4to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            What Our Customers Say
          </h2>
          <p className="text-gray-300 text-lg">
            Real reviews from real food lovers
          </p>
        </div>

        {/* Swiper Carousel */}
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          loop={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          }}
          modules={[Pagination, Autoplay]}
          className="pb-12"
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id} className="h-auto">
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl hover:shadow-purple-500/20 transition-all duration-300 p-6 border border-slate-700 hover:border-red-400 group h-full flex flex-col min-h-[400px]">
                {/* User Info */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative flex-shrink-0">
                    <img
                      src={review.userImage}
                      alt={review.userName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-purple-500 group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-slate-800"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-white text-lg truncate">
                      {review.userName}
                    </h3>
                    <p className="text-gray-400 text-sm truncate">
                      {review.userEmail}
                    </p>
                  </div>
                </div>

                {/* Rating & Date */}
                <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                  {renderStars(review.rating)}
                  <span className="text-xs text-gray-400">
                    {formatDate(review.reviewDate)}
                  </span>
                </div>

                {/* Meal Name */}
                <div className="mb-4">
                  <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-4 py-2 rounded-lg border border-purple-500/30">
                    <Utensils size={18} className="text-purple-400" />
                    <span className="font-medium text-purple-300 text-sm">
                      {review.mealName}
                    </span>
                  </div>
                </div>

                {/* Review Text */}
                <div className="flex-1 mb-4">
                  <p className="text-gray-300 leading-relaxed line-clamp-4">
                    "{review.reviewText}"
                  </p>
                </div>

                {/* Quote Icon */}
                <div className="mt-auto flex justify-end opacity-10 group-hover:opacity-20 transition-opacity">
                  <MessageCircleCode size={48} className="text-purple-400" />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        .swiper-pagination-bullet {
          background: #a855f7;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          background: #a855f7;
          opacity: 1;
        }
      `}</style>
    </div>
  );
};

export default Reviews;
