import React, { useState } from 'react';
import UpperHeader from "../../UpperHeader/upperheader";  
import './contact.css'; // Add this line for the CSS file
import Swal from 'sweetalert2';

export default function Contact() {
  const userData = JSON.parse(localStorage.getItem("AI-CardioCareUsers"));
  const currentUser = userData.user;
  const username = currentUser.firstName + " " + currentUser.lastName;

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
    <div>
      <UpperHeader title="Contact Us" name={username} />
      <div className="contact-form-container">
        <h2 className="form-title">We'd Love to Hear from You</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-field">
            <label htmlFor="name">Name</label>
             <input
            type="text"
            placeholder="Your Name"
            className="contact-input"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
          </div>
          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
            type="email"
            placeholder="Your Email"
            className="contact-input"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea
            placeholder="Your Message"
            className="contact-textarea"
            name="message"
            value={message}
            onChange={handleChange}
            required
          ></textarea>
          </div>
          <button type="submit" className="submit-btn">Send Message</button>
        </form>
      </div>
    </div>
  );
}
