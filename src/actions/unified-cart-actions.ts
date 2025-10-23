'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth/auth'
import { addToCart } from '@/repositories/cart-repository'
import { addToGuestCart } from '@/lib/guest-cart'

/**
 * Unified add to cart action that works for both authenticated and guest users
 */
export async function addToCartUnifiedAction(
  productId: string,
  quantity: number = 1,
  variantId?: string
) {
  try {
    const session = await auth()

    if (session?.user) {
      // Authenticated user - add to database cart
      await addToCart({
        userId: session.user.id,
        productId,
        variantId,
        quantity,
      })
    } else {
      // Guest user - add to cookie cart
      await addToGuestCart(productId, quantity, variantId)
    }

    revalidatePath('/cart')
    revalidatePath('/products')
    revalidatePath('/', 'layout') // Update header cart count

    return { success: true }
  } catch (error) {
    console.error('Failed to add to cart:', error)
    return { error: 'Failed to add item to cart' }
  }
}
