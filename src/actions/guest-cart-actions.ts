'use server'

import { revalidatePath } from 'next/cache'
import {
  addToGuestCart,
  updateGuestCartItem,
  removeFromGuestCart,
} from '@/lib/guest-cart'

export async function addToGuestCartAction(
  productId: string,
  quantity: number = 1,
  variantId?: string
) {
  try {
    await addToGuestCart(productId, quantity, variantId)
    revalidatePath('/cart')
    revalidatePath('/products')
    revalidatePath('/', 'layout') // Update header cart count
    return { success: true }
  } catch (error) {
    console.error('Failed to add to guest cart:', error)
    return { error: 'Failed to add item to cart' }
  }
}

export async function updateGuestCartItemAction(
  productId: string,
  quantity: number,
  variantId?: string
) {
  try {
    await updateGuestCartItem(productId, quantity, variantId)
    revalidatePath('/cart')
    revalidatePath('/', 'layout') // Update header cart count
    return { success: true }
  } catch (error) {
    console.error('Failed to update guest cart item:', error)
    return { error: 'Failed to update cart' }
  }
}

export async function removeFromGuestCartAction(
  productId: string,
  variantId?: string
) {
  try {
    await removeFromGuestCart(productId, variantId)
    revalidatePath('/cart')
    revalidatePath('/', 'layout') // Update header cart count
    return { success: true }
  } catch (error) {
    console.error('Failed to remove from guest cart:', error)
    return { error: 'Failed to remove item' }
  }
}
