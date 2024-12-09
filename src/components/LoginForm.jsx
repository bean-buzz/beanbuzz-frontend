import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import "../styles/LoginForm.css";

export default function LoginForm({ toggleAuthMode }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // set loading animation
    setStatus("");

    try {
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_URL}/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Store JWT token in localStorage
        localStorage.setItem("jwt", data.jwt);

        // Redirect to the homepage after sign-in
        navigate("/");
      } else {
        setStatus(data.message);
      }
    } catch (err) {
      setStatus("Error connecting to the server");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form-container">
      <h1>Login</h1>
      <form onSubmit={handleOnSubmit} className="login-form">
        <div className="input-group">
          <input
            className="form-input"
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <input
            className="form-input"
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>

        {/* Link to send a forgot password link and receive a valid token */}
        <Link to="/forgot-password">Forgot your password?</Link>

        <button className="submit-btn" type="submit" disabled={isLoading}>
          {isLoading ? "Signing In..." : "Sign In"}
        </button>

        {status && <p className="status">{status}</p>}

        <p className="info-text">Not a member?</p>

        <button className="switch-btn" onClick={toggleAuthMode}>
          Register an account
        </button>
      </form>
    </div>
  );
}
