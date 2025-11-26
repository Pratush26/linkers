import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: { type: String, required: true},
    image: { type: String, required: true},
    password: String,
    username: { type: String, unique: true , required: true},
    role: { type: String, default: "user" },
}, { timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;