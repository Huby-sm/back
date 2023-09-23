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
    blocked: {
      type: Boolean,
      default: false,
    },
    picturePath: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      default: "user", // user - admin - bde
    },
    socketIds: [ //j'enregistre au moment ou je créer la connexion
      { //je mets mes sockets dans ma bdd user
        type: String,
      },
    ],
    promo: String,
    filiere: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema); //"nom de la collection", classe
export default User;
//User au singulier qui correspond au nom de la collection
