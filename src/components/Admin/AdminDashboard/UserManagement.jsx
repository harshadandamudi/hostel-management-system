import React, { useState, useEffect } from 'react';
import { FaUser, FaSearch, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import ConfirmationDialog from '../../common/ConfirmationDialog';
import './UserManagement.css';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmData, setConfirmData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    status: '',
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      if (!token) throw new Error('Admin token not found. Please log in again.');

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error(`Failed to fetch users (${response.status})`);

      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleApprove = async (userId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${userId}/approve`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      setUsers(users.map(user =>
        user._id === userId ? { ...user, status: 'Active' } : user
      ));
    } catch (err) {
      console.error('Error approving user:', err);
      setError(err.message);
    }
  };

  const handleReject = async (userId) => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${userId}/reject`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      setUsers(users.map(user =>
        user._id === userId ? { ...user, status: 'Rejected' } : user
      ));
    } catch (err) {
      console.error('Error rejecting user:', err);
      setError(err.message);
    }
  };

  const handleDelete = async (userId) => {
    const userToDelete = users.find(user => user._id === userId);
    setConfirmData({
      userId,
      userName: `${userToDelete.firstName} ${userToDelete.lastName}`,
    });
    setShowConfirmDialog(true);
  };

  const executeDelete = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${confirmData.userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      setUsers(users.filter(user => user._id !== confirmData.userId));
    } catch (err) {
      console.error('Error deleting user:', err);
      setError(err.message);
    } finally {
      setShowConfirmDialog(false);
      setConfirmData(null);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      status: user.status || 'Pending',
    });
    setShowEditModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/users/${editingUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update user status');

      const updatedUser = await response.json();
      setUsers(users.map(user => 
        user._id === editingUser._id ? updatedUser : user
      ));
      setShowEditModal(false);
      setEditingUser(null);
    } catch (err) {
      console.error('Error updating user status:', err);
      setError(err.message);
    }
  };

  const filteredUsers = users.filter(user =>
    user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate user statistics
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'Active').length;
  const pendingUsers = users.filter(user => user.status === 'Pending').length;
  const rejectedUsers = users.filter(user => user.status === 'Rejected').length;

  const getStatusBadge = (status) => (
    <span className={`um-status-badge ${status?.toLowerCase()}`}>{status || 'Pending'}</span>
  );

  if (loading) return <div className="um-loading">Loading users...</div>;
  if (error) return <div className="um-error">Error: {error}</div>;

  return (
    <div className="um-container">
      {/* Header Section */}
      <div className="um-header">
        <div className="um-header-left">
          <h2>User Management</h2>
          <div className="um-search-bar">
            <FaSearch className="um-search-icon" />
            <input
              type="text"
              className="um-search-input"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* User Statistics */}
      <div className="um-stats">
        <div className="um-stat-card">
          <div className="um-stat-title">Total Users</div>
          <div className="um-stat-value">{totalUsers}</div>
        </div>
        <div className="um-stat-card">
          <div className="um-stat-title">Active Users</div>
          <div className="um-stat-value">{activeUsers}</div>
        </div>
        <div className="um-stat-card">
          <div className="um-stat-title">Pending Approval</div>
          <div className="um-stat-value">{pendingUsers}</div>
        </div>
        <div className="um-stat-card">
          <div className="um-stat-title">Rejected</div>
          <div className="um-stat-value">{rejectedUsers}</div>
        </div>
      </div>

      {/* Users Table */}
      <div className="um-table-container">
        <table className="um-users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Room</th>
              <th>Check-in Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id} className={`um-user-row ${user.status?.toLowerCase()}`}>
                <td>
                  <div className="um-user-info">
                    <FaUser className="um-user-icon" />
                    <div className="um-user-details">
                      <div className="um-user-name">{`${user.firstName || ''} ${user.lastName || ''}`}</div>
                      <div className="um-user-email">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{getStatusBadge(user.status)}</td>
                <td>{user.roomPreference || 'Not Assigned'}</td>
                <td>
                  {user.checkInDate
                    ? new Date(user.checkInDate).toLocaleDateString()
                    : 'N/A'}
                </td>
                <td>
                  <div className="um-action-buttons">
                    {user.status === 'Pending' && (
                      <>
                        <button className="um-action-btn um-approve-btn" onClick={() => handleApprove(user._id)} title="Approve">
                          <FaCheck />
                        </button>
                        <button className="um-action-btn um-reject-btn" onClick={() => handleReject(user._id)} title="Reject">
                          <FaTimes />
                        </button>
                      </>
                    )}
                    <button className="um-action-btn um-edit-btn" onClick={() => handleEdit(user)} title="Edit">
                      <FaEdit />
                    </button>
                    <button className="um-action-btn um-delete-btn" onClick={() => handleDelete(user._id)} title="Delete">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="um-modal-overlay">
          <div className="um-modal-content">
            <h3 className="um-modal-title">Change User Status</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="um-form-group">
                <label className="um-form-label">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  required
                  className="um-form-select"
                >
                  <option value="Pending">Pending</option>
                  <option value="Active">Active</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
              <div className="um-modal-actions">
                <button type="button" className="um-modal-btn" onClick={() => setShowEditModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="um-modal-btn">
                  Update Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ConfirmationDialog
        isOpen={showConfirmDialog}
        onClose={() => {
          setShowConfirmDialog(false);
          setConfirmData(null);
        }}
        onConfirm={executeDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${confirmData?.userName}? This action cannot be undone.`}
      />
    </div>
  );
};

export default UserManagement;