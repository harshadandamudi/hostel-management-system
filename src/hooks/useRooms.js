import { useState, useEffect, useCallback } from 'react';
import { roomService } from '../services/api/roomService';

export const useRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    available: 0,
    occupied: 0
  });

  // Fetch all rooms
  const fetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      const data = await roomService.getAllRooms();
      setRooms(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch room statistics
  const fetchStats = useCallback(async () => {
    try {
      const data = await roomService.getRoomStats();
      setStats(data);
    } catch (err) {
      console.error('Error fetching room stats:', err);
    }
  }, []);

  // Add new room
  const addRoom = async (roomData) => {
    try {
      const newRoom = await roomService.createRoom(roomData);
      setRooms(prev => [...prev, newRoom]);
      return newRoom;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update room
  const updateRoom = async (roomId, roomData) => {
    try {
      const updatedRoom = await roomService.updateRoom(roomId, roomData);
      setRooms(prev => prev.map(room => 
        room.id === roomId ? updatedRoom : room
      ));
      return updatedRoom;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Delete room
  const deleteRoom = async (roomId) => {
    try {
      await roomService.deleteRoom(roomId);
      setRooms(prev => prev.filter(room => room.id !== roomId));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Update room occupancy
  const updateOccupancy = async (roomId, occupancy) => {
    try {
      const updatedRoom = await roomService.updateOccupancy(roomId, occupancy);
      setRooms(prev => prev.map(room => 
        room.id === roomId ? updatedRoom : room
      ));
      return updatedRoom;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchRooms();
    fetchStats();
  }, [fetchRooms, fetchStats]);

  return {
    rooms,
    loading,
    error,
    stats,
    addRoom,
    updateRoom,
    deleteRoom,
    updateOccupancy,
    refreshRooms: fetchRooms
  };
}; 