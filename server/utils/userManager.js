class UserManager {
  constructor() {
    this.connectedUsers = new Map();
    this.typingUsers = new Map();
  }

  addUser(userId, socketId, user) {
    this.connectedUsers.set(userId.toString(), {
      socketId,
      user
    });
  }

  removeUser(userId) {
    this.connectedUsers.delete(userId.toString());
    
    // Remove typing indicators for this user
    for (const [key, typing] of this.typingUsers.entries()) {
      if (typing.userId.toString() === userId.toString()) {
        this.typingUsers.delete(key);
      }
    }
  }

  getUser(userId) {
    return this.connectedUsers.get(userId.toString());
  }

  getOnlineUsers() {
    return Array.from(this.connectedUsers.values()).map(u => ({
      id: u.user._id,
      username: u.user.username,
      avatar: u.user.avatar
    }));
  }

  setTyping(roomId, userId, username, isTyping) {
    const roomTypingKey = `${roomId}:${userId}`;
    
    if (isTyping) {
      this.typingUsers.set(roomTypingKey, {
        userId,
        username,
        roomId
      });
    } else {
      this.typingUsers.delete(roomTypingKey);
    }
  }

  getTypingUsers(roomId) {
    const typingInRoom = [];
    for (const [key, typing] of this.typingUsers.entries()) {
      if (typing.roomId === roomId) {
        typingInRoom.push(typing);
      }
    }
    return typingInRoom;
  }

  clearTypingForUser(userId) {
    for (const [key, typing] of this.typingUsers.entries()) {
      if (typing.userId.toString() === userId.toString()) {
        this.typingUsers.delete(key);
      }
    }
  }
}

module.exports = new UserManager();