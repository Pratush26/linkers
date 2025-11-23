import Link from "next/link"

export default function ActiveLink({ href, path, children, ...props }: {href: string; path: string; children: React.ReactNode}) {
  const isActive = path === href

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