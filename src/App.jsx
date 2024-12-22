import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./Components/LoginForm";
import RegisterForm from "./Components/RegisterForm";
import User from "./Components/User";
import Admin from "./Components/Admin";
import Unauthorized from "./Components/Unauthorized";
import ProtectedRoute from "./Components/ProtectedRoute";
import Header from "./Components/header";
import Footer from "./Components/footer";

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/user"
            element={
              <ProtectedRoute allowedRoles={["User"]}>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute allowedRoles={["Admin"]}>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
