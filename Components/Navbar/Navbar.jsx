"use client"
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
    const path = usePathname()
    const user = null
    return (
        <nav className="flex justify-between items-center py-3 px-9 text-sm font-medium">
            <Link href="/" className="flex text-2xl items-end font-semibold">
                <Image src="/6975751.png" alt="logo" height={34} width={34} />
                inkers
            </Link>
            <div className="space-x-3">
                <Link className={`trns ${path === "/notification" ? "underline underline-offset-4" : "hover:text-gray-500"}`} href="/notification">Notifications</Link>
                <Link className={`trns ${path === "/liked-post" ? "underline underline-offset-4" : "hover:text-gray-500"}`} href="/liked-post">Liked</Link>
            </div>
            {
                user?
                <div className="space-x-3">
                    <Link className={`trns ${path === "/dashboard" ? "underline underline-offset-4" : "hover:text-gray-500"}`} href="/dashboard">Dashboard</Link>
                    <Link className={`trns ${path === "/settings" ? "underline underline-offset-4" : "hover:text-gray-500"}`} href="/settings">Settings</Link>
                </div>
                :
                <div className="space-x-3">
                    <Link className={`trns ${path === "/registration" ? "underline underline-offset-4" : "hover:text-gray-500"}`} href="/register">Register</Link>
                    <Link className={`trns ${path === "/login" ? "underline underline-offset-4" : "hover:text-gray-500"}`} href="/login">Login</Link>
                </div>
            }
        </nav>
    )
}