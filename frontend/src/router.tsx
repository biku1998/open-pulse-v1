import { createBrowserRouter } from "react-router-dom";
import RootErrorPage from "./components/root-error-page";
import RootLayout from "./components/root-layout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <RootErrorPage />,
    children: [],
  },
]);

export default router;
