import { NextResponse } from 'next/server'

export async function GET() {
  try {
    console.log('[HEALTH] Health check called')
    console.log('[HEALTH] Environment:', {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      HAS_DATABASE_URL: !!process.env.DATABASE_URL,
      HAS_NEXTAUTH_SECRET: !!process.env.NEXTAUTH_SECRET,
      HAS_NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
    })

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      env: {
        nodeEnv: process.env.NODE_ENV,
        port: process.env.PORT || '3000',
        hasDatabase: !!process.env.DATABASE_URL,
        hasAuth: !!process.env.NEXTAUTH_SECRET,
      }
    })
  } catch (error) {
    console.error('[HEALTH] Error:', error)
    return NextResponse.json(
      {
        status: 'error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
