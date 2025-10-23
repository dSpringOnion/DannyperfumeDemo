import { auth } from '@/auth/auth'
import { getCartTotal } from '@/repositories/cart-repository'
import { getGuestCartCount } from '@/lib/guest-cart'

/**
 * Get cart count for both authenticated and guest users
 * This is used in the header to display the cart badge
 */
export async function getUnifiedCartCount(): Promise<number> {
  const session = await auth()

  if (session?.user) {
    // Authenticated user - get from database
    const { itemCount } = await getCartTotal(session.user.id)
    return itemCount
  } else {
    // Guest user - get from cookies
    return await getGuestCartCount()
  }
}
