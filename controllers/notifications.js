import Notification from "../models/Notification.js";

export const createNotification = async (req, res) => {
  try {
    const { userId, type, data } = req.body;
    const notification = new Notification({ userId, type, data });
    await notification.save();
    res.status(200).json(notification);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
export const listNotifications = async (req, res) => {
  try {
    const { id } = req.user;
    const notifications = await Notification.find({ userId: id })
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

    res.status(200).json(notifications);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const countNotSeenNotifications = async (req, res) => {
  try {
    const { id } = req.user;
    const notifications = await Notification.find({ userId: id, seen: false });

    res.status(200).json({ count: notifications.length });
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const markSeen = async (req, res) => {
  try {
    const { id } = req.user;

    console.log("avant1");
    const update = await Notification.updateMany(
      { userId: id, seen: false },
      { $set: { seen: true } }
    );
    console.log("avant");
    res.status(200).json({ status: "ok", update });
  } catch (err) {
    console.log("après");
    res.status(404).json({ message: err.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { data } = req.body;

    const notification = await Notification.findOneAndUpdate(
      { _id: id },
      { seen: true, data },
      { new: true }
    );

    res.status(200).json(notification);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
