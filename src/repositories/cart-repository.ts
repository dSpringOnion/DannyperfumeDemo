import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export type CartWithItems = Prisma.CartItemGetPayload<{
  include: {
    product: {
      include: {
        category: true
      }
    }
    variant: true
  }
}>

export async function getCart(userId: string) {
  return prisma.cartItem.findMany({
    where: { userId },
    include: {
      product: {
        include: {
          category: true,
        },
      },
      variant: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function addToCart(data: {
  userId: string
  productId: string
  variantId?: string
  quantity: number
}) {
  const { userId, productId, variantId, quantity } = data

  // Check if item already exists in cart
  const existingItem = await prisma.cartItem.findFirst({
    where: {
      userId,
      productId,
      variantId: variantId || null,
    },
  })

  if (existingItem) {
    // Update quantity if item exists
    return prisma.cartItem.update({
      where: { id: existingItem.id },
      data: {
        quantity: {
          increment: quantity,
        },
      },
      include: {
        product: true,
        variant: true,
      },
    })
  }

  // Create new cart item
  return prisma.cartItem.create({
    data: {
      userId,
      productId,
      variantId,
      quantity,
    },
    include: {
      product: true,
      variant: true,
    },
  })
}

export async function updateCartItemQuantity(id: string, quantity: number) {
  if (quantity <= 0) {
    return deleteCartItem(id)
  }

  return prisma.cartItem.update({
    where: { id },
    data: { quantity },
    include: {
      product: true,
      variant: true,
    },
  })
}

export async function deleteCartItem(id: string) {
  return prisma.cartItem.delete({
    where: { id },
  })
}

export async function clearCart(userId: string) {
  return prisma.cartItem.deleteMany({
    where: { userId },
  })
}

export async function getCartTotal(userId: string) {
  const items = await getCart(userId)

  const subtotal = items.reduce((total, item) => {
    const price = item.variant?.price || item.product.price
    return total + Number(price) * item.quantity
  }, 0)

  return {
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
    subtotal,
  }
}
