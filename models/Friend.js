import mongoose from "mongoose";
import { Schema } from "mongoose";

const FriendSchema = new mongoose.Schema(
  {
    user1Id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user2Id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: { //request/accepted/decline
      type: String,
      required: true,
      default: "request",
    },
  },
  { timestamps: true }
);

const Notifcation = mongoose.model("Friend", FriendSchema); //"nom de la collection", classe
export default Notifcation;
