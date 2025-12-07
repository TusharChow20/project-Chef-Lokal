import { useLocation, useNavigate } from "react-router";
import PillNav from "../Navbar/pillnav";
import logo from "/logo.png";
import { useAuth } from "../../Hooks/useAuth";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logOut } = useAuth();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Create navigation items based on auth status
  const getNavItems = () => {
    const baseItems = [
      { label: "Home", href: "/" },
      { label: "Meals", href: "/meals" },
      { label: "Services", href: "/services" },
    ];

    if (user) {
      return [...baseItems, { label: "Dashboard", href: "/dashboard" }];
    } else {
      return [...baseItems, { label: "Login", href: "/login" }];
    }
  };

  // User profile section to render inside PillNav
  const renderUserSection = () => {
    if (!user) return null;

    return (
      <div className="flex items-center gap-3">
        {/* User Avatar */}
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 shadow-md cursor-pointer hover:border-gray-400 transition-colors">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User"}
              className="w-full h-full object-cover"
              title={user.displayName || user.email}
            />
          ) : (
            <div
              className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-lg"
              title={user.displayName || user.email}
            >
              {user.displayName
                ? user.displayName[0].toUpperCase()
                : user.email
                ? user.email[0].toUpperCase()
                : "U"}
            </div>
          )}
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 active:bg-red-700 transition-colors duration-200 font-medium shadow-md text-sm whitespace-nowrap"
        >
          Logout
        </button>
      </div>
    );
  };

  return (
    <div>
      <PillNav
        logo={logo}
        logoAlt="Chef Lokal"
        items={getNavItems()}
        activeHref={location.pathname}
        className="custom-nav"
        ease="power2.easeOut"
        baseColor="#000000"
        pillColor="#ffffff"
        hoveredPillTextColor="#ffffff"
        pillTextColor="#000000"
        rightSection={renderUserSection()}
      />
    </div>
  );
};

export default Navbar;
