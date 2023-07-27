import mongoose from "mongoose";
import { Schema } from "mongoose";

const EventSchema = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        picturePath: String
    }
);

const Event = mongoose.model("Event", EventSchema);
export default Event;