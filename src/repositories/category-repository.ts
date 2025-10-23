import { prisma } from '@/lib/prisma'
import type { Prisma } from '@prisma/client'

export async function getCategories(params?: {
  includeProducts?: boolean
  onlyActive?: boolean
}) {
  const { includeProducts = false, onlyActive = true } = params || {}

  return prisma.category.findMany({
    where: onlyActive ? { isActive: true } : undefined,
    include: {
      products: includeProducts
        ? {
            where: {
              isActive: true,
            },
            take: 10,
          }
        : false,
      children: true,
      parent: true,
    },
    orderBy: {
      name: 'asc',
    },
  })
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({
    where: { slug },
    include: {
      products: {
        where: {
          isActive: true,
        },
      },
      children: true,
      parent: true,
    },
  })
}

export async function createCategory(data: Prisma.CategoryCreateInput) {
  return prisma.category.create({
    data,
  })
}

export async function updateCategory(id: string, data: Prisma.CategoryUpdateInput) {
  return prisma.category.update({
    where: { id },
    data,
  })
}

export async function deleteCategory(id: string) {
  return prisma.category.delete({
    where: { id },
  })
}
