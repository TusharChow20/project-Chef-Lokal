import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import HomeLayout from "../Layouts/HomeLayout";
const router = createBrowserRouter([
  {
    path: "/",
    Component: HomeLayout,
  },
]);

export default router;
