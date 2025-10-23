'use server'

import { auth } from '@/auth/auth'
import { stripe } from '@/lib/stripe'
import { getCart, getCartTotal } from '@/repositories/cart-repository'
import { getGuestCartItems, getGuestCartTotal } from '@/repositories/guest-cart-repository'
import { redirect } from 'next/navigation'

export async function createCheckoutSessionAction() {
  try {
    const session = await auth()

    // Get cart items and total based on auth status
    let items
    let total

    if (session?.user) {
      items = await getCart(session.user.id)
      const cartTotal = await getCartTotal(session.user.id)
      total = cartTotal.subtotal
    } else {
      items = await getGuestCartItems()
      const cartTotal = await getGuestCartTotal()
      total = cartTotal.subtotal
    }

    if (items.length === 0) {
      return { error: 'Your cart is empty' }
    }

    // Create Stripe line items from cart items
    const line_items = items.map((item) => {
      const price = item.variant?.price || item.product.price
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.name,
            description: item.variant ? `Variant: ${item.variant.name}` : undefined,
            images: item.product.images.length > 0 ? [item.product.images[0]] : undefined,
          },
          unit_amount: Math.round(Number(price) * 100), // Convert to cents
        },
        quantity: item.quantity,
      }
    })

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3002'}/cart`,
      customer_email: session?.user?.email || undefined,
      metadata: {
        userId: session?.user?.id || 'guest',
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      billing_address_collection: 'required',
    })

    if (!checkoutSession.url) {
      return { error: 'Failed to create checkout session' }
    }

    // Redirect to Stripe checkout
    redirect(checkoutSession.url)
  } catch (error) {
    console.error('Checkout error:', error)
    return { error: 'Failed to create checkout session' }
  }
}
