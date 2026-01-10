import React from "react";
import Hero from "../../Componnents/Hero/Hero";
import DailyMenu from "./DailyMenu";
import Reviews from "./Reviews";
import WhyChooseUs from "./WhyChooseUs";
import OrderNow from "./OrderNow";
import FeaturedCategories from "./FeaturedCategories";
import Statistics from "./Statistics";
import PricingPlans from "./PricingPlan";
import BlogSection from "./BloggSection";
import HowItWorks from "./HowItWorks";

const Home = () => {
  return (
    <>
      <title>Home- Chef Lokal</title>
      <Hero></Hero>
      <DailyMenu></DailyMenu>
      <Reviews></Reviews>
      <FeaturedCategories></FeaturedCategories>
      <WhyChooseUs></WhyChooseUs>
      <HowItWorks></HowItWorks>
      <PricingPlans></PricingPlans>

      <BlogSection></BlogSection>
      <Statistics></Statistics>
      <OrderNow></OrderNow>
    </>
  );
};

export default Home;
