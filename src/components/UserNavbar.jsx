import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Logo from "../assets/images/Logo.png";
import "../styles/UserNavbar.css";

export default function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setShowDropdown(false);
      }
      if (
        !event.target.closest(".toggle-button") &&
        !event.target.closest(".nav-links")
      ) {
        setIsMobile(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src={Logo} alt="Bean Buzz Logo" className="logo-image" />
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
        <div className="dropdown">
          <h3 className="dropdown-toggle" onClick={toggleDropdown}>
            My Account
          </h3>
          {showDropdown && (
            <div className="dropdown-menu active">
              <NavLink
                to="/user/profile"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                My Profile
              </NavLink>
              <div className="dropdown-divider"></div>
              <NavLink
                to="/user/review"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Review
              </NavLink>
              <div className="dropdown-divider"></div>
              <NavLink
                to="/user/orders"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                My Orders
              </NavLink>
              <div className="dropdown-divider"></div>
              <NavLink
                to="/user/loyalty"
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                Loyalty Rewards
              </NavLink>
            </div>
          )}
        </div>
        <Link to="/auth" className="login-button">
          Logout
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
