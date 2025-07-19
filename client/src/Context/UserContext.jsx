import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const DataContext = createContext();

const UserContext = ({ children }) => {
  const serverUrl = "http://localhost:3000";
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const fetchMe = async () => {
    try {
      const res = await axios.post(
        serverUrl + "/me",
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.log("ftech me erro", error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false)
    };
    }
  useEffect(() => {
    fetchMe();
  }, []);

  const value = {
    serverUrl,
    isAuthenticated,
    setIsAuthenticated,
    loading
  };
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export default UserContext;
