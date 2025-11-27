"use client"
import { useForm } from "react-hook-form"
import "../form.css"
import { updatePassword } from "@/app/Actions/dbFuntions"
import { toast } from "react-toastify"

interface FormValues {
    oldPassword: string,
    password: string,
    confirmPassword: string
}

export default function ChangePasswordPage() {
    const { register, handleSubmit, getValues, reset, formState: { errors, isSubmitting } } = useForm<FormValues>()
    const onFormSubmit = async (data: FormValues) => {
        const res = await updatePassword(data)
        if(res.success) {
            toast.success(res.message as string || "Password updated Successfully")
            reset()
        }
        else toast.error(res.message as string || "Something went wrong!")
    }
    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="w-1/2 mx-auto p-8 rounded-2xl shadow-lg/50">
            <legend className="font-bold text-3xl text-center m-4">Change Password</legend>
            <div className="w-full">
                {errors.oldPassword ? <p className="text-sm text-rose-500">{errors.oldPassword.message}</p> : <label htmlFor="oldPassword">Old Password :</label>}
                <input type="password" {...register("oldPassword", { required: "Old Password is required", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: "Password must contain at least 8 upper and lowercase characters" } })} placeholder="Enter old password" id="oldPassword" />
            </div>
            <div className="w-full">
                {errors.password ? <p className="text-sm text-rose-500">{errors.password.message}</p> : <label htmlFor="password">password :</label>}
                <input type="password" {...register("password", { required: "password is required", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: "Password must contain at least 8 upper and lowercase characters" } })} placeholder="Enter password" id="password" />
            </div>
            <div className="w-full">
                {errors.confirmPassword ? <p className="text-sm text-rose-500">{errors.confirmPassword.message}</p> : <label htmlFor="confirmPassword">Confirm Password :</label>}
                <input type="password" {...register("confirmPassword", { required: "Confirm password is required", validate: (value) => value === getValues("password") || "Confirm passwords do not match" })} placeholder="Enter confirm password" id="confirmPassword" />
            </div>
            <div className="flex justify-center w-full mt-4">
                <button type="submit" className="btn trns rounded-md hover:scale-103">{isSubmitting ? "Updating..." : "Update"}</button>
            </div>
        </form>
    )
}