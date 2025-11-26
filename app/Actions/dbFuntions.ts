"use server"
import connectDB from "@/libs/dbConnect"
import User from "@/models/User"
import axios from "axios";
import bcrypt from "bcryptjs";

interface UserData {
    username: string;
    email: string;
    password: string;
    photo: string;
}
export const uniqueUsername = async (username: string): Promise<boolean> => {
    try {
        await connectDB();
        const exists = await User.findOne({ username });
        return !exists;
    } catch (error) {
        console.error(error);
        return false;
    }
}


export const createUser = async (data: UserData) => {
    try {
        await connectDB()
        const { username, email, password, photo } = data;
        
        const isUnique = await uniqueUsername(username);
        if (!isUnique) return { success: false, message: "This username is already taken" };

        const exists = await User.findOne({ email })
        if (exists) return { success: false, message: "User already exists" };

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, image: photo })
        await newUser.save()
        return { success: true, message: "User created successfully" };
    } catch (error) {
        return { success: false, message: error };
    }
}