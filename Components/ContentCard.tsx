import Image from "next/image";
import LikeBtn from "./Button/Like";
import DislikeBtn from "./Button/DisLike";
import { BiCommentDetail } from "react-icons/bi";
import Link from "next/link";

interface contentType {
    _id: string,
    title: string,
    image: string[],
    description: string,
    tags: string,
    createdBy: { image: string, username: string },
    liked: string[],
    disliked: string[],
    comments: string[],
    createdAt: Date;
    updatedAt: Date;
}
export default function ContentCard({ e }: { e: contentType }) {
    return (
        <div className="w-full flex items-center justify-between gap-6 p-6 rounded-2xl shadow-xl my-16">
            <div>
                <Image src={e.image[0]} height="300" width="300" style={{ height: "auto" }} className="rounded-xl" alt="content Image" />

            </div>
            <section className="space-y-3">
                <div className="flex gap-2 justify-between items-center">
                    <span className="flex gap-2 w-full">
                        <Image src={e.createdBy.image} height="50" width="50" style={{ height: "auto" }} className="rounded-full object-cover aspect-square" alt="user Image" />
                        <div>
                            <Link href={`/dashboard/${e.createdBy.username}`} className="font-medium hover:underline underline-offset-4">@{e.createdBy.username}</Link>
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
    )
}