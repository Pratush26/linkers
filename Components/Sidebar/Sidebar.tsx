"use client"
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Sidebar({extended = false} : {extended?: boolean}) {
    const { data: session } = useSession()
    return (
        <aside className={`absolute trns shadow-lg rounded-lg flex flex-col gap-1 p-4 min-w-1/4 min-h-[80vh] bg-gray-100 right-0 bottom-0 translate-y-full ${extended ? "translate-x-0" : "translate-x-full"}`}>
            <h6 className="font-semibold text-lg">Menu</h6>
            <Link className="w-full trns hover:bg-white p-2 rounded-sm" href="/">Home</Link>
            <Link className="w-full trns hover:bg-white p-2 rounded-sm" href={`/dashboard/${session?.user?.username}`}>Dashboard</Link>
            <Link className="w-full trns hover:bg-white p-2 rounded-sm" href="/create-content">Create Content</Link>
            <Link className="w-full trns hover:bg-white p-2 rounded-sm" href="/create-content">Update Profile</Link>
            <button onClick={() => signOut()} className="w-fit btn trns hover:scale-102 rounded-sm">Log out</button>
        </aside>
    )
}