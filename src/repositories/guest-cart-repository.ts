import { prisma } from '@/lib/prisma'
import { getGuestCart } from '@/lib/guest-cart'
import type { Product, ProductVariant, Category } from '@prisma/client'

export interface GuestCartItemWithProduct {
  productId: string
  variantId?: string
  quantity: number
  product: Product & {
    category: Category | null
    variants: ProductVariant[]
  }
  variant: ProductVariant | null
}

export async function getGuestCartItems(): Promise<GuestCartItemWithProduct[]> {
  const guestCart = await getGuestCart()

  if (guestCart.length === 0) {
    return []
  }

  // Get all product IDs from cart
  const productIds = guestCart.map(item => item.productId)

  // Fetch products from database
  const products = await prisma.product.findMany({
    where: {
      id: { in: productIds },
      isActive: true,
    },
    include: {
      category: true,
      variants: {
        where: { isActive: true },
      },
    },
  })

  // Map guest cart items with product data
  const items: GuestCartItemWithProduct[] = []

  for (const cartItem of guestCart) {
    const product = products.find(p => p.id === cartItem.productId)

    if (!product) continue // Skip if product no longer exists

    const variant = cartItem.variantId
      ? product.variants.find(v => v.id === cartItem.variantId) || null
      : null

    items.push({
      productId: cartItem.productId,
      variantId: cartItem.variantId,
      quantity: cartItem.quantity,
      product,
      variant,
    })
  }

  return items
}

export async function getGuestCartTotal(): Promise<{
  itemCount: number
  subtotal: number
}> {
  const items = await getGuestCartItems()

  let itemCount = 0
  let subtotal = 0

  for (const item of items) {
    const price = item.variant
      ? Number(item.variant.price)
      : Number(item.product.price)

    itemCount += item.quantity
    subtotal += price * item.quantity
  }

  return { itemCount, subtotal }
}
