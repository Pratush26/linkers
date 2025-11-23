import Link from "next/link"

export default function ActiveLink({ href, pathname, children, ...props }: {href: string; pathname: string; children: React.ReactNode}) {
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