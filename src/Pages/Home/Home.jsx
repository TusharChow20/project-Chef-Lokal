import React from "react";
import Hero from "../../Componnents/Hero/Hero";
import DailyMenu from "./DailyMenu";
import Reviews from "./Reviews";

const Home = () => {
  return (
    <>
      <Hero></Hero>
      <DailyMenu></DailyMenu>
      <Reviews></Reviews>
    </>
  );
};

export default Home;
