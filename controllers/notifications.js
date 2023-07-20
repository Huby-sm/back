import User from "../models/User.js";
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
