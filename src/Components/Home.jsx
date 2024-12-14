import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Rediriger l'utilisateur vers la page de connexion
    navigate("/login");
  }, [navigate]);

  return null; // Pas besoin de rendre du contenu ici car on redirige directement
};

export default Home;
