import React, { useState, useEffect } from "react";
import "./patientview.css";
import { FaUser } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import Upperheader from "../../UpperHeader/upperheader"

const PatientViewAdmin = () => {
  const history = useHistory();
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const handleStudentViewProfile = (userId)=>{
    history.push(`/admin/patientsview/patientpersonprofile/${userId}`);
  }

  const [tableData, setTableData] = useState([]);
  const [images, setImages] = useState([]);
  const userData = JSON.parse(localStorage.getItem("AI-CardioCareUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;

  // Fetch students data on component mount
  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      // Make the fetch request to your backend endpoint
      const response = await fetch("http://localhost:4000/getpatients"); // Replace with your API URL
      if (response.ok) {
        const data = await response.json(); // Parse the JSON response
        setTableData(data); // Update state with the fetched data
        const studentImages = data.map((student) => {
          return student.Img
            ? `http://localhost:4000${student.Img}`
            : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTe-GsgDIkePXBSguri_zUGTWG0YEY1hMaKNw&s"; // Fallback to C1 if Img is missing
        });
        setImages(studentImages);
      } else {
        console.error("Failed to fetch students data");
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  return (
    <div>
      <Upperheader title="View Patients" name={username} />

      <div className="content-container">
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>ID </th>
                <th>Patient Name </th>
                <th>Gender </th>
                <th>DOB </th>
                <th>City </th>
                <th>Country</th>
                <th>View</th>
              </tr>
            </thead>

            <tbody>
              {tableData.map((item, index) => (
                <tr key={item.id}>
                  <th>{item.userId}</th>
                  <td>
                    <img
                      src={images[index]} // Use fallback image if 'img' is missing
                      alt={item.name}
                      className="table-profile-image"
                    />
                    {item.firstName} {item.lastName}
                  </td>
                  <td>{item.Gender}</td>
                  <td>{item?.DOB ? formatDate(item?.DOB) : "Not set"}</td>
                  <td>{item.City}</td>
                  <td>{item.Country}</td>
                  <td>
                    <button className="view-button" onClick={()=>handleStudentViewProfile(item.userId)}>
                      <FaUser />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientViewAdmin;
