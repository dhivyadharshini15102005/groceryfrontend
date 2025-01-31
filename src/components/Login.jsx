import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './Login.css'; // Import the CSS for login styling

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        username,
        password,
      });

      if (response.data.success) {
        // Handle successful login
        console.log('Login successful:', response.data);
        // Navigate to the home page or another page
        navigate('/home');
      } else {
        // Handle login failure
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
      alert('An error occurred. Please try again.');
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
          value={username}
          onChange={(e) => setUsername(e.target.value)}
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