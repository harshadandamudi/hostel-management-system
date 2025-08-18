import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import {
  FaUserCircle, FaEnvelope, FaPhone, FaIdCard, FaMapMarkerAlt,
  FaBed, FaClipboardList, FaFileAlt, FaRegClock, FaCheckCircle, FaTimesCircle
} from 'react-icons/fa';
import './userDetailsTab.css';

const statusColors = {
  Active: '#16a34a',
  Pending: '#f59e0b',
  Rejected: '#dc2626',
};

const UserDetailsTab = () => {
  const { token } = useAuth();
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/users/profile`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        setUserDetails(data.user);
      } catch (err) {
        setUserDetails(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="ud-loading-container">
        <div className="ud-loading-spinner"></div>
        <p>Loading user details...</p>
      </div>
    );
  }

  if (!userDetails) {
    return <div className="ud-error-container"><p>Unable to load user details.</p></div>;
  }

  return (
    <div className="ud-profile-2col-layout">
      {/* Left: Profile Card */}
      <aside className="ud-profile-sidebar-modern">
        {userDetails.profilePicture ? (
          <img src={userDetails.profilePicture} alt="Profile" className="ud-profile-img-lg" />
        ) : (
          <FaUserCircle className="ud-profile-img-placeholder-lg" />
        )}
        <h2>{userDetails.firstName} {userDetails.lastName}</h2>
        <span
          className="ud-status-badge"
          style={{ background: statusColors[userDetails.status] || '#64748b' }}
        >
          {userDetails.status}
          {userDetails.status === 'Active' && <FaCheckCircle style={{ marginLeft: 6 }} />}
          {userDetails.status === 'Rejected' && <FaTimesCircle style={{ marginLeft: 6 }} />}
        </span>
        <div className="ud-profile-contact">
          <FaEnvelope /> {userDetails.email || 'Not provided'}
        </div>
        <div className="ud-profile-contact">
          <FaPhone /> {userDetails.phone || 'Not provided'}
        </div>
      </aside>

      {/* Right: Single Card with All Details */}
      <main className="ud-profile-maincard-single">
        <div className="ud-profile-section-title-main">Profile Details</div>
        <div className="ud-profile-section-content-single">
          {/* Personal Info */}
          <div className="ud-profile-row">
            <FaIdCard className="ud-profile-section-icon" />
            <div className="ud-profile-details-list">
              <div className="ud-profile-detail-row">
                <span className="ud-profile-label">Profession:</span>
                <span className="ud-profile-value">{userDetails.profession || 'Not provided'}</span>
              </div>
              <div className="ud-profile-detail-row">
                <span className="ud-profile-label">Company/Institution:</span>
                <span className="ud-profile-value">{userDetails.companyName || 'Not provided'}</span>
              </div>
              <div className="ud-profile-detail-row">
                <span className="ud-profile-label">Emergency Contact:</span>
                <span className="ud-profile-value">{userDetails.emergencyContact || 'Not provided'}</span>
              </div>
            </div>
          </div>
          <div className="ud-profile-divider" />

          {/* Address */}
          <div className="ud-profile-row">
            <FaMapMarkerAlt className="ud-profile-section-icon" />
            <div className="ud-profile-details-list">
              <div className="ud-profile-detail-row">
                <span className="ud-profile-label">Address:</span>
                <span className="ud-profile-value">{userDetails.address || 'Not provided'}</span>
              </div>
              <div className="ud-profile-detail-row">
                <span className="ud-profile-label">City:</span>
                <span className="ud-profile-value">{userDetails.city || 'Not provided'}</span>
              </div>
              <div className="ud-profile-detail-row">
                <span className="ud-profile-label">State:</span>
                <span className="ud-profile-value">{userDetails.state || 'Not provided'}</span>
              </div>
            </div>
          </div>
          <div className="ud-profile-divider" />

          {/* Room Info */}
          <div className="ud-profile-row">
            <FaBed className="ud-profile-section-icon" />
            <div className="ud-profile-details-list">
              <div className="ud-profile-detail-row">
                <span className="ud-profile-label">Room Number:</span>
                <span className="ud-profile-value">{userDetails.roomNumber || 'Not provided'}</span>
              </div>
              <div className="ud-profile-detail-row">
                <span className="ud-profile-label">Floor:</span>
                <span className="ud-profile-value">{userDetails.floor || 'Not provided'}</span>
              </div>
              <div className="ud-profile-detail-row">
                <span className="ud-profile-label">Check-in Date:</span>
                <span className="ud-profile-value">{userDetails.checkInDate ? new Date(userDetails.checkInDate).toLocaleDateString() : 'Not provided'}</span>
              </div>
              <div className="ud-profile-detail-row">
                <span className="ud-profile-label">Check-out Date:</span>
                <span className="ud-profile-value">{userDetails.checkOutDate ? new Date(userDetails.checkOutDate).toLocaleDateString() : 'Not provided'}</span>
              </div>
            </div>
          </div>
          <div className="ud-profile-divider" />

          {/* Preferences */}
          <div className="ud-profile-row">
            <FaClipboardList className="ud-profile-section-icon" />
            <div className="ud-profile-details-list">
              <div className="ud-profile-detail-row">
                <span className="ud-profile-label">Room Preference:</span>
                <span className="ud-profile-value">{userDetails.roomPreference || 'Not provided'}</span>
              </div>
              <div className="ud-profile-detail-row">
                <span className="ud-profile-label">Special Requirements:</span>
                <span className="ud-profile-value">{userDetails.specialRequirements || 'Not provided'}</span>
              </div>
            </div>
          </div>
          <div className="ud-profile-divider" />

          {/* Documents */}
          <div className="ud-profile-row">
            <FaFileAlt className="ud-profile-section-icon" />
            <div className="ud-profile-details-list">
              <div className="ud-profile-detail-row">
                <span className="ud-profile-label">ID Proof:</span>
                {userDetails.idProof ? (
                  <a href={userDetails.idProof} target="_blank" rel="noopener noreferrer" className="ud-profile-link">View ID Proof</a>
                ) : (
                  <span className="ud-profile-value">Not provided</span>
                )}
              </div>
            </div>
          </div>
          <div className="ud-profile-divider" />

          {/* Account Meta */}
          <div className="ud-profile-row">
            <FaRegClock className="ud-profile-section-icon" />
            <div className="ud-profile-details-list">
              <div className="ud-profile-detail-row">
                <span className="ud-profile-label">Created At:</span>
                <span className="ud-profile-value">{userDetails.createdAt ? new Date(userDetails.createdAt).toLocaleString() : 'Not provided'}</span>
              </div>
              <div className="ud-profile-detail-row">
                <span className="ud-profile-label">Updated At:</span>
                <span className="ud-profile-value">{userDetails.updatedAt ? new Date(userDetails.updatedAt).toLocaleString() : 'Not provided'}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserDetailsTab;