import React, { createContext, useContext } from 'react';
import { useRooms } from '../hooks/useRooms';

const RoomContext = createContext(null);

export const RoomProvider = ({ children }) => {
  const roomData = useRooms();

  return (
    <RoomContext.Provider value={roomData}>
      {children}
    </RoomContext.Provider>
  );
};

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error('useRoomContext must be used within a RoomProvider');
  }
  return context;
}; 