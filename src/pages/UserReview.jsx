import UserNavbar from "../components/UserNavbar";
import "../styles/UserReview.css";

export default function UserReview() {
  return (
    <div className="review-container">
      <UserNavbar />
      <p className="review-text">Share Your Experience</p>
    </div>
  );
}
