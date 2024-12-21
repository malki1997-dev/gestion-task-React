import React, { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [error, setError] = useState(null);

  // Récupérer les utilisateurs
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token non disponible");
      }

      const response = await axios.get("https://localhost:7184/api/Admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des utilisateurs :", error);
      setError("Impossible de charger les utilisateurs.");
    } finally {
      setLoading(false);
    }
  };

  // Récupérer les tâches d'un utilisateur spécifique
  const fetchUserTasks = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token non disponible");
      }

      const response = await axios.get(`https://localhost:7184/api/Admin/user/${userId}/tasks`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches de l'utilisateur :", error);
      setError("Impossible de charger les tâches de l'utilisateur.");
    }
  };

  // Supprimer un utilisateur
  const deleteUser = async (userId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token non disponible");
      }

      await axios.delete(`https://localhost:7184/api/Admin/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Supprimer l'utilisateur de l'état local après la suppression
      setUsers(users.filter((user) => user.id !== userId));
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur :", error);
      setError("Impossible de supprimer l'utilisateur.");
    }
  };

  // Sélectionner un utilisateur et récupérer ses tâches
  const handleUserClick = (userId) => {
    setSelectedUser(userId);
    fetchUserTasks(userId);
  };

  useEffect(() => {
    fetchUsers(); // Charger les utilisateurs au montage
  }, []);

  if (loading) {
    return <p>Chargement...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-5">Gestion des Tâches Utilisateurs (Admin)</h1>

      <div className="mb-5">
        <h2 className="text-xl">Utilisateurs</h2>
        <table className="table-auto w-full border mt-5">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Nom d'utilisateur</th>
              <th className="border px-4 py-2">Rôle</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="border px-4 py-2">{user.username}</td>
                <td className="border px-4 py-2">{user.role}</td>
                <td className="border px-4 py-2 flex space-x-2">
                  <button
                    className="text-blue-500"
                    onClick={() => handleUserClick(user.id)}
                  >
                    Voir les tâches
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => deleteUser(user.id)}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedUser && (
        <div>
          <h2 className="text-xl">Tâches de l'utilisateur</h2>
          <table className="table-auto w-full border mt-5">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Titre</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Date de création</th>
                <th className="border px-4 py-2">Statut</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="border px-4 py-2">{task.title}</td>
                  <td className="border px-4 py-2">{task.description}</td>
                  <td className="border px-4 py-2">{task.dateCreation}</td>
                  <td className="border px-4 py-2">{task.etat}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
