import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./componets/home";
import Login from "./componets/FormContainer/Signup";
// import Otp from "./componets/otp/otp";
import ErrorBoundary from "./componets/ErrorBoundary ";
import { ToastContainer } from 'react-toastify';

const router = createBrowserRouter([
  { path: "/", element:  <Login /> },
  { path: "/home", element: <Home /> },
  //  { path: "/otp", element: <Otp /> }
]);

const App = () => {
  return (
    <ErrorBoundary>
      <ToastContainer draggable />
      <RouterProvider router={router} />
    </ErrorBoundary>
  );
};

export default App;