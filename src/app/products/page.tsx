import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCard } from '@/components/products/product-card'
import { getProducts } from '@/repositories/product-repository'
import { getCategories } from '@/repositories/category-repository'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function ProductsPage(props: {
  searchParams: Promise<{ category?: string; page?: string }>
}) {
  const searchParams = await props.searchParams
  const page = Number(searchParams.page) || 1
  const take = 12
  const skip = (page - 1) * take

  const where = searchParams.category ? { categoryId: searchParams.category } : undefined

  const [{ products, total }, categories] = await Promise.all([
    getProducts({ skip, take, where }),
    getCategories({ onlyActive: true }),
  ])

  // Serialize Decimal types for Client Component
  const serializedProducts = products.map(product => ({
    ...product,
    price: Number(product.price),
    compareAtPrice: product.compareAtPrice ? Number(product.compareAtPrice) : null,
    costPerItem: product.costPerItem ? Number(product.costPerItem) : null,
  }))

  const totalPages = Math.ceil(total / take)

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
        <div className="container mx-auto py-12 px-4 max-w-[1400px]">
          {/* Header Section with Breadcrumb */}
          <div className="mb-12 text-center">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-6">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <span>/</span>
              <span className="text-foreground font-medium">Products</span>
            </div>

            <div className="max-w-3xl mx-auto">
              <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                Our Products
              </h1>
              <p className="text-lg text-muted-foreground mb-6">
                Discover our curated collection of {total} premium products
              </p>

              {/* Sort Dropdown - Centered */}
              <div className="flex items-center justify-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Sort by:</span>
                <select className="px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-sm font-medium hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all shadow-sm">
                  <option>Newest</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Most Popular</option>
                </select>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mb-16 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-green-50 dark:bg-green-950 rounded-full">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Free Shipping</p>
                <p className="text-xs text-muted-foreground">On orders $50+</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-blue-50 dark:bg-blue-950 rounded-full">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Secure Payment</p>
                <p className="text-xs text-muted-foreground">SSL Encrypted</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-purple-50 dark:bg-purple-950 rounded-full">
                <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">Easy Returns</p>
                <p className="text-xs text-muted-foreground">30-Day Guarantee</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-100 dark:border-gray-800">
              <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center bg-orange-50 dark:bg-orange-950 rounded-full">
                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">24/7 Support</p>
                <p className="text-xs text-muted-foreground">Always here to help</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10">
            {/* Sidebar - Categories - Fixed to Left */}
            <aside className="w-full lg:w-64 flex-shrink-0" data-testid="category-sidebar">
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-100 dark:border-gray-800 sticky top-24 transition-all hover:shadow-2xl">
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-white flex items-center gap-2">
                  <span className="text-2xl">🏷️</span>
                  Categories
                </h2>
                <div className="space-y-1">
                  <Link
                    href="/products"
                    data-testid="category-all"
                    className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                      !searchParams.category
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 text-blue-700 dark:text-blue-300 shadow-md border border-blue-200 dark:border-blue-800'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-xl">🏪</span>
                    <span>All Products</span>
                  </Link>
                  {categories.map((category) => {
                    const icon = category.slug === 'electronics' ? '💻' : category.slug === 'clothing' ? '👕' : '🏡'
                    return (
                      <Link
                        key={category.id}
                        href={`/products?category=${category.id}`}
                        data-testid={`category-${category.slug}`}
                        className={`flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                          searchParams.category === category.id
                            ? 'bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 text-blue-700 dark:text-blue-300 shadow-md border border-blue-200 dark:border-blue-800'
                            : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="text-xl">{icon}</span>
                        <span>{category.name}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {serializedProducts.length === 0 ? (
                <div className="flex min-h-[500px] flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 dark:border-gray-700 p-12 text-center bg-white/50 dark:bg-gray-900/50">
                  <div className="text-6xl mb-4">🔍</div>
                  <p className="text-2xl font-bold mb-2">No products found</p>
                  <p className="text-muted-foreground">
                    Try selecting a different category or check back later
                  </p>
                </div>
              ) : (
                <>
                  <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
                    {serializedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Product Counter - Centered to Full Page Width */}
          {serializedProducts.length > 0 && (
            <div className="mb-12 flex items-center justify-center">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/50 dark:to-purple-950/50 rounded-full border border-blue-100 dark:border-blue-900">
                <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse"></div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Showing <span className="text-blue-600">{skip + 1}-{Math.min(skip + take, total)}</span> of <span className="text-purple-600">{total}</span> products
                </p>
                <span className="px-3 py-1 rounded-full bg-white dark:bg-gray-900 text-xs font-bold text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                  Page {page}/{totalPages}
                </span>
              </div>
            </div>
          )}

          {/* Pagination */}
          {serializedProducts.length > 0 && totalPages > 1 && (
            <div className="flex justify-center gap-3 mb-12">
                      {page > 1 && (
                        <Button variant="outline" asChild>
                          <Link
                            href={`/products?${searchParams.category ? `category=${searchParams.category}&` : ''}page=${page - 1}`}
                          >
                            Previous
                          </Link>
                        </Button>
                      )}

                      <div className="flex items-center gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                          <Button
                            key={pageNum}
                            variant={pageNum === page ? 'default' : 'outline'}
                            asChild
                            size="sm"
                          >
                            <Link
                              href={`/products?${searchParams.category ? `category=${searchParams.category}&` : ''}page=${pageNum}`}
                            >
                              {pageNum}
                            </Link>
                          </Button>
                        ))}
                      </div>

                      {page < totalPages && (
                        <Button variant="outline" asChild>
                          <Link
                            href={`/products?${searchParams.category ? `category=${searchParams.category}&` : ''}page=${page + 1}`}
                          >
                            Next
                          </Link>
                        </Button>
                      )}
                    </div>
                  )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
