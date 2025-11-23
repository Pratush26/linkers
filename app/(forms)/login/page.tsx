"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import "../form.css"
import { FcGoogle } from "react-icons/fc";
import { GoogleSignin } from "@/app/Actions/authFunctions";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FormValues {
    email: string;
    password: string;
};

export default function LoginPage() {

    const router = useRouter()
    const { data: session } = useSession()
    if (session) router.push(`/dashboard/${session?.user?.email}`)
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>()

    const onFormSubmit = (data: FormValues) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="w-1/2 mx-auto p-8 rounded-2xl shadow-lg/50">
            <fieldset>
                <legend className="font-bold text-3xl text-center m-4">Sign In</legend>
                <div className="w-full">
                    {errors.email ? <p className="text-sm text-rose-500">{errors.email.message}</p> : <label htmlFor="email">Email :</label>}
                    <input type="email" {...register("email", { required: "email is required" })} placeholder="Enter your email" id="email" />
                </div>
                <div className="w-full">
                    {errors.password ? <p className="text-sm text-rose-500">{errors.password.message}</p> : <label htmlFor="password">password :</label>}
                    <input type="password" {...register("password", { required: "password is required", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: "Password must contain at least 8 upper and lowercase characters" } })} placeholder="Enter password" id="password" />
                </div>
                <p className="text-sm my-3">Forget Password?</p>
                <p className="text-sm my-3">Do not have an account? <Link href="/register" className="text-blue-500 font-medium trns hover:text-blue-600">Register</Link></p>
                <div className="flex flex-col items-center gap-2">
                    <button type="submit" className="btn trns rounded-md hover:scale-103">{isSubmitting ? "Loging in..." : "Login"}</button>
                    <button
                        type="button"
                        onClick={() => GoogleSignin()}
                        className="btn-out trns rounded-md hover:scale-103 flex gap-2 items-center"
                    >
                        <FcGoogle />
                        Sign in with Google
                    </button>
                </div>
            </fieldset>
        </form>
    )
}