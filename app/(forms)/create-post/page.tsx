"use client"
import { useForm } from "react-hook-form";
import "../form.css"
import axios from "axios";
import { toast } from "react-toastify";

interface FormValues {
  title: string;
  description: string;
  tags: string;
  photo: FileList;
};

export default function CreatePost() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>()
  const onFormSubmit = async (data: FormValues) => {
    if (!data.photo || data.photo.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    try {
      const uploadedUrls: string[] = [];

      // Loop over each selected file
      for (let i = 0; i < data.photo.length; i++) {
        const formData = new FormData();
        formData.append("file", data.photo[i]);
        formData.append("upload_preset", process.env.NEXT_PUBLIC_Cloudinary_Upload_Preset as string);
        formData.append("folder", "content_images");

        const ImgRes = await axios.post(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_Cloudinary_CloudName}/image/upload`,
          formData
        );

        if (ImgRes?.data?.secure_url) {
          uploadedUrls.push(ImgRes.data.secure_url);
        } else {
          toast.error(`Image ${i + 1} upload failed`);
        }
      }

      console.log("All uploaded URLs:", uploadedUrls);
      // Now you can send these URLs to your server / database
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong during upload");
    }
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="w-1/2 mx-auto p-8 rounded-2xl shadow-md/50">
      <fieldset>
        <legend className="font-bold text-3xl text-center m-4">Create an Post</legend>
        <div className="w-full">
          {errors.title ? <p className="text-sm text-rose-500">{errors.title.message}</p> : <label htmlFor="title">title :</label>}
          <input type="text" {...register("title", { required: "Title is required" })} placeholder="Enter your content's title" id="title" />
        </div>
        <div className="w-full">
          {errors.description ? <p className="text-sm text-rose-500">{errors.description.message}</p> : <label htmlFor="description">Content :</label>}
          <textarea {...register("description", { required: "content's description is required" })} placeholder="Enter your content's description" id="description" />
        </div>
        <div className="w-full">
          {errors.tags ? <p className="text-sm text-rose-500">{errors.tags.message}</p> : <label htmlFor="tags">Tags :</label>}
          <input type="text" {...register("tags")} placeholder="Enter tags (e.g. tag1, tag2...)" id="tags" />
        </div>
        <div className="w-full">
          {errors.photo ? <p className="text-sm text-rose-500">{errors.photo.message}</p> : <label htmlFor="photo">photo :</label>}
          <input type="file" {...register("photo", { required: "photo is required" })} multiple id="photo" />
        </div>
        <div className="flex justify-center mt-4">
          <button type="submit" className="btn trns rounded-md hover:scale-103">{isSubmitting ? "Creating..." : "Create"}</button>
        </div>
      </fieldset>
    </form>
  )
}