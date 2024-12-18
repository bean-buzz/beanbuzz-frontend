import React from "react";
import "../styles/Reviewcard.css";

export default function ReviewCard({
  userName,
  createdAt,
  rating,
  reviewMessage,
}) {
  // Function to render stars based on rating
  const renderStars = (rating) => {
    const totalStars = 5;
    return Array.from({ length: totalStars }, (_, index) => (
      <span key={index} className={`star ${index < rating ? "filled" : ""}`}>
        ★
      </span>
    ));
  };

  // Fixing date format and parsing the date
  const formatDate = (date) => {
    const parsedDate = new Date(date);
    if (isNaN(parsedDate)) {
      return "Invalid Date"; // Return a fallback message if the date is invalid
    }
    const options = { year: "numeric", month: "long", day: "numeric" };
    return parsedDate.toLocaleDateString(undefined, options);
  };

  // Extract the first letter of the user's name
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="review-card">
      {/* User info section with logo and username */}
      <div className="user-info">
        <div className="user-logo">{userInitial}</div>
        <h3 className="review-user">{userName}</h3>
      </div>

      <p className="review-date">Reviewed on: {formatDate(createdAt)}</p>
      <div className="review-stars">{renderStars(rating)}</div>
      <p className="review-message">"{reviewMessage}"</p>
    </div>
  );
}
