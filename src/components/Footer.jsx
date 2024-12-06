import React from "react";
import Logo from "../assets/images/Logo.png";
import FacebookIcon from "../assets/images/facebook.png";
import InstagramIcon from "../assets/images/instagram.png";
import TwitterIcon from "../assets/images/twitter.png";
import ListIcon from "../assets/images/listicon.png";
import LocationIcon from "../assets/images/location.png";
import EmailIcon from "../assets/images/email.png";
import PhoneIcon from "../assets/images/phone.png";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-column logo-section">
        <img src={Logo} alt="Bean Buzz Logo" className="footer-logo" />
        <div className="social-icons">
          <a href="https://facebook.com" className="icon">
            <img
              src={FacebookIcon}
              alt="Facebook"
              className="social-icon-image"
            />
          </a>
          <a href="https://instagram.com" className="icon">
            <img
              src={InstagramIcon}
              alt="Instagram"
              className="social-icon-image"
            />
          </a>
          <a href="https://twitter.com" className="icon">
            <img
              src={TwitterIcon}
              alt="Twitter"
              className="social-icon-image"
            />
          </a>
        </div>
      </div>
      <div className="footer-column opening-hours">
        <h4>Opening Hours</h4>
        <ul>
          <li>
            <img src={ListIcon} alt="icon" className="list-icon" />
            Monday: 8.00am - 6.00pm
          </li>
          <li>
            <img src={ListIcon} alt="icon" className="list-icon" />
            Tuesday: 8.00am - 6.00pm
          </li>
          <li>
            <img src={ListIcon} alt="icon" className="list-icon" />
            Wednesday: 8.00am - 6.00pm
          </li>
          <li>
            <img src={ListIcon} alt="icon" className="list-icon" />
            Thursday: 8.00am - 9.00pm
          </li>
          <li>
            <img src={ListIcon} alt="icon" className="list-icon" />
            Friday/Saturday: 8.00am - Late
          </li>
          <li>
            <img src={ListIcon} alt="icon" className="list-icon" />
            Sunday: 8.00am - 10.00pm
          </li>
        </ul>
      </div>
      <div className="footer-column pages">
        <h4>Pages</h4>
        <ul>
          <li>
            <img src={ListIcon} alt="icon" className="list-icon" />
            <a href="/">Home</a>
          </li>
          <li>
            <img src={ListIcon} alt="icon" className="list-icon" />
            <a href="/menu">Our Menu</a>
          </li>
          <li>
            <img src={ListIcon} alt="icon" className="list-icon" />
            <a href="/contact">Contact Us</a>
          </li>
        </ul>
      </div>
      <div className="footer-column contact">
        <h4>Contact</h4>
        <p>
          <img src={LocationIcon} alt="icon" className="list-icon" />
          No 236 Queens Road, Silvan VIC, Australia, 1234
        </p>
        <p>
          <img src={PhoneIcon} alt="icon" className="list-icon" />
          Phone: (03) 739847267
        </p>
        <p>
          <img src={EmailIcon} alt="icon" className="list-icon" />
          Email:{" "}
          <a href="mailto:sys.beanbuzz@gmail.com">sys.beanbuzz@gmail.com</a>
        </p>
      </div>
      <div className="footer-bottom">
        <p>
          Copyright 2024 © All Rights Reserved. Powered & Designed by BeenBuzz
        </p>
      </div>
    </footer>
  );
};

export default Footer;
