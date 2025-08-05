import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";

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
]);

export default router;