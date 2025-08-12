import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import DashboardLayout from "../layouts/DashboardLayout"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />
  }
]);

export default router;