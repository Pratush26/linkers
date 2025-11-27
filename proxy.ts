import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth'

export async function proxy(request: NextRequest) {
    const session = await auth()
    if (!session) return NextResponse.redirect(new URL('/register', request.url))
}

export const config = {
    matcher: ['/dashboard/:path*', '/create-content', '/explore', '/liked-post', '/notification', '/update-profile']
}