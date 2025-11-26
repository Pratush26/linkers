"use client"

import { hitReaction } from "@/app/Actions/dbFuntions";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

export default function LikeBtn({ _id, array }: { _id: string; array: string[] }) {
    const { data: session } = useSession();
    const userId = session?.user?._id;

    const initialActive = array.includes(userId || "");
    const [isActive, setIsActive] = useState(initialActive);

    const handleClick = async () => {
        await hitReaction(_id, "like");
        setIsActive(prev => !prev);
    };
    return (
        <button
            onClick={handleClick}
            className="hover:bg-gray-100 rounded-full hover:scale-110 cursor-pointer trns flex items-start gap-0.5 p-1.5"
        >
            {array.length}{isActive ? <AiFillLike className="text-xl" /> : <AiOutlineLike className="text-xl" />}
        </button>
    )
}