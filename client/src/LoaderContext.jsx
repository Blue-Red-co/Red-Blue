// LoaderContext.js
import { createContext, useState, useContext } from "react";

const LoaderContext = createContext();
const useLoader = () => useContext(LoaderContext);

const LoaderProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};
export {
  LoaderProvider,
  useLoader
}