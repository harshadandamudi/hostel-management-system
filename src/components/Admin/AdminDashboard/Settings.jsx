import React, { useState } from 'react';
import { FaSave, FaBuilding, FaUsers, FaMoneyBillWave, FaBell, FaLock } from 'react-icons/fa';
import './Settings.css';

const Settings = () => {
  const [settings, setSettings] = useState({
    hostel: {
      name: 'PG Hostel',
      address: '123 Hostel Street, City',
      contact: '+91 1234567890',
      email: 'hostel@example.com',
      checkInTime: '14:00',
      checkOutTime: '11:00',
      curfewTime: '22:00'
    },
    rooms: {
      totalRooms: 50,
      roomsPerFloor: 10,
      maxOccupancy: 2,
      roomTypes: ['Standard', 'Deluxe', 'Premium'],
      amenities: ['AC', 'WiFi', 'Attached Bathroom']
    },
    fees: {
      securityDeposit: 10000,
      monthlyRent: 15000,
      maintenanceFee: 1000,
      latePaymentPenalty: 500,
      paymentDueDate: 5
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: true,
      paymentReminders: true,
      maintenanceAlerts: true,
      eventNotifications: true
    },
    security: {
      requireVisitorRegistration: true,
      requireGuestApproval: true,
      requirePhotoId: true,
      allowOvernightGuests: false,
      maxGuestsPerRoom: 2
    }
  });

  const [activeTab, setActiveTab] = useState('hostel');
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (section, field, value) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSave = () => {
    // TODO: Implement save functionality
    setIsEditing(false);
  };

  const renderHostelSettings = () => (
    <div className="settings-section">
      <h3>Hostel Information</h3>
      <div className="settings-grid">
        <div className="setting-item">
          <label>Hostel Name</label>
          <input
            type="text"
            value={settings.hostel.name}
            onChange={(e) => handleInputChange('hostel', 'name', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="setting-item">
          <label>Address</label>
          <input
            type="text"
            value={settings.hostel.address}
            onChange={(e) => handleInputChange('hostel', 'address', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="setting-item">
          <label>Contact Number</label>
          <input
            type="tel"
            value={settings.hostel.contact}
            onChange={(e) => handleInputChange('hostel', 'contact', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="setting-item">
          <label>Email</label>
          <input
            type="email"
            value={settings.hostel.email}
            onChange={(e) => handleInputChange('hostel', 'email', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="setting-item">
          <label>Check-in Time</label>
          <input
            type="time"
            value={settings.hostel.checkInTime}
            onChange={(e) => handleInputChange('hostel', 'checkInTime', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="setting-item">
          <label>Check-out Time</label>
          <input
            type="time"
            value={settings.hostel.checkOutTime}
            onChange={(e) => handleInputChange('hostel', 'checkOutTime', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="setting-item">
          <label>Curfew Time</label>
          <input
            type="time"
            value={settings.hostel.curfewTime}
            onChange={(e) => handleInputChange('hostel', 'curfewTime', e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  const renderRoomSettings = () => (
    <div className="settings-section">
      <h3>Room Settings</h3>
      <div className="settings-grid">
        <div className="setting-item">
          <label>Total Rooms</label>
          <input
            type="number"
            value={settings.rooms.totalRooms}
            onChange={(e) => handleInputChange('rooms', 'totalRooms', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="setting-item">
          <label>Rooms Per Floor</label>
          <input
            type="number"
            value={settings.rooms.roomsPerFloor}
            onChange={(e) => handleInputChange('rooms', 'roomsPerFloor', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="setting-item">
          <label>Max Occupancy</label>
          <input
            type="number"
            value={settings.rooms.maxOccupancy}
            onChange={(e) => handleInputChange('rooms', 'maxOccupancy', e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  const renderFeeSettings = () => (
    <div className="settings-section">
      <h3>Fee Structure</h3>
      <div className="settings-grid">
        <div className="setting-item">
          <label>Security Deposit (₹)</label>
          <input
            type="number"
            value={settings.fees.securityDeposit}
            onChange={(e) => handleInputChange('fees', 'securityDeposit', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="setting-item">
          <label>Monthly Rent (₹)</label>
          <input
            type="number"
            value={settings.fees.monthlyRent}
            onChange={(e) => handleInputChange('fees', 'monthlyRent', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="setting-item">
          <label>Maintenance Fee (₹)</label>
          <input
            type="number"
            value={settings.fees.maintenanceFee}
            onChange={(e) => handleInputChange('fees', 'maintenanceFee', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="setting-item">
          <label>Late Payment Penalty (₹)</label>
          <input
            type="number"
            value={settings.fees.latePaymentPenalty}
            onChange={(e) => handleInputChange('fees', 'latePaymentPenalty', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        <div className="setting-item">
          <label>Payment Due Date (Day of Month)</label>
          <input
            type="number"
            min="1"
            max="31"
            value={settings.fees.paymentDueDate}
            onChange={(e) => handleInputChange('fees', 'paymentDueDate', e.target.value)}
            disabled={!isEditing}
          />
        </div>
      </div>
    </div>
  );

  const renderNotificationSettings = () => (
    <div className="settings-section">
      <h3>Notification Preferences</h3>
      <div className="settings-grid">
        {Object.entries(settings.notifications).map(([key, value]) => (
          <div key={key} className="setting-item checkbox">
            <label>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleInputChange('notifications', key, e.target.checked)}
                disabled={!isEditing}
              />
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </label>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecuritySettings = () => (
    <div className="settings-section">
      <h3>Security Settings</h3>
      <div className="settings-grid">
        {Object.entries(settings.security).map(([key, value]) => (
          <div key={key} className="setting-item">
            <label>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </label>
            {typeof value === 'boolean' ? (
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleInputChange('security', key, e.target.checked)}
                disabled={!isEditing}
              />
            ) : (
              <input
                type="number"
                value={value}
                onChange={(e) => handleInputChange('security', key, e.target.value)}
                disabled={!isEditing}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="settings-container">
      <div className="settings-header">
        <h2>Settings</h2>
        <div className="settings-actions">
          {isEditing ? (
            <button className="save-btn" onClick={handleSave}>
              <FaSave /> Save Changes
            </button>
          ) : (
            <button className="edit-btn" onClick={() => setIsEditing(true)}>
              Edit Settings
            </button>
          )}
        </div>
      </div>

      <div className="settings-tabs">
        <button
          className={`tab-btn ${activeTab === 'hostel' ? 'active' : ''}`}
          onClick={() => setActiveTab('hostel')}
        >
          <FaBuilding /> Hostel
        </button>
        <button
          className={`tab-btn ${activeTab === 'rooms' ? 'active' : ''}`}
          onClick={() => setActiveTab('rooms')}
        >
          <FaUsers /> Rooms
        </button>
        <button
          className={`tab-btn ${activeTab === 'fees' ? 'active' : ''}`}
          onClick={() => setActiveTab('fees')}
        >
          <FaMoneyBillWave /> Fees
        </button>
        <button
          className={`tab-btn ${activeTab === 'notifications' ? 'active' : ''}`}
          onClick={() => setActiveTab('notifications')}
        >
          <FaBell /> Notifications
        </button>
        <button
          className={`tab-btn ${activeTab === 'security' ? 'active' : ''}`}
          onClick={() => setActiveTab('security')}
        >
          <FaLock /> Security
        </button>
      </div>

      <div className="settings-content">
        {activeTab === 'hostel' && renderHostelSettings()}
        {activeTab === 'rooms' && renderRoomSettings()}
        {activeTab === 'fees' && renderFeeSettings()}
        {activeTab === 'notifications' && renderNotificationSettings()}
        {activeTab === 'security' && renderSecuritySettings()}
      </div>
    </div>
  );
};

export default Settings; 