const socketIo = require('socket.io');
const userModel = require('./models/user.model');
const captainModel = require('./models/captain.model');

let io;

function initializeSocket(server) {
  io = socketIo(server, {
  cors: {
    origin: 'https://uber-nine-ashen.vercel.app',
    methods: ["GET", "POST"],
    credentials: true,
  },
});


  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('join', async ({ userId, userType }) => {
      if (!userId || !userType) return;

      if (userType === 'user') {
        await userModel.findByIdAndUpdate(userId, { socketid: socket.id });
      } else if (userType === 'captain') {
        await captainModel.findByIdAndUpdate(userId, { socketid: socket.id });
      }
    });

    socket.on('update-location-captain', async ({ userId, location }) => {
      if (!location?.lat || !location?.lng) return;

      await captainModel.findByIdAndUpdate(userId, {
        location: {
    type: "Point",
    coordinates: [location.lng, location.lat]
  },
  status: "active"
      });
    });

    socket.on('disconnect', async () => {
      await userModel.updateOne({ socketid: socket.id }, { $unset: { socketid: "" } });
      await captainModel.updateOne({ socketid: socket.id }, { $unset: { socketid: "" } });
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
}

const sendMessageToSocketId = (socketid, messageObject) => {
  console.log("Sending message to socket:", socketid, messageObject);
  if (!socketid || !io) return;
  io.to(socketid).emit(messageObject.event, messageObject.data);
};

module.exports = { initializeSocket, sendMessageToSocketId };
