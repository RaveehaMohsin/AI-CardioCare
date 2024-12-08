import React, { useState } from "react";
import "./LandingPage.css";
import raveehaimage from "../../Assets/raveeha.jpg";
import tayyabaimage from "../../Assets/tayyaba.jpeg";
import { FaClipboardList, FaRocket, FaBriefcase } from "react-icons/fa";
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
    const response = await fetch('https://marshy-brainy-weight.glitch.me/contactus', { 
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
      <header className="landing-header">
        <div className="logo">Career Navigator</div>
        <nav className="landing-nav">
          <a href="#home" className="nav-link">
            Home
          </a>
          <a href="#about" className="nav-link">
            About Us
          </a>
          <a href="#services" className="nav-link">
            Services
          </a>
          <a href="#team" className="nav-link">
            Team
          </a>
          <a href="#contact" className="nav-link">
            Contact
          </a>
          <button className="auth-button">
            <Link
              to="/auth"
              style={{ textDecoration: "none", color: "inherit" }}
            >
              Sign Up / Sign In
            </Link>
          </button>
        </nav>
      </header>

      <section id="home" className="home-section">
        <h1 className="main-heading">Navigate Your Career Path</h1>
        <p className="sub-heading">Your journey towards success starts here!</p>
        <button className="cta-button">
          <Link to="/auth" style={{ textDecoration: "none", color: "inherit" }}>
            Get Started
          </Link>
        </button>
      </section>

      <section id="about" className="about-section">
        <h2 className="section-title1">About Us</h2>
        <p className="about-text">
          Career Path Navigator is your one-stop solution for finding and
          refining your professional journey. Whether you're a student, a
          mid-career professional, or looking for a fresh start, we provide
          tools and guidance to help you achieve your goals.
        </p>
        <div className="about-highlights">
          <div className="highlight-card">
            <h3>Personalized Solutions</h3>
            <p>Tailored guidance to match your unique career aspirations.</p>
          </div>
          <div className="highlight-card">
            <h3>Expert Mentorship</h3>
            <p>Access to industry professionals to help you grow.</p>
          </div>
          <div className="highlight-card">
            <h3>Global Opportunities</h3>
            <p>Explore careers across various industries worldwide.</p>
          </div>
        </div>
      </section>

      <section id="services" className="services-section">
        <h2 className="section-title1">Our Services</h2>
        <div className="services-cards">
          <div className="service-card">
            <FaClipboardList className="service-icon" />
            <h3 className="service-title">Career Assessment</h3>
            <p className="service-description">
              Discover your strengths, interests, and suitable career options
              with our personalized assessments.
            </p>
          </div>
          <div className="service-card">
            <FaRocket className="service-icon" />
            <h3 className="service-title">Skill Development</h3>
            <p className="service-description">
              Learn new skills and stay updated with industry trends through our
              curated resources.
            </p>
          </div>
          <div className="service-card">
            <FaBriefcase className="service-icon" />
            <h3 className="service-title">Job Assistance</h3>
            <p className="service-description">
              Get assistance with job searches, resume building, and interview
              preparation.
            </p>
          </div>
        </div>
      </section>

      <section id="team" className="team-section">
        <h2 className="section-title1">Meet Our Team</h2>
        <p className="team-intro">
          The brains behind Career Navigator are here to guide you!
        </p>
        <div className="team-members">
          <div className="team-member">
            <img
              src={raveehaimage}
              alt="Raveeha Mohsin"
              className="team-image"
            />
            <h3 className="team-name">Raveeha Mohsin</h3>
            <p className="team-role">Co-Founder</p>
            <p className="team-bio">
              Raveeha is a full-stack developer who designed and built the
              Career Navigator website, handling both frontend and backend
              development.
            </p>
          </div>
          <div className="team-member">
            <img
              src={tayyabaimage}
              alt="Tayyaba Afzal"
              className="team-image"
            />
            <h3 className="team-name">Tayyaba Afzal</h3>
            <p className="team-role">Co-Founder</p>
            <p className="team-bio">
              Tayyaba is a frontend developer and database designer, focusing on
              creating the user interface and streamlining the database for
              student support.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="contact-section">
        <h2 className="section-title1" style={{ color: "white" }}>
          Contact Us
        </h2>
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

      <footer className="landing-footer">
        <p>© 2024 Career Navigator. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;
