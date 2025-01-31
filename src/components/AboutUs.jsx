
import React, { useState } from 'react';
import './AboutUs.css';

const AboutUs = () => {
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({ ...feedback, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle feedback form submission here (e.g., send data to backend or show alert)
    alert('Thank you for your feedback!');
  };

  return (
    <div className="about-container">
      {/* Header Section */}
      <header>
        <h1>About Us</h1>
      </header>

      {/* About Us Content */}
      <section className="about-section">
        <h2>Who We Are</h2>
        <p>
          We are a passionate team dedicated to providing the best grocery shopping experience for you. 
          With a wide variety of fresh products and a seamless online platform, we strive to make your shopping experience simple and enjoyable.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Mission</h2>
        <p>
          Our mission is to revolutionize grocery shopping by combining the convenience of online ordering 
          with the quality and freshness of traditional markets. We aim to provide exceptional customer service and high-quality products.
        </p>
      </section>

      <section className="about-section">
        <h2>Our Values</h2>
        <ul>
          <li>Quality: We provide only the best products, ensuring freshness and reliability.</li>
          <li>Customer Focus: Our customers are our priority, and we work to exceed their expectations.</li>
          <li>Innovation: We constantly evolve to offer the latest and best features to our users.</li>
        </ul>
      </section>

      <section className="about-section">
       
      </section>

      {/* Feedback Form */}
      <div className="feedback-form">
        <h3>We value your feedback!</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={feedback.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={feedback.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Message:</label>
            <textarea
              name="message"
              value={feedback.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit Feedback</button>
        </form>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default AboutUs;
