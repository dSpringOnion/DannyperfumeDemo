import { auth } from '@/auth/auth.edge'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Temporarily bypass auth for Railway deployment testing
export function middleware(request: NextRequest) {
  return NextResponse.next()
}

// export default auth

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|products|$).*)'],
}
