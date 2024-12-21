import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";

import User from "./Components/User";
import Admin from "./Components/Admin";

import Unauthorized from "./Components/Unauthorized"; // Page non autorisée
import ProtectedRoute from "./Components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/Register" element={<RegisterForm />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        {/* Route pour les utilisateurs avec le rôle "User" */}
        <Route
          path="/user"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <User />
            </ProtectedRoute>
          }
        />

        {/* Route pour les utilisateurs avec le rôle "Admin" */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
