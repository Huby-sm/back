import User from "./models/User.js";
import Notification from "./models/Notification.js";

const test = async () => {
  const users = await User.find({ _id: "64b667da48396b12212f1654" });
  console.log("users :>> ", users);
  // const not = await Notification.find({});
  // console.log("not :>> ", not);
};

export default test;
