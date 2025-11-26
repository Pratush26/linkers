import mongoose, { Schema } from "mongoose";

const contentSchema = new Schema({
    title: { type: String, required: true },
    image: [{ type: String, required: true }],
    description: { type: String, required: true },
    tags: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    disliked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }]
}, { timestamps: true });

const Content = mongoose.models.Content || mongoose.model("Content", contentSchema);

export default Content;