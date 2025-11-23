"use server"
import connectDB from "@/libs/dbConnect"
import User from "@/models/User"
import axios from "axios";

interface UserData {
    username: string;
    email: string;
    password: string;
    photo: string;
}
export const createUser = async (data: UserData) => {
    try {
        await connectDB()
        const { username, email, password, photo } = data;

        const existingName = await User.findOne({ username })
        if (existingName) return { success: false, message: "this username is already taken" };
        const exists = await User.findOne({ email })
        if (exists) return { success: false, message: "User already exists" };

        const formData = new FormData();
        formData.append("file", photo[0]);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_Cloudinary_Upload_Preset as string);
        formData.append("folder", "user_images");
        
        const ImgRes = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_Cloudinary_CloudName}/image/upload`, formData);
        if (!ImgRes?.data?.url) return { success: false, message: "Image upload failed" };

        const newUser = new User({ username, email, password, image: ImgRes?.data?.url })
        await newUser.save()
        return { success: true, message: "User created successfully" };
    } catch (error) {
        return { success: false, message: error };
    }
}