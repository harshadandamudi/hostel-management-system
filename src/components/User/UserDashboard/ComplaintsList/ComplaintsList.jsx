import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaCheck, FaClock, FaTimes, FaPlus, FaEdit, FaTrash, FaSearch } from 'react-icons/fa';
import { useAuth } from '../../../../context/AuthContext';
import './ComplaintsList.css';

const ComplaintsList = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showNewComplaintModal, setShowNewComplaintModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingComplaint, setEditingComplaint] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // New complaint form state
  const [newComplaint, setNewComplaint] = useState({
    title: '',
    description: '',
    category: 'Maintenance',
    priority: 'medium'
  });

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      setLoading(true);
      const userId = user?.id || user?.userId || 'default';
      const response = await fetch(`http://localhost:5000/api/complaints/user/${userId}`);
      
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

  const handleSubmitNewComplaint = async (e) => {
    e.preventDefault();
    try {
      const complaintData = {
        userId: user?.id || user?.userId || 'default',
        userName: user?.name || user?.fullName || user?.firstName + ' ' + user?.lastName || 'User',
        room: user?.room || 'N/A',
        ...newComplaint
      };

      const response = await fetch('http://localhost:5000/api/complaints', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(complaintData),
      });

      if (!response.ok) {
        throw new Error('Failed to create complaint');
      }

      await fetchComplaints();
      setShowNewComplaintModal(false);
      setNewComplaint({
        title: '',
        description: '',
        category: 'Maintenance',
        priority: 'medium'
      });
    } catch (err) {
      setError(err.message);
      console.error('Error creating complaint:', err);
    }
  };

  const handleDeleteComplaint = async (complaintId) => {
    if (!window.confirm('Are you sure you want to delete this complaint?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/complaints/${complaintId}`, {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <FaClock className="status-icon pending" />;
      case 'resolved':
        return <FaCheck className="status-icon resolved" />;
      case 'in-progress':
        return <FaExclamationTriangle className="status-icon in-progress" />;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority) => {
    const priorityClasses = {
      high: 'priority-high',
      medium: 'priority-medium',
      low: 'priority-low'
    };

    return (
      <span className={`priority-badge ${priorityClasses[priority]}`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </span>
    );
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      pending: 'status-pending',
      'in-progress': 'status-progress',
      resolved: 'status-resolved'
    };

    return (
      <span className={`status-badge ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         complaint.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || complaint.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="complaints-container">
        <div className="complaints-loading">
          <div className="loading-spinner"></div>
          <p>Loading complaints...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="complaints-container">
        <div className="complaints-error">
          <h3>Error Loading Complaints</h3>
          <p>{error}</p>
          <button onClick={fetchComplaints} className="retry-btn">Retry</button>
        </div>
      </div>
    );
  }

  return (
    <div className="complaints-container">
      {/* Header */}
      <div className="complaints-header">
        <div className="header-left">
          <h2>My Complaints & Issues</h2>
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search complaints..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
        <div className="header-right">
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
          <button 
            className="new-complaint-btn"
            onClick={() => setShowNewComplaintModal(true)}
          >
            <FaPlus /> New Complaint
          </button>
        </div>
      </div>

      {/* Complaints List */}
      <div className="complaints-list">
        {filteredComplaints.length === 0 ? (
          <div className="no-complaints">
            <div className="no-complaints-icon">📝</div>
            <h3>No complaints found</h3>
            <p>You haven't submitted any complaints yet.</p>
            <button 
              className="new-complaint-btn"
              onClick={() => setShowNewComplaintModal(true)}
            >
              <FaPlus /> Submit Your First Complaint
            </button>
          </div>
        ) : (
          filteredComplaints.map((complaint) => (
            <div key={complaint._id} className="complaint-card">
              <div className="complaint-header">
                <div className="complaint-title">
                  {getStatusIcon(complaint.status)}
                  <h3>{complaint.title}</h3>
                </div>
                <div className="complaint-badges">
                  {getPriorityBadge(complaint.priority)}
                  {getStatusBadge(complaint.status)}
                </div>
              </div>

              <div className="complaint-info">
                <div className="info-row">
                  <span className="label">Category:</span>
                  <span className="value">{complaint.category}</span>
                </div>
                <div className="info-row">
                  <span className="label">Room:</span>
                  <span className="value">{complaint.room}</span>
                </div>
                <div className="info-row">
                  <span className="label">Reported:</span>
                  <span className="value">
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <p className="complaint-description">{complaint.description}</p>

              {complaint.adminNotes && (
                <div className="admin-notes">
                  <strong>Admin Response:</strong>
                  <p>{complaint.adminNotes}</p>
                </div>
              )}

              <div className="complaint-footer">
                <div className="complaint-actions">
                  {complaint.status === 'pending' && (
                    <button 
                      className="action-btn delete-btn"
                      onClick={() => handleDeleteComplaint(complaint._id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* New Complaint Modal */}
      {showNewComplaintModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Submit New Complaint</h3>
              <button 
                className="modal-close"
                onClick={() => setShowNewComplaintModal(false)}
              >
                <FaTimes />
              </button>
            </div>
            
            <form onSubmit={handleSubmitNewComplaint} className="complaint-form">
              <div className="form-group">
                <label htmlFor="title">Title *</label>
                <input
                  type="text"
                  id="title"
                  value={newComplaint.title}
                  onChange={(e) => setNewComplaint({...newComplaint, title: e.target.value})}
                  required
                  placeholder="Brief description of the issue"
                />
              </div>

              <div className="form-group">
                <label htmlFor="category">Category *</label>
                <select
                  id="category"
                  value={newComplaint.category}
                  onChange={(e) => setNewComplaint({...newComplaint, category: e.target.value})}
                  required
                >
                  <option value="Maintenance">Maintenance</option>
                  <option value="Plumbing">Plumbing</option>
                  <option value="Electrical">Electrical</option>
                  <option value="Internet">Internet</option>
                  <option value="Cleaning">Cleaning</option>
                  <option value="Security">Security</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="priority">Priority *</label>
                <select
                  id="priority"
                  value={newComplaint.priority}
                  onChange={(e) => setNewComplaint({...newComplaint, priority: e.target.value})}
                  required
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="description">Description *</label>
                <textarea
                  id="description"
                  value={newComplaint.description}
                  onChange={(e) => setNewComplaint({...newComplaint, description: e.target.value})}
                  required
                  rows="4"
                  placeholder="Please provide detailed description of the issue..."
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="button" 
                  className="btn-secondary"
                  onClick={() => setShowNewComplaintModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Submit Complaint
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ComplaintsList; 