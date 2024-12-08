import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import "../styles/Navbar.css";
import Logo from "../assets/images/Logo.png"; // Import the logo image

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src={Logo} // Replace with your logo path
          alt="Bean Buzz Logo"
          className="logo-image"
        />
      </div>
      <div className={`nav-links ${isMobile ? "mobile-menu" : ""}`}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <h3>Home</h3>
        </NavLink>
        <NavLink
          to="/menu"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <h3>Our Menu</h3>
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <h3>Contact Us</h3>
        </NavLink>
        <Link to="/login" className="login-button">
          LOGIN
        </Link>
      </div>
      <div className="toggle-button" onClick={toggleMobileMenu}>
        {isMobile ? (
          <span className="close-button">&times;</span>
        ) : (
          <span className="hamburger">&#9776;</span>
        )}
      </div>
    </nav>
  );
}
