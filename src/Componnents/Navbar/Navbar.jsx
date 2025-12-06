import React from "react";
import PillNav from "../Navbar/pillnav";
import logo from "/logo.png";
import { useLocation } from "react-router";
const Navbar = () => {
  const location = useLocation();

  return (
    <div>
      <PillNav
        logo={logo}
        logoAlt="Chef Lokal"
        items={[
          { label: "Home", href: "/" },
          { label: "Meals", href: "/meals" },
          { label: "Services", href: "/services" },
          { label: "Login", href: "/login" },
        ]}
        activeHref={location.pathname}
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
      />
    </div>
  );
};

export default Navbar;
