
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HashLoader from "react-spinners/HashLoader";
import { ToastContainer } from "react-toastify";
import ErrorBoundary from "./componets/ErrorBoundary ";
import Home from "./componets/Home/Home";
import Login from "./componets/Login/Signup";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { LoaderProvider, useLoader } from "./LoaderContext";
import IteamCard from "./componets/IteamCard/IteamCard";

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
  { path: "/i", element: <IteamCard /> },
]);


const AppWrapper = () => {
  return (
    <>
      <ToastContainer className="Toastify__toast-container" draggable />
      <GlobalLoader />
      <RouterProvider router={router} />
    </>
  );
};


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