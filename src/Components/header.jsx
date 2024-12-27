import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="d-flex justify-content-between align-items-center bg-dark text-white p-3 mb-4">
      {/* Icône de gestion des tâches à gauche */}
      <div className="fs-3">
        <i className="fas fa-tasks"></i>
      </div>

      {/* Bouton Logout */}
      <div className="d-flex align-items-center">
        <button
          onClick={handleLogout}
          className="btn btn-danger fw-bold me-3"
        >
          Logout
        </button>
        
        {/* Icône utilisateur */}
        <div className="fs-3">
          <i className="fas fa-user-circle"></i>
        </div>
      </div>
    </header>
  );
};

export default Header;
