import React, { useState } from 'react';
import './App.css';

// Reusable Piece: Input Field Component (Requirement: Component Architecture)
const FormInput = ({ label, type, value, onChange, hasError }) => {
  return (
    <div className="input-group">
      <label>{label}</label>
      {/* Template Literals for dynamic CSS (Requirement: Form Feedback) */}
      <input
        type={type}
        className={`input-field ${hasError ? 'border-red' : 'border-gray'}`}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

// Main Application Component
const App = () => {
  // ES6+ Destructuring and React State (Requirement: Modern Syntax & State Management)
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(false);

  // Event Handling (Requirement: Submit Action)
 const handleLogin = (e) => {
  e.preventDefault(); // Requirement: Stop page refresh 
  
  // New Logic: Log in if fields are not empty
  if (credentials.email.length > 0 && credentials.password.length > 0) {
    setIsLoggedIn(true); // Requirement: Show Welcome dashboard [cite: 44]
    setError(false);
  } else {
    setError(true); // Requirement: Show error if empty [cite: 44]
  }
};

  const handleInputChange = (e, field) => {
    setCredentials({ ...credentials, [field]: e.target.value });
  };

  // Conditional Logic: isLoggedIn ? <Dashboard /> : <LoginForm /> (Requirement: Logic Flow)
  return (
    <div className="app-container">
      {isLoggedIn ? (
        <div className="dashboard">
          <h1>Welcome to SkyLine Analytics Dashboard</h1>
          <p>Access Granted. You are now logged in as {credentials.email}.</p>
          <button onClick={() => setIsLoggedIn(false)} className="btn">Logout</button>
        </div>
      ) : (
        <div className="login-card">
          <h2>Project Gatekeeper</h2>
          <p>Enter your credentials to access the platform.</p>
          <form onSubmit={handleLogin}>
            <FormInput
              label="Email"
              type="email"
              value={credentials.email}
              onChange={(e) => handleInputChange(e, 'email')}
              hasError={error}
            />
            <FormInput
              label="Password"
              type="password"
              value={credentials.password}
              onChange={(e) => handleInputChange(e, 'password')}
              hasError={error}
            />
            {error && <p className="error-text">Invalid email or password. Please try again.</p>}
            <button type="submit" className="btn">Login</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;