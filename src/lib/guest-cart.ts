import { cookies } from 'next/headers'

export interface GuestCartItem {
  productId: string
  variantId?: string
  quantity: number
}

const GUEST_CART_COOKIE = 'guest_cart'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export async function getGuestCart(): Promise<GuestCartItem[]> {
  const cookieStore = await cookies()
  const cartCookie = cookieStore.get(GUEST_CART_COOKIE)

  if (!cartCookie?.value) {
    return []
  }

  try {
    return JSON.parse(cartCookie.value)
  } catch {
    return []
  }
}

export async function setGuestCart(items: GuestCartItem[]): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.set(GUEST_CART_COOKIE, JSON.stringify(items), {
    maxAge: COOKIE_MAX_AGE,
    path: '/',
    sameSite: 'lax',
  })
}

export async function addToGuestCart(
  productId: string,
  quantity: number = 1,
  variantId?: string
): Promise<void> {
  const cart = await getGuestCart()

  const existingItemIndex = cart.findIndex(
    item => item.productId === productId && item.variantId === variantId
  )

  if (existingItemIndex > -1) {
    cart[existingItemIndex].quantity += quantity
  } else {
    cart.push({ productId, variantId, quantity })
  }

  await setGuestCart(cart)
}

export async function updateGuestCartItem(
  productId: string,
  quantity: number,
  variantId?: string
): Promise<void> {
  const cart = await getGuestCart()

  const itemIndex = cart.findIndex(
    item => item.productId === productId && item.variantId === variantId
  )

  if (itemIndex > -1) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1)
    } else {
      cart[itemIndex].quantity = quantity
    }
  }

  await setGuestCart(cart)
}

export async function removeFromGuestCart(
  productId: string,
  variantId?: string
): Promise<void> {
  const cart = await getGuestCart()

  const filtered = cart.filter(
    item => !(item.productId === productId && item.variantId === variantId)
  )

  await setGuestCart(filtered)
}

export async function clearGuestCart(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(GUEST_CART_COOKIE)
}

export async function getGuestCartCount(): Promise<number> {
  const cart = await getGuestCart()
  return cart.reduce((total, item) => total + item.quantity, 0)
}
