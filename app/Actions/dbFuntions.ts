"use server"
import connectDB from "@/libs/dbConnect"
import User from "@/models/User"

interface UserData {
    username: string;
    email: string;
    password: string;
    photo: string;
}
export const createUser = async (data: UserData) => {
    try {
        await connectDB()
        const { username, email, password, photo: image } = data;
        const existingName = await User.findOne({ username })
        const exists = await User.findOne({ email })
        if (existingName) return { success: false, message: "this username is already taken" };
        if (exists) return { success: false, message: "User already exists" };
        const newUser = new User({ username, email, password, image })
        await newUser.save()
        return { success: true, message: "User created successfully" };
    } catch (error) {
        return { success: false, message: error };
    }
}