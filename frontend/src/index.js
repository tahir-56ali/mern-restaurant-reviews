import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./components/Layout/RootLayout";
import RestaurantsList from "./components/RestaurantsList";
import Restaurant from "./components/Restaurant";
import Login from "./components/Login";
import AddReview from "./components/AddReview";
import AuthProvider from "./store/AuthProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <RestaurantsList /> },
      { path: "/restaurants", element: <RestaurantsList /> },
      { path: "/restaurants/:id", element: <Restaurant /> },
      { path: "/login", element: <Login /> },
      { path: "/restaurants/:id/review", element: <AddReview /> },
    ],
  },
]);

root.render(
  <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
  </AuthProvider>
);
