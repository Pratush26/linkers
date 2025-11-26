"use server"
import connectDB from "@/libs/dbConnect"
import Content from "@/models/Content";
import User from "@/models/User"
import bcrypt from "bcryptjs";

interface UserData {
    username: string;
    email: string;
    password: string;
    photo: string;
}
interface ContentData {
    title: string;
    description: string;
    authorId: string;
    tags: string;
    photo: string[];
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
        console.error("createUser error:", error);
        return { success: false, message: "Failed to create user" };
    }

}

export const createContent = async (data: ContentData) => {
    try {
        await connectDB()
        const { title, description, tags, photo, authorId } = data;
        const newContent = new Content({ title, description, tags, image: photo, createdBy: authorId })
        await newContent.save()
        return { success: true, message: "User created successfully" };
    } catch (error) {
        console.error("createContent error:", error);
        return { success: false, message: "Failed to create content" };
    }
}

export const getContent = async () => {
    try {
        await connectDB()
        // const {limit = 0, skip = 0, _id = "", tags = ""} = data
        const res = await Content.find().sort({ createdAt: -1 }).populate("createdBy").lean()
        const result = res.map(doc => ({
            ...doc,
            _id: doc._id.toString()
        }));
        return result;
    } catch (error) {
        console.error("createContent error:", error);
        return [];
    }
}