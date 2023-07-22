import Friend from "../models/Friend.js";
import Notification from "../models/Notification.js";
import { emitNotification } from "../socketio/setup.js";

export const createFriendRequest = async (req, res) => {
  try {
    const { id } = req.user;
    const { userId } = req.body;

    const friend = new Friend({
      user1Id: id,
      user2Id: userId,
      status: "request",
    });

    await friend.save();

    const notification = new Notification({
      userId,
      type: "friendRequest",
      friendId: friend,
    });
    await notification.save();

    await emitNotification(userId, notification);

    res.status(200).json(friend);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const acceptFriendRequest = async (req, res) => {
  try {
    const { id } = req.user;
    const { userId } = req.body;

    const friend = await Friend.findOne({
      user1Id: userId,
      user2Id: id,
    });
    console.log("friend KLOOO:>> ", friend);
    if (friend && friend.status === "request") {
      friend.status = "friend";
      await friend.save();

      const notification = new Notification({
        userId,
        type: "friendRequest",
        friendId: friend,
      });
      await notification.save();

      await emitNotification(userId, notification);

      res.status(200).json(friend);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
