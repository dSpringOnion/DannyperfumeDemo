import { redirect } from 'next/navigation'

export default async function Home() {
  console.log('[HOME] Rendering homepage...')
  console.log('[HOME] Environment check:', {
    hasDb: !!process.env.DATABASE_URL,
    hasAuth: !!process.env.NEXTAUTH_SECRET,
    hasStripe: !!process.env.STRIPE_SECRET_KEY,
    nodeEnv: process.env.NODE_ENV,
    port: process.env.PORT || '3000'
  })

  // Skip auth check on homepage to avoid DB connection issues
  // Just redirect to products page
  redirect('/products')
}
