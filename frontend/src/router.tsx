import { createBrowserRouter } from "react-router-dom";
import RootErrorPage from "./components/root-error-page";
import RootLayout from "./components/root-layout";
import HomePage from "./home/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootErrorPage />,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
