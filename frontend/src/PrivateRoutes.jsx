import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext"; // Import the AuthContext

const PrivateRoute = ({ element, ...rest }) => {
  const { user } = useContext(AuthContext); // Get the user from the AuthContext

  return (
    <Route
      {...rest}
      element={user ? element : <Navigate to="/login" />} // If user is authenticated, render the component, else redirect to login
    />
  );
};

export default PrivateRoute;
