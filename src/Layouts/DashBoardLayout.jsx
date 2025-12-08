// DashBoardLayout.jsx
import React from "react";
import { Outlet, NavLink } from "react-router";
import {
  Home,
  User,
  ClipboardList,
  Star,
  Heart,
  PanelLeftClose,
  PanelLeft,
} from "lucide-react";
import useRole from "../Hooks/useRole";

const DashBoardLayout = () => {
  const { role } = useRole();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <nav className="navbar w-full bg-base-300">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <PanelLeft className="size-5" />
          </label>
          <div className="px-4 text-lg font-semibold">Dashboard</div>
        </nav>
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>

      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex min-h-full flex-col items-start bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
          <ul className="menu w-full grow">
            {/* Home */}
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                    isActive ? "active" : ""
                  }`
                }
                data-tip="Home"
              >
                <Home className="size-5" />
                <span className="is-drawer-close:hidden">Home</span>
              </NavLink>
            </li>

            {/* Divider */}
            <li className="menu-title is-drawer-close:hidden">
              <span>Dashboard</span>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-profile"
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                    isActive ? "active" : ""
                  }`
                }
                data-tip="My Profile"
              >
                <User className="size-5" />
                <span className="is-drawer-close:hidden">My Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/my-orders"
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                    isActive ? "active" : ""
                  }`
                }
                data-tip="My Orders"
              >
                <ClipboardList className="size-5" />
                <span className="is-drawer-close:hidden">My Orders</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/my-reviews"
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                    isActive ? "active" : ""
                  }`
                }
                data-tip="My Reviews"
              >
                <Star className="size-5" />
                <span className="is-drawer-close:hidden">My Reviews</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/favorites"
                className={({ isActive }) =>
                  `is-drawer-close:tooltip is-drawer-close:tooltip-right ${
                    isActive ? "active" : ""
                  }`
                }
                data-tip="Favorite Meals"
              >
                <Heart className="size-5" />
                <span className="is-drawer-close:hidden">Favorite Meals</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashBoardLayout;
