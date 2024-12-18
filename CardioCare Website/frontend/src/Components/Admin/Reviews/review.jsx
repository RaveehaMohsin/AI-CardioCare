import React, { useState, useEffect } from "react";
import "./review.css";

export default function Reviews({ title, data }) {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortByRating, setSortByRating] = useState(false);

  const reviewsPerPage = 12;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  // Update reviews when the data prop changes
  useEffect(() => {
    // Check if data is an object with a message (e.g., "No feedback found for admin")
    if (data?.message) {
      setReviews([]); // No reviews to display
    } else {
      setReviews(data); // Set reviews from the data prop
    }
  }, [data]);

  const handleSortByRating = () => {
    setSortByRating((prev) => !prev);
    const sortedReviews = [...reviews].sort((a, b) =>
      sortByRating ? a.rating - b.rating : b.rating - a.rating
    );
    setReviews(sortedReviews);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = reviews?.slice(indexOfFirstReview, indexOfLastReview);

  return (
    <div>
      <div className="reviews-container">
        <h1 className="reviews-title">{title}</h1>

        <div className="reviews-cards-container">
          <button className="sort-button" onClick={handleSortByRating}>
            Sort by Rating {sortByRating ? "↑" : "↓"}
          </button>
        </div>

        {/* Display message if no reviews found */}
        {reviews.length === 0 ? (
          <div className="no-reviews-message">
            <p>{data?.message || "No reviews available at the moment."}</p>
          </div>
        ) : (
          <div className="reviews-cards">
            {currentReviews?.map((review) => (
              <div key={review.FeedbackId} className={`review-card rating-${review.rating}`}>
                {/* From username */}
                <div className="review-from">
                  <span className="label">From : </span>
                  <span>{review.fromFirstName} {review.fromLastName}</span>
                </div>

                {/* Admin name */}
                <div className="review-to">
                  <span className="label">To : </span>
                  <span>{review.toFirstName} {review.toLastName}</span>
                </div>

                {/* Rating */}
                <div className="review-rating" style={{ textAlign: "center" }}>
                  <span className="label">Rating: </span>
                  <span className="stars">
                    {"★".repeat(review.rating)}
                    {"☆".repeat(5 - review.rating)}
                  </span>
                </div>

                {/* Experience */}
                <div className="review-experience">
                  <span className="label">Experience: </span>
                  <span>{review.experience}</span>
                </div>

                {/* Comments */}
                <div className="review-comments" style={{ textAlign: "center" }}>
                  <span className="label">Comments: </span>
                  <span>{review.comments || "-----"}</span>
                </div>

                {/* Submission Date */}
                <div className="review-date" style={{ textAlign: "center" }}>
                  <span className="label">Submission Date: </span>
                  <span>{new Date(review.submissionDate).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {reviews.length > 0 && (
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
