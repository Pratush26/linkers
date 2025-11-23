"use client"
import Image from "next/image";
import Link from "next/link";
import ActiveLink from "./ActiveLink";
import Sidebar from "../Sidebar/Sidebar";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BsGearFill } from "react-icons/bs";

export default function Navbar() {
    const { data: session } = useSession()
    const pathname = usePathname()
    const [expaneded, setExpaneded] = useState(false)
    return (
        <nav className="flex justify-between items-center py-3 px-9 text-sm font-medium relative overflow-x-clip">
            <Link href="/" className="flex text-2xl items-end font-semibold">
                <Image src="/6975751.png" alt="logo" height={34} width={34} />
                inkers
            </Link>
            {
                session
                &&
                <div className="space-x-3">
                    <ActiveLink path={pathname} href="/notifications">Notification</ActiveLink>
                    <ActiveLink path={pathname} href="/liked-post">Liked</ActiveLink>
                </div>
            }
            {
                session ?
                    <div className="flex gap-2 items-center">
                        <ActiveLink path={pathname} href={`/dashboard/${session?.user?.email}`}>Dashboard</ActiveLink>
                        <span className={`${expaneded && "bg-gray-200 inset-shadow-sm"} p-2 trns rounded-sm flex items-center justify-center`}>
                            <button onClick={() => setExpaneded(!expaneded)} className={`${expaneded && "rotate-90"} trns`}><BsGearFill /></button>
                        </span>
                    </div>
                    :
                    <div className="space-x-3">
                        <ActiveLink path={pathname} href="/register">Register</ActiveLink>
                        <ActiveLink path={pathname} href="/login">Login</ActiveLink>
                    </div>
            }
            <Sidebar extended={expaneded} />
        </nav>
    )
}