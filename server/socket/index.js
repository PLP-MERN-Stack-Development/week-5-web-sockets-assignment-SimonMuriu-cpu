const message = require('../models/Message');
const User = require('../models/User');

module.exports = (io) => {
    io.on("connection", (socket)=> {
        console.log("Socket Connected:", socket.id);

        socket.on("joinRoom", async ({username, roomId})=> {
            const user = await User.findOneAndUpdate({ username },
                { socketId: socket.id, isOnline: true}, 
                { new: true }
            );

            socket.join(roomId);
            io.to(toomId).emit("userJoined", { user, roomId});

            //Typing
            socket.on("typing", ()=> {
                socket.to(roomId).emit("Typing", { username });
            });
            //Stop Typing
            socket.on("stopTyping", ()=> {
                socket.to(roomId).emit("stopTyping", { username });
            });
            //Send Message
            socket.on("sendMessage", async ({ data })=> {
                const message = await message.create({
                    sender: user._id,
                    content: data,
                    room: roomId
                });
                const fullMessage = await message.populate('sender', 'username avatar');
                io.to(roomId).emit("newMessage", fullMessage);
            });

            //Disconnect
            socket.on("disconnect", async () => {
                const offlineUser = await user.findOneAndUpdate(
                    { socketId: socket.id},
                    {isOnline: false},
                );
                io.emit("userOffline", offlineUser.username);
            });
        });
    });
};