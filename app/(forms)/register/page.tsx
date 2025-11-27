"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import "../form.css"
import { createUser, uniqueUsername } from "@/app/Actions/dbFuntions";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import axios from "axios";

interface FormValues {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  photo: FileList;
};

export default function RegistrationPage() {
  const router = useRouter()
  const { data: session } = useSession()
  if (session) router.push(`/dashboard/${session?.user?.email}`)
  const { register, handleSubmit, getValues, reset, formState: { errors, isSubmitting } } = useForm<FormValues>()

  const onFormSubmit = async (data: FormValues) => {
    try {
      const isUnique = await uniqueUsername(data?.username);
      if (!isUnique) {
        toast.warning("This username is already taken");
        return;
      }
      const formData = new FormData();
      formData.append("file", data.photo[0]);  //  photo file
      formData.append("upload_preset", process.env.NEXT_PUBLIC_Cloudinary_Upload_Preset as string);   //  previously created upload preset
      formData.append("folder", "user_images");   //  folder name in cloudinary

      const ImgRes = await axios.post(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_Cloudinary_CloudName}/image/upload`, formData);
      if (!ImgRes?.data?.secure_url) {
        toast.error("Image upload failed");
        return;
      }

      const res = await createUser({ ...data, photo: ImgRes?.data?.secure_url });
      if (res.success) {
        toast.success(res.message as string || "Successfully registered");
        reset()
      } else {
        toast.error(res.message as string || "Something went wrong");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  }

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="w-1/2 mx-auto p-8 rounded-2xl shadow-lg/50">
      <fieldset>
        <legend className="font-bold text-3xl text-center m-4">Create an Account</legend>
        <div className="w-full">
          {errors.username ? <p className="text-sm text-rose-500">{errors.username.message}</p> : <label htmlFor="username">Username :</label>}
          <input type="text" {...register("username", {
            required: "Username is required",
            minLength: { value: 3, message: "Minimum 3 characters" },
            maxLength: { value: 20, message: "Maximum 20 characters" },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message: "Only letters, numbers, and underscores allowed"
            },
            validate: (value) => {
              if (/\s/.test(value)) return "No spaces allowed"
              return true
            },
          })} placeholder="Enter your user name" id="username" />
        </div>
        <div className="w-full">
          {errors.email ? <p className="text-sm text-rose-500">{errors.email.message}</p> : <label htmlFor="email">Email :</label>}
          <input type="email" {...register("email", { required: "email is required" })} placeholder="Enter your email" id="email" />
        </div>
        <div className="w-full">
          {errors.photo ? <p className="text-sm text-rose-500">{errors.photo.message}</p> : <label htmlFor="photo">photo :</label>}
          <input type="file" {...register("photo", { required: "photo is required" })} id="photo" />
        </div>
        <div className="w-full">
          {errors.password ? <p className="text-sm text-rose-500">{errors.password.message}</p> : <label htmlFor="password">password :</label>}
          <input type="password" {...register("password", { required: "password is required", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/, message: "Password must contain at least 8 upper and lowercase characters" } })} placeholder="Enter password" id="password" />
        </div>
        <div className="w-full">
          {errors.confirmPassword ? <p className="text-sm text-rose-500">{errors.confirmPassword.message}</p> : <label htmlFor="confirmPassword">Confirm Password :</label>}
          <input type="password" {...register("confirmPassword", { required: "Confirm password is required", validate: (value) => value === getValues("password") || "Confirm passwords do not match" })} placeholder="Enter confirm password" id="confirmPassword" />
        </div>
        <p className="text-sm my-3">Already have an account? <Link href="/login" className="text-blue-500 font-medium trns hover:text-blue-600">Login</Link></p>
        <div className="flex justify-center w-full">
          <button type="submit" className="btn trns rounded-md hover:scale-103">{isSubmitting ? "Creating..." : "Create"}</button>
        </div>
      </fieldset>
    </form>
  )
}