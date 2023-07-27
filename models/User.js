import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "user", // user - admin - bde
    },
    friends: {
      type: Array,
      default: [],
    },
    socketIds: [
      {
        type: String,
      },
    ],
    promo: String,
    filiere: String,
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema); //"nom de la collection", classe
export default User;
//User au singulier qui correspond au nom de la collection
