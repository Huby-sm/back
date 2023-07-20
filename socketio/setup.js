import { createServer } from "http";
import { Server } from "socket.io";

const setupSocketIO = async (app, PORT) => {
  const httpServer = createServer(app);
  // app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
  const io = new Server(httpServer, {
    /* options */
    cors: {
      origin: "*",
      methods: ["GET", "POST", "OPTIONS"],
    },
  });

  io.on("connection", (socket) => {
    // const userId = socket?.handshake?.query?.userId;
    // console.log("connected", socket.handshake.query.userId);
    console.log("connected :>> ", socket.id);
    // socket.to(userId).emit("user joined", "isis");
    // socket.emit("1234", { data: "ici" });
    // socket.on("message", (toto) => {
    //   console.log("toto :>> ", toto);
    // });
    // console.log(
    //   "io.sockets.connected[socket.id] :>> ",
    //   io.sockets.sockets.get(socket.id)
    // );
    console.log(
      "io.sockets.connected[socket.id] :>> ",
      io.sockets.sockets["toto"]
    );

    io.sockets.sockets.get(socket.id).emit("notification", "PAR ICI MA GUEULE");
    socket.once("disconnect", () => {
      console.log("loool", socket.id);
    });
  });

  httpServer.listen(PORT);
};

export default setupSocketIO;
