import React, { useState } from 'react';
import './LoginPage.css';

export default function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [passkey, setPasskey] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && passkey.trim()) {
      onLogin({ username: username.trim(), passkey: passkey.trim() });
    } else {
      alert('Both username and passkey are required.');
    }
  };

  return (
    <div className="login-container" >
      <form className="login-form" onSubmit={handleSubmit}>
        <h2 className="login-title">Welcome Back</h2>
        <label htmlFor="username" className="login-label">Username</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="login-input"
        />
        <label htmlFor="password" className="login-label">Password</label>
        <input
          id="password"
          type="password"
          value={passkey}
          onChange={(e) => setPasskey(e.target.value)}
          className="login-input"
        />
        <button type="submit" className="login-button">Login</button>
      </form>
    </div>
  );
}
