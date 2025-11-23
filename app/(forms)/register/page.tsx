"use client"
import Link from "next/link";
import { useForm } from "react-hook-form";
import "../form.css"
import { FcGoogle } from "react-icons/fc";
import { createUser } from "@/app/Actions/dbFuntions";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface FormValues {
  username: string;
  email: string;
  password: string;
  photo: string;
};

export default function RegistrationPage() {
  const router = useRouter()
  const { data: session } = useSession()
  if (session) router.push("/dashboard")
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>()

  const onFormSubmit = async (data: FormValues) => {

    if (!data.photo || data.photo.length === 0) return;
    const formData = new FormData();
    formData.append("image", data.photo[0]);

    try {
      console.log(process.env.DB_URL)
      const ImgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_KEY}`, formData);
      data.photo = ImgRes.data.data.url;
      const res = await createUser(data)
      if (res.success) toast.success(res.message as string || "Process successful")
      else toast.error(res.message as string || "Something went wrong")
    } catch (err) {
      toast.error(err?.message as string || err?.response?.data?.error?.message as string || "Something went wrong");
      console.error(err);
    }
  }
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="w-1/2 mx-auto p-8 rounded-2xl shadow-md/50">
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
        <p className="text-sm my-3">Already have an account? <Link href="/login" className="text-blue-500 font-medium trns hover:text-blue-600">Login</Link></p>
        <div className="flex flex-col items-center gap-2">
          <button type="submit" className="btn trns rounded-md hover:scale-103">{isSubmitting ? "Creating..." : "Create"}</button>
          <button type="button" className="btn-out trns rounded-md hover:scale-103 flex gap-2 items-center"><FcGoogle /> Sign up with Google</button>
        </div>
      </fieldset>
    </form>
  )
}