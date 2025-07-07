const Room = require('../models/Room');

const createRoom = async (socket, data) => {
  try {
    const { name, description, isPrivate } = data;
    
    const room = new Room({
      name,
      description,
      isPrivate,
      participants: [socket.user._id],
      createdBy: socket.user._id
    });
    
    await room.save();
    await room.populate('participants', 'username avatar isOnline');
    
    return room;
  } catch (error) {
    throw new Error('Failed to create room');
  }
};

const joinRoom = async (roomId, userId) => {
  try {
    const room = await Room.findById(roomId)
      .populate('participants', 'username avatar isOnline')
      .populate({
        path: 'lastMessage',
        populate: {
          path: 'sender',
          select: 'username avatar'
        }
      });
    
    if (!room) {
      throw new Error('Room not found');
    }

    // Add user to room if not already a participant
    if (!room.participants.some(p => p._id.toString() === userId.toString())) {
      room.participants.push(userId);
      await room.save();
    }

    return room;
  } catch (error) {
    throw new Error('Failed to join room');
  }
};

const getUserRooms = async (userId) => {
  try {
    const rooms = await Room.find({ 
      participants: userId 
    }).populate('participants', 'username avatar isOnline');
    
    return rooms;
  } catch (error) {
    throw new Error('Failed to get user rooms');
  }
};

module.exports = {
  createRoom,
  joinRoom,
  getUserRooms
};