"use client"
import { useForm } from "react-hook-form"
import "@/app/(forms)/form.css"
import { toast } from "react-toastify"
import { useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { MdEdit } from "react-icons/md"
import axios from "axios"
import { update_profileImgFunc } from "@/app/Actions/dbFuntions"
import { signOut } from "next-auth/react"

interface FormValues {
    photo: string,
}
export default function Update_profileImg() {
    const [isOpened, setIsOpened] = useState(false)
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>()
    const onFormSubmit = async (data: FormValues) => {
        const formData = new FormData();
        formData.append("file", data.photo[0]);  //  photo file
        formData.append("upload_preset", process.env.NEXT_PUBLIC_Cloudinary_Upload_Preset as string);   //  previously created upload preset
        formData.append("folder", "user_images");   //  folder name in cloudinary

        const ImgRes = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_Cloudinary_CloudName}/image/upload`, formData);
        if (!ImgRes?.data?.secure_url) {
            toast.error("Image upload failed");
            return;
        }
        const res = await update_profileImgFunc(ImgRes?.data?.secure_url)
        if (res.success) {
            toast.success(res.message as string || "profile image updated Successfully")
            reset()
            setIsOpened(false)
            await signOut()
        }
        else toast.error(res.message as string || "Something went wrong!")
    }
    return (
        <section>
            <MdEdit title="Edit profile photo" className="-mr-2 text-2xl trns hover:text-3xl" onClick={() => setIsOpened(!isOpened)} />
            <form onSubmit={handleSubmit(onFormSubmit)} className={`${isOpened ? "block" : "hidden"} w-full md:w-2/3 lg:w-1/2 mx-auto my-8 p-6 sm:p-8 rounded-2xl shadow-lg/50 absolute z-100 top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2 bg-white`}>
                <button className="text-xl" onClick={() => setIsOpened(false)}><RxCross2 /></button>
                <legend className="font-semibold text-2xl text-center m-4">Change Profile Image</legend>
                <div className="w-full">
                    {errors.photo ? <p className="text-sm text-error">{errors.photo.message}</p> : <label htmlFor="photo">Profile photo :</label>}
                    <input type="file" {...register("photo", { required: "photo is required" })} id="photo" />
                </div>
                <div className="flex justify-center w-full mt-4">
                    <button type="submit" className="btn trns rounded-md hover:scale-103">{isSubmitting ? "Updating..." : "Update"}</button>
                </div>
            </form>
        </section>
    )
}