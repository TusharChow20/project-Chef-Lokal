import React from "react";
import Hero from "../../Componnents/Hero/Hero";
import DailyMenu from "./DailyMenu";
import Reviews from "./Reviews";
import WhyChooseUs from "./WhyChooseUs";
import OrderNow from "./OrderNow";

const Home = () => {
  return (
    <>
      <Hero></Hero>
      <DailyMenu></DailyMenu>
      <Reviews></Reviews>
      <WhyChooseUs></WhyChooseUs>
      <OrderNow></OrderNow>
    </>
  );
};

export default Home;
