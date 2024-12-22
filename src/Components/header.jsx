import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="d-flex justify-content-end align-items-center bg-dark text-white p-3">
      {/* Bouton Logout */}
      <button
        onClick={handleLogout}
        className="btn btn-danger fw-bold"
      >
        Logout
      </button>

      {/* Icône à droite */}
      <div className="fs-3">
        <i className="fas fa-user-circle"></i>
      </div>
    </header>
  );
};

export default Header;
