import React, { useEffect, useState } from "react";
import axios from "axios";
import ReviewSlider from "./ReviewSlider";

export default function ApprovedReviews() {
  const [approvedReviews, setApprovedReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get("http://localhost:8080/reviews");
        const allReviews = res.data.reviews;

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
