import React, { useState } from "react";
import "./LandingPage.css";
import aiImage from "../../Assets/landing.jpeg";
import teamImage from "../../Assets/raveeha.jpg";
import teamImage2 from "../../Assets/tayyaba.jpeg";
import { FaHeartbeat, FaRobot, FaLightbulb } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

const LandingPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    if (name === 'email') setEmail(value);
    if (name === 'message') setMessage(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/contactus', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (response.ok) {
        setName('');
        setEmail('');
        setMessage('');
        Swal.fire({
          title: 'Success!',
          text: 'Your message has been sent successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        const data = await response.json();
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Something went wrong. Please try again later.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Unable to connect to the server. Please check your internet connection.',
        icon: 'error',
        confirmButtonText: 'OK'
      });     
    }
  };

  return (
    <div className="landing-container">
      {/* Header */}
      <header className="landing-header">
        <div className="logo">Heart Disease Predictor</div>
        <nav className="landing-nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#features" className="nav-link">Features</a>
          <a href="#team" className="nav-link">Team</a>
          <a href="#contact" className="nav-link">Contact</a>
        </nav>
      </header>

      {/* Home Section */}
      <section id="home" className="home-section">
        <h1 className="main-heading">AI-Powered Heart Disease Prediction</h1>
        <p className="sub-heading">Early detection and prevention made smarter with machine learning.</p>
        <button className="cta-button">
          <Link to="/auth" style={{ textDecoration: "none", color: "inherit" }}>
            Get Started
          </Link>
        </button>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2 className="section-title1">About the Project</h2>
        <p className="about-text">
          Our Heart Disease Prediction System leverages cutting-edge Artificial Intelligence 
          and Machine Learning models to predict heart disease risk levels. By analyzing patient 
          health data, the system provides **accurate insights** and **personalized recommendations** 
          for early intervention.
        </p>
        <img src={aiImage} alt="AI Model" className="about-image" />
      </section>

      {/* Features Section */}
      <section id="features" className="services-section">
        <h2 className="section-title1">Key Features</h2>
        <div className="services-cards">
          <div className="service-card">
            <FaHeartbeat className="service-icon" />
            <h3 className="service-title">Risk Assessment</h3>
            <p className="service-description">
              Analyze health data to predict heart disease risk levels with high accuracy.
            </p>
          </div>
          <div className="service-card">
            <FaRobot className="service-icon" />
            <h3 className="service-title">AI Model</h3>
            <p className="service-description">
              Neural Network-driven insights for multi-class risk prediction.
            </p>
          </div>
          <div className="service-card">
            <FaLightbulb className="service-icon" />
            <h3 className="service-title">Personalized Recommendations</h3>
            <p className="service-description">
              Get actionable advice based on your predicted health condition.
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team-section">
        <h2 className="section-title1">Meet the Team</h2>
        <div className="team-members">
          <div className="team-member">
            <img src={teamImage} alt="Team Member" className="team-image" />
            <h3 className="team-name">Raveeha Mohsin</h3>
            <p className="team-role">AI Developer</p>
            <p className="team-bio">
              Raveeha developed and trained the predictive Neural Network model for heart disease classification.
            </p>
          </div>
          <div className="team-member">
            <img src={teamImage2} alt="Team Member" className="team-image" />
            <h3 className="team-name">Tayyaba Afzal</h3>
            <p className="team-role">Frontend Developer</p>
            <p className="team-bio">
              Tayyaba designed the user-friendly interface for the prediction system.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <h2 className="section-title1" style={{color:"white"}}>Contact Us</h2>
        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            placeholder="Your Name"
            className="contact-input"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            className="contact-input"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <textarea
            placeholder="Your Message"
            className="contact-textarea"
            name="message"
            value={message}
            onChange={handleChange}
            required
          ></textarea>
          <button type="submit" className="contact-button">
            Send Message
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <p>© 2024 Heart Disease Predictor. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
