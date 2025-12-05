import React from "react";
import Navbar from "../Componnents/Navbar/Navbar";
import Footer from "../Componnents/Footer/Footer";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <nav className="flex md:justify-center">
        <Navbar></Navbar>
      </nav>
      <main className="min-h-[calc(100vh-262px)]">
        <Outlet></Outlet>
      </main>
      <footer>
        <Footer></Footer>
      </footer>
    </div>
  );
};

export default HomeLayout;
