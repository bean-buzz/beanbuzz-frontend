import React, { useEffect, useState } from "react";
import ReviewSlider from "./ReviewSlider";

export default function ApprovedReviews() {
  const [approvedReviews, setApprovedReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_DATABASE_URL}/reviews`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const allReviews = data.reviews;

        // Filter approved reviews and get latest 10
        const filteredReviews = allReviews
          .filter((review) => review.reviewStatus === "approved")
          .slice(-10); // Get the latest 10 reviews

        setApprovedReviews(filteredReviews);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <ReviewSlider reviews={approvedReviews} />
    </div>
  );
}
