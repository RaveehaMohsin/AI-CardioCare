import React, { useState, useEffect } from "react";
import './recommendation.css'
import Upperheader from "../../UpperHeader/upperheader";
import { FaRunning, FaAppleAlt, FaAdjust, FaExclamationTriangle } from 'react-icons/fa'; // Importing icons
import Sitnspin from "../../Loading Spinners/SitnSpin/sitnspin";

export default function Recommendation() {
  const userData = JSON.parse(localStorage.getItem("AI-CardioCareUsers"));
  const username = `${userData.user.firstName} ${userData.user.lastName}`;
  const [healthData, setHealthData] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHealthData = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/gethealth/${userData.user.userId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
  
        if (!response.ok) throw new Error("Failed to fetch health details.");
        const data = await response.json();
        setHealthData(data)
        console.log(data);
  
        const prompt = `
          Based on the provided user health metrics, please generate personalized recommendations for the following:
          
          1. **Age**: ${data.age}
          2. **Gender**: ${data.gender}
          3. **Resting Blood Pressure**: ${data.restingBP} mmHg
          4. **Cholesterol Level**: ${data.cholesterol} mg/dL
          5. **Fasting Blood Sugar**: ${data.fastingBS}
          6. **Maximum Heart Rate**: ${data.maxHR} bpm
          7. **Exercise Induced Angina**: ${data.exerciseAngina === 'No' ? 'No' : 'Yes'}
          8. **Old Peak (ST Depression)**: ${data.oldPeak === '0' ? 'No' : data.oldPeak}
          9. **Smoking**: ${data.smoking === 'No' ? 'No' : 'Yes'}
          10. **Hypertension**: ${data.hyperTension === 'Yes' ? 'Yes' : 'No'}
          11. **Diabetes**: ${data.diabetes === 'No' ? 'No' : 'Yes'}
          12. **Family History of Heart Disease**: ${data.familyHistory === 'Yes' ? 'Yes' : 'No'}
          13. **Chest Pain Type**: ${data.chestPainType}
          14. **Resting ECG**: ${data.restingECG}
          15. **ST Slope**: ${data.stSlope}
          16. **Prediction Result**: ${data.predictionResult} with a probability of ${data.probability * 100}%.
  
          Please provide the following recommendations:
          
          **Dietary Recommendations**:
          - Based on the health data provided, what diet should the user follow to maintain or improve heart health?Only in one short paragraph(5-6lines).
  
          **Exercise and Physical Activity**:
          - Suggest a suitable exercise or physical activity routine for the user, considering their health status (such as heart rate, blood pressure, and any medical conditions).Only in one short paragraph(5-6lines).
  
          **Lifestyle Changes**:
          - Recommend lifestyle changes that could help improve the user's overall health, especially related to heart health.Only in one short paragraph(5-6lines).
  
          **Warning Signs to Watch For**:
          - List any warning signs or symptoms that the user should be aware of, and advise what to do if they notice these signs.Only in one short paragraph(5-6lines).
        `;
  
        const aiResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${process.env.REACT_APP_API_KEY}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [
                {
                  parts: [
                    {
                      text: prompt,
                    },
                  ],
                },
              ],
            }),
          }
        );
  
        const recommendationData = await aiResponse.json();
        console.log(recommendationData);
  
        // Extract the text from the nested structure
        const recommendationsText = recommendationData?.candidates?.[0]?.content?.parts?.[0]?.text || 'No recommendation data available';
  
        // Regular expressions to extract sections and their content
        const extractSectionContent = (sectionTitle) => {
          const regex = new RegExp(`(?<=\\*\\s*${sectionTitle}:)(.*?)(?=\\*\\s*\\w+:|$)`, 'gs');
          const matches = [...recommendationsText.matchAll(regex)];
          return matches.map(match => match[0].trim());
        };

                // Regular expressions to extract sections and their content
        const extractSectionContentBetweenTitles = (startTitle, endTitle) => {
            // Adjusting the regex to capture everything from startTitle to just before endTitle
            const regex = new RegExp(`(?<=\\*\\s*${startTitle}:)(.*?)(?=\\*\\s*${endTitle}:|$)`, 'gs');
            
            const matches = [...recommendationsText.matchAll(regex)];
        
            // Process each match to clean up the unwanted symbols like * and **
            return matches.map(match => {
            const cleanedContent = match[0].trim()
                .replace(/\*{1,2}/g, '')  // Removes * or ** symbols
                .replace(/\n/g, ' ')  // Optionally, replace newlines with spaces to maintain readability
                .replace(/\s{2,}/g, ' ');  // Replace multiple spaces with a single space
            
            return cleanedContent;
            });
        };
  
        // Extract the sections
        const dietaryRecommendations = extractSectionContentBetweenTitles('Dietary Recommendations' , 'Exercise and Physical Activity');
        const physicalActivities = extractSectionContentBetweenTitles('Exercise and Physical Activity' , 'Lifestyle Changes');
        const lifestyleChanges = extractSectionContentBetweenTitles('Lifestyle Changes' , 'Warning Signs to Watch For');
        const warningSigns = extractSectionContent('Warning Signs to Watch For');
  
        // Set the extracted data to state
        setRecommendations({
          physicalActivities,
          dietaryRecommendations,
          lifestyleChanges,
          warningSigns,
        });
  
        console.log({ dietaryRecommendations, physicalActivities, lifestyleChanges, warningSigns });

        // Send extracted data to backend
      const healthReportData = {
        physicalActivities,
        dietaryRecommendations,
        lifestyleChanges,
        warningSigns,
      };

  // POST request to save health report
  const postResponse = await fetch(`http://localhost:4000/addhealthreport/${userData.user.userId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(healthReportData),
  });

  if (!postResponse.ok) throw new Error('Failed to add health report.');

  const postData = await postResponse.json();
  console.log('Health report added:', postData);

} catch (error) {
  console.error(error);
} finally {
  setLoading(false);
}
};

fetchHealthData();
}, [userData.user.id]);
  
  
  if (loading) return <div className="spinner">
  <Sitnspin />
</div>

if (!healthData) {
    return (
      <div className="recommendations-container">
        <Upperheader title="Personal Recommendations" name={username} />
        <div className="no-health-data">
          No health recommendations available. Please update your health profile.
        </div>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <Upperheader title="Personal Recommendations" name={username} />

      <div className="recommendations-content">
      <div className="recommendations-header">
      Personalized tips to enhance your well-being based on your current Health
      </div>
  {recommendations && (
    <div className="recommendations-sections">
        
      
      {/* Physical Activities Section */}
      <div className={`recommendations-section ${recommendations.physicalActivities.length ? 'visible' : ''}`}>
        <h3 className="section-title">
          <FaRunning /> Physical Activities
        </h3>
        <ul className="section-list">
          {recommendations.physicalActivities.length ? (
            recommendations.physicalActivities.map((activity, index) => (
              <li key={index} className="section-item">{activity.replace(/\*{1,2}/g, '')}</li>
            ))
          ) : (
            <li className="section-item section-item-empty">* No physical activity recommendations available. *</li>
          )}
        </ul>
      </div>

      {/* Dietary Recommendations Section */}
      <div className={`recommendations-section ${recommendations.dietaryRecommendations.length ? 'visible' : ''}`}>
        <h3 className="section-title">
          <FaAppleAlt /> Dietary Recommendations
        </h3>
        <ul className="section-list">
          {recommendations.dietaryRecommendations.length ? (
            recommendations.dietaryRecommendations.map((diet, index) => (
              <li key={index} className="section-item">{diet.replace(/\*{1,2}/g, '')}</li>
            ))
          ) : (
            <li className="section-item section-item-empty">* No dietary recommendations available. *</li>
          )}
        </ul>
      </div>

      {/* Lifestyle Changes Section */}
      <div className={`recommendations-section ${recommendations.lifestyleChanges.length ? 'visible' : ''}`}>
        <h3 className="section-title">
          <FaAdjust /> Lifestyle Changes
        </h3>
        <ul className="section-list">
          {recommendations.lifestyleChanges.length ? (
            recommendations.lifestyleChanges.map((change, index) => (
              <li key={index} className="section-item">{change.replace(/\*{1,2}/g, '')}</li>
            ))
          ) : (
            <li className="section-item section-item-empty">* No lifestyle change recommendations available. *</li>
          )}
        </ul>
      </div>

      {/* Warning Signs Section */}
      <div className={`recommendations-section ${recommendations.warningSigns.length ? 'visible' : ''}`}>
        <h3 className="section-title">
          <FaExclamationTriangle /> Warning Signs
        </h3>
        <ul className="section-list">
          {recommendations.warningSigns.length ? (
            recommendations.warningSigns.map((warning, index) => (
              <li key={index} className="section-item">{warning.replace(/\*{1,2}/g, '')}</li>
            ))
          ) : (
            <li className="section-item section-item-empty">* No warning signs available. *</li>
          )}
        </ul>
      </div>

    </div>
  )}
</div>


    </div>
  );
};