const Message = require('../models/Message');
const Room = require('../models/Room');

const sendMessage = async (socket, data) => {
  try {
    const { roomId, content } = data;
    
    const message = new Message({
      content,
      sender: socket.user._id,
      room: roomId
    });
    
    await message.save();
    await message.populate('sender', 'username avatar');
    
    // Update room's last message
    await Room.findByIdAndUpdate(roomId, { lastMessage: message._id });
    
    return message;
  } catch (error) {
    throw new Error('Failed to send message');
  }
};

const getMessages = async (roomId, limit = 50) => {
  try {
    const messages = await Message.find({ room: roomId })
      .populate('sender', 'username avatar')
      .sort({ createdAt: -1 })
      .limit(limit);
    
    return messages.reverse();
  } catch (error) {
    throw new Error('Failed to get messages');
  }
};

const markAsRead = async (messageId, userId) => {
  try {
    await Message.findByIdAndUpdate(messageId, {
      $addToSet: {
        readBy: {
          user: userId,
          readAt: new Date()
        }
      }
    });
  } catch (error) {
    throw new Error('Failed to mark message as read');
  }
};

module.exports = {
  sendMessage,
  getMessages,
  markAsRead
};