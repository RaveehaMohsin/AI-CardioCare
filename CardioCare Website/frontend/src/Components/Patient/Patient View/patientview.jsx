import React, { useEffect, useState } from "react";
import "./patientviewprofile.css";
import UpperHeader from "../../UpperHeader/upperheader";
import studentHeader from "../../../Assets/h.jpg";
import { MdOutlineMailOutline } from "react-icons/md";
import { PiGenderFemaleBold } from "react-icons/pi";
import { LiaBirthdayCakeSolid } from "react-icons/lia";
import { FaCity } from "react-icons/fa";
import { MdAccountBalance } from "react-icons/md";
import { MdOutlineSpeakerNotes } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { FaHeartbeat, FaWeight, FaRunning, FaFemale, FaCheck, FaTimes } from 'react-icons/fa';

const PatientView = () => {
  const userData = JSON.parse(localStorage.getItem("AI-CardioCareUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;
  const [currentuserdata , setcurrentuserdata] = useState();
  const [personData, setpersonData] = useState();
  const [personimage, setSelectedImage] = useState();
  const [health, setHealth] = useState();
  const { userId: urlUserId } = useParams();
  const userId = urlUserId || userData.user.userId;

  useEffect(() => {
    // Calling both functions inside useEffect
    fetchuserProfile();
    fetchPersonProfile();
    fetchHealth();
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

  const fetchHealth = async () => {
    try {
      const response = await fetch(`http://localhost:4000/gethealth/${userId}`);
      const data = await response.json();
   

      if (data) {
        setHealth(data);
       
      } else {
        console.log("No health data found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
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

          <div className="info-detail-box">

          <div className="card">
      <div className="line03"></div>
      <div className="card-content">
        <h3>Health Details</h3>
        <div className="progress-bar">
          <div className="progress03">
            <div className="shine"></div>
          </div>
        </div>
        
        <div className="health-details">
          <div className="detail">
            <FaFemale />
            <span>Age: {health ? health.age : 'Loading...'}</span>
          </div>
          
          <div className="detail">
            <FaHeartbeat />
            <span>Chest Pain Type: {health ? health.chestPainType : 'Loading...'}</span>
          </div>

          <div className="detail">
            <FaWeight />
            <span>Cholesterol: {health ? health.cholesterol : 'Loading...'}</span>
          </div>
          
          <div className="detail">
            <FaRunning />
            <span>Exercise Angina: {health ? health.exerciseAngina : 'Loading...'}</span>
          </div>
          
          <div className="detail">
            <FaCheck />
            <span>Family History: {health ? health.familyHistory : 'Loading...'}</span>
          </div>
          
          <div className="detail">
            <FaTimes />
            <span>Diabetes: {health ? health.diabetes : 'Loading...'}</span>
          </div>

          <div className="detail">
            <FaHeartbeat />
            <span>Fasting BS: {health ? health.fastingBS : 'Loading...'}</span>
          </div>

          <div className="detail">
            <FaHeartbeat />
            <span>Hyper Tension: {health ? health.hyperTension : 'Loading...'}</span>
          </div>

          <div className="detail">
            <FaRunning />
            <span>Max HR: {health ? health.maxHR : 'Loading...'}</span>
          </div>

          <div className="detail">
            <FaHeartbeat />
            <span>Prediction Result: {health ? health.predictionResult : 'Loading...'}</span>
          </div>
          
          <div className="detail">
            <FaHeartbeat />
            <span>Probability: {health ? health.probability : 'Loading...'}</span>
          </div>

          <div className="detail">
            <FaHeartbeat />
            <span>Resting BP: {health ? health.restingBP : 'Loading...'}</span>
          </div>

          <div className="detail">
            <FaHeartbeat />
            <span>Resting ECG: {health ? health.restingECG : 'Loading...'}</span>
          </div>
          
          <div className="detail">
            <FaRunning />
            <span>St Slope: {health ? health.stSlope : 'Loading...'}</span>
          </div>

          <div className="detail">
            <FaCheck />
            <span>Smoking: {health ? health.smoking : 'Loading...'}</span>
          </div>
        </div>

       
      </div>
    </div>



            <div className="for-button">
              <Link to="/progresstracker/degrees">
                <button className="detail-button">
                  {" "}
                  View More in Cardio Tools{" "}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientView;
