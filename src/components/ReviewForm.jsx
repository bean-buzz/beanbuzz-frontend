import React, { useState } from "react";
import StarRating from "./StarRating";
import Toast from "./Toast";
import axios from "axios";
import "../styles/ReviewForm.css";

export default function ReviewForm() {
  const [createReview, setCreateReview] = useState({
    userName: "",
    rating: 0,
    reviewMessage: "",
    reviewStatus: "declined",
  });

  const handleReviewChange = (event) => {
    const { name, value } = event.target;
    setCreateReview({
      ...createReview,
      [name]: value,
    });
  };

  const handleRatingChange = (rating) => {
    setCreateReview({
      ...createReview,
      rating: rating,
    });
  };

  console.log(createReview);

  const handleCreateReviewSubmit = (e) => {
    e.preventDefault();

    // Send the data as JSON
    const reviewData = {
      userName: createReview.userName,
      rating: createReview.rating,
      reviewMessage: createReview.reviewMessage,
      reviewStatus: createReview.reviewStatus,
    };

    console.log("Submitting Review Data:", reviewData);

    axios
      .post(`http://localhost:8080/reviews`, reviewData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        Toast().fire({
          icon: "success",
          title: "Review created",
        });
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
        Toast().fire({
          icon: "error",
          title: "Error submitting review",
        });
      });
  };

  return (
    <div>
      <div className="review-form">
        <div className="form-content">
          <h2>Leave a Review</h2>

          <form onSubmit={handleCreateReviewSubmit}>
            <div>
              <label htmlFor="userName">Your Name:</label>
              <input
                type="text"
                id="userName"
                name="userName"
                value={createReview.userName}
                onChange={handleReviewChange}
                required
              />
            </div>

            <div>
              <label className="rating" htmlFor="rating">
                How happy are you with our service?
              </label>
              <StarRating
                size={24}
                color="orange"
                maxRating={5}
                id="rating"
                name="rating"
                rating={createReview.rating} // Show current rating
                onSetRating={handleRatingChange}
              />
            </div>

            <div>
              <label className="message" htmlFor="reviewMessage">
                Tell us more about your experience with us:
              </label>
              <textarea
                id="reviewMessage"
                name="reviewMessage"
                value={createReview.reviewMessage}
                onChange={handleReviewChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="submit-button">
              Post Review
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
