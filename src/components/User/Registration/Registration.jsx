import React, { useState } from 'react';
import './Registration.css';

const Registration = () => {
  const [step, setStep] = useState(1);
  const [showNotification, setShowNotification] = useState(false);
  const [formData, setFormData] = useState({
    // Step 1: Basic Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    checkInDate: '', // <-- Add check-in date
    
    // Step 2: Personal Details
    address: '',
    city: '',
    state: '',
    profession: '',
    companyName: '',
    emergencyContact: '',
    
    // Step 3: Additional Information
    idProof: null,
    profilePicture: null,
    roomPreference: '',
    specialRequirements: '',
  });

  const [errors, setErrors] = useState({});

  const validateStep = (step) => {
    const newErrors = {};
    let hasError = false;
    
    switch(step) {
      case 1:
        if (!formData.firstName) { newErrors.firstName = 'First name is required'; hasError = true; }
        if (!formData.lastName) { newErrors.lastName = 'Last name is required'; hasError = true; }
        if (!formData.email) { newErrors.email = 'Email is required'; hasError = true; }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) { newErrors.email = 'Email is invalid'; hasError = true; }
        if (!formData.phone) { newErrors.phone = 'Phone number is required'; hasError = true; }
        else if (!/^\d{10}$/.test(formData.phone)) { newErrors.phone = 'Phone number must be exactly 10 digits'; hasError = true; }
        if (!formData.password) { newErrors.password = 'Password is required'; hasError = true; }
        else if (formData.password.length < 6) { newErrors.password = 'Password must be at least 6 characters'; hasError = true; }
        if (formData.password !== formData.confirmPassword) { newErrors.confirmPassword = 'Passwords do not match'; hasError = true; }
        if (!formData.checkInDate) { newErrors.checkInDate = 'Check-in date is required'; hasError = true; }
        break;
      
      case 2:
        if (!formData.address) { newErrors.address = 'Address is required'; hasError = true; }
        if (!formData.city) { newErrors.city = 'City is required'; hasError = true; }
        if (!formData.state) { newErrors.state = 'State is required'; hasError = true; }
        if (!formData.profession) { newErrors.profession = 'Profession is required'; hasError = true; }
        if (!formData.companyName) { newErrors.companyName = 'Company/Institution name is required'; hasError = true; }
        if (!formData.emergencyContact) { newErrors.emergencyContact = 'Emergency contact is required'; hasError = true; }
        else if (!/^\d{10}$/.test(formData.emergencyContact)) { newErrors.emergencyContact = 'Emergency contact must be exactly 10 digits'; hasError = true; }
        break;
      
      case 3:
        if (!formData.idProof) { newErrors.idProof = 'ID proof is required'; hasError = true; }
        if (!formData.roomPreference) { newErrors.roomPreference = 'Room preference is required'; hasError = true; }
        break;
    }
    
    setErrors(newErrors);
    return !hasError;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const isStep1Valid = validateStep(1);
    const isStep2Valid = validateStep(2);
    const isStep3Valid = validateStep(3);
  
    if (isStep1Valid && isStep2Valid && isStep3Valid) {
      try {
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value) data.append(key, value);
        });
  
        console.log('Sending registration request to:', `${import.meta.env.VITE_API_BASE_URL}/api/register`);
        
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/register`, {
          method: 'POST',
          body: data,
        });
  
        console.log('Response status:', response.status);
        console.log('Response ok:', response.ok);
        
        const result = await response.json();
        console.log('Response result:', result);
        
        if (response.ok) {
          console.log('Registration successful!');
          setShowNotification(true);
          setTimeout(() => setShowNotification(false), 3000);
        } else {
          console.log('Registration failed:', result);
          alert(result.message || result.error || 'Something went wrong!');
        }
      } catch (err) {
        console.error('Submission error:', err);
        alert('Submission failed.');
      }
    } else {
      if (!isStep1Valid) setStep(1);
      else if (!isStep2Valid) setStep(2);
      else setStep(3);
    }
  };
  

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    // Only allow digits for phone and emergency contact
    if (name === 'phone' || name === 'emergencyContact') {
      if (value === '' || /^\d{0,10}$/.test(value)) {
        setFormData(prev => ({
          ...prev,
          [name]: value
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: files ? files[0] : value
      }));
    }

    // Clear error for the field being changed
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="form-step">
            <h2>Basic Information</h2>
            <div className="input-group">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleChange}
                className={errors.firstName ? 'error' : ''}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className={errors.lastName ? 'error' : ''}
              />
            </div>
            <div className="input-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
              />
            </div>
            <div className="input-group">
              <input
                type="tel"
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
                className={errors.phone ? 'error' : ''}
                pattern="[0-9]{10}"
                inputMode="numeric"
                maxLength="10"
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? 'error' : ''}
              />
            </div>
            <div className="input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={errors.confirmPassword ? 'error' : ''}
              />
            </div>
            <div className="input-group">
              <label htmlFor="checkInDate">Check-in Date</label>
              <input
                type="date"
                name="checkInDate"
                id="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
                className={errors.checkInDate ? 'error' : ''}
              />
            </div>
            {/* Error messages for each field */}
            {Object.keys(errors).map(
              (key) =>
                errors[key] && (
                  <div className="error-message" key={key}>
                    {errors[key]}
                  </div>
                )
            )}
          </div>
        );

      case 2:
        return (
          <div className="form-step">
            <h2>Personal Details</h2>
            <div className="input-group">
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
                className={errors.address ? 'error' : ''}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className={errors.city ? 'error' : ''}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
                className={errors.state ? 'error' : ''}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="profession"
                placeholder="Profession"
                value={formData.profession}
                onChange={handleChange}
                className={errors.profession ? 'error' : ''}
              />
            </div>
            <div className="input-group">
              <input
                type="text"
                name="companyName"
                placeholder="Company/Institution Name"
                value={formData.companyName}
                onChange={handleChange}
                className={errors.companyName ? 'error' : ''}
              />
            </div>
            <div className="input-group">
              <input
                type="tel"
                name="emergencyContact"
                placeholder="Emergency Contact (10 digits)"
                value={formData.emergencyContact}
                onChange={handleChange}
                className={errors.emergencyContact ? 'error' : ''}
                pattern="[0-9]{10}"
                inputMode="numeric"
                maxLength="10"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="form-step">
            <h2>Additional Information</h2>
            <div className="input-group">
              <label>ID Proof</label>
              <input
                type="file"
                name="idProof"
                onChange={handleChange}
                className={`file-input ${errors.idProof ? 'error' : ''}`}
              />
            </div>
            <div className="input-group">
              <label>Profile Picture</label>
              <input
                type="file"
                name="profilePicture"
                onChange={handleChange}
                className="file-input"
              />
            </div>
            <div className="input-group">
              <select
                name="roomPreference"
                value={formData.roomPreference}
                onChange={handleChange}
                className={errors.roomPreference ? 'error' : ''}
              >
                <option value="">Select Room Preference</option>
                <option value="single">Single Room</option>
                <option value="double">Double Room</option>
                <option value="shared">Shared Room</option>
              </select>
            </div>
            <div className="input-group">
              <textarea
                name="specialRequirements"
                placeholder="Special Requirements (Optional)"
                value={formData.specialRequirements}
                onChange={handleChange}
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="reg-container">
      <div className="reg-form">
        <div className="reg-back-to-login">
          <button type="button" onClick={() => window.location.href = '/login'} className="btn btn-back">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
            Back to Login
          </button>
        </div>

        {/* Logo Section */}
        <div className="reg-logo-section">
          <h1 className="reg-logo-text">Hostel<span>Ease</span></h1>
          <p className="reg-welcome-text">Create your account</p>
        </div>

        <div className="steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}>
            <div className="step-number">1</div>
            <div className="step-title">Basic Info</div>
            <div className="step-line"></div>
          </div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <div className="step-title">Personal Details</div>
            <div className="step-line"></div>
          </div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}>
            <div className="step-number">3</div>
            <div className="step-title">Additional Info</div>
          </div>
        </div>

        {Object.keys(errors).length > 0 && (
          <div className="form-error-message">
            Please fill in all required fields before proceeding.
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {renderStep()}
          
          <div className="nav-buttons">
            <button 
              type="button" 
              onClick={handlePrevious} 
              className="btn btn-prev"
              style={{ display: step === 1 ? 'none' : 'inline-flex' }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 12H5M12 19l-7-7 7-7"/>
              </svg>
              Previous
            </button>
            {step < 3 ? (
              <button type="button" onClick={handleNext} className="btn btn-next">
                Next
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            ) : (
              <button type="submit" className="btn btn-submit">
                Submit Registration
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Notification Popup */}
      {showNotification && (
        <div className="notification">
          <div className="notification-content">
            <svg className="notification-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            <p>Registration submitted successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Registration;