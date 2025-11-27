import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='flex flex-col gap-2 items-center justify-center min-h-[80vh] w-full'>
      <h2 className='text-5xl font-bold'>404</h2>
      <h5 className='text-2xl font-semibold'>Page Not Found!</h5>
      <p className='animate-bounce'>Could not find requested resource</p>
      <Link href="/" className='btn rounded-lg trns hover:scale-105'>Return Home</Link>
    </div>
  )
}