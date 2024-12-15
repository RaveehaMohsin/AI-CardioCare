import React, {  useState } from "react";
import "./modal.css";
import { FaHeart } from "react-icons/fa"; // Heart icon for "Add Disease"
import Swal from "sweetalert2";

const AddDisease = ({ isOpen, onCancel }) => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [restingBP, setRestingBP] = useState("");
  const [cholesterol, setCholesterol] = useState("");
  const [fastingBS, setFastingBS] = useState("");
  const [maxHR, setMaxHR] = useState("");
  const [exerciseAngina, setExerciseAngina] = useState("");
  const [oldPeak, setOldPeak] = useState("");
  const [smoking, setSmoking] = useState("");
  const [hyperTension, setHyperTension] = useState("");
  const [diabetes, setDiabetes] = useState("");
  const [familyHistory, setFamilyHistory] = useState("");
  const [chestPainType, setChestPainType] = useState("");
  const [restingECG, setRestingECG] = useState("");
  const [stSlope, setStSlope] = useState("");




  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form data (same as before)
    if (age < 1 || age > 120) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Age must be between 1 and 120.",
      });
      return;
    }
  
    if (restingBP < 50 || restingBP > 300) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Resting BP must be between 50 and 300.",
      });
      return;
    }
  
    if (cholesterol < 60 || cholesterol > 500) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Cholesterol must be between 60 and 500.",
      });
      return;
    }
  
    if (oldPeak < 0 || oldPeak > 10) {
      Swal.fire({
        icon: "error",
        title: "Invalid Input",
        text: "Old peak must be between 0 and 10.",
      });
      return;
    }
  
    // Prepare data for prediction
    const diseaseData = {
      Age: parseInt(age),  // Ensure Age is a float
      Sex: gender === "Male" ? 1 : 0,  // Male = 1, Female = 0 (adjust as needed)
      RestingBP: parseInt(restingBP),  // Ensure RestingBP is a float
      Cholesterol: parseInt(cholesterol),  // Ensure Cholesterol is a float
      FastingBS: fastingBS === "1" ? 1 : 0,  // Ensure FastingBS is an int (0 or 1)
      MaxHR: parseInt(maxHR),  // Ensure MaxHR is a float
      ExerciseAngina: exerciseAngina === "1" ? 1 : 0,  // Yes = 1, No = 0 (adjust as needed)
      Oldpeak: parseFloat(oldPeak),  // Ensure Oldpeak is a float
      Smoking: smoking === "1" ? 1 : 0,  // Smoking should be 0 or 1
      HyperTension: hyperTension === "1" ? 1 : 0,  // HyperTension should be 0 or 1
      Diabetes: diabetes === "1" ? 1 : 0,  // Diabetes should be 0 or 1
      FamilyHistory: familyHistory === "1" ? 1 : 0,  // FamilyHistory should be 0 or 1
      ChestPainType_ASY: chestPainType === "ASY" ? 1 : 0,
      ChestPainType_ATA: chestPainType === "ATA" ? 1 : 0,
      ChestPainType_NAP: chestPainType === "NAP" ? 1 : 0,
      ChestPainType_TA: chestPainType === "TA" ? 1 : 0,
      RestingECG_LVH: restingECG === "LVH" ? 1 : 0,
      RestingECG_Normal: restingECG === "Normal" ? 1 : 0,
      RestingECG_ST: restingECG === "ST" ? 1 : 0,
      ST_Slope_Down: stSlope === "Down" ? 1 : 0,
      ST_Slope_Flat: stSlope === "Flat" ? 1 : 0,
      ST_Slope_Up: stSlope === "Up" ? 1 : 0,
  };
  console.log(diseaseData)
  
  
    // FastAPI endpoint URL
    const url = "http://127.0.0.1:8000/predict";
  
    try {
      // Make POST request to FastAPI backend
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(diseaseData),
      });
  
      // Parse the JSON response
      const data = await response.json();
  
      // Check if the response contains the prediction
      if (data.prediction) {
        // Display prediction using SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Prediction Result",
          text: `Prediction: ${data.prediction} with probability: ${data.probability}`,
          confirmButtonText: "OK",
        });
      } else {
        // Handle any errors from the server
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Failed to get prediction from the server.",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      // Handle errors in the API request
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "An unexpected error occurred while making the prediction.",
      });
    }
  };
  

  if (!isOpen) return null;

  return (
    <>
      <div className="backdrop" onClick={onCancel}></div>

      <dialog open className={"room-dialog sidebar-closed"}>
        <h2 className="h2class">
          Add Information <FaHeart className="icon1" />
        </h2>
        <form onSubmit={handleSubmit}>
          <p>
            <label className="labelclass">Age</label>
            <input
              className="inputclass"
              type="number"
              min="1"
              max="120"
              placeholder="Enter Age (1-120)"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              required
            />
          </p>

          <p>
            <label className="labelclass">Gender</label>
            <select
              className="inputclass"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </p>

          <p>
            <label className="labelclass">Resting BP</label>
            <input
              className="inputclass"
              type="number"
              min="50"
              max="300"
              placeholder="Enter Resting BP (50-300)"
              value={restingBP}
              onChange={(e) => setRestingBP(e.target.value)}
              required
            />
          </p>

          <p>
            <label className="labelclass">Cholesterol</label>
            <input
              className="inputclass"
              type="number"
              min="60"
              max="500"
              placeholder="Enter Cholesterol (60-500)"
              value={cholesterol}
              onChange={(e) => setCholesterol(e.target.value)}
              required
            />
          </p>

          <p>
            <label className="labelclass">Fasting Blood Sugar</label>
            <select
              className="inputclass"
              value={fastingBS}
              onChange={(e) => setFastingBS(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="1">High</option>
              <option value="0">Low</option>
            </select>
          </p>

          <p>
            <label className="labelclass">Max Heart Rate</label>
            <input
              className="inputclass"
              type="number"
              min="0"
              max="500"
              placeholder="Enter Max HR (0-500)"
              value={maxHR}
              onChange={(e) => setMaxHR(e.target.value)}
              required
            />
          </p>

          <p>
            <label className="labelclass">Exercise Angina (Chest Pain)</label>
            <select
              className="inputclass"
              value={exerciseAngina}
              onChange={(e) => setExerciseAngina(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </p>

          <p>
          <label className="labelclass">Old Peak</label>
          <input
            className="inputclass"
            type="number"
            min="0"
            max="10"
            step="0.1"  // This allows decimal values
            placeholder="Enter Old Peak (0-10)"
            value={oldPeak}
            onChange={(e) => setOldPeak(parseFloat(e.target.value))}  // Parse as float
            required
          />
        </p>

          <p>
            <label className="labelclass">Smoking</label>
            <select
              className="inputclass"
              value={smoking}
              onChange={(e) => setSmoking(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </p>

          <p>
            <label className="labelclass">HyperTension</label>
            <select
              className="inputclass"
              value={hyperTension}
              onChange={(e) => setHyperTension(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </p>

          <p>
            <label className="labelclass">Diabetes</label>
            <select
              className="inputclass"
              value={diabetes}
              onChange={(e) => setDiabetes(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </p>

          <p>
            <label className="labelclass">Family History</label>
            <select
              className="inputclass"
              value={familyHistory}
              onChange={(e) => setFamilyHistory(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </p>

          <p>
            <label className="labelclass">Chest Pain Type</label>
            <select
              className="inputclass"
              value={chestPainType}
              onChange={(e) => setChestPainType(e.target.value)}
              
              required
            >
              <option value="">Select</option>
              <option value="ASY">ASY</option>
              <option value="ATA">ATA</option>
              <option value="NAP">NAP</option>
              <option value="TA">TA</option>
            </select>
          </p>

          <p>
            <label className="labelclass">Resting ECG</label>
            <select
              className="inputclass"
              value={restingECG}
              onChange={(e) => setRestingECG(e.target.value)}
              required
            >
               <option value="">Select</option>
              <option value="Normal">Normal</option>
              <option value="ST">ST-T wave abnormality</option>
              <option value="LVH">Left ventricular hypertrophy</option>
            </select>
          </p>

          <p>
            <label className="labelclass">ST Slope</label>
            <select
              className="inputclass"
              value={stSlope}
              onChange={(e) => setStSlope(e.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="Up">Up</option>
              <option value="Flat">Flat</option>
              <option value="Down">Down</option>
            </select>
          </p>

          <div className="button-container">
            <button type="submit" className="buttonmodalclass">
              Add Disease
            </button>
            <button type="button" onClick={onCancel} className="buttonmodalclass cancel">
              Cancel
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default AddDisease;
