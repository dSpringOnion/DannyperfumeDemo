import { auth } from '@/auth/auth'
import { getCart, getCartTotal } from '@/repositories/cart-repository'
import { getGuestCartItems, getGuestCartTotal } from '@/repositories/guest-cart-repository'
import { redirect } from 'next/navigation'
import { CheckoutButton } from '@/components/checkout/checkout-button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'

export default async function CheckoutPage() {
  const session = await auth()

  // Get cart items and total based on auth status
  const items = session
    ? await getCart(session.user.id)
    : await getGuestCartItems()

  const { itemCount, subtotal } = session
    ? await getCartTotal(session.user.id)
    : await getGuestCartTotal()

  // Redirect to cart if empty
  if (items.length === 0) {
    redirect('/cart')
  }

  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <main className="container max-w-5xl mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Checkout</h1>
        <p className="text-muted-foreground">
          Review your order and complete payment securely with Stripe
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Order Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Order Items</h2>

              <div className="space-y-4">
                {items.map((item) => {
                  const price = item.variant?.price || item.product.price
                  const itemTotal = Number(price) * item.quantity

                  return (
                    <div key={`${item.productId}-${item.variantId || 'default'}`} className="flex gap-4">
                      {/* Image */}
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        {item.product.images[0] ? (
                          <Image
                            src={item.product.images[0]}
                            alt={item.product.name}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                            No image
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <h3 className="font-semibold line-clamp-1">{item.product.name}</h3>
                        {item.variant && (
                          <p className="text-sm text-muted-foreground">{item.variant.name}</p>
                        )}
                        <p className="text-sm text-muted-foreground mt-1">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <p className="font-semibold">${itemTotal.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          ${Number(price).toFixed(2)} each
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary & Checkout */}
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
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">Calculated by Stripe</span>
                </div>

                <Separator />

                <div className="flex justify-between text-lg font-bold">
                  <span>Estimated Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-6">
                <CheckoutButton />
              </div>

              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-900">
                <p className="text-xs text-blue-900 dark:text-blue-100">
                  <strong>Secure Checkout:</strong> You'll be redirected to Stripe's secure payment page to complete your purchase. Your payment information is never stored on our servers.
                </p>
              </div>

              <p className="mt-4 text-xs text-center text-muted-foreground">
                By proceeding, you agree to our Terms of Service and Privacy Policy
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
