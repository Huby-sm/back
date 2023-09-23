import mongoose from "mongoose";
import { Schema } from "mongoose";

const NotificationSchema = new mongoose.Schema(
  {
    type: { //blocage/ajout ami
      type: String,
      required: true,
    },
    userId: { //recois la notifaction
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    data: { //données associé a la notification (blocage savoir si bloqué ou debloqué)
      type: Object,
    },
    seen: {
      type: Boolean,
      required: true,
      default: false,
    },
    friendId: { //dans le cas d'une amitié
      type: Schema.Types.ObjectId,
      ref: "Friend",
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", NotificationSchema); //"nom de la collection", classe
export default Notification;
