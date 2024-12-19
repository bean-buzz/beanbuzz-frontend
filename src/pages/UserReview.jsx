import "../styles/UserReview.css";
import ReviewForm from "../components/ReviewForm";

export default function UserReview() {
  return (
    <div className="review-container">
      <p className="review-text">Share Your Experience</p>
      <div>
        <ReviewForm />
      </div>
    </div>
  );
}
