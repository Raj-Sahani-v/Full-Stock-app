import React, { useEffect } from "react";
import { useContext } from "react";
import { DataContextSymbol } from "./ContextVariable";
import { Navigate } from "react-router";
export const Protected = ({ children }) => {
  const { accessToken, loading } = useContext(DataContextSymbol);
  
  if (loading) {
    return <p> wait.....</p>;
  }

  if (!accessToken) {
  window.location.replace("http://localhost:5173/login");
  return null; 
}



  return children;
};
