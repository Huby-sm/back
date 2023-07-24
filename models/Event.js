import mongoose from "mongoose";
import { Schema } from "mongoose";

const EventSchema = new mongoose.Schema(
    {
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