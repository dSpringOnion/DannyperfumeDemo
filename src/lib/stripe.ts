import 'server-only'
import Stripe from 'stripe'

const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_51placeholder'

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn('⚠️  STRIPE_SECRET_KEY not set - using placeholder. Payment features will not work.')
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-09-30.clover',
  typescript: true,
})
