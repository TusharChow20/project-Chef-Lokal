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
  },
]);

export default router;
