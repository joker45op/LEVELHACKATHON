// src/context/AppContext.js
import React, { createContext, useContext, useState } from "react";

// Create a context for app-wide state
const AppContext = createContext();

// A custom hook to access the context easily
export const useAppContext = () => useContext(AppContext);

const AppProvider = ({ children }) => {
  const [responseData, setResponseData] = useState(null); // Store global response data

  const updateResponseData = (data) => {
    setResponseData(data); // Update the response data
  };

  return (
    <AppContext.Provider value={{ responseData, updateResponseData }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
