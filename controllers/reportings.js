import User from "../models/User.js";
import Reporting from "../models/Reporting.js";

export const listReportings = async (req, res) => {
  try {
    const reportings = await Reporting.find().sort({ createdAt: "desc" });

    res.status(201).json(reportings);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

export const createReporting = async (req, res) => {
  try {
    const { postId, commentId } = req.body;
    const { id } = req.user;
    const reporting = await Reporting.findOne({
      post: postId,
      comment: commentId,
      reporter: id,
    });

    if (!reporting) {
      return res.status(200).json({ message: "reporting already created" });
    }

    const newReporting = new Reporting({
      post: postId,
      comment: commentId,
      reporter: id,
    });

    await newReporting.save();

    res.status(200).json(newReporting);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};
