import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

import "../styles/ResetPassword.css";

export default function ResetPassword() {
  // Get the token from the URL
  const { token } = useParams();
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {}, [token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(
      `${import.meta.env.VITE_DATABASE_URL}/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      }
    );

    if (response.ok) {
      setMessage("Your password has been reset successfully.");

      localStorage.removeItem("jwt");
      navigate("/");
    } else {
      setMessage("Error resetting password.");
    }
  };

  return (
    <div className="user-auth-container">
      <div className="reset-form-container">
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              className="form-input"
              type="password"
              id="password"
              name="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button className="submit-btn" type="submit">
            Reset Password
          </button>
          {message && <p>{message}</p>}
        </form>
      </div>
    </div>
  );
}
