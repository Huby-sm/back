import mongoose from "mongoose";
import { Schema } from "mongoose";

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
    messages: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", ConversationSchema); //"nom de la collection", classe
export default Conversation;
