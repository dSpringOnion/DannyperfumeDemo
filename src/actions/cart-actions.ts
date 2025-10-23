'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth/auth'
import {
  getCart,
  addToCart,
  updateCartItemQuantity,
  deleteCartItem,
  clearCart,
  getCartTotal
} from '@/repositories/cart-repository'

export async function getCartAction() {
  try {
    const session = await auth()

    if (!session?.user) {
      return { success: false, error: 'Not authenticated' }
    }

    const items = await getCart(session.user.id)
    const totals = await getCartTotal(session.user.id)

    return { success: true, items, ...totals }
  } catch (error) {
    console.error('Error fetching cart:', error)
    return { success: false, error: 'Failed to fetch cart' }
  }
}

export async function addToCartAction(data: {
  productId: string
  variantId?: string
  quantity: number
}) {
  try {
    const session = await auth()

    if (!session?.user) {
      return { success: false, error: 'Please sign in to add items to cart' }
    }

    const item = await addToCart({
      userId: session.user.id,
      ...data,
    })

    revalidatePath('/cart')
    revalidatePath('/', 'layout') // Update header cart count

    return { success: true, item }
  } catch (error) {
    console.error('Error adding to cart:', error)
    return { success: false, error: 'Failed to add item to cart' }
  }
}

export async function updateCartItemAction(id: string, quantity: number) {
  try {
    const session = await auth()

    if (!session?.user) {
      return { success: false, error: 'Not authenticated' }
    }

    const item = await updateCartItemQuantity(id, quantity)

    revalidatePath('/cart')
    revalidatePath('/', 'layout') // Update header cart count

    return { success: true, item }
  } catch (error) {
    console.error('Error updating cart item:', error)
    return { success: false, error: 'Failed to update cart item' }
  }
}

export async function removeCartItemAction(id: string) {
  try {
    const session = await auth()

    if (!session?.user) {
      return { success: false, error: 'Not authenticated' }
    }

    await deleteCartItem(id)

    revalidatePath('/cart')
    revalidatePath('/', 'layout') // Update header cart count

    return { success: true }
  } catch (error) {
    console.error('Error removing cart item:', error)
    return { success: false, error: 'Failed to remove item from cart' }
  }
}

export async function clearCartAction() {
  try {
    const session = await auth()

    if (!session?.user) {
      return { success: false, error: 'Not authenticated' }
    }

    await clearCart(session.user.id)

    revalidatePath('/cart')
    revalidatePath('/', 'layout') // Update header cart count

    return { success: true }
  } catch (error) {
    console.error('Error clearing cart:', error)
    return { success: false, error: 'Failed to clear cart' }
  }
}
