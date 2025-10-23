'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Star, Heart } from 'lucide-react'
import { AddToCartButton } from '@/components/products/add-to-cart-button'
import type { Product, Category } from '@prisma/client'

interface ProductCardProps {
  product: Product & {
    category: Category | null
  }
}

export function ProductCard({ product }: ProductCardProps) {
  // Product price is already serialized as number from server
  const price = typeof product.price === 'number' ? product.price : Number(product.price)
  const compareAtPrice = product.compareAtPrice
    ? (typeof product.compareAtPrice === 'number' ? product.compareAtPrice : Number(product.compareAtPrice))
    : null
  const discount = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : null

  // Mock rating for now (will be real in Phase 3)
  const rating = 4.5
  // Use product ID to generate consistent review count (same on server and client)
  const reviewCount = (product.id.charCodeAt(0) % 190) + 10

  return (
    <Card className="group overflow-hidden rounded-xl border border-gray-100 dark:border-gray-800 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 bg-white dark:bg-gray-900" data-testid="product-card">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 dark:bg-gray-800">
          {product.images[0] ? (
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="pointer-events-none object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={false}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image
            </div>
          )}

          {/* Wishlist Heart Button */}
          <button
            className="absolute left-3 top-3 z-10 p-2 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg hover:bg-white dark:hover:bg-gray-900 hover:scale-110 transition-all group/heart"
            onClick={(e) => {
              e.preventDefault()
              // TODO: Implement wishlist functionality
            }}
          >
            <Heart className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover/heart:text-red-500 group-hover/heart:fill-red-500 transition-all" />
          </button>

          {/* Discount Badge */}
          {discount && discount > 0 && (
            <Badge className="absolute right-3 top-3 bg-red-500 hover:bg-red-600 text-white font-bold px-3 py-1 pointer-events-none" data-testid="sale-badge">
              {discount}% OFF
            </Badge>
          )}

          {/* New Badge for featured products */}
          {product.isFeatured && !discount && (
            <Badge className="absolute right-3 top-3 bg-blue-500 hover:bg-blue-600 text-white font-bold px-3 py-1 pointer-events-none">
              NEW
            </Badge>
          )}

          {/* Stock Status Badges */}
          {product.trackInventory && product.inventory <= 0 ? (
            <Badge className="absolute left-3 bottom-3 bg-zinc-900 text-white font-bold px-3 py-1 pointer-events-none shadow-lg">
              Sold Out
            </Badge>
          ) : product.trackInventory && product.inventory < 5 && product.inventory > 0 ? (
            <Badge className="absolute left-3 bottom-3 bg-orange-500 hover:bg-orange-600 text-white font-bold px-3 py-1 pointer-events-none shadow-lg">
              Low Stock
            </Badge>
          ) : product.trackInventory && product.inventory >= 5 ? (
            <Badge className="absolute left-3 bottom-3 bg-green-500 hover:bg-green-600 text-white font-bold px-3 py-1 pointer-events-none shadow-lg">
              In Stock
            </Badge>
          ) : null}

          {/* Quick Add to Cart on Hover */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4">
            <AddToCartButton
              productId={product.id}
              size="sm"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold shadow-lg"
            />
          </div>
        </div>
      </Link>

      <CardContent className="p-5">
        <Link href={`/products/${product.slug}`}>
          <div className="space-y-3">
            {/* Category */}
            {product.category && (
              <p className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                {product.category.name}
              </p>
            )}

            {/* Product Name */}
            <h3 className="line-clamp-2 text-base font-bold leading-tight group-hover:text-blue-600 transition-colors min-h-[2.5rem]">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'fill-gray-200 text-gray-200 dark:fill-gray-700 dark:text-gray-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                ({reviewCount})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${price.toFixed(2)}
              </p>
              {compareAtPrice && (
                <p className="text-base text-gray-500 line-through">
                  ${compareAtPrice.toFixed(2)}
                </p>
              )}
            </div>
          </div>
        </Link>
      </CardContent>

      <CardFooter className="p-5 pt-0">
        <Button asChild className="w-full h-11 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all">
          <Link href={`/products/${product.slug}`}>
            View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
