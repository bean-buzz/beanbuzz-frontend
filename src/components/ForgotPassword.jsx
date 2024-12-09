import { useState } from "react";

import "../styles/ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setIsLoading(true);
    setStatus("");

    try {
      // Send a request to the backend to send the reset email
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_URL}/request-password-reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus("A reset link has been sent to your email.");
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
    <div className="user-auth-container">
      <div className="password-form-container">
        <h1>Forgot Password</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              className="form-input"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button className="submit-btn" type="submit" disabled={isLoading}>
            {isLoading ? "Sending Link..." : "Send Reset Link"}
          </button>

          {status && <p className="status">{status}</p>}
        </form>
      </div>
    </div>
  );
}
