import { useCallback } from "react";
import { useState, useEffect } from "react";

import VehicleIcon from "../assets/images/homepage/delivery.png";
import FollowIcon from "../assets/images/homepage/followicon.png";
import HomeImage1 from "../assets/images/homepage/homeimage1.jpg";
import HomeImage2 from "../assets/images/homepage/homeimage2.jpg";
import HomeImage3 from "../assets/images/homepage/homeimage3.jpg";
import HomeImage4 from "../assets/images/homepage/homeimage4.jpg";
import HomeImage5 from "../assets/images/homepage/homeimage5.jpg";
import AboutImage1 from "../assets/images/homepage/aboutimage1.jpg";
import AboutImage2 from "../assets/images/homepage/aboutimage2.jpg";

import "../styles/HomePage.css";

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const images = [AboutImage1, HomeImage2, HomeImage5, HomeImage4];

  // Memoize the handleNext function using useCallback
  const handleNext = useCallback(() => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
  }, [images.length]); // Dependency array for handleNext

  // Function to go to the previous slide
  const handlePrev = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? images.length - 1 : prevSlide - 1
    );
  };

  // Function to handle clicking on a dot to select a slide
  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  // Auto slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(handleNext, 5000); // Slide every 5 seconds
    return () => clearInterval(interval); // Clear the interval on component unmount
  }, [handleNext]); // Add handleNext as a dependency

  const handleButtonClick = () => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <>
      {/* Home Section */}
      <section className={`home-section ${showForm ? "blur-background" : ""}`}>
        {/* Button */}
        <button className="delivery-button" onClick={handleButtonClick}>
          <img src={VehicleIcon} alt="Delivery" className="vehicle-icon" />
          Check for Delivery
        </button>

        {/* Image Slider */}
        <div className="slider-container">
          <button className="slider-button prev" onClick={handlePrev}>
            &lt;
          </button>
          <img
            src={images[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="homepage-slider-image"
          />
          <button className="slider-button next" onClick={handleNext}>
            &gt;
          </button>
        </div>

        {/* Slider Dots */}
        <div className="slider-dots">
          {images.map((_, index) => (
            <button
              key={index}
              className={`dot ${currentSlide === index ? "active" : ""}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>

        {showForm && (
          <div className="popup-form">
            <div className="form-content">
              <h2>Check for Delivery</h2>
              <form>
                <label>
                  Name:
                  <input type="text" placeholder="Enter your name" />
                </label>
                <label>
                  Email:
                  <input type="text" placeholder="Enter your email" />
                </label>
                <label>
                  Phone Number:
                  <input type="text" placeholder="Enter your phone number" />
                </label>
                <label>
                  Address:
                  <input type="text" placeholder="Enter your address" />
                </label>
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
              <button className="close-button" onClick={handleCloseForm}>
                Close
              </button>
            </div>
          </div>
        )}
      </section>

      {/* Follow Us Section */}
      <section className="follow-us-section">
        <h2 className="section-heading">NEVER MISS A MENU</h2>
        <p className="section-description">
          Follow us to receive our menus and special offers.
        </p>
        <button className="follow-button">
          <img src={FollowIcon} alt="Follow" className="follow-icon" />
          Follow Us
        </button>
      </section>

      {/* About Us Section */}
      <section className="about-us-section">
        <div className="main-image-container">
          {/* Main blurred image */}
          <img src={AboutImage1} alt="MainImage" className="main-image" />
          <h1 className="main-heading">A Little Bit About BeanBuzz Cafe</h1>
          <div className="image-text-container">
            {/* Left side small image */}
            <div className="small-image-container">
              <img src={AboutImage2} alt="SmallImage" className="small-image" />
            </div>
            {/* Overlay text */}
            <div className="overlay-text">
              Since 2020, BeenBuzz Cafe has been a cozy spot for food lovers,
              offering a warm and inviting space where delicious meals are
              prepared with passion and care. The cafe prides itself on creating
              a welcoming atmosphere, making every dining experience special and
              memorable for guests from all walks of life.
              <br />
              <br />
              Blending culinary excellence with modern technology, BeenBuzz Cafe
              goes beyond serving great food. The cafe boasts a dynamic and
              easily updated menu system, ensuring variety and freshness for its
              patrons. Customers enjoy the convenience of secure payment options
              and a thoughtfully designed loyalty program that rewards repeat
              visits, reinforcing a sense of community and satisfaction.
              BeenBuzz Cafe continues to set a standard for delightful dining
              and innovation.
              <div className="cafe-info">
                <h2>BeenBuzz Cafe</h2>
                <h2>Phone: 123-456-7890</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="user-review-sevtion">
        <div className="review-container">
          <h1>Customer Reviews</h1>
        </div>
      </section>
    </>
  );
}
