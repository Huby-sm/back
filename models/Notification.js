import mongoose from "mongoose";
import { Schema } from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    data: {
      type: Object,
    },
    seen: {
      type: Boolean,
      required: true,
      default: false,
    },
    friendId: {
      type: Schema.Types.ObjectId,
      ref: "Friend",
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema); //"nom de la collection", classe
export default Notification;
