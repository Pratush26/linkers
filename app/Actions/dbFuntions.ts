"use server"
import { auth } from "@/auth";
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
        const res = await Content.find({})
            .sort({ createdAt: -1 })
            .populate("createdBy")
            .lean()
        const result = res.map(doc => ({
            ...doc,
            _id: doc._id.toString(),
            liked: doc.liked?.map((u: string) => u.toString()) || [],
            disliked: doc.disliked?.map((u: string) => u.toString()) || [],
        }));
        return result;
    } catch (error) {
        console.error("createContent error:", error);
        return [];
    }
}
export const hitReaction = async (_id: string, type: string) => {
    try {
        await connectDB()
        const session = await auth()
        const userId = session?.user._id
        if (!userId) return { success: false, message: "Login is required" };

        const post = await Content.findById(_id);
        if (!post) return { success: false, message: "Post not found" };

        const likedArray = post.liked.map((id: string) => id.toString());
        const dislikedArray = post.disliked.map((id: string) => id.toString());
        let updateAction;

        if (type === "like") {
            if (dislikedArray.includes(userId)) await Content.updateOne({ _id }, { $pull: { disliked: userId } });

            if (likedArray.includes(userId)) updateAction = { $pull: { liked: userId } };
            else updateAction = { $addToSet: { liked: userId } };
        }
        else {
            if (likedArray.includes(userId)) await Content.updateOne({ _id }, { $pull: { liked: userId } });

            if (dislikedArray.includes(userId)) updateAction = { $pull: { disliked: userId } };
            else updateAction = { $addToSet: { disliked: userId } };
        }

        const res = await Content.updateOne({ _id }, updateAction);
        return res;
    } catch (error) {
        console.error("createContent error:", error);
        return { success: false, message: "something went wrong!" };;
    }
}

export const likedContent = async () => {
    try {
        await connectDB()
        const session = await auth()
        const userId = session?.user._id
        if (!userId) return [];

        const res = await Content.find({ liked: userId })
            .sort({ createdAt: -1 })
            .populate("createdBy")
            .lean();
        const result = res.map(doc => ({
            ...doc,
            _id: doc._id.toString(),
            liked: doc.liked?.map((u: string) => u.toString()) || [],
            disliked: doc.disliked?.map((u: string) => u.toString()) || [],
        }));
        console.log(result)
        return result;
    } catch (error) {
        console.error("createContent error:", error);
        return [];
    }
}
export const myContent = async () => {
    try {
        await connectDB()
        const session = await auth()
        const userId = session?.user._id
        if (!userId) return [];

        const res = await Content.find({ createdBy: userId })
            .sort({ createdAt: -1 })
            .populate("createdBy")
            .lean();
        const result = res.map(doc => ({
            ...doc,
            _id: doc._id.toString(),
            liked: doc.liked?.map((u: string) => u.toString()) || [],
            disliked: doc.disliked?.map((u: string) => u.toString()) || [],
        }));
        return result;
    } catch (error) {
        console.error("createContent error:", error);
        return [];
    }
}