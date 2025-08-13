import React from 'react';
import './OverviewTab.css';
import PaymentButton from "../PaymentButton";
import { useAuth } from "../../../../context/AuthContext";
const OverviewTab = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="overview-tab">
      <h2>Overview</h2>
      <div className="overview-grid">
        <div className="overview-card">
          <h3>Room Status</h3>
          <p>Room 101</p>
          <span className="status active">Active</span>
        </div>
        
        <div className="overview-card">
          <h3>Next Payment</h3>
          <p>Due: 15th March 2024</p>
          <span className="amount">₹15,000</span>
          <PaymentButton amount={1} user={user} />
        </div>
        
        <div className="overview-card">
          <h3>Meal Plan</h3>
          <p>Current Plan: Standard</p>
          <span className="status">Active</span>
        </div>
        
        <div className="overview-card">
          <h3>Maintenance</h3>
          <p>Last Check: 1st March 2024</p>
          <span className="status">Up to date</span>
        </div>
      </div>

      <div className="recent-activities">
        <h3>Recent Activities</h3>
        <ul>
          <li>
            <span className="activity-time">2 hours ago</span>
            <p>Payment received for March rent</p>
          </li>
          <li>
            <span className="activity-time">1 day ago</span>
            <p>Room cleaning completed</p>
          </li>
          <li>
            <span className="activity-time">2 days ago</span>
            <p>Maintenance request resolved</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default OverviewTab; 