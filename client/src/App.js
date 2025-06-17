// App.js
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./componets/home";
import Login from "./componets/FormContainer/Signup";
import ErrorBoundary from "./componets/ErrorBoundary ";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HashLoader from "react-spinners/HashLoader";
import "./App.css";

// 🧠 Import the loader context
import { LoaderProvider, useLoader } from "./LoaderContext";

// 🌀 Component that shows the loader if needed
const GlobalLoader = () => {
  const { loading } = useLoader();
  return loading ? (
    <div className="global-loader">
      <HashLoader color="#36d7b7" size={50} />
    </div>
  ) : null;
};

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/home", element: <Home /> },
]);

// 🧩 Wrap your app logic
const AppWrapper = () => {
  return (
    <>
      <ToastContainer className="Toastify__toast-container" draggable />
      <GlobalLoader />
      <RouterProvider router={router} />
    </>
  );
};

// 🧵 Final export with LoaderProvider
const App = () => {
  return (
    <LoaderProvider>
      <ErrorBoundary>
        <AppWrapper />
      </ErrorBoundary>
    </LoaderProvider>
  );
};

export default App;