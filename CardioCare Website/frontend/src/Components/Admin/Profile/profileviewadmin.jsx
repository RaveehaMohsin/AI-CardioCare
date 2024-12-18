import React, { useEffect, useState } from "react";
import "../../Patient/Patient View/patientviewprofile.css"
import UpperHeader from "../../UpperHeader/upperheader";
import studentHeader from "../../../Assets/studentheader.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { PiGenderFemaleBold } from "react-icons/pi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaCity } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { VscFeedback } from "react-icons/vsc";
import { useParams } from "react-router-dom";


const AdminProfileView = () => {
  const userData = JSON.parse(localStorage.getItem("AI-CardioCareUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;
  const [currentuserdata , setcurrentuserdata] = useState();
  const [personData, setpersonData] = useState();
  const [personimage, setSelectedImage] = useState();
  const { userId: urlUserId } = useParams();
  const userId = urlUserId || userData.user.userId;

  const [reveiews, setReviews] = useState();


  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };


  useEffect(() => {
    // Calling both functions inside useEffect
    fetchuserProfile();
    fetchPersonProfile();
    fetchReviews();

  }, []); // Empty dependency array ensures this runs once on mount

  const fetchPersonProfile = async () => {
    try {
      const response = await fetch(`http://localhost:4000/getperson/${userId}`);
      const data = await response.json();

      if (data) {
        setpersonData(data);
        // If there's an image, set it
        if (data.Img) {
          setSelectedImage("http://localhost:4000" + data.Img);
        }
      } else {
        console.log("No person data found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchuserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:4000/getuser/${userId}`);
      const data = await response.json();

      if (data) {
        setcurrentuserdata(data);
       
      } else {
        console.log("No User data found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };


  const fetchReviews = async () => {
    try {
      const response = await fetch(`http://localhost:4000/getreview`);
      const data = await response.json();
  
      if (response.ok) {
        const filteredReviews = data.filter((review) => review.toUserId === 2);
        setReviews(filteredReviews);
        console.log(reveiews)
      } else {
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    }
  };


  return (
    <div>
     <UpperHeader title="Profile Preview" name={username} />
      {/* Main container with two columns */}
      <div className="main-container">
      <div className="profile-background-container">
          {/* Personal Profile View section */}
          <div className="profile-container">
            <div className="profile-header">
              <img
                src={studentHeader}
                alt="Header Background"
                className="header-image"
              />
              <div className="profile-picture-container">
                <img
                  src={personimage}
                  alt="Profile"
                  className="profile-picture"
                />
              </div>
            </div>

            <div className="student-name">
            <h2>{currentuserdata?.firstName && currentuserdata?.lastName ? `${currentuserdata.firstName} ${currentuserdata.lastName}` : "Not set"}</h2>
              <p>{currentuserdata?.role}</p>
            </div>

            <div className="personal-info">
              <div className="info-column">
                <div className="cell">
                  <div className="icon-container">
                    <MdOutlineMailOutline className="icon-view" />
                  </div>
                  <p className="heading-text"> Email:</p>
                  <p className="info-text">{currentuserdata?.email}</p>
                </div>

                <div className="cell">
                  <div className="icon-container">
                    <PiGenderFemaleBold className="icon-view" />
                  </div>
                  <p className="heading-text">Gender:</p>
                  <p className="info-text">{personData?.Gender || "Not set"}</p>
                </div>
                <div className="cell">
                  <div className="icon-container">
                    <FaRegAddressCard className="icon-view" />
                  </div>
                  <p className="heading-text">CNIC:</p>
                  <p className="info-text">{personData?.CNIC || "---"}</p>
                </div>
                <div className="cell">
                  <div className="icon-container">
                    <MdOutlineSpeakerNotes className="icon-view" />
                  </div>
                  <p className="heading-text">Address:</p>
                  <p className="info-text">
                    {personData?.Address || "Unavailable"}
                  </p>
                </div>
              </div>

              <div className="info-column">
                <div className="cell">
                  <div className="icon-container">
                    <FaPhone className="icon-view" />
                  </div>
                  <p className="heading-text">Phone No:</p>
                  <p className="info-text">{personData?.PhoneNo || "---"}</p>
                </div>
                <div className="cell">
                  <div className="icon-container">
                    <LiaBirthdayCakeSolid className="icon-view" />
                  </div>
                  <p className="heading-text">DOB:</p>
                  <p className="info-text">
                    {personData?.DOB ? formatDate(personData?.DOB) : "Not set"}
                  </p>
                </div>
                <div className="cell">
                  <div className="icon-container">
                    <FaCity className="icon-view" />
                  </div>
                  <p className="heading-text">City:</p>
                  <p className="info-text">{personData?.City || "Not set"}</p>
                </div>
                <div className="cell">
                  <div className="icon-container">
                    <MdAccountBalance className="icon-view" />
                  </div>
                  <p className="heading-text">Country:</p>
                  <p className="info-text">
                    {personData?.Country || "Not set"}
                  </p>
                </div>
              </div>
            </div>
          </div>
          </div>

        {/* Additional parallel info section */}
        <div className="additional-info-container">
          <div className="info-box">
            <h3>Ratings</h3>
            <span className="stars">
              {"★".repeat(3)}
              {"☆".repeat(5 - 3)}
              <p>
                <i>3 stars</i>
              </p>
            </span>
          </div>

          <div className="info-detail-box">
          <div className="card">
          <div className="line01"></div>
          <div className="card-content">
            <h3>Reviews</h3>
            <div className="progress-bar">
              <div className="progress01">
                <div className="shine"></div>
              </div>
            </div>
            <div className="info-content">
              {reveiews?.map((review, index) => (
                <div key={index} className="feedback">
                  <VscFeedback className="info-content-icon01" />
                  <p>{review?.comments || review?.experience}</p>
                </div>
              ))}
            </div>
          </div>
        </div>


            <div className="for-button">
              <button className="detail-button"> View More </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminProfileView;



