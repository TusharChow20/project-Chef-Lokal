import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomeLayout from "../Layouts/HomeLayout";
import Home from "../Pages/Home/Home";
import Meals from "../Pages/Meals/Meals";
import Login from "../Pages/Authentication/Login/Login";
import Registration from "../Pages/Authentication/Registration/Registration";
import MealDetails from "../Pages/Meals/MEalDetails";
import Order from "../Pages/Meals/Order";
import PrivateRoute from "./PrivateRoute";
import AddReviews from "../Pages/Meals/AddReviews";
import DashBoardLayout from "../Layouts/DashBoardLayout";
import MyProfile from "../Pages/DashBoardComponent/MyProfile/MyProfile";
import MyOrders from "../Pages/DashBoardComponent/MyOrders/MyOrders";
import PendingOrders from "../Pages/DashBoardComponent/PendingOrder/PendingOrders";
import ChefRoute from "./ChefRoute";
import ManageUser from "../Pages/DashBoardComponent/ManageUser/ManageUser";
import AdminOnlyRoute from "./AdminRoute";
import CreateMeal from "../Pages/DashBoardComponent/CreateMeal/CreateMeal";
import MangeRequest from "../Pages/DashBoardComponent/ManageRequest/MangeRequest";
import PlatformStat from "../Pages/DashBoardComponent/PlatformStat/PlatformStat";
import MyReviews from "../Pages/DashBoardComponent/MyReviews/MyReviews";
import FavoriteMeal from "../Pages/DashBoardComponent/FavouriteMeal/FavoriteMeal";
import ChefMeal from "../Pages/DashBoardComponent/ChefMeal/ChefMeal";
const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/meals",
        Component: Meals,
      },
      {
        path: "/mealDetails/:id",
        // Component: MealDetails,
        element: (
          <PrivateRoute>
            <MealDetails></MealDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        Component: Registration,
      },
      {
        path: "/orders/:id",
        element: (
          <PrivateRoute>
            <Order></Order>
          </PrivateRoute>
        ),
      },
      {
        path: "/reviews/:id",
        element: (
          <PrivateRoute>
            <AddReviews></AddReviews>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashBoardLayout></DashBoardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "my-profile",
        Component: MyProfile,
      },
      {
        path: "my-orders",
        Component: MyOrders,
      },
      {
        path: "my-reviews",
        Component: MyReviews,
      },
      {
        path: "favorites",
        Component: FavoriteMeal,
      },
      {
        path: "pending-orders",
        element: (
          <ChefRoute>
            <PendingOrders />
          </ChefRoute>
        ),
      },
      {
        path: "create-meals",
        element: (
          <ChefRoute>
            <CreateMeal></CreateMeal>
          </ChefRoute>
        ),
      },
      {
        path: "my-meals",
        element: (
          <ChefRoute>
            <ChefMeal />
          </ChefRoute>
        ),
      },
      {
        path: "order-requests",
        element: (
          <ChefRoute>
            <PendingOrders />
          </ChefRoute>
        ),
      },
      {
        path: "manage-user",
        element: (
          <AdminOnlyRoute>
            <ManageUser />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "manage-request",
        element: (
          <AdminOnlyRoute>
            <MangeRequest />
          </AdminOnlyRoute>
        ),
      },
      {
        path: "platform-statistics",
        element: (
          <AdminOnlyRoute>
            <PlatformStat />
          </AdminOnlyRoute>
        ),
      },
    ],
  },
]);

export default router;
