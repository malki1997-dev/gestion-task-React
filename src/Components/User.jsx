import React, { useEffect, useState } from "react";
import axios from "axios";

const User = () => {
  const [tasks, setTasks] = useState([]); // Stockage des tâches
  const [loading, setLoading] = useState(true); // État de chargement
  const [error, setError] = useState(null); // Gestion des erreurs
  const [showAddForm, setShowAddForm] = useState(false); // État du formulaire d'ajout
  const [newTask, setNewTask] = useState({ title: "", description: "" }); // Nouvelle tâche
  const [editTask, setEditTask] = useState(null); // Tâche à modifier

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token non disponible");
      }

      const response = await axios.get("https://localhost:7184/api/UserTask/tasks", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(response.data); // Charger les tâches
    } catch (error) {
      console.error("Erreur lors de la récupération des tâches :", error);
      setError("Impossible de charger les tâches.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token non disponible");
      }

      const response = await axios.post(
        "https://localhost:7184/api/UserTask/CreateTask",
        newTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewTask({ title: "", description: "" }); // Réinitialiser le formulaire
      setShowAddForm(false); // Masquer le formulaire après ajout
      fetchTasks(); // Recharger la liste des tâches
    } catch (error) {
      console.error("Erreur lors de l'ajout de la tâche :", error);
      alert("Impossible d'ajouter la tâche.");
    }
  };

  const handleUpdateTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token non disponible");
      }

      await axios.put(
        `https://localhost:7184/api/UserTask/${editTask.id}`,
        editTask,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setEditTask(null); // Réinitialiser la tâche à modifier
      fetchTasks(); // Recharger la liste des tâches
    } catch (error) {
      console.error("Erreur lors de la modification de la tâche :", error);
      alert("Impossible de modifier la tâche.");
    }
  };

  const handleDelete = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token non disponible");
      }

      await axios.delete(`https://localhost:7184/api/UserTask/${taskId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks(tasks.filter((task) => task.id !== taskId)); // Mettre à jour la liste
    } catch (error) {
      console.error("Erreur lors de la suppression de la tâche :", error);
      alert("Échec de la suppression de la tâche.");
    }
  };

  useEffect(() => {
    fetchTasks(); // Charger les tâches au montage
  }, []);

  if (loading) {
    return <p>Chargement des tâches...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10">
      {!showAddForm && !editTask ? (
        <div>
          <h1 className="text-2xl font-bold mb-5">Mes Tâches</h1>
          <button
            className="bg-success text-white px-4 py-2 rounded mb-4 hover:bg-green-600 transition"
            onClick={() => setShowAddForm(true)}
          >
            Ajouter une tâche
          </button>
          <table className="table-auto w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Titre</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">État</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td className="border px-4 py-2">{task.title}</td>
                  <td className="border px-4 py-2">{task.description}</td>
                  <td className="border px-4 py-2">
                    {task.etat === 0 ? "Todo" : task.etat === 1 ? "Doing" : "Done"}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="bg-success px-3 py-1 rounded mr-4"
                      onClick={() => setEditTask(task)}
                    >
                      Modifier
                    </button>
                    <button
                      className="bg-success px-3 py-1 rounded"
                      onClick={() => handleDelete(task.id)}
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <form
          onSubmit={editTask ? handleUpdateTask : handleAddTask}
          className="mb-5 p-4 border rounded bg-gray-100"
        >
          <h2 className="text-xl font-bold mb-4">
            {editTask ? "Modifier la tâche" : "Ajouter une tâche"}
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700">Titre :</label>
            <input
              type="text"
              value={editTask ? editTask.title : newTask.title}
              onChange={(e) =>
                editTask
                  ? setEditTask({ ...editTask, title: e.target.value })
                  : setNewTask({ ...newTask, title: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description :</label>
            <textarea
              value={editTask ? editTask.description : newTask.description}
              onChange={(e) =>
                editTask
                  ? setEditTask({ ...editTask, description: e.target.value })
                  : setNewTask({ ...newTask, description: e.target.value })
              }
              className="w-full p-2 border rounded"
              required
            ></textarea>
          </div>
          {editTask && (
            <div className="mb-4">
              <label className="block text-gray-700">Statut :</label>
              <select
                value={editTask.etat}
                onChange={(e) =>
                  setEditTask({ ...editTask, etat: parseInt(e.target.value) })
                }
                className="w-full p-2 border rounded"
                required
              >
                <option value={0}>Todo</option>
                <option value={1}>Doing</option>
                <option value={2}>Done</option>
              </select>
            </div>
          )}
          <button
            type="submit"
            className="bg-success text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            {editTask ? "Enregistrer" : "Enregistrer"}
          </button>
        </form>
      )}
    </div>
  );
};

export default User;
