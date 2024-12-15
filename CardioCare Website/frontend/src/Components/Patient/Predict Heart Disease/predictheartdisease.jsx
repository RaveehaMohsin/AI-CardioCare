import React, { useState } from 'react';
import Upperheader from "../../UpperHeader/upperheader";
import './predictheartdisease.css';
import heartImage from '../../../Assets/heart.jpg';

export default function PredictHeartDisease() {
  const userData = JSON.parse(localStorage.getItem("AI-CardioCareUsers"));
  const currentuser = userData.user;
  const username = currentuser.firstName + " " + currentuser.lastName;

  const [formData, setFormData] = useState({
    age: '',
    sex: '',
    cp: '',
    trestbps: '',
    chol: '',
    fbs: '',
    restecg: '',
    thalach: '',
    exang: '',
    oldpeak: '',
    slope: '',
    ca: '',
    thal: '',
  });

  // State for image upload
  const [labReport, setLabReport] = useState(null);
  const [labReportError, setLabReportError] = useState('');

  // State for prediction result
  const [prediction, setPrediction] = useState(null);
  const [isManualInput, setIsManualInput] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.size < 5000000) { // Check file size (limit to 5MB)
      if (file.type.includes("image")) {
        setLabReport(file);
        setLabReportError('');
      } else {
        setLabReportError('Please upload a valid image file.');
      }
    } else {
      setLabReportError('File is too large. Please upload a file smaller than 5MB.');
    }
  };

  const handleSubmit = async () => {
    // Ensure the form is valid
    if (!labReport && Object.values(formData).some(value => value === '')) {
      alert('Please fill in the required details or upload a lab report.');
      return;
    }

    // Example API endpoint
    const apiEndpoint = 'https://your-api.com/predict-heart-disease';

    // Prepare data
    const data = new FormData();
    if (labReport) {
      data.append('labReport', labReport);
    } else {
      data.append('formData', JSON.stringify(formData));
    }

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: data,
      });

      const result = await response.json();
      setPrediction(result.prediction);
      setFormData({ age: '', sex: '', cp: '', trestbps: '', chol: '', fbs: '', restecg: '', thalach: '', exang: '', oldpeak: '', slope: '', ca: '', thal: '' });
      setLabReport(null); // Clear uploaded file
    } catch (error) {
      console.error('Error predicting heart disease:', error);
      setPrediction('Error occurred while predicting. Please try again.');
    }
  };

  return (
    <div>
    <Upperheader title="Predict Heart Disease" name={username} />
    <div className="predict-heart-disease-container">
      
      
      {/* Informational Section */}
      <section className="predict-heart-disease-info-section">
        <img src={heartImage} alt="Heart" className="predict-heart-disease-heart-image" />
        <div className="predict-heart-disease-info-text">
          <h2>Understanding Heart Disease</h2>
          <p>
            Heart disease remains one of the leading causes of death globally. Early detection and lifestyle changes can significantly reduce the risk. Use this tool to assess your heart health by uploading your lab reports or entering your health details manually.
          </p>
        </div>
      </section>

      {/* Input Section */}
      <section className="predict-heart-disease-input-section">
        <h2>Provide Your Health Details</h2>
        <div className="predict-heart-disease-input-options">
          {/* Toggle between Upload and Manual Input */}
          <div className="toggle-buttons">
            <button 
              className={isManualInput ? 'active' : ''} 
              onClick={() => setIsManualInput(true)}>
              Enter Details Manually
            </button>
            <button 
              className={!isManualInput ? 'active' : ''} 
              onClick={() => setIsManualInput(false)}>
              Upload Lab Report
            </button>
          </div>

          {/* Image Upload Section */}
          {!isManualInput && (
            <div className="predict-heart-disease-upload-section">
              <h3>Upload Lab Report</h3>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
              {labReportError && <p className="error">{labReportError}</p>}
            </div>
          )}

          {/* Manual Entry Section */}
          {isManualInput && (
            <div className="predict-heart-disease-manual-entry">
              <h3>Enter Details Manually</h3>
              <form className="predict-heart-disease-form">
                <div className="predict-heart-disease-form-group">
                  <label htmlFor="age">Age:</label>
                  <input type="number" name="age" value={formData.age} onChange={handleInputChange} />
                </div>
                <div className="predict-heart-disease-form-group">
                  <label htmlFor="sex">Sex:</label>
                  <select name="sex" value={formData.sex} onChange={handleInputChange}>
                    <option value="">Select</option>
                    <option value="1">Male</option>
                    <option value="0">Female</option>
                  </select>
                </div>
                {/* Repeat form groups for the other fields */}
              </form>
            </div>
          )}
        </div>
        <button className="predict-heart-disease-submit-button" onClick={handleSubmit}>Generate Result</button>
      </section>

      {/* Result Section */}
      <section className="predict-heart-disease-result-section">
        {prediction ? (
          <div>
            <h3>Your Prediction:</h3>
            <p className="predict-heart-disease-prediction">{prediction}</p>
          </div>
        ) : (
          <p>Prediction result will appear here.</p>
        )}
      </section>
    </div>
    </div>
  );
}
