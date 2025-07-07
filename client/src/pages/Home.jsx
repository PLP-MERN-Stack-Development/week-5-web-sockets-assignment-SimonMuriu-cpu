import React from 'react';
import { SocketProvider } from '../context/SocketContext';
import { ChatProvider } from '../context/ChatContext';
import ChatRoom from '../components/ChatRoom';
import ChatArea from '../components/ChatArea';
import { useChat } from '../hooks/useChat';

const HomeContent = () => {
  const { currentRoom } = useChat();

  return (
    <div className="h-screen bg-gray-100 flex">
      <ChatRoom />
      <div className="flex-1 flex flex-col">
        {currentRoom ? (
          <ChatArea />
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center max-w-md">
              <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-white text-3xl font-bold">💬</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Welcome to ChatApp
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                Connect with friends and colleagues in real-time. Select a room from the chat room to start chatting, or create a new room to begin a conversation.
              </p>
              <div className="grid grid-cols-1 gap-4 text-left">
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">💬</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Real-time Messaging</h3>
                    <p className="text-sm text-gray-600">Send and receive messages instantly</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">👥</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Multiple Rooms</h3>
                    <p className="text-sm text-gray-600">Join different conversations</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                  <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center mr-3">
                    <span className="text-white text-sm">⚡</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Live Indicators</h3>
                    <p className="text-sm text-gray-600">See who's online and typing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <SocketProvider>
      <ChatProvider>
        <HomeContent />
      </ChatProvider>
    </SocketProvider>
  );
};

export default Home;