import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";
const ProtectedRoute = ({ Component }) => {
  const { user, loading } = useContext(AuthContext); // Access auth state

  if (loading) {
    return <div>Loading...</div>; // Show loading state while auth is checked
  }

  if (!user) {
    return <Navigate to="/" />; // Redirect to the home page if not authenticated
  }

  return <Component />; // Render the protected component if authenticated
};

export default ProtectedRoute;
