const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
  io = socketIo(server, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});


  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('join', async ({ userId, userType }) => {
      if (!userId || !userType) return;

      if (userType === 'user') {
        await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
      } else if (userType === 'captain') {
        await captainModel.findByIdAndUpdate(userId, { socketId: socket.id });
      }
    });

    socket.on('update-location-captain', async ({ userId, location }) => {
      if (!location?.lat || !location?.lng) return;

      await captainModel.findByIdAndUpdate(userId, {
        location: {
          lat: location.lat,
          lng: location.lng
        }
      });
    });

    socket.on('disconnect', async () => {
      await userModel.updateOne({ socketId: socket.id }, { $unset: { socketId: "" } });
      await captainModel.updateOne({ socketId: socket.id }, { $unset: { socketId: "" } });
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

const sendMessageToSocketId = (socketId, messageObject) => {
  if (!socketId || !io) return;
  io.to(socketId).emit(messageObject.event, messageObject.data);
};

module.exports = { initializeSocket, sendMessageToSocketId };
