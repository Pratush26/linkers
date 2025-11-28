"use client"
import { useForm } from "react-hook-form"
import "@/app/(forms)/form.css"
import { toast } from "react-toastify"
import { useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { update_usernameFunc } from "@/app/Actions/dbFuntions"
import { CiEdit } from "react-icons/ci"
import { signOut } from "next-auth/react"

interface FormValues {
    new_username: string,
}
export default function Update_usernameForm() {
    const [isOpened, setIsOpened] = useState(false)
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>()
    const onFormSubmit = async (data: FormValues) => {
        const res = await update_usernameFunc(data.new_username)
        if (res.success) {
            toast.success(res.message as string || "username updated Successfully")
            reset()
            setIsOpened(false)
            await signOut()
        }
        else toast.error(res.message as string || "Something went wrong!")
    }
    return (
        <section>
            <CiEdit title="Edit profile photo" className="-mr-2 text-2xl trns hover:text-3xl" onClick={() => setIsOpened(!isOpened)} />
            <form onSubmit={handleSubmit(onFormSubmit)} className={`${isOpened? "block" : "hidden"} w-full md:w-2/3 lg:w-1/2 mx-auto my-8 p-6 sm:p-8 rounded-2xl shadow-lg/50 absolute z-100 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-white`}>
                <button className="text-xl" onClick={() => setIsOpened(false)}><RxCross2 /></button>
                <legend className="font-semibold text-2xl text-center m-4">Change @username</legend>
                <div className="w-full">
                    {errors.new_username ? <p className="text-sm text-error">{errors.new_username.message}</p> : <label htmlFor="new_username">New username :</label>}
                    <input type="" {...register("new_username", { required: "username is required" })} placeholder="Enter new username" id="new_username" />
                </div>
                <div className="flex justify-center w-full mt-4">
                    <button type="submit" className="btn trns rounded-md hover:scale-103">{isSubmitting ? "Updating..." : "Update"}</button>
                </div>
            </form>
        </section>
    )
}