import React, { useState, useEffect } from 'react';
import { FaBed, FaUser, FaEdit, FaTrash, FaPlus, FaSearch, FaSort, FaFilter } from 'react-icons/fa';
import './RoomManagement.css';
import ConfirmationDialog from '../../Common/ConfirmationDialog';
import { useAuth } from '../../../context/AuthContext';

const RoomManagement = () => {
  const { token } = useAuth();
  
  // Debugging console logs
  console.log("Token in RoomManagement:", token);
  console.log("Token type:", typeof token);
  console.log("Token length:", token ? token.length : 0);
  
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('roomNumber');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [formData, setFormData] = useState({
    roomNumber: '',
    roomType: 'single',
    capacity: '',
    price: '',
    notes: ''
  });

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [roomToDeleteId, setRoomToDeleteId] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setIsLoading(true);
      setError(null);
      try {
        console.log("Making request with token:", token);
        console.log("Authorization header:", `Bearer ${token}`);
        
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/rooms`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.log("Error response body:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Successfully fetched rooms:", data);
        setRooms(data);
      } catch (error) {
        console.error('Error fetching rooms:', error);
        setError('Failed to fetch rooms.');
        setRooms([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (token) {
      console.log("Token available, fetching rooms...");
      fetchRooms();
    } else {
      console.log("No token available, skipping fetch");
      setIsLoading(false);
    }
  }, [token]);

  const filteredAndSortedRooms = rooms
    .filter(room => {
      const matchesSearch = room.roomNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        room.roomType.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = filterStatus === 'all' || room.isAvailable === (filterStatus === 'available');
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price - b.price;
        case 'capacity':
          return a.capacity - b.capacity;
        case 'roomNumber':
          return a.roomNumber.localeCompare(b.roomNumber);
        default:
          return 0;
      }
    });

  const handleAddRoom = () => {
    setSelectedRoom(null);
    setFormData({
      roomNumber: '',
      roomType: 'single',
      capacity: '',
      price: '',
      notes: ''
    });
    setIsModalOpen(true);
  };

  const handleEditRoom = (room) => {
    setSelectedRoom(room);
    setFormData({
      roomNumber: room.roomNumber,
      roomType: room.roomType,
      capacity: room.capacity,
      price: room.price,
      notes: room.notes || ''
    });
    setIsModalOpen(true);
  };

  const handleDeleteRoom = (roomId) => {
    setRoomToDeleteId(roomId);
    setIsDeleteDialogOpen(true);
  };

  const executeDelete = async () => {
    setIsDeleteDialogOpen(false);
    if (roomToDeleteId) {
      try {
        console.log("Deleting room with token:", token);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/rooms/${roomToDeleteId}`, { 
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log("Delete response status:", response.status);
        if (!response.ok) {
          const errorText = await response.text();
          console.log("Delete error response:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        setRooms(rooms.filter(room => room._id !== roomToDeleteId));
        setRoomToDeleteId(null);
      } catch (error) {
        console.error('Error deleting room:', error);
        setError('Failed to delete room.');
      }
    }
  };

  const handleCancelDelete = () => {
    setIsDeleteDialogOpen(false);
    setRoomToDeleteId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting form with token:", token);
      if (selectedRoom) {
        console.log("Updating room:", selectedRoom._id);
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/rooms/${selectedRoom._id}`, {
          method: 'PUT',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(formData)
        });
        console.log("Update response status:", response.status);
        if (!response.ok) {
          const errorText = await response.text();
          console.log("Update error response:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const updatedRoom = await response.json();
        setRooms(rooms.map(room =>
          room._id === updatedRoom._id ? updatedRoom : room
        ));
      } else {
        console.log("Creating new room");
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/admin/rooms`, {
          method: 'POST',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json' 
          },
          body: JSON.stringify(formData)
        });
        console.log("Create response status:", response.status);
        if (!response.ok) {
          const errorText = await response.text();
          console.log("Create error response:", errorText);
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const newRoom = await response.json();
        setRooms([...rooms, newRoom]);
      }
      setIsModalOpen(false);
      setFormData({
        roomNumber: '',
        roomType: 'single',
        capacity: '',
        price: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error saving room:', error);
      setError(`Failed to save room: ${error.message}`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="rm-container">
      <div className="rm-header">
        <h2>Room Management</h2>
        <div className="rm-header-actions">
          <div className="rm-search-bar">
            <FaSearch className="rm-search-icon" />
            <input
              type="text"
              className="rm-search-input"
              placeholder="Search rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="rm-filter-btn"
            onClick={() => setShowFilters(!showFilters)}
          >
            <FaFilter /> Filters
          </button>
          <button className="rm-add-room-btn" onClick={handleAddRoom}>
            <FaPlus /> Add New Room
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="rm-filters-panel">
          <div className="rm-filter-group">
            <label className="rm-filter-label">Sort By:</label>
            <select 
              className="rm-filter-select"
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="roomNumber">Room Number</option>
              <option value="price">Price</option>
              <option value="capacity">Capacity</option>
            </select>
          </div>
          <div className="rm-filter-group">
            <label className="rm-filter-label">Status:</label>
            <select 
              className="rm-filter-select"
              value={filterStatus} 
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">All</option>
              <option value="available">Available</option>
              <option value="occupied">Occupied</option>
            </select>
          </div>
        </div>
      )}

      {error && (
        <div className="rm-error-message">
          {error}
        </div>
      )}

      <div className="rm-stats">
        <div className="rm-stat-card">
          <h3 className="rm-stat-title">Total Rooms</h3>
          <p className="rm-stat-value">{rooms.length}</p>
        </div>
        <div className="rm-stat-card">
          <h3 className="rm-stat-title">Available Rooms</h3>
          <p className="rm-stat-value">{rooms.filter(room => room.isAvailable).length}</p>
        </div>
        <div className="rm-stat-card">
          <h3 className="rm-stat-title">Occupied Rooms</h3>
          <p className="rm-stat-value">{rooms.filter(room => !room.isAvailable).length}</p>
        </div>
      </div>

      {isLoading ? (
        <div className="rm-loading-spinner">Loading rooms...</div>
      ) : (
        <div className="rm-rooms-grid">
          {filteredAndSortedRooms.map(room => (
            <div key={room._id} className={`rm-room-card ${room.isAvailable ? 'available' : 'occupied'}`}>
              <div className="rm-card-header">
                <h3 className="rm-card-title">Room {room.roomNumber}</h3>
                <span className={`rm-status-badge ${room.isAvailable ? 'available' : 'occupied'}`}>
                  {room.isAvailable ? 'Available' : 'Occupied'}
                </span>
              </div>
              
              <div className="rm-room-details">
                <p className="rm-detail-item"><FaBed /> Type: {room.roomType}</p>
                <div className="rm-occupancy-bar">
                  <div 
                    className="rm-occupancy-fill"
                    style={{ width: `${(room.currentOccupants / room.capacity) * 100}%` }}
                  />
                  <p className="rm-detail-item"><FaUser /> {room.currentOccupants}/{room.capacity}</p>
                </div>
                <p className="rm-detail-item">₹{room.price}/month</p>
                {room.notes && <p className="rm-detail-item">Notes: {room.notes}</p>}
              </div>

              <div className="rm-card-actions">
                <button 
                  className="rm-edit-btn"
                  onClick={() => handleEditRoom(room)}
                >
                  <FaEdit /> Edit
                </button>
                <button 
                  className="rm-delete-btn"
                  onClick={() => handleDeleteRoom(room._id)}
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          ))}
          {filteredAndSortedRooms.length === 0 && !isLoading && !error && (
            <div className="rm-no-rooms">No rooms found.</div>
          )}
        </div>
      )}

      {isModalOpen && (
        <div className="rm-modal-overlay">
          <div className="rm-modal-content">
            <h3 className="rm-modal-title">{selectedRoom ? 'Edit Room' : 'Add New Room'}</h3>
            <form onSubmit={handleSubmit}>
              <div className="rm-form-group">
                <label className="rm-form-label" htmlFor="roomNumber">Room Number</label>
                <input
                  type="text"
                  className="rm-form-input"
                  id="roomNumber"
                  name="roomNumber"
                  value={formData.roomNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="rm-form-group">
                <label className="rm-form-label" htmlFor="roomType">Room Type</label>
                <select
                  className="rm-form-select"
                  id="roomType"
                  name="roomType"
                  value={formData.roomType}
                  onChange={handleInputChange}
                >
                  <option value="single">Single</option>
                  <option value="double">Double</option>
                  <option value="triple">Triple</option>
                </select>
              </div>

              <div className="rm-form-group">
                <label className="rm-form-label" htmlFor="capacity">Capacity</label>
                <input
                  type="number"
                  className="rm-form-input"
                  id="capacity"
                  name="capacity"
                  value={formData.capacity}
                  onChange={handleInputChange}
                  min="1"
                  required
                />
              </div>

              <div className="rm-form-group">
                <label className="rm-form-label" htmlFor="price">Price (per month)</label>
                <input
                  type="number"
                  className="rm-form-input"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>

              <div className="rm-form-group">
                <label className="rm-form-label" htmlFor="notes">Notes</label>
                <textarea
                  className="rm-form-textarea"
                  id="notes"
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  rows="3"
                ></textarea>
              </div>

              {selectedRoom && (
                <div className="rm-form-group">
                  <label className="rm-form-label" htmlFor="currentOccupants">Current Occupants</label>
                  <input
                    type="number"
                    className="rm-form-input"
                    id="currentOccupants"
                    name="currentOccupants"
                    value={selectedRoom.currentOccupants}
                    onChange={handleInputChange}
                    min="0"
                    max={formData.capacity}
                    disabled
                  />
                </div>
              )}

              {selectedRoom && (
                <div className="rm-form-group">
                  <label className="rm-form-label" htmlFor="isAvailable">Status</label>
                  <select
                    className="rm-form-select"
                    id="isAvailable"
                    name="isAvailable"
                    value={selectedRoom.isAvailable}
                    onChange={handleInputChange}
                  >
                    <option value={true}>Available</option>
                    <option value={false}>Occupied</option>
                  </select>
                </div>
              )}

              <div className="rm-modal-actions">
                <button type="button" className="rm-modal-btn" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="rm-modal-btn">
                  {selectedRoom ? 'Update Room' : 'Add Room'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isDeleteDialogOpen && (
        <ConfirmationDialog
          message="Are you sure you want to delete this room? This action cannot be undone."
          onConfirm={executeDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default RoomManagement;