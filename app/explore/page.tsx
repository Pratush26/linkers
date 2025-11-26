import Image from "next/image"
import { getContent } from "../Actions/dbFuntions"
import { BiCommentDetail } from "react-icons/bi"
import LikeBtn from "@/Components/Button/Like"
import DislikeBtn from "@/Components/Button/DisLike"

export default async function ExplorePage() {
    const data = await getContent()
    console.log(data)
    return (
        <main className="w-5/6 mx-auto space-y-6 my-10">
            <h1 className="text-3xl font-semibold text-center">Content Stream</h1>
            {
                data.map(e => (
                    <div key={e._id} className="w-full flex items-center justify-between gap-6 p-6 rounded-2xl shadow-xl my-16">
                        <div>
                            <Image src={e.image[0]} height="300" width="300" style={{ height: "auto" }} className="rounded-xl" alt="content Image" />

                        </div>
                        <section className="space-y-3">
                            <div className="flex gap-2 justify-between items-center">
                                <span className="flex gap-2 w-full">
                                    <Image src={e.createdBy.image} height="50" width="50" style={{ height: "auto" }} className="rounded-full object-cover aspect-square" alt="user Image" />
                                    <div>
                                        <p className="font-medium">@{e.createdBy.username}</p>
                                        <p className="text-sm text-gray-600">{new Date(e.createdAt).toLocaleString()}</p>
                                    </div>
                                </span>
                                <span className="flex gap-1 text-base font-medium">
                                    <LikeBtn _id={e._id} array={e.liked} />
                                    <DislikeBtn _id={e._id} array={e.disliked} />
                                    <button className="hover:bg-gray-100 rounded-full hover:scale-110 cursor-pointer trns flex items-start gap-0.5 p-1.5">{e.comments.length}<BiCommentDetail className="text-xl" /></button>
                                </span>
                            </div>
                            <article>
                                <h5 className="font-semibold text-xl">{e.title}</h5>
                                <p className="line-clamp-2">{e.description}</p>
                            </article>
                        </section>
                    </div>
                ))
            }
        </main>
    )
}