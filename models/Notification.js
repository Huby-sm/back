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
      required: true,
    },
    seen: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

const Notifcation = mongoose.model("Notifcation", NotificationSchema); //"nom de la collection", classe
export default Notifcation;
