import User from "./models/User.js";
import Post from "./models/Post.js";
import Notification from "./models/Notification.js";
import Conversation from "./models/Conversation.js";
import { io } from "./socketio/setup.js";

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const test = async () => {
  //
  // const conv = new Conversation({
  //   user1: "64b667da48396b12212f1654",
  //   user2: "64bc21377a0aa1a095b413d9",
  // });
  // conv.messages.push({
  //   content: "message3",
  //   sender: "64b667da48396b12212f1654",
  // });
  // console.log("conv :>> ", conv);
  // await conv.save();
  // console.log(conv);
  // const conv = await Conversation.findOne(
  //   { _id: "64ccdd14bae0cfc10a308c46" },
  //   { messages: { $slice: -1 } }
  // );
  // const conv = await Conversation.findOne({ _id: "64ccdd14bae0cfc10a308c46" });
  // console.log("conv :>> ", conv);
  // conv.messages.push({
  //   content: "message3",
  //   sender: "64b667da48396b12212f1654",
  // });
  // await conv.save();
  // console.log("conv :>> ", conv);
  // let conversations = await Conversation.find(
  //   {
  //     $or: [
  //       { user1: "64b667da48396b12212f1654" },
  //       { user2: "64b667da48396b12212f1654" },
  //     ],
  //   },
  //   { messages: { $slice: -1 } }
  // )
  //   .populate("user1 user2")
  //   .sort({ updatedAt: -1 })
  //   .exec();
  // console.log("conversations :>> ", conversations);
  // await sleep(5000);
  // const users = await User.find({ _id: "64b667da48396b12212f1654" });
  // const posts = await Post.find({});
  // console.log("posts :>> ", posts);
  // posts.forEach(async (p) => {
  // console.log("typeof p.likes :>> ", typeof p.likes);
  // p.newLikes = Array.from(p.likes.keys());
  // p.likes = p.newLikes;
  // p.newLikes = undefined;
  // console.log("p :>> ", p);
  // await p.save();
  // });
  // console.log("users :>> ", users);
  // // const not = await Notification.find({});
  // // console.log("not :>> ", not);
  // // await Notification.deleteMany({});
  // const newNotif = new Notification({
  //   type: "newPost",
  //   data: { postTitle: "koko" },
  //   userId: "64b667da48396b12212f1654",
  // });
  // await newNotif.save();
  // io.sockets.sockets
  //   .get(users[0].socketIds[0])
  //   .emit("notification", JSON.stringify(newNotif));
};

export default test;
