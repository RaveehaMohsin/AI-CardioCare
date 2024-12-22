import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faHeartbeat, faTasks, faDatabase } from "@fortawesome/free-solid-svg-icons";
import "./dashboard.css";
import Upperheader from "../../UpperHeader/upperheader";
import RoomBookingsChart from './ratiograph';
import { FaUser } from "react-icons/fa";

export default function HeartDiseaseDashboard() {
  const userData = JSON.parse(localStorage.getItem("AI-CardioCareUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;

  const [allpatients , setPatientsall] = useState();
  const [patients, setPatients] = useState([]);
  const [yespredictions, setPredictionsYes] = useState(0);
  const [nopredictions, setPredictionsNo] = useState(0);

  const fetchpatients = async () => {
    try {
      const response = await fetch('http://localhost:4000/getpatients'); // Adjust API endpoint as necessary
      const data = await response.json();
      setPatientsall(data.length)
      // Slice the first 5 patients from the data
      const firstFivePatients = data.slice(0, 4);
  
      setPatients(firstFivePatients); // Set only the first 5 patients to the state
    } catch (error) {
      console.error('Error fetching patients data:', error);
    }
  };
  

  useEffect(() => {
    fetchData();
    fetchpatients();
  }, []);



  const fetchData = async () => {
    try {
      // Simulated API call (replace with your actual endpoint)
      const response1 = await fetch("http://localhost:4000/gethealthdetails");
  
      // Parse the response data
      const data = await response1.json();
  
      // Initialize arrays to hold the predictions
      const yesArray = [];
      const noArray = [];
  
      // Iterate through the fetched data and categorize predictions
      data.forEach(item => {
        if (item.predictionResult === 'Yes') {
          yesArray.push(item); // Push the item to the 'yes' array
        } else if (item.predictionResult === 'No') {
          noArray.push(item); // Push the item to the 'no' array
        }
      });
  
      // Set the state with the length of the categorized arrays
      setPredictionsYes(yesArray.length);
      setPredictionsNo(noArray.length);
  
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  return (
    <div>
      <Upperheader title="Dashboard" name={username} />

      <div className="dashboard-container">
        <div className="main-metrics">
          <div className="metric-card">
            <div className="icon-title">
              <FontAwesomeIcon icon={faUser} className="icon-dashboard" />
              <h4>Total Patients</h4>
            </div>
            <h2>{allpatients}</h2> {/* Display the count of patients */}
          </div>

          <div className="metric-card">
            <div className="icon-title">
              <FontAwesomeIcon icon={faHeartbeat} className="icon-dashboard" />
              <h4>Predicted Yes</h4>
            </div>
            <h2>{yespredictions}</h2>
          </div>

          <div className="metric-card">
            <div className="icon-title">
              <FontAwesomeIcon icon={faTasks} className="icon-dashboard" />
              <h4>Predicted No</h4>
            </div>
            <h2>{nopredictions}</h2>
          </div>

          <div className="metric-card">
            <div className="icon-title">
              <FontAwesomeIcon icon={faDatabase} className="icon-dashboard" />
              <h4>Model Accuracy</h4>
            </div>
            <h2>97.00%</h2>
          </div>
        </div>

        <div className='empndgraph'>
  <div className="ratiograph">
    <RoomBookingsChart />
  </div>
  <div className="patient-list">
    <div style={{ display: "flex", alignItems: "center" }}>
      <FaUser className="icon" />
      <h6>Patients</h6>
    </div>
    {patients.length > 0 ? (
      patients.map((item) => (
        <div key={item.id} className='employee-card'>
          <img
            src={`http://localhost:4000${item.Img}`}
            alt={item.employeeName}
            className='patient-image'
          />
          <div className='patient-details'>
            <h4 className='patient-name'>{item.firstName} {item.lastName}</h4>
            <p className='patient-contact'>{item.City}</p>
          </div>
        </div>
      ))
    ) : (
      <p>No patients found</p>
    )}
  </div>
</div>
      </div>
    </div>
  );
}
