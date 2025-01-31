import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import './SignUp.css';

const Signup = () => {
  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    console.log('Event triggered');
    try {
      const req = await axios.post('http://localhost:3001/signup', {
        firstName: firstname,
        lastName: lastname,
        userName: username,
        email: email,
        password: password,
      });
      console.log('Signup successful:', req.data);
      navigate('/home'); // Navigate to home page after successful signup
    } catch (err) {
      console.error('Signup error:', err);
    }
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form method="POST" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="signup-btn">Signup</button>
        <Link to="/login" className="login-link">Already have an account? Login</Link>
      </form>
    </div>
  );
};

export default Signup;
