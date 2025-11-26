import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "Content", required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    disliked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
}, { timestamps: true });

const Comment = mongoose.models.Comment || mongoose.model("Comment", commentSchema);

export default Comment;