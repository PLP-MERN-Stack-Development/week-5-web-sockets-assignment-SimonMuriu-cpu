const { verifyToken } = require('../config/jwt');
const User = require('../models/User');

const authenticateSocket = async (socket, next) => {
  try {
    const token = socket.handshake.auth.token;
    
    if (!token) {
      return next(new Error('Authentication failed - No token provided'));
    }

    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return next(new Error('Authentication failed - User not found'));
    }
    
    socket.user = user;
    next();
  } catch (error) {
    next(new Error('Authentication failed - Invalid token'));
  }
};

module.exports = {
  authenticateSocket
};