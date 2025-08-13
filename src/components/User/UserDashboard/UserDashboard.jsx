import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaClipboardList, FaUser, FaUtensils, FaMoneyBillWave, FaBed, FaBell, FaSearch, FaSignOutAlt } from 'react-icons/fa';
import './UserDashboard.css';
import OverviewTab from './components/OverviewTab';
import ComplaintsList from './ComplaintsList/ComplaintsList';
import UserDetailsTab from './RoomDetails/UserDetailsTab';
import MenuDetails from './MenuDetails/MenuDetails';
import RoomDetails from './RoomDetails/RoomDetails';
import FeeStructure from './FeeStructure/FeeStructure';
import { useAuth } from '../../../context/AuthContext';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { token, loading, user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    if (!loading && !token) {
      navigate('/login');
    }
  }, [loading, token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/login');
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (user) {
      // Try different possible name fields
      const name = user.name || user.fullName || user.username || 
                   (user.firstName && user.lastName ? `${user.firstName} ${user.lastName}` : null) ||
                   user.firstName || user.lastName || 'User';
      return name;
    }
    
    // Fallback: try to get from localStorage directly
    try {
      const storedUserData = localStorage.getItem('userData');
      if (storedUserData) {
        const parsedUser = JSON.parse(storedUserData);
        const name = parsedUser.name || parsedUser.fullName || parsedUser.username || 
                     (parsedUser.firstName && parsedUser.lastName ? `${parsedUser.firstName} ${parsedUser.lastName}` : null) ||
                     parsedUser.firstName || parsedUser.lastName || 'User';
        return name;
      }
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error);
    }
    
    return 'User';
  };

  // Get user role
  const getUserRole = () => {
    if (user) {
      return user.role || 'Student';
    }
    return 'Student';
  };

  const renderContent = () => {
    try {
      switch(activeTab) {
        case 'overview':
          return <OverviewTab />;
        case 'complaints':
          return <ComplaintsList />;
        case 'user-details':
          return <UserDetailsTab />;
        case 'food-menu':
          return <MenuDetails />;
        case 'fee-structure':
          return <FeeStructure />;
        case 'room':
          return <RoomDetails/>;
        default:
          return <OverviewTab />;
      }
    } catch (err) {
      setError(err.message);
      return (
        <div className="ud-error-container">
          <h3>Something went wrong</h3>
          <p>{err.message}</p>
          <button onClick={() => window.location.reload()}>Reload Page</button>
        </div>
      );
    }
  };

  if (loading) {
    return (
      <div className="ud-loading-container">
        <div className="ud-loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="ud-error-container">
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Reload Page</button>
      </div>
    );
  }

  return (
    <div className="ud-dashboard">
      {/* Sidebar Navigation */}
      <div className="ud-sidebar">
        <div className="ud-logo">
          <h1 className="ud-logo-text">Hostel<span>Ease</span></h1>
          <p className="ud-logo-subtitle">Guest Portal</p>
        </div>
        
        <nav className="ud-nav">
          <button 
            className={`ud-nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <FaHome /> Overview
          </button>
          
          <button 
            className={`ud-nav-item ${activeTab === 'room' ? 'active' : ''}`}
            onClick={() => setActiveTab('room')}
          >
            <FaBed /> Room Details
          </button>
          
          <button 
            className={`ud-nav-item ${activeTab === 'user-details' ? 'active' : ''}`}
            onClick={() => setActiveTab('user-details')}
          >
            <FaUser /> My Profile
          </button>
          
          <button 
            className={`ud-nav-item ${activeTab === 'food-menu' ? 'active' : ''}`}
            onClick={() => setActiveTab('food-menu')}
          >
            <FaUtensils /> Food Menu
          </button>
          
          <button 
            className={`ud-nav-item ${activeTab === 'fee-structure' ? 'active' : ''}`}
            onClick={() => setActiveTab('fee-structure')}
          >
            <FaMoneyBillWave /> Fee Structure
          </button>
          
          <button 
            className={`ud-nav-item ${activeTab === 'complaints' ? 'active' : ''}`}
            onClick={() => setActiveTab('complaints')}
          >
            <FaClipboardList /> Complaints
          </button>
        </nav>

        <div className="ud-sidebar-footer">
          <button className="ud-logout-btn" onClick={handleLogout}>
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="ud-main-content">
        {/* Header */}
        <header className="ud-header">
          <div className="ud-header-left">
            <div className="ud-search-bar">
              <FaSearch className="ud-search-icon" />
              <input
                type="text"
                className="ud-search-input"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="ud-header-right">
            <button className="ud-notification-btn">
              <FaBell />
              <span className="ud-notification-badge">3</span>
            </button>
            
            <div className="ud-user-profile" onClick={() => setActiveTab('user-details')} style={{ cursor: 'pointer' }}>
              <div className="ud-user-info">
                <span className="ud-user-name">{getUserDisplayName()}</span>
                <span className="ud-user-role">{getUserRole()}</span>
              </div>
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(getUserDisplayName())}&background=3b82f6&color=fff&size=40`}
                alt="Profile" 
                className="ud-profile-image" 
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="ud-content">
          {renderContent()}
        </main>
      </div>

      {/* SOS Button - Fixed Position */}
      <button className="ud-sos-button">
        <span>SOS</span>
      </button>
    </div>
  );
};

export default UserDashboard; 