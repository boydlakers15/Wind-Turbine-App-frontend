import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';
import videoBg from '../assets/rain.mp4';
import axios from 'axios';

const LoginPage = () => {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://wind-turbine-app-backend.onrender.com/users/login",
        {
          userName,
          password,
          email
        },
        { withCredentials: true } // Include this option to send cookies with the request this is an option from cors
      );

      const { isAdmin } = response.data;

      // Check if the user is an admin or regular user
      if (isAdmin) {
        // User is an admin
        // Set the appropriate state values
        setIsLoggedIn(true);
        setIsAdmin(true);
        navigate('/profile'); // Redirect to the profile page for admin
      } else {
        // User is a regular user
        // Set the appropriate state values
        setIsLoggedIn(true);
        setIsAdmin(false);
        navigate('/profile'); // Redirect to the profile page for regular user
      }
    } catch (error) {
      console.log(error);
      setError("Invalid username or password");
    }
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div className="login-page">
      <video className="login-video" src={videoBg} autoPlay loop muted />
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        {isLoggedIn ? (
          <p>You are logged in.</p>
        ) : (
          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="text"
                id="email"
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="username" className="form-label">Username</label>
              <input
                type="text"
                id="username"
                className="form-input"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-button">Login</button>
          </form>
        )}
        {error && <p className="error-message">{error}</p>}
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
