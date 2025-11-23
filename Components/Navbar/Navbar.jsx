import Image from "next/image";
import Link from "next/link";
import ActiveLink from "./ActiveLink";
import { auth } from "@/auth";

export default async function Navbar() {
    const {user} = await auth()
    return (
        <nav className="flex justify-between items-center py-3 px-9 text-sm font-medium">
            <Link href="/" className="flex text-2xl items-end font-semibold">
                <Image src="/6975751.png" alt="logo" height={34} width={34} />
                inkers
            </Link>
            <div className="space-x-3">
                <ActiveLink href="/notifications">Notification</ActiveLink>
                <ActiveLink href="/liked-post">Liked</ActiveLink>
            </div>
            {
                user?
                <div className="space-x-3">
                    <ActiveLink href="/dashboard">Dashboard</ActiveLink>
                    <ActiveLink href="/options">Options</ActiveLink>
                </div>
                :
                <div className="space-x-3">
                    <ActiveLink href="/register">Register</ActiveLink>
                    <ActiveLink href="/login">Login</ActiveLink>
                </div>
            }
        </nav>
    )
}