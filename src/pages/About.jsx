import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <Link to="/" className="navbar-brand fw-bold">
            <span className="text-white">Hostel</span>
            <span className="text-blue-500">Ease</span>
          </Link>
          <ul className="navbar-nav ms-auto gap-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link custom-nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link custom-nav-link active">About</Link>
            </li>
            <li className="nav-item">
              <Link to="/contact" className="nav-link custom-nav-link">Contact</Link>
            </li>
            <li className="nav-item">
              <Link to="/admin/login" className="nav-link custom-nav-link">Admin Login</Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-title">Transforming Hostel Management</h1>
          <p className="about-subtitle">Streamlining operations and enhancing resident experience</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="about-content">
        <div className="container">
          {/* Our Story Section */}
          <section className="content-section">
            <h2>Our Story</h2>
            <div className="story-content">
              <div className="text-content">
                <p>HostelEase was born from a simple observation: hostel management shouldn't be complicated. 
                   We've created a comprehensive solution that transforms traditional hostel management into 
                   a seamless digital experience.</p>
              </div>
              <div className="stats-grid">
                <StatsCard number="500+" text="Hostels Trust Us" />
                <StatsCard number="10k+" text="Happy Residents" />
                <StatsCard number="98%" text="Satisfaction Rate" />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="content-section">
            <h2>Key Features</h2>
            <div className="features-grid">
              <FeatureCard 
                icon="🏢"
                title="Room Management"
                description="Efficient room allocation and maintenance tracking system"
              />
              <FeatureCard 
                icon="💰"
                title="Payment Handling"
                description="Seamless fee collection and payment tracking"
              />
              <FeatureCard 
                icon="📱"
                title="Student Portal"
                description="Digital platform for students to manage their hostel life"
              />
              <FeatureCard 
                icon="📊"
                title="Analytics"
                description="Detailed insights and reports for better decision making"
              />
            </div>
          </section>

          {/* Advantages Section */}
          <section className="content-section">
            <h2>Why Choose HostelEase?</h2>
            <div className="advantages-grid">
              <AdvantageCard 
                title="Time Saving"
                description="Automate routine tasks and reduce administrative burden"
                icon="⚡"
              />
              <AdvantageCard 
                title="Cost Effective"
                description="Reduce operational costs and improve resource utilization"
                icon="💎"
              />
              <AdvantageCard 
                title="Better Experience"
                description="Enhanced communication and service delivery for residents"
                icon="🌟"
              />
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section">
            <h2>Ready to Transform Your Hostel Management?</h2>
            <p>Join hundreds of hostels already using HostelEase</p>
            <Link to="/admin/login" className="cta-button">
              Get Started
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </section>
        </div>
      </main>
    </div>
  );
};

// Helper Components
const StatsCard = ({ number, text }) => (
  <div className="stats-card">
    <h3>{number}</h3>
    <p>{text}</p>
  </div>
);

const FeatureCard = ({ icon, title, description }) => (
  <div className="feature-card">
    <span className="feature-icon">{icon}</span>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const AdvantageCard = ({ title, description, icon }) => (
  <div className="advantage-card">
    <span className="advantage-icon">{icon}</span>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

export default About; 