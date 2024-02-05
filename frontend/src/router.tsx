import { Navigate, createBrowserRouter } from "react-router-dom";
import AccountSettingPage from "./account-setting/pages";
import AuthGuard from "./auth/components/auth-guard";
import LoginPage from "./auth/pages/login";
import RegisterPage from "./auth/pages/register";
import RootErrorPage from "./components/root-error-page";
import RootLayout from "./components/root-layout";
import HomePage from "./home/pages";
import PageNotFound from "./pages/404";
import ChannelPage from "./project/channel/pages";
import InsightPage from "./project/insight/pages";
import ProjectPage from "./project/pages";
import FeedPage from "./project/pages/feed";
import SettingPage from "./project/setting/pages";

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
    path: "/setting",
    element: (
      <AuthGuard>
        <AccountSettingPage />
      </AuthGuard>
    ),
    errorElement: <RootErrorPage />,
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
        element: (
          <div className="w-full flex flex-col items-center mt-[200px]">
            <h1 className="text-4xl font-extrabold text-zinc-500 animate-in slide-in-from-bottom-2">
              Charts
            </h1>
          </div>
        ),
      },
      {
        path: "insight",
        element: <InsightPage />,
      },
      {
        path: "setting",
        element: <SettingPage />,
      },
      {
        path: "channel",
        element: <ChannelPage />,
      },
      {
        path: "channel/:channelId",
        element: <ChannelPage />,
      },
    ],
  },
]);

export default router;
