import React from "react";
import { useRoutes } from "react-router-dom";
import { PATHS } from "./utils";
import Home from "./pages/Home";
import Sample from "./pages/Sample";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import PostsPage from "./pages/PostsPage";
import PostDetailPage from "./pages/PostDetailPage";
import AuthGaurd from "./components/guards/AuthGuard";

const Router = () => {
  const routes = [
    {
      path: PATHS.frontpage,
      element: <LoginPage />,
    },
    {
      path: PATHS.signup,
      element: <SignupPage />,
    },
    {
      path: "",
      element: <AuthGaurd />,
      children: [
        {
          path: PATHS.posts,
          element: <PostsPage />,
        },
        {
          path: PATHS.post,
          element: <PostDetailPage />,
        },
        {
          path: PATHS.home,
          element: <Home />,
        },
        {
          path: PATHS.sample,
          element: <Sample />,
        },
      ],
    },
    { path: "*", element: <LoginPage /> },
  ];

  const element = useRoutes(routes);
  return element;
};

export default Router;
