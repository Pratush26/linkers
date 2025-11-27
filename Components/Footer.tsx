import Image from "next/image";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    return (
        <section className="text-center space-y-5 p-2">
            <footer className="bg-gray-900 text-white w-11/12 mx-auto rounded-3xl px-4 py-10 grid grid-cols-4 gap-4 items-center-safe justify-items-center-safe">
            <Link href="/" className="flex text-2xl items-end font-semibold">
                <Image src="/6975751.png" alt="logo" height="40" width="40" style={{ height: "auto" }} />
                inkers
            </Link>
            <div className="flex flex-col text-start gap-2 text-sm">
            <Link className="hover:text-gray-400 trns" href="/">Home</Link>
            <Link className="hover:text-gray-400 trns" href="/explore">Explore</Link>
            <Link className="hover:text-gray-400 trns" href="/login">Help Center</Link>
            <Link className="hover:text-gray-400 trns" href="/register">Terms & Conditions</Link>
            </div>
            <div className="flex flex-col text-start gap-2 text-sm">
            <Link className="hover:text-gray-400 trns" href="/">About Us</Link>
            <Link className="hover:text-gray-400 trns" href="/login">Login</Link>
            <Link className="hover:text-gray-400 trns" href="/register">Register</Link>
            <Link className="hover:text-gray-400 trns" href="/dashboard">Dashboard</Link>
            </div>
            <div className="flex flex-col text-start gap-2 text-lg">
                <h6 className="text-lg font-semibold">Social Links</h6>
                <span className="flex gap-2">
            <a className="hover:text-gray-400 trns" target="_blank" href="facebook.com"><FaFacebook /></a>
            <a className="hover:text-gray-400 trns" target="_blank" href="linkedin.com"><FaLinkedin /></a>
            <a className="hover:text-gray-400 trns" target="_blank" href="instagram.com"><FaInstagram /></a>
            <a className="hover:text-gray-400 trns" target="_blank" href="twitter.com"><FaXTwitter /></a>
                </span>
            </div>
            </footer>
            <p className="text-sm">&copy; 2025 - Linkers. All rights reserved.</p>
        </section>
    )
}