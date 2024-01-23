import { Navigate, createBrowserRouter } from "react-router-dom";
import AuthGuard from "./auth/components/auth-guard";
import LoginPage from "./auth/pages/login";
import RegisterPage from "./auth/pages/register";
import RootErrorPage from "./components/root-error-page";
import RootLayout from "./components/root-layout";
import HomePage from "./home/pages";
import PageNotFound from "./pages/404";
import ChannelPage from "./project/channel/pages";
import ProjectPage from "./project/pages";
import FeedPage from "./project/pages/feed";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthGuard>
        <RootLayout />
      </AuthGuard>
    ),
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
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "/project/:projectId",
    element: (
      <AuthGuard>
        <ProjectPage />
      </AuthGuard>
    ),
    errorElement: <RootErrorPage />,
    children: [
      {
        index: true,
        element: <FeedPage />,
      },
      {
        path: "chart",
        element: <div>Charts</div>,
      },
      {
        path: "insight",
        element: <div>Insights</div>,
      },
      {
        path: "setting",
        element: <div>Settings</div>,
      },
      {
        path: "channel",
        element: <ChannelPage />,
        children: [
          {
            path: ":channelId",
            element: <div>Single Channel</div>,
          },
        ],
      },
    ],
  },
]);

export default router;
