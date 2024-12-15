import React, { useState } from 'react';
import './predictheartdisease.css';
import heartImage from '../../../Assets/heart.jpg';
import Swal from "sweetalert2";

export default function PredictHeartDisease({ setisbtnclick }) {
  const [isManualInput, setIsManualInput] = useState(false);
  const [file, setFile] = useState(null);

  const handleManualInputClick = () => {
    setIsManualInput(true);
    setisbtnclick(true); // Trigger the modal to show when manually input is selected
  };

  const handleUploadClick = () => {
    setIsManualInput(false); // Hide manual input and go back to file upload
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); // Store the selected file
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://127.0.0.1:8001/extract_values/', {
        method: 'POST',
        body: formData,
      });

      const extractedData = await response.json();

      console.log("Extracted Data: ", extractedData);
      
      // Process the extracted data into the required format
      const diseaseData = {
        Age: parseInt(extractedData.Age),
        Sex: extractedData.Sex === "Male" ? 1 : 0,  // Male = 1, Female = 0 (adjust as needed)
        RestingBP: parseInt(extractedData.RestingBP),
        Cholesterol: parseInt(extractedData.Cholesterol),
        FastingBS: extractedData.FastingBS === "1" ? 1 : 0,
        MaxHR: parseInt(extractedData.MaxHR),
        ExerciseAngina: extractedData.ExerciseAngina === "Yes" ? 1 : 0,
        Oldpeak: parseFloat(extractedData.Oldpeak),
        Smoking: extractedData.Smoking === "Yes" ? 1 : 0,
        HyperTension: extractedData.Hypertension === "Yes" ? 1 : 0,
        Diabetes: extractedData.Diabetes === "Yes" ? 1 : 0,
        FamilyHistory: extractedData["Family History"] === "Yes" ? 1 : 0,
        
        // ChestPainType: Setting multiple options based on the extracted value
        ChestPainType_ASY: extractedData.ChestPainType === "ASY" ? 1 : 0,
        ChestPainType_ATA: extractedData.ChestPainType === "ATA" ? 1 : 0,
        ChestPainType_NAP: extractedData.ChestPainType === "NAP" ? 1 : 0,
        ChestPainType_TA: extractedData.ChestPainType === "TA" ? 1 : 0,
      
        // RestingECG: Setting multiple options based on the extracted value
        RestingECG_LVH: extractedData.RestingECG === "LVH" ? 1 : 0,
        RestingECG_Normal: extractedData.RestingECG === "Normal" ? 1 : 0,
        RestingECG_ST: extractedData.RestingECG === "ST" ? 1 : 0,
      
        // ST_Slope: Setting multiple options based on the extracted value
        ST_Slope_Down: extractedData.ST_Slope === "Down" ? 1 : 0,
        ST_Slope_Flat: extractedData.ST_Slope === "Flat" ? 1 : 0,
        ST_Slope_Up: extractedData.ST_Slope === "Up" ? 1 : 0,
      };
      
      predictHeartDisease(diseaseData);
      
      
      // Handle the extracted data (e.g., display it to the user)
    } catch (error) {
      console.error("Error uploading the file: ", error);
    }
  };

  async function predictHeartDisease(diseaseData) {
    const url = "http://127.0.0.1:8000/predict";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diseaseData),
      });
      const data = await response.json();
      if (data.prediction) {
        Swal.fire({
          icon: "success",
          title: "Prediction Result",
          text: `Prediction: ${data.prediction} with probability: ${data.probability}`,
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to get prediction from the server.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred while making the prediction.",
      });
    }
  }

  

  return (
    <div>
      <div className="predict-heart-disease-container">
        <section className="predict-heart-disease-info-section">
          <img src={heartImage} alt="Heart" className="predict-heart-disease-heart-image" />
          <div className="predict-heart-disease-info-text">
            <h2>Understanding Heart Disease</h2>
            <p>
              Heart disease remains one of the leading causes of death globally. Early detection and lifestyle changes can significantly reduce the risk. Use this tool to assess your heart health by uploading your lab reports or entering your health details manually.
            </p>
          </div>
        </section>

        <section className="predict-heart-disease-input-section">
          <h2>Provide Your Health Details</h2>
          <div className="predict-heart-disease-input-options">
            <div className="toggle-buttons">
              <button style={{ marginRight: "1em" }} onClick={handleManualInputClick}>
                Enter Details Manually
              </button>
              <button onClick={handleUploadClick}>
                Upload Lab Report
              </button>
            </div>

            {!isManualInput && (
              <div className="predict-heart-disease-upload-section">
                <h3>Upload Lab Report</h3>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button style={{margin:"3px"}} className='btn btn-danger' onClick={handleFileUpload}>Upload</button>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
