import { createServer } from "http";
import { Server } from "socket.io";
import { instrument } from "@socket.io/admin-ui";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Notification from "../models/Notification.js";
import { removeAllInstances } from "../utils/index.js";

export let io = null;

export const cleanSocketIds = async () => {
  await User.updateMany({}, { $set: { socketIds: [] } });
};

export const emitNotification = async (userId, notificationId) => {
  const user = await User.findOne({ _id: userId });
  const notification = await Notification.findOne({ _id: notificationId })
    .sort({ createdAt: "desc" })
    .populate("friendId")
    .populate({
      path: "friendId",
      populate: {
        path: "user1Id user2Id",
        model: "User",
      },
    })
    .exec();

  user.socketIds.forEach((socketId) =>
    io.sockets.sockets
      .get(socketId)
      .emit("notification", JSON.stringify(notification))
  );
};

const setupSocketIO = async (app, PORT) => {
  const httpServer = createServer(app);
  // app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  io = new Server(httpServer, {
    /* options */
    cors: {
      // origin: "*",
      origin: ["https://admin.socket.io", "http://localhost:3000"],
      credentials: true,
      methods: ["GET", "POST", "OPTIONS"],
    },
  });

  instrument(io, {
    auth: false,
    mode: "development",
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

    socket.on("joinConversation", async (conversationId) => {
      socket.join("conversation:" + conversationId);
    });

    socket.on("exitConversation", async (conversationId) => {
      socket.leave("conversation:" + conversationId);
    });

    socket.once("disconnect", async () => {
      console.log("ici");
      const user = await User.findOne({ _id: id });
      console.log("user2 :>> ", user);
      if (user) {
        removeAllInstances(user.socketIds, socket.id);
        await user.save();
      }
    });
  });

  httpServer.listen(PORT);
};

export default setupSocketIO;
