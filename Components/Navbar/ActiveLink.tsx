"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

export default function ActiveLink({ href, children, ...props }: {href: string; children: React.ReactNode}) {
  const pathname = usePathname()
  const isActive = pathname === href

  return (
    <Link
      href={href}
      className={isActive ? 'underline underline-offset-4' : 'hover:text-gray-500 trns'}
      {...props}
    >
      {children}
    </Link>
  )
}