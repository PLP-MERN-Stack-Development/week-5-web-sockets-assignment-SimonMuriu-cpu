import { useState, useEffect } from 'react';

export const useChat = (socket) => {
  const [messages, setMessages] = useState([]);
  const [typingUsers, setTypingUsers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);

  useEffect(() => {
    if (socket) {
      socket.on('newMessage', (message) => {
        setMessages(prev => [...prev, message]);
      });

      socket.on('userTyping', (data) => {
        setTypingUsers(prev => {
          const exists = prev.find(u => u.userId === data.userId);
          if (!exists) {
            return [...prev, data];
          }
          return prev;
        });
      });

      socket.on('stopTyping', (data) => {
        setTypingUsers(prev => prev.filter(u => u.userId !== data.userId));
      });

      socket.on('roomJoined', (data) => {
        setCurrentRoom(data.room);
        setMessages(data.messages);
      });

      return () => {
        socket.off('newMessage');
        socket.off('userTyping');
        socket.off('stopTyping');
        socket.off('roomJoined');
      };
    }
  }, [socket]);

  const sendMessage = (content) => {
    if (socket && currentRoom) {
      socket.emit('sendMessage', {
        roomId: currentRoom._id,
        content
      });
    }
  };

  const joinRoom = (roomId) => {
    if (socket) {
      socket.emit('joinRoom', roomId);
    }
  };

  const startTyping = () => {
    if (socket && currentRoom) {
      socket.emit('typing', {
        roomId: currentRoom._id,
        isTyping: true
      });
    }
  };

  const stopTyping = () => {
    if (socket && currentRoom) {
      socket.emit('typing', {
        roomId: currentRoom._id,
        isTyping: false
      });
    }
  };

  return {
    messages,
    typingUsers,
    currentRoom,
    sendMessage,
    joinRoom,
    startTyping,
    stopTyping
  };
};