import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        postId: {
            type: String,
            required: true,
        },
        userId: {
            type: String,
            required: true,
        },
        createDate: {
            type: Date,
            required: true,
            default: Date.now(),
        },
        content: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;