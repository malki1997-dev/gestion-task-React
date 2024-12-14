import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Fonction pour décoder manuellement un token JWT
  const decodeToken = (token) => {
    try {
      const payloadBase64 = token.split(".")[1]; // Extraire la partie payload
      const payloadDecoded = atob(payloadBase64); // Décoder le payload en base64
      return JSON.parse(payloadDecoded); // Retourner l'objet JSON
    } catch (error) {
      console.error("Erreur lors du décodage du token :", error);
      return null;
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7184/api/Auth/login", {
        username,
        password,
      });

      const { token } = response.data; // Récupérer le token
      localStorage.setItem("token", token); // Stocker le token

      // Décoder le token pour récupérer le rôle
      const decodedToken = decodeToken(token);
      if (!decodedToken) {
        alert("Erreur lors du décodage du token");
        return;
      }

      const role = decodedToken.role || decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      console.log("Rôle décodé:", role);

      // Rediriger selon le rôle
      if (role === "Admin") {
        navigate("/admin");
      } else if (role === "User") {
        navigate("/user");
      } else {
        alert("Rôle inconnu");
      }
    } catch (error) {
      // Gestion des erreurs
      alert("Erreur lors de la connexion");
      console.error("Erreur:", error.response || error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-5 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold text-center mb-5">Connexion</h2>
      <form onSubmit={handleLogin}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            Nom d'utilisateur :
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700">
            Mot de passe :
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Connexion
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
