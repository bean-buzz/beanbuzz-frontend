import React, { useState } from "react";

import "../styles/RegisterForm.css";

export default function RegisterForm({ toggleAuthMode }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Destructure name and value from the event
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "firstName") {
      setFirstName(value);
    } else if (name === "lastName") {
      setLastName(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "phoneNumber") {
      setPhoneNumber(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("");

    console.log(`connecting: ${import.meta.env.VITE_DATABASE_URL}`);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_DATABASE_URL}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName,
            lastName,
            email,
            phoneNumber,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        // Store JWT token in localStorage
        localStorage.setItem("jwt", data.jwt);
        setStatus("Sign-up successful");

        // Clear the input fields after successful sign up
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        setPassword("");
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
    <div className="register-form-container">
      <form onSubmit={handleOnSubmit}>
        <div className="input-group">
          <input
            className="form-input"
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleChange}
            placeholder="First Name"
            required
          />
        </div>

        <div className="input-group">
          <input
            className="form-input"
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleChange}
            placeholder="Last Name"
            required
          />
        </div>

        <div className="input-group">
          <input
            className="form-input"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
        </div>

        <div className="input-group">
          <input
            className="form-input"
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
          />
        </div>

        <div className="input-group">
          <input
            className="form-input"
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
        </div>

        <button className="submit-btn">Sign Up</button>

        {status && <p className="status">{status}</p>}

        <p className="info-text">Already a member?</p>
        <button className="switch-btn" onClick={toggleAuthMode}>
          Login
        </button>
      </form>
    </div>
  );
}
