// src/components/AuthForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const AuthForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState(''); // New state for email
  const [error, setError] = useState('');
  const [isLogin, setIsLogin] = useState(true); // State to toggle between login and register

  const handleAuth = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const url = isLogin ? 'http://localhost:3000/api/login' : 'http://localhost:3000/api/register';
      const response = await axios.post(url, { username, password, email: isLogin ? undefined : email }); // Send email only if registering

      if (isLogin) {
        // Store the token in local storage if logging in
        localStorage.setItem('token', response.data.token);
        window.location.href = '/dashboard'; // Redirect to the main page
      } else {
        // Optionally, you can show a success message after registration
        alert('Registration successful! You can now log in.');
        setIsLogin(true); // Switch to login mode after registration
      }
    } catch (err) {
      setError(isLogin ? 'Invalid credentials' : 'Error creating account. Please try again.');
    }
  };

  return (
    <div>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleAuth}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {!isLogin && ( // Show email input only when registering
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
        )}
        <button type="submit">{isLogin ? 'Login' : 'Register'}</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>
        {isLogin ? 'Don\'t have an account?' : 'Already have an account?'}
        <button onClick={() => setIsLogin(!isLogin)}>
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
};

export default AuthForm;