import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        userName, // match backend field
        password,
      });

      console.log('Login successful:', response.data);

      // If login is successful (status 200), trigger success logic
      if (response.status === 200) {
        if (onLoginSuccess) {
          onLoginSuccess();
        }
        navigate('/'); // Redirect to home
      } else {
        alert(response.data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert('Invalid username or password');
      } else {
        alert('An error occurred. Please try again.');
      }
      console.error('Login failed:', error);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form method="POST" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          id="username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">Login</button>
        <Link to="/signup" className="signup-link">Don't have an account? Signup</Link>
      </form>
    </div>
  );
};

export default Login;
