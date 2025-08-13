import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
import hostelImage from '../src/assets/hostel.png';

const LandingPage = () => {
  return (
    <div className="landing-container">
      {/* Navigation */}
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand fw-bold" href="#">
            Hostel<span className="text-primary">Ease</span>
          </a>
          <div className="ms-auto">
            <Link to="/register" className="nav-login-btn">
              <span>Join Now</span>
              <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="row">
            {/* Left Content */}
            <div className="col-lg-6">
              <div className="text-content">
                <h1 className="hero-title">
                  <span className="welcome-text">Welcome to</span>
                  <div className="brand-name">
                    <span className="text-white">Hostel</span>
                    <span className="hero-highlight">Ease</span>
                  </div>
                </h1>
                <p className="hero-description">
                  One Solution For All Of The Hostel's Needs
                </p>
                <div className="hero-buttons">
                  <Link to="/login" className="login-btn">
                    Login
                  </Link>
                  <div className="or-divider">
                    <span>OR</span>
                  </div>
                  <Link to="/register" className="request-reg-btn">
                    Request Registration
                    <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Right Image */}
            <div className="col-lg-6">
              <div className="image-content">
                <div className="image-glow"></div>
                <img 
                  src={hostelImage} 
                  alt="Hostel Management" 
                  className="hero-image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose HostelEase?</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">🏠</div>
                <h3>Easy Booking</h3>
                <p>Streamlined room booking process with instant confirmation and real-time availability</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">💰</div>
                <h3>Smart Payments</h3>
                <p>Automated payment tracking, multiple payment methods, and instant receipts</p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure Platform</h3>
                <p>Enterprise-grade security with data encryption and regular backups</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="how-it-works">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="row">
            <div className="col-md-3">
              <div className="step-card">
                <div className="step-number">1</div>
                <h3>Register</h3>
                <p>Create your account with basic information and get instant access</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="step-card">
                <div className="step-number">2</div>
                <h3>Get Approved</h3>
                <p>Quick verification process to ensure secure access</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="step-card">
                <div className="step-number">3</div>
                <h3>Complete Profile</h3>
                <p>Add your preferences and requirements for better service</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="step-card">
                <div className="step-number">4</div>
                <h3>Start Using</h3>
                <p>Access all features and manage your stay efficiently</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials-section">
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  "HostelEase has transformed how we manage our hostel. Everything is now streamlined and efficient."
                </div>
                <div className="testimonial-author">
                  <div className="author-name">Sarah Johnson</div>
                  <div className="author-role">Hostel Manager</div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  "The payment system is incredibly easy to use. No more manual tracking or lost receipts!"
                </div>
                <div className="testimonial-author">
                  <div className="author-name">Michael Chen</div>
                  <div className="author-role">Resident</div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="testimonial-card">
                <div className="testimonial-content">
                  "The customer support is outstanding. They're always there when you need them."
                </div>
                <div className="testimonial-author">
                  <div className="author-name">Emma Davis</div>
                  <div className="author-role">Hostel Owner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="cta-section">
        <div className="container">
          <h2>Ready to Transform Your Hostel Experience?</h2>
          <p>Join thousands of satisfied users and start managing your hostel efficiently today.</p>
          <Link to="/register" className="cta-button">
            Get Started Now
          </Link>
        </div>
      </div>

    </div>
  );
};

export default LandingPage;
