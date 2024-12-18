import React from 'react';
import { FaBook } from 'react-icons/fa'; // React Icon for Book
import './EducationResources.css'; // Custom CSS for styling
import UpperHeader from "../../UpperHeader/upperheader";

const EducationResources = () => {
  const userData = JSON.parse(localStorage.getItem("AI-CardioCareUsers"));
  const username = userData.user.firstName + " " + userData.user.lastName;
  const articles = [
    { title: 'Healthy Eating for Heart Health', description: 'Discover the best foods to support heart health.' , link : 'https://pmc.ncbi.nlm.nih.gov/articles/PMC10128075/' },
    { title: 'The Importance of Exercise in Heart Disease Prevention', description: 'Learn how regular physical activity can reduce heart disease risks.', link : 'https://pmc.ncbi.nlm.nih.gov/articles/PMC6481017/' },
    { title: 'Understanding Heart Disease Risk Factors', description: 'Understand the key risk factors and how to manage them.' , link:'https://pmc.ncbi.nlm.nih.gov/articles/PMC9644238/' },
    { title: 'Managing Stress to Improve Heart Health', description: 'Learn techniques to reduce stress and protect your heart.'  , link:'https://www.nhlbi.nih.gov/health/heart-healthy-living/manage-stress'},
    { title: 'The Role of Sleep in Cardiovascular Health', description: 'Understand the connection between quality sleep and heart health.' , link:'https://link.springer.com/article/10.1007/s11883-024-01207-5' },
    { title: 'The Impact of Smoking on Heart Disease', description: 'Discover how smoking affects your heart and how to quit.' , link:'https://www.nhlbi.nih.gov/health/heart/smoking' },
    { title: 'How to Lower Cholesterol for a Healthy Heart', description: 'Find out ways to manage and lower cholesterol levels naturally.' , link:'https://www.health.harvard.edu/heart-health/11-foods-that-lower-cholesterol' },
    { title: 'Understanding Hypertension and Its Effects on the Heart', description: 'Learn about high blood pressure and its impact on cardiovascular health.' , link:'https://www.ncbi.nlm.nih.gov/books/NBK539800/' }
  ];
  
  return (
  <div>
     <UpperHeader title="Report Generator" name={username} />
    <div className="education-resources-container">
      <div className="education-resources-grid">
        {articles.map((article, index) => (
          <div className="education-card" key={index}>
            <div className="card-body">
              <h3 className="article-title">{article.title}</h3>
              <p className="article-description">{article.description}</p>
              <a 
              href={article.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="read-more-btn"
            >
              <FaBook className="me-2" /> Read More
            </a>

            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default EducationResources;
