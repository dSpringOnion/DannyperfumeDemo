'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/auth/auth'
import {
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  searchProducts
} from '@/repositories/product-repository'

export async function getProductsAction(params?: {
  skip?: number
  take?: number
  categoryId?: string
  search?: string
}) {
  try {
    const { skip, take, categoryId, search } = params || {}

    if (search) {
      const products = await searchProducts(search, take)
      return { success: true, products, total: products.length }
    }

    const where = categoryId ? { categoryId } : undefined
    const result = await getProducts({ skip, take, where })

    return {
      success: true,
      products: result.products,
      total: result.total,
      hasMore: result.hasMore
    }
  } catch (error) {
    console.error('Error fetching products:', error)
    return { success: false, error: 'Failed to fetch products' }
  }
}

export async function getProductBySlugAction(slug: string) {
  try {
    const product = await getProductBySlug(slug)

    if (!product) {
      return { success: false, error: 'Product not found' }
    }

    return { success: true, product }
  } catch (error) {
    console.error('Error fetching product:', error)
    return { success: false, error: 'Failed to fetch product' }
  }
}

export async function getFeaturedProductsAction(limit = 6) {
  try {
    const products = await getFeaturedProducts(limit)
    return { success: true, products }
  } catch (error) {
    console.error('Error fetching featured products:', error)
    return { success: false, error: 'Failed to fetch featured products' }
  }
}
