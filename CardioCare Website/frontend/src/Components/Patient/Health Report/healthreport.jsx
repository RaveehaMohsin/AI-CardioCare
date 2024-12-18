import React, { useEffect, useState } from 'react';
import { MdDownload } from 'react-icons/md'; // For Download icon
import './HealthReport.css'; // Custom CSS for styling
import UpperHeader from "../../UpperHeader/upperheader";
import { jsPDF } from "jspdf"; // Import jsPDF
import 'jspdf-autotable';
import image from '../../../Assets/landing.jpeg'

const HealthReport = () => {
  const userData = JSON.parse(localStorage.getItem("AI-CardioCareUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;
  const [personData, setpersonData] = useState(null);
  const [currentuserdata, setcurrentuserdata] = useState(null);
  const [health, setHealth] = useState(null);
  const [healthrecommendation, setHealtherecommendation] = useState(null);

  const fetchPersonProfile = async () => {
    try {
      const response = await fetch(`http://localhost:4000/getperson/${userData.user.userId}`);
      const data = await response.json();
      if (data) {
        setpersonData(data);
      } else {
        console.log("No person data found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchuserProfile = async () => {
    try {
      const response = await fetch(`http://localhost:4000/getuser/${userData.user.userId}`);
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
      const response = await fetch(`http://localhost:4000/gethealth/${userData.user.userId}`);
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

  const fetchHealthRecommendations = async () => {
    try {
      const response = await fetch(`http://localhost:4000/gethealthreport/${userData.user.userId}`);
      const data = await response.json();
      if (data) {
        setHealtherecommendation(data);
      } else {
        console.log("No health data found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    fetchuserProfile();
    fetchPersonProfile();
    fetchHealth();
    fetchHealthRecommendations();
  }, []);



  const generatePDF = () => {
    const doc = new jsPDF();
  
    // Set light gray for general text and borders
    const lightGray = [100, 100, 100]; // Light gray RGB color
    const black = [0,0,0]
  
    // Set Header with hospital image and title
    doc.setFontSize(28);
    doc.addImage('data:image/png;base64,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', 'JPEG', 10, 10, 50, 40); // Image positioned 10 units from the left and 10 units from the top 
  
    // Set font to bold for the title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.text("Cardio Care Report", 60, 20); // Title
  
    // Set font to regular for the subtitle
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
    doc.text("Health Report", 60, 30); // Subtitle
  
    // Section 1: Personal Information
    doc.setFont('helvetica', 'bold'); // Bold for the heading
    doc.setFontSize(14);
    doc.text("Personal Information", 14, 50); // Heading
  
    // Set font for the body text (normal Helvetica)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
  
    // Set light gray color for text
    doc.setTextColor(...lightGray); 
  
    // Add some spacing and style to the content
    doc.text(`Name: ${userData.user.firstName} ${userData.user.lastName || 'N/A'}`, 14, 60);
    doc.text(`Email: ${userData.user.email || 'N/A'}`, 14, 70);
    doc.text(`Date of Birth: ${new Date(personData?.DOB).toLocaleDateString() || 'N/A'}`, 14, 90);
    doc.text(`Gender: ${personData?.Gender || 'N/A'}`, 14, 100);
    doc.text(`Phone: ${personData?.PhoneNo || 'N/A'}`, 14, 110);
    doc.text(`Address: ${personData?.Address || 'N/A'}, ${personData?.City || 'N/A'}, ${personData?.Country || 'N/A'}`, 14, 120);
  
    // You can also add bullets or other markers to make each entry stand out
    doc.setFontSize(10);
    doc.text("- ", 10, 60); // Example bullet point before each text line
    doc.text("- ", 10, 70);
    doc.text("- ", 10, 80);
    doc.text("- ", 10, 90);
    doc.text("- ", 10, 100);
    doc.text("- ", 10, 110);
    doc.text("- ", 10, 120);
  
    // Section 2: Health Conditions
    doc.setTextColor(...black); 
    doc.setFont('helvetica', 'bold'); // Bold for the heading
    doc.setFontSize(14);
    doc.text("Health Conditions", 14, 140); // Heading
  
    // Set font for the body text (normal Helvetica)
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(12);
  
    // Set light gray color for text
    doc.setTextColor(...lightGray); 
  
    // Add a small space after the heading for clarity
    doc.text(`Chest Pain Type: ${health?.chestPainType || 'N/A'}`, 14, 155);
    doc.text(`Cholesterol: ${health?.cholesterol || 'N/A'}`, 14, 165);
    doc.text(`Diabetes: ${health?.diabetes || 'N/A'}`, 14, 175);
  
    // Draw a line to separate this group of health conditions
    doc.setDrawColor(...black); // Set border color to light gray
    doc.line(14, 180, 200, 180); // Line separating the section
  
    // Group related health conditions together
    doc.text(`Exercise Angina: ${health?.exerciseAngina || 'N/A'}`, 14, 190);
    doc.text(`Family History: ${health?.familyHistory || 'N/A'}`, 14, 200);
    doc.text(`Fasting BS: ${health?.fastingBS || 'N/A'}`, 14, 210);
  
    // Draw a line to separate this group as well
    doc.line(14, 215, 200, 215); // Line separating the section
  
    // Group the rest of the health conditions
    doc.text(`Hypertension: ${health?.hyperTension || 'N/A'}`, 14, 225);
    doc.text(`Max Heart Rate: ${health?.maxHR || 'N/A'}`, 14, 235);
    doc.text(`Resting BP: ${health?.restingBP || 'N/A'}`, 14, 245);
  
    // Draw a line after the third group of health conditions
    doc.line(14, 250, 200, 250); // Line separating the section
  
    // Last group of health conditions (Resting ECG, Smoking, ST Slope)
    doc.text(`Resting ECG: ${health?.restingECG || 'N/A'}`, 14, 260);
    doc.text(`Smoking: ${health?.smoking || 'N/A'}`, 14, 270);
    doc.text(`ST Slope: ${health?.stSlope || 'N/A'}`, 14, 280);
  
    // Add some space after the last section for clarity
    doc.line(14, 285, 200, 285); // Line after the last entry
  
    // Recommendations section
    doc.setFontSize(12);
    const recommendations = [
      { title: "Dietary Recommendations", content: healthrecommendation?.dietaryRecommendations || "No recommendations available." },
      { title: "Lifestyle Changes", content: healthrecommendation?.lifestyleChanges || "No recommendations available." },
      { title: "Physical Activities", content: healthrecommendation?.physicalActivities || "No recommendations available." },
      { title: "Warning Signs", content: healthrecommendation?.warningSigns || "No recommendations available." }
    ];
  
    // Improved Table Styling
    doc.autoTable({
      startY: 305, // Adjusted to follow the previous section
      head: [['Recommendation', 'Details']], // Header row
      body: recommendations.map(item => [item.title, item.content]),
      theme: 'striped', // Use a striped theme for the table
      styles: {
        fontSize: 10,
        cellPadding: 8,
        halign: 'center', // Center-align text in the cells
        valign: 'middle',
        textColor: [0, 0, 0], // Light gray text color
      },
      headStyles: {
        fillColor: [128, 0, 0], // Light red background color for the header
        textColor: [255, 255, 255], // White text color in header
        fontStyle: 'bold', // Bold font for the header
      },
      alternateRowStyles: {
        fillColor: [230, 230, 230], // Light gray for alternate rows
      },
      columnStyles: {
        0: { cellWidth: 60 }, // Control column width for the title
        1: { cellWidth: 130 }, // Control column width for the content
      },
      margin: { top: 20, left: 14, right: 14, bottom: 20 },
    });
    
    // Save the PDF
    doc.save('health-report.pdf');
  };    
  
  

  return (
    <div>
      <UpperHeader title="Report Generator" name={username} />
      <div className="health-report-container">
      <div className="health-report-card">
        <div className="image-container">
          <img
            src={image} // Add the path to your image here
            alt="Health Report Image"
            className="report-image"
          />
        </div>
        <h2 className="report-title">Health Report Summary</h2>
        <p className="report-description">
          Your health report includes an analysis of your recent test results, heart disease risk predictions, and recommended lifestyle changes.
        </p>
        <div className="report-actions">
          <button
            onClick={generatePDF}
            className="download-btn"
          >
            <MdDownload className="icon1"/> Download Full Report
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default HealthReport;
