import React, { useContext } from "react";
import { DataContext } from "../Context/UserContext";
import { Navigate } from "react-router-dom";

const ProctedRoute = ({ children }) => {
  const { serverUrl, isAuthenticated, setIsAuthenticated, loading } =
    useContext(DataContext);
  if (loading) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <div>loading.......</div>
      </div>
    );
  }
  return isAuthenticated ? children : <Navigate to={"/login"} />;
};

export default ProctedRoute;
