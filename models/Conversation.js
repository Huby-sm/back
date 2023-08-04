import mongoose from "mongoose";
import { Schema } from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    sender: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

const ConversationSchema = new mongoose.Schema(
  {
    user1: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    user2: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messages: [MessageSchema],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", ConversationSchema); //"nom de la collection", classe
export default Conversation;
