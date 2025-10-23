import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { AddToCartButton } from '@/components/products/add-to-cart-button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { getProductBySlug } from '@/repositories/product-repository'
import { ChevronRight } from 'lucide-react'

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string }
}) {
  const product = await getProductBySlug(params.slug)

  if (!product || !product.isActive) {
    notFound()
  }

  const price = Number(product.price)
  const compareAtPrice = product.compareAtPrice ? Number(product.compareAtPrice) : null
  const discount = compareAtPrice
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : null

  const inStock = !product.trackInventory || product.inventory > 0

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1">
        <div className="container py-8">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/products" className="hover:text-foreground">
              Products
            </Link>
            <ChevronRight className="h-4 w-4" />
            {product.category && (
              <>
                <Link
                  href={`/products?category=${product.category.id}`}
                  className="hover:text-foreground"
                >
                  {product.category.name}
                </Link>
                <ChevronRight className="h-4 w-4" />
              </>
            )}
            <span className="text-foreground">{product.name}</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800">
                {product.images[0] ? (
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-muted-foreground">
                    No image available
                  </div>
                )}

                {discount && discount > 0 && (
                  <Badge className="absolute right-4 top-4 bg-red-500 text-lg">
                    -{discount}%
                  </Badge>
                )}
              </div>

              {/* Thumbnail gallery (if more images) */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-4">
                  {product.images.slice(1, 5).map((image, i) => (
                    <div
                      key={i}
                      className="relative aspect-square overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800"
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${i + 2}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 25vw, 12.5vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">{product.name}</h1>
                {product.category && (
                  <p className="mt-2 text-sm text-muted-foreground">
                    {product.category.name}
                  </p>
                )}
              </div>

              <div className="flex items-baseline gap-3">
                <p className="text-3xl font-bold">${price.toFixed(2)}</p>
                {compareAtPrice && (
                  <p className="text-xl text-muted-foreground line-through">
                    ${compareAtPrice.toFixed(2)}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2">
                {inStock ? (
                  <Badge variant="outline" className="text-green-600">
                    In Stock
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-red-600">
                    Out of Stock
                  </Badge>
                )}
                {product.sku && (
                  <span className="text-sm text-muted-foreground">
                    SKU: {product.sku}
                  </span>
                )}
              </div>

              <Separator />

              {product.description && (
                <div>
                  <h2 className="mb-2 font-semibold">Description</h2>
                  <p className="text-muted-foreground whitespace-pre-wrap">
                    {product.description}
                  </p>
                </div>
              )}

              <AddToCartButton productId={product.id} disabled={!inStock} />

              {/* Product Details */}
              <div className="rounded-lg border p-4 space-y-2">
                <h3 className="font-semibold">Product Details</h3>
                <div className="space-y-1 text-sm">
                  {product.trackInventory && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Available:</span>
                      <span>{product.inventory} units</span>
                    </div>
                  )}
                  {product.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap mt-2">
                      {product.tags.map(({ tag }) => (
                        <Badge key={tag.id} variant="secondary">
                          {tag.name}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Reviews Section (placeholder for now) */}
          {product.reviews.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-6 text-2xl font-bold">Customer Reviews</h2>
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div key={review.id} className="rounded-lg border p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold">{review.user.name || 'Anonymous'}</span>
                      <span className="text-sm text-muted-foreground">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {review.title && (
                      <h3 className="font-semibold mb-1">{review.title}</h3>
                    )}
                    {review.comment && (
                      <p className="text-muted-foreground">{review.comment}</p>
                    )}
                    <div className="mt-2 flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
