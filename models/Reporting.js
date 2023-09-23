import mongoose from "mongoose";
import { Schema } from "mongoose";

const ReportingSchema = new mongoose.Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: function () {//tej une personne qui ne met pas de comm ou post
        return !this.comment;
      },
    },
    comment: {
      type: Schema.Types.ObjectId,//soi post soi comment
      ref: "Comment",
      required: function () {//si pas de post pas de require, si pas de com pas de require
        return !this.post;
      },
    },
    reporter: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Reporting = mongoose.model("Reporting", ReportingSchema); //"nom de la collection", classe
export default Reporting;
