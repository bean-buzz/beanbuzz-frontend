import React from "react";
import Slider from "react-slick";
import ReviewCard from "./ReviewCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/ReviewSlider.css";

// Custom Left Arrow Component
function LeftArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow left-arrow`} onClick={onClick}>
      ◀
    </div>
  );
}

// Custom Right Arrow Component
function RightArrow(props) {
  const { className, onClick } = props;
  return (
    <div className={`${className} custom-arrow right-arrow`} onClick={onClick}>
      ▶
    </div>
  );
}

export default function ReviewSlider({ reviews }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Default for Desktop
    slidesToScroll: 1,
    autoplay: false, // Disable autoplay
    prevArrow: <LeftArrow />,
    nextArrow: <RightArrow />,
    responsive: [
      {
        breakpoint: 1024, // Tablet view
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Mobile view
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="review-slider">
      <Slider {...settings}>
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            userName={review.userName}
            createdAt={review.createdAt} // Pass createdAt to ReviewCard
            rating={review.rating}
            reviewMessage={review.reviewMessage}
          />
        ))}
      </Slider>
    </div>
  );
}
