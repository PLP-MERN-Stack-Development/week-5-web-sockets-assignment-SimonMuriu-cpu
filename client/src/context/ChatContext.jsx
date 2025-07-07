import React, { createContext, useContext } from 'react';
import { useSocketContext } from './SocketContext';
import { useChat } from '../hooks/useChat';

const ChatContext = createContext();

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};

export const ChatProvider = ({ children }) => {
  const { socket } = useSocketContext();
  const chatData = useChat(socket);

  return (
    <ChatContext.Provider value={chatData}>
      {children}
    </ChatContext.Provider>
  );
};