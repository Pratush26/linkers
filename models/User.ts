import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: String,
    image: String,
    password: String,
    username: { type: String, unique: true },
    role: { type: String, default: "user" },
}, { timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;