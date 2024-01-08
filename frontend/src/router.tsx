import { Navigate, Outlet, createBrowserRouter } from "react-router-dom";
import LoginPage from "./auth/pages/login";
import RegisterPage from "./auth/pages/register";
import RootErrorPage from "./components/root-error-page";
import RootLayout from "./components/root-layout";
import HomePage from "./home/pages";
import ProjectPage from "./project/pages";

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
  {
    path: "/auth",
    element: <Navigate to="/auth/login" replace={true} />,
  },
  {
    path: "/auth/register",
    element: <RegisterPage />,
    errorElement: <RootErrorPage />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
    errorElement: <RootErrorPage />,
  },
  {
    path: "/project/:id",
    element: <ProjectPage />,
    errorElement: <RootErrorPage />,
    children: [
      {
        index: true,
        element: <div>Feed</div>,
      },
      {
        path: "charts",
        element: <div>Charts</div>,
      },
      {
        path: "insights",
        element: <div>Insights</div>,
      },
      {
        path: "settings",
        element: <div>Settings</div>,
      },
      {
        path: "channels",
        element: (
          <div className="flex flex-col gap-4">
            <span>Channels</span> <Outlet />
          </div>
        ),
        children: [
          {
            path: ":id",
            element: <div>Single Channel</div>,
          },
        ],
      },
    ],
  },
]);

export default router;
