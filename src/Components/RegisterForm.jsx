import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    const userData = { username, password, role };

    try {
      const response = await axios.post('https://localhost:7184/api/Auth/register', userData);
      console.log('Inscription réussie:', response.data);
      setSuccess('Inscription réussie !');
      setError('');
    } catch (error) {
      console.error('Erreur d\'inscription:', error.response?.data || error.message);
      setError('Erreur lors de l\'inscription');
      setSuccess('');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        Inscription <i className="fas fa-user-plus"></i>
      </h2>
      <form className="mx-auto" style={{ maxWidth: '400px' }} onSubmit={handleRegister}>
        <div className="mb-3">
          <label className="form-label">Nom d'utilisateur</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Mot de passe</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Rôle</label>
          <input
            type="text"
            className="form-control"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">S'inscrire</button>
      </form>

      {/* Messages de succès ou d'erreur */}
      {error && <p className="text-danger text-center mt-3">{error}</p>}
      {success && <p className="text-success text-center mt-3">{success}</p>}
    </div>
  );
};

export default RegisterForm;
