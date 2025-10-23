import { prisma } from '@/lib/prisma'
import type { Product, Prisma } from '@prisma/client'

export type ProductWithRelations = Prisma.ProductGetPayload<{
  include: {
    category: true
    variants: true
    tags: {
      include: {
        tag: true
      }
    }
  }
}>

export async function getProducts(params?: {
  skip?: number
  take?: number
  where?: Prisma.ProductWhereInput
  orderBy?: Prisma.ProductOrderByWithRelationInput
}) {
  const { skip = 0, take = 20, where, orderBy } = params || {}

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      skip,
      take,
      where: {
        ...where,
        isActive: true, // Only show active products by default
      },
      include: {
        category: true,
        variants: true,
        tags: {
          include: {
            tag: true,
          },
        },
      },
      orderBy: orderBy || { createdAt: 'desc' },
    }),
    prisma.product.count({
      where: {
        ...where,
        isActive: true,
      },
    }),
  ])

  return { products, total, hasMore: skip + take < total }
}

export async function getProductBySlug(slug: string) {
  return prisma.product.findUnique({
    where: { slug },
    include: {
      category: true,
      variants: true,
      tags: {
        include: {
          tag: true,
        },
      },
      reviews: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })
}

export async function getProductById(id: string) {
  return prisma.product.findUnique({
    where: { id },
    include: {
      category: true,
      variants: true,
      tags: {
        include: {
          tag: true,
        },
      },
    },
  })
}

export async function createProduct(data: Prisma.ProductCreateInput) {
  return prisma.product.create({
    data,
    include: {
      category: true,
      variants: true,
    },
  })
}

export async function updateProduct(id: string, data: Prisma.ProductUpdateInput) {
  return prisma.product.update({
    where: { id },
    data,
    include: {
      category: true,
      variants: true,
    },
  })
}

export async function deleteProduct(id: string) {
  return prisma.product.delete({
    where: { id },
  })
}

export async function getFeaturedProducts(limit = 6) {
  return prisma.product.findMany({
    where: {
      isActive: true,
      isFeatured: true,
    },
    take: limit,
    include: {
      category: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export async function searchProducts(query: string, limit = 10) {
  return prisma.product.findMany({
    where: {
      isActive: true,
      OR: [
        {
          name: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          description: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
    take: limit,
    include: {
      category: true,
    },
  })
}

export async function updateProductInventory(id: string, quantity: number) {
  return prisma.product.update({
    where: { id },
    data: {
      inventory: {
        increment: quantity,
      },
    },
  })
}
