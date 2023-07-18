import mongoose from "mongoose";
import { Schema } from "mongoose";

const UserTokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
      required: true,
      max: 50,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    context: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserToken = mongoose.model("UserToken", UserTokenSchema); //"nom de la collection", classe
export default UserToken;
