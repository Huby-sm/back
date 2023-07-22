import { createServer } from "http";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import { removeAllInstances } from "../utils/index.js";

export let io = null;

export const cleanSocketIds = async () => {
  await User.updateMany({}, { $set: { socketIds: [] } });
};

export const emitNotification = async (userId, message) => {
  const user = await User.findOne({ _id: userId });
  user.socketIds.forEach((socketId) =>
    io.sockets.sockets
      .get(socketId)
      .emit("notification", JSON.stringify(message))
  );
};

const setupSocketIO = async (app, PORT) => {
  const httpServer = createServer(app);
  // app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  io = new Server(httpServer, {
    /* options */
    cors: {
      origin: "*",
      methods: ["GET", "POST", "OPTIONS"],
    },
  });

  io.on("connection", async (socket) => {
    const { id } = jwt.verify(
      socket.handshake.query.token,
      process.env.JWT_SECRET
    );

    const user = await User.findOne({ _id: id });
    user.socketIds.push(socket.id);
    await user.save();

    // io.sockets.sockets
    //   .get(socket.id)
    //   .emit("notification", { data: "PAR ICI MA GUEULE" });

    socket.once("disconnect", async () => {
      const user = await User.findOne({ _id: id });
      removeAllInstances(user.socketIds, socket.id);
      await user.save();
    });
  });

  httpServer.listen(PORT);
};

export default setupSocketIO;
