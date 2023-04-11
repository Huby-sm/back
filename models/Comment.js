import mongoose, {Schema} from "mongoose";

const commentSchema = new mongoose.Schema(
    {
        postId: {
            type: Schema.Types.ObjectId,
            ref: "Post",
            required: true,
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
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