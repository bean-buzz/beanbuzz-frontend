import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/ReviewTable.css";

export default function ReviewTable() {
  const [reviews, setReviews] = useState([]); // State to hold reviews
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    // Fetch reviews data when the component mounts
    axios
      .get("http://localhost:8080/reviews")
      .then((response) => {
        setReviews(response.data.reviews); // Extract reviews array
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setError("Failed to load reviews. Please try again later.");
        setLoading(false);
      });
  }, []);

  // Function to handle review status update
  const handleStatusUpdate = async (id, status) => {
    try {
      // Find the review to be updated
      const reviewToUpdate = reviews.find((review) => review._id === id);

      // Prepare the updated review object
      const updatedReview = {
        userName: reviewToUpdate.userName,
        rating: reviewToUpdate.rating,
        reviewMessage: reviewToUpdate.reviewMessage,
        reviewStatus: status, // Updated status
      };

      // Send PATCH request to update the review
      const response = await axios.patch(
        `http://localhost:8080/reviews/${id}`,
        updatedReview,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Update the local reviews state with the updated review
      setReviews((prevReviews) =>
        prevReviews.map((review) =>
          review._id === id
            ? { ...review, reviewStatus: response.data.reviewStatus }
            : review
        )
      );

      // Refresh the page after the update
      window.location.reload();
    } catch (err) {
      console.error("Error updating review status:", err);
      alert("Failed to update review status. Please try again.");
    }
  };

  if (loading) {
    return <p>Loading reviews...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="review-table-container">
      <h2>Customer Reviews</h2>

      {/* Table for larger screens */}
      <table className="review-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Rating</th>
            <th>Message</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review, index) => (
            <tr key={review._id}>
              <td>{index + 1}</td>
              <td>{review.userName}</td>
              <td>{review.rating} ⭐</td>
              <td>{review.reviewMessage}</td>
              <td>{review.reviewStatus}</td>
              <td>{new Date(review.createdAt).toLocaleDateString()}</td>
              <td>
                <button
                  className="approve-btn"
                  onClick={() => handleStatusUpdate(review._id, "approved")}
                >
                  APPROVE
                </button>
                <button
                  className="decline-btn"
                  onClick={() => handleStatusUpdate(review._id, "declined")}
                >
                  DECLINE
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Cards for mobile screens */}
      <div className="review-card-container">
        {reviews.map((review, index) => (
          <div key={review._id} className="review-card">
            <h3>{review.userName}</h3>
            <p>
              <strong>Rating:</strong> {review.rating} ⭐
            </p>
            <p>
              <strong>Message:</strong> {review.reviewMessage}
            </p>
            <p>
              <strong>Status:</strong> {review.reviewStatus}
            </p>
            <p>
              <strong>Created At:</strong>{" "}
              {new Date(review.createdAt).toLocaleDateString()}
            </p>
            <div className="review-card-actions">
              <button
                className="approve-btn"
                onClick={() => handleStatusUpdate(review._id, "approved")}
              >
                APPROVE
              </button>
              <button
                className="decline-btn"
                onClick={() => handleStatusUpdate(review._id, "declined")}
              >
                DECLINE
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
