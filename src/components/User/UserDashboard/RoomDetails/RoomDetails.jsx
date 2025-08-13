import React from 'react';
import { FaBed, FaUser, FaCalendarAlt, FaInfoCircle } from 'react-icons/fa';
import './RoomDetails.css';

const RoomDetails = () => {
  return (
    <div className="room-details-container">
      <div className="room-header">
        <h2>Room Details</h2>
      </div>

      <div className="room-info-grid">
        <div className="room-info-card">
          <div className="info-icon">
            <FaBed />
          </div>
          <div className="info-content">
            <h3>Room Information</h3>
            <div className="info-details">
              <div className="info-item">
                <span className="label">Room Number:</span>
                <span className="value">101</span>
              </div>
              <div className="info-item">
                <span className="label">Bed Number:</span>
                <span className="value">A</span>
              </div>
              <div className="info-item">
                <span className="label">Floor:</span>
                <span className="value">1st Floor</span>
              </div>
              <div className="info-item">
                <span className="label">Room Type:</span>
                <span className="value">Double Sharing</span>
              </div>
            </div>
          </div>
        </div>

        <div className="room-info-card">
          <div className="info-icon">
            <FaUser />
          </div>
          <div className="info-content">
            <h3>Occupant Details</h3>
            <div className="info-details">
              <div className="info-item">
                <span className="label">Name:</span>
                <span className="value">John Doe</span>
              </div>
              <div className="info-item">
                <span className="label">Contact:</span>
                <span className="value">+91 9876543210</span>
              </div>
              <div className="info-item">
                <span className="label">Email:</span>
                <span className="value">john.doe@example.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="room-info-card">
          <div className="info-icon">
            <FaCalendarAlt />
          </div>
          <div className="info-content">
            <h3>Stay Information</h3>
            <div className="info-details">
              <div className="info-item">
                <span className="label">Check-in Date:</span>
                <span className="value">01/01/2024</span>
              </div>
              <div className="info-item">
                <span className="label">Duration:</span>
                <span className="value">6 Months</span>
              </div>
              <div className="info-item">
                <span className="label">Status:</span>
                <span className="value status-active">Active</span>
              </div>
            </div>
          </div>
        </div>

        <div className="room-info-card">
          <div className="info-icon">
            <FaInfoCircle />
          </div>
          <div className="info-content">
            <h3>Additional Information</h3>
            <div className="info-details">
              <div className="info-item">
                <span className="label">Room Amenities:</span>
                <span className="value">AC, WiFi, Attached Bathroom</span>
              </div>
              <div className="info-item">
                <span className="label">Maintenance Status:</span>
                <span className="value status-good">Good</span>
              </div>
              <div className="info-item">
                <span className="label">Last Cleaned:</span>
                <span className="value">Today</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails; 