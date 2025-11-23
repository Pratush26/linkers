"use client"
import { useForm } from "react-hook-form";
import "../form.css"

interface FormValues {
    title: string;
    description: string;
    tags: string;
    photo: File;
};

export default function CreatePost() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<FormValues>()
    const onFormSubmit = (data: FormValues) => {
      console.log(data)
    }
    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="w-1/2 mx-auto p-8 rounded-2xl shadow-md/50">
            <fieldset>
                <legend className="font-bold text-3xl text-center m-4">Create an Post</legend>
                <div className="w-full">
                  {errors.title ? <p className="text-sm text-error">{errors.title.message}</p> : <label htmlFor="title">title :</label>}
                  <input type="text" placeholder="Enter your content's title" id="title" />
                </div>
                <div className="w-full">
                  {errors.description ? <p className="text-sm text-error">{errors.description.message}</p> : <label htmlFor="description">Content :</label>}
                  <textarea {...register("description", { required: "content's description is required" })} placeholder="Enter your content's description" id="description" />
                </div>
                <div className="w-full">
                  {errors.tags ? <p className="text-sm text-error">{errors.tags.message}</p> : <label htmlFor="tags">Tags :</label>}
                  <input type="text" placeholder="Enter tags (e.g. tag1, tag2...)" id="tags" />
                </div>
                <div className="w-full">
                  {errors.photo ? <p className="text-sm text-rose-500">{errors.photo.message}</p> : <label htmlFor="photo">photo :</label>}
                  <input type="file" {...register("photo", { required: "photo is required" })} id="photo" />
                </div>
                <div className="flex justify-center mt-4">
                <button type="submit" className="btn trns rounded-md hover:scale-103">{isSubmitting? "Creating..." : "Create"}</button>
                </div>
            </fieldset>
        </form>
    )
}