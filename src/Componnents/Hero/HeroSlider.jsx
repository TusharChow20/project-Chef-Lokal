import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import b1 from "../../assets/b1.png";
import b2 from "../../assets/b2.png";
import b3 from "../../assets/b3.png";
const slides = [
  {
    id: 1,
    image: b1,
  },
  {
    id: 2,
    image: b2,
  },
  {
    id: 3,
    image: b3,
  },
];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

export default function HeroSlider() {
  const [[current, direction], setCurrent] = useState([0, 0]);
  const [autoplay, setAutoplay] = useState(true);

  const paginate = (newDirection) => {
    const newIndex = (current + newDirection + slides.length) % slides.length;
    setCurrent([newIndex, newDirection]);
  };

  useEffect(() => {
    if (!autoplay) return;

    const timer = setInterval(() => {
      paginate(1);
    }, 5000);

    return () => clearInterval(timer);
  }, [current, autoplay]);

  return (
    <div className="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] overflow-hidden  mt-6 rounded-2xl">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={`Slide ${current + 1}`}
            className="w-full h-full object-contain md:object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={() => {
          paginate(-1);
          setAutoplay(false);
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition z-10"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      <button
        onClick={() => {
          paginate(1);
          setAutoplay(false);
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/30 backdrop-blur-sm rounded-full hover:bg-black/50 transition z-10"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrent([index, index > current ? 1 : -1]);
              setAutoplay(false);
            }}
            className={`w-3 h-3 rounded-full transition ${
              index === current ? "bg-white w-8" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
