import User from "./models/User.js";
import Notification from "./models/Notification.js";
import { io } from "./socketio/setup.js";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const test = async () => {
  // await sleep(5000);
  // const users = await User.find({ _id: "64b667da48396b12212f1654" });
  // console.log("users :>> ", users);
  // // const not = await Notification.find({});
  // // console.log("not :>> ", not);
  // // await Notification.deleteMany({});
  // const newNotif = new Notification({
  //   type: "newPost",
  //   data: { postTitle: "post 3" },
  //   userId: "64b667da48396b12212f1654",
  // });
  // await newNotif.save();
  // io.sockets.sockets
  //   .get(users[0].socketIds[0])
  //   .emit("notification", JSON.stringify(newNotif));
};

export default test;
