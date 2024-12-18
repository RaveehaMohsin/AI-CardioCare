import Upperheader from "../../UpperHeader/upperheader";
import React, { useState, useEffect } from "react";
import Reviews from "./review";  

const SystemReviews = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const userData = JSON.parse(localStorage.getItem("AI-CardioCareUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("http://localhost:4000/getreview"); 
        const data = await response.json();
        setReviewsData(data);

      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  return (
    <div>
      <Upperheader title="View Reviews" name={username} />
      <Reviews title="All reviews to system" data={reviewsData} />
    </div>
  );
};

export default SystemReviews;
