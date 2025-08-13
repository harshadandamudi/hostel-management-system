import React, { useState } from 'react';
import { FaUsers, FaBed, FaUtensils, FaMoneyBillWave, FaClipboardList, FaCog } from 'react-icons/fa';
import './AdminDashboard.css';
import RoomManagement from './RoomManagement';
import UserManagement from './UserManagement';
import MenuManagement from './MenuManagement';
import PaymentManagement from './PaymentManagement';
import ComplaintsManagement from './ComplaintsManagement';
import Settings from './Settings';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('rooms');

  const renderContent = () => {
    switch(activeTab) {
      case 'rooms':
        return <RoomManagement />;
      case 'users':
        return <UserManagement />;
      case 'menu':
        return <MenuManagement />;
      case 'payments':
        return <PaymentManagement />;
      case 'complaints':
        return <ComplaintsManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <RoomManagement />;
    }
  };

  return (
    <div className="admin-dashboard">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h1 className="admin-logo-text">Hostel<span>Ease</span></h1>
          <p className="admin-logo-subtitle">Admin Panel</p>
        </div>
        <nav className="admin-nav">
          <button 
            className={`nav-item ${activeTab === 'rooms' ? 'active' : ''}`}
            onClick={() => setActiveTab('rooms')}
          >
            <FaBed /> Room<br />Management
          </button>
          <button 
            className={`nav-item ${activeTab === 'users' ? 'active' : ''} user-management`}
            onClick={() => setActiveTab('users')}
          >
            <FaUsers /> User<br />Management
          </button>
          <button 
            className={`nav-item ${activeTab === 'menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('menu')}
          >
            <FaUtensils /> Menu<br />Management
          </button>
          <button 
            className={`nav-item ${activeTab === 'payments' ? 'active' : ''}`}
            onClick={() => setActiveTab('payments')}
          >
            <FaMoneyBillWave /> Payment<br />Management
          </button>
          <button 
            className={`nav-item ${activeTab === 'complaints' ? 'active' : ''}`}
            onClick={() => setActiveTab('complaints')}
          >
            <FaClipboardList /> Complaint <br/> Management
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <FaCog /> Settings
          </button>
        </nav>
      </div>
      <div style={{ marginLeft: '250px', padding: '1.5rem', width: 'calc(100% - 250px)' }}>
        {renderContent()}
      </div>
    </div>
  );
};

export default AdminDashboard; 