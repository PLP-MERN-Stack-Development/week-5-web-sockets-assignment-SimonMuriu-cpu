import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useSocket } from '../socket/socket'; // ← Add this import


const SocketContext = createContext();

export const useSocketContext = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocketContext must be used within a SocketProvider');
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const { token } = useAuth();
  const { socket, connected } = useSocket(token);

  const value = {
    socket,
    connected
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
};