import Link from 'next/link'
import Image from 'next/image'
import { auth } from '@/auth/auth'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { getCart, getCartTotal } from '@/repositories/cart-repository'
import { getGuestCartItems, getGuestCartTotal } from '@/repositories/guest-cart-repository'
import { CartItemActions } from '@/components/cart/cart-item-actions'
import { GuestCartItemActions } from '@/components/cart/guest-cart-item-actions'
import { ShoppingBag } from 'lucide-react'

export default async function CartPage() {
  const session = await auth()

  // Get cart items based on authentication status
  const items = session
    ? await getCart(session.user.id)
    : await getGuestCartItems()

  const { itemCount, subtotal } = session
    ? await getCartTotal(session.user.id)
    : await getGuestCartTotal()

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1 container py-8">
          <div className="flex min-h-[500px] flex-col items-center justify-center">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Add some products to get started
            </p>
            <Button asChild>
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const tax = subtotal * 0.1 // 10% tax
  const total = subtotal + tax

  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 container py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
          {!session && (
            <div className="text-sm text-muted-foreground">
              <Link href="/auth/signin" className="text-primary hover:underline">
                Sign in
              </Link>{' '}
              to save your cart
            </div>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => {
              const itemPrice = item.variant
                ? Number(item.variant.price)
                : Number(item.product.price)
              const itemTotal = itemPrice * item.quantity

              return (
                <Card key={`${item.productId}-${item.variantId || 'default'}`}>
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md bg-zinc-100 dark:bg-zinc-800">
                        {item.product.images[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="96px"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-muted-foreground text-xs">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Product Info */}
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between">
                            <div>
                              <Link
                                href={`/products/${item.product.slug}`}
                                className="font-semibold hover:text-primary"
                              >
                                {item.product.name}
                              </Link>
                              {item.product.category && (
                                <p className="text-sm text-muted-foreground">
                                  {item.product.category.name}
                                </p>
                              )}
                              {item.variant && (
                                <p className="text-sm text-muted-foreground">
                                  Variant: {item.variant.name}
                                </p>
                              )}
                            </div>
                            <p className="font-semibold">
                              ${itemTotal.toFixed(2)}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground">
                            ${itemPrice.toFixed(2)} each
                          </p>
                          {session ? (
                            <CartItemActions
                              itemId={'id' in item ? item.id : ''}
                              quantity={item.quantity}
                              maxQuantity={item.product.inventory}
                            />
                          ) : (
                            <GuestCartItemActions
                              productId={item.productId}
                              variantId={item.variantId}
                              quantity={item.quantity}
                              maxQuantity={item.product.inventory}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})
                    </span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Tax (10%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">Calculated at checkout</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>

                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/products">Continue Shopping</Link>
                  </Button>
                </div>

                {!session && (
                  <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-900">
                    <p className="text-xs text-blue-900 dark:text-blue-100">
                      <Link href="/auth/signin" className="font-semibold hover:underline">
                        Sign in
                      </Link>{' '}
                      or{' '}
                      <Link href="/auth/signup" className="font-semibold hover:underline">
                        create an account
                      </Link>{' '}
                      for faster checkout next time
                    </p>
                  </div>
                )}

                <p className="mt-4 text-xs text-center text-muted-foreground">
                  Shipping and taxes calculated at checkout
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
