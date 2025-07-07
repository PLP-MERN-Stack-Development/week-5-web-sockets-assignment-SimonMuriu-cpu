import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useChatContext } from '../context/ChatContext';
import { Send, Smile, Paperclip, MoreVertical, Hash, Users } from 'lucide-react';

const ChatArea = () => {
  const { user } = useAuth();
  const { messages, currentRoom, sendMessage, typingUsers, startTyping, stopTyping } = useChat();
  const [messageInput, setMessageInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Sample messages for demonstration
  const sampleMessages = [
    {
      _id: '1',
      content: 'Welcome to the chat room! 👋',
      sender: { _id: 'system', username: 'System', avatar: '' },
      createdAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
      _id: '2',
      content: 'Hey everyone! How is everyone doing today?',
      sender: { _id: 'user1', username: 'Alice', avatar: '' },
      createdAt: new Date(Date.now() - 1800000).toISOString()
    },
    {
      _id: '3',
      content: 'Great! Just working on some new features for our app.',
      sender: { _id: 'user2', username: 'Bob', avatar: '' },
      createdAt: new Date(Date.now() - 900000).toISOString()
    },
    {
      _id: '4',
      content: 'That sounds exciting! What kind of features?',
      sender: { _id: 'user1', username: 'Alice', avatar: '' },
      createdAt: new Date(Date.now() - 600000).toISOString()
    }
  ];

  const displayMessages = messages.length > 0 ? messages : sampleMessages;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [displayMessages]);

  const handleInputChange = (e) => {
    setMessageInput(e.target.value);
    
    if (!isTyping) {
      setIsTyping(true);
      startTyping();
    }

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
      stopTyping();
    }, 1000);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim()) {
      sendMessage(messageInput.trim());
      setMessageInput('');
      setIsTyping(false);
      stopTyping();
      
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString();
    }
  };

  const shouldShowDateSeparator = (currentMsg, prevMsg) => {
    if (!prevMsg) return true;
    const currentDate = new Date(currentMsg.createdAt).toDateString();
    const prevDate = new Date(prevMsg.createdAt).toDateString();
    return currentDate !== prevDate;
  };

  if (!currentRoom) {
    return null;
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Chat Header */}
      <div className="px-6 py-4 border-b border-gray-200 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-3">
              <Hash className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {currentRoom.name || 'General'}
              </h2>
              <div className="flex items-center text-sm text-gray-500">
                <Users className="h-4 w-4 mr-1" />
                <span>{currentRoom.participants?.length || 12} members</span>
                <span className="mx-2">•</span>
                <span>Active now</span>
              </div>
            </div>
          </div>
          <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
            <MoreVertical className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {displayMessages.map((message, index) => {
          const prevMessage = index > 0 ? displayMessages[index - 1] : null;
          const showDateSeparator = shouldShowDateSeparator(message, prevMessage);
          const isOwnMessage = message.sender._id === user?.id;
          const showAvatar = !prevMessage || prevMessage.sender._id !== message.sender._id;

          return (
            <div key={message._id}>
              {showDateSeparator && (
                <div className="flex items-center justify-center my-6">
                  <div className="bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-full">
                    {formatDate(message.createdAt)}
                  </div>
                </div>
              )}
              
              <div className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex max-w-xs lg:max-w-md ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Avatar */}
                  <div className={`flex-shrink-0 ${isOwnMessage ? 'ml-3' : 'mr-3'}`}>
                    {showAvatar ? (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-medium ${
                        message.sender._id === 'system' 
                          ? 'bg-gray-500'
                          : isOwnMessage 
                            ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                            : 'bg-gradient-to-r from-green-400 to-blue-500'
                      }`}>
                        {message.sender.username.charAt(0).toUpperCase()}
                      </div>
                    ) : (
                      <div className="w-8 h-8"></div>
                    )}
                  </div>

                  {/* Message Content */}
                  <div className={`flex flex-col ${isOwnMessage ? 'items-end' : 'items-start'}`}>
                    {showAvatar && (
                      <div className={`flex items-center mb-1 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}>
                        <span className="text-sm font-medium text-gray-900">
                          {message.sender.username}
                        </span>
                        <span className={`text-xs text-gray-500 ${isOwnMessage ? 'mr-2' : 'ml-2'}`}>
                          {formatTime(message.createdAt)}
                        </span>
                      </div>
                    )}
                    
                    <div className={`px-4 py-2 rounded-2xl ${
                      isOwnMessage
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Typing Indicators */}
        {typingUsers.length > 0 && (
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
            </div>
            <span>
              {typingUsers.map(u => u.username).join(', ')} 
              {typingUsers.length === 1 ? ' is' : ' are'} typing...
            </span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="px-6 py-4 border-t border-gray-200 bg-white">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <button
            type="button"
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={messageInput}
              onChange={handleInputChange}
              placeholder={`Message #${currentRoom.name || 'general'}`}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-500 hover:text-gray-700 transition-colors"
            >
              <Smile className="h-5 w-5" />
            </button>
          </div>
          
          <button
            type="submit"
            disabled={!messageInput.trim()}
            className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Send className="h-5 w-5" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatArea;