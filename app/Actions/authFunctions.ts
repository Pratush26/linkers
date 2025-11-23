"use server"
import { signIn } from "@/auth"

export const GoogleSignin = async () =>{
    await signIn("google")
}