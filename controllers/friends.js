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
    console.log("notification  PAR ICI:>> ", notification);

    await emitNotification(userId, notification._id);

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
      status: "request",
    });

    if (friend) {
      friend.status = "friend";
      await friend.save();

      const notification = new Notification({
        userId,
        type: "friendRequest",
        friendId: friend,
      });
      await notification.save();

      await emitNotification(userId, notification._id);

      res.status(200).json(friend);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const declineFriendRequest = async (req, res) => {
  try {
    const { id } = req.user;
    const { userId } = req.body;

    const friend = await Friend.findOne({
      user1Id: userId,
      user2Id: id,
      status: "request",
    });

    if (friend) {
      friend.status = "decline";
      await friend.save();

      const notification = new Notification({
        userId,
        type: "friendRequest",
        friendId: friend,
      });
      await notification.save();

      await emitNotification(userId, notification._id);

      res.status(200).json(friend);
    }
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
