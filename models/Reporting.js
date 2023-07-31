import mongoose from "mongoose";
import { Schema } from "mongoose";

const ReportingSchema = new mongoose.Schema(
  {
    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: function () {
        return !this.comment;
      },
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
      required: function () {
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
