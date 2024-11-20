import React from "react";
import { AuthProvider } from "./authContext";

const AppContextProvider = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppContextProvider;