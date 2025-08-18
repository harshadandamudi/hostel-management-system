import React, { useState, useEffect } from 'react';
import { FaSearch, FaExclamationCircle, FaCheck, FaTimes, FaClock, FaEdit, FaTrash } from 'react-icons/fa';
import './ComplaintsManagement.css';

const ComplaintsManagement = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [updateData, setUpdateData] = useState({
    status: '',
    adminNotes: ''
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/complaints`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch complaints');
      }
      
      const data = await response.json();
      setComplaints(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching complaints:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/complaints/${selectedComplaint._id}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        throw new Error('Failed to update complaint');
      }

      await fetchComplaints();
      setShowUpdateModal(false);
      setSelectedComplaint(null);
      setUpdateData({ status: '', adminNotes: '' });
    } catch (err) {
      setError(err.message);
      console.error('Error updating complaint:', err);
    }
  };

  const handleDeleteComplaint = async (complaintId) => {
    if (!window.confirm('Are you sure you want to delete this complaint?')) {
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/complaints/${complaintId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete complaint');
      }

      await fetchComplaints();
    } catch (err) {
      setError(err.message);
      console.error('Error deleting complaint:', err);
    }
  };

  const openUpdateModal = (complaint) => {
    setSelectedComplaint(complaint);
    setUpdateData({
      status: complaint.status,
      adminNotes: complaint.adminNotes || ''
    });
    setShowUpdateModal(true);
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = 
      complaint.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.userId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      complaint.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || complaint.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusBadge = (status) => {
    const statusClasses = {
      'pending': 'status-pending',
      'in-progress': 'status-progress',
      'resolved': 'status-resolved'
    };

    const statusIcons = {
      'pending': <FaClock />,
      'in-progress': <FaExclamationCircle />,
      'resolved': <FaCheck />
    };

    return (
      <span className={`status-badge ${statusClasses[status]}`}>
        {statusIcons[status]}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      'high': 'priority-high',
      'medium': 'priority-medium',
      'low': 'priority-low'
    };

    return (
      <span className={`priority-badge ${priorityClasses[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="complaints-management-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading complaints...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="complaints-management-container">
        <div className="error-container">
          <h3>Error Loading Complaints</h3>
          <p>{error}</p>
          <button onClick={fetchComplaints} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="complaints-management-container">
      <div className="complaints-management-header">
        <div className="header-left">
          <h2>Complaints Management</h2>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <div className="filters">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <select
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
            className="priority-filter"
          >
            <option value="all">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>

      <div className="complaints-list">
        {filteredComplaints.length === 0 ? (
          <div className="no-complaints">
            <div className="no-complaints-icon">📝</div>
            <h3>No complaints found</h3>
            <p>No complaints match your current filters.</p>
          </div>
        ) : (
          filteredComplaints.map((complaint) => (
            <div key={complaint._id} className="complaint-card">
              <div className="complaint-header">
                <div className="complaint-title">
                  <h3>{complaint.title}</h3>
                  {getPriorityBadge(complaint.priority)}
                </div>
                {getStatusBadge(complaint.status)}
              </div>
              <div className="complaint-info">
                <div className="info-row">
                  <span className="label">User:</span>
                  <span className="value">{complaint.userName} </span>
                </div>
                <div className="info-row">
                  <span className="label">Room:</span>
                  <span className="value">{complaint.room}</span>
                </div>
                <div className="info-row">
                  <span className="label">Category:</span>
                  <span className="value">{complaint.category}</span>
                </div>
                <div className="info-row">
                  <span className="label">Reported:</span>
                  <span className="value">
                    {new Date(complaint.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="complaint-description">
                <p>{complaint.description}</p>
              </div>
              {complaint.adminNotes && (
                <div className="admin-notes">
                  <strong>Admin Notes:</strong>
                  <p>{complaint.adminNotes}</p>
                </div>
              )}
              <div className="complaint-actions">
                <button 
                  className="update-btn"
                  onClick={() => openUpdateModal(complaint)}
                >
                  <FaEdit /> Update Status
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDeleteComplaint(complaint._id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Update Status Modal */}
      {showUpdateModal && selectedComplaint && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Update Complaint Status</h3>
              <button 
                className="modal-close"
                onClick={() => setShowUpdateModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleUpdateStatus} className="update-form">
              <div className="form-group">
                <label htmlFor="status">Status *</label>
                <select
                  id="status"
                  value={updateData.status}
                  onChange={(e) => setUpdateData({...updateData, status: e.target.value})}
                  required
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="adminNotes">Admin Notes</label>
                <textarea
                  id="adminNotes"
                  value={updateData.adminNotes}
                  onChange={(e) => setUpdateData({...updateData, adminNotes: e.target.value})}
                  rows="4"
                  placeholder="Add notes or response for the student..."
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Update Complaint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsManagement; 