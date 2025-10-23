import Link from 'next/link'
import { auth } from '@/auth/auth'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { UserNav } from '@/components/layout/user-nav'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ShoppingCart, Search, Store } from 'lucide-react'
import { getUnifiedCartCount } from '@/repositories/unified-cart-repository'

export async function Header() {
  const session = await auth()
  const cartCount = await getUnifiedCartCount()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/98 dark:bg-gray-900/98 backdrop-blur-md shadow-sm" data-testid="header">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 mr-2">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg shadow-md">
              <Store className="h-5 w-5 text-white" />
            </div>
            <span className="hidden sm:inline text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              ShopHub
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-xl">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="search"
                placeholder="Search products..."
                className="pl-10 h-10 w-full bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium">
            <Link
              href="/products"
              data-testid="nav-products"
              className="transition-colors hover:text-blue-600 text-gray-700 dark:text-gray-300 whitespace-nowrap"
            >
              Products
            </Link>
            <Link
              href="/categories"
              data-testid="nav-categories"
              className="transition-colors hover:text-blue-600 text-gray-700 dark:text-gray-300 whitespace-nowrap"
            >
              Categories
            </Link>
            {session?.user.role === 'ADMIN' || session?.user.role === 'SUPER_ADMIN' ? (
              <Link
                href="/admin"
                data-testid="nav-admin"
                className="transition-colors hover:text-blue-600 text-gray-700 dark:text-gray-300 whitespace-nowrap"
              >
                Admin
              </Link>
            ) : null}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3 ml-auto">
            <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 dark:hover:bg-gray-800" asChild>
              <Link href="/cart" data-testid="cart-icon">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold shadow-lg">
                    {cartCount}
                  </span>
                )}
                <span className="sr-only">Cart ({cartCount})</span>
              </Link>
            </Button>
            <ThemeToggle />
            {session ? (
              <UserNav user={session.user} />
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" asChild className="hidden md:flex hover:bg-gray-100 dark:hover:bg-gray-800">
                  <Link href="/auth/signin" data-testid="signin-button">Sign In</Link>
                </Button>
                <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md hover:shadow-lg transition-all">
                  <Link href="/auth/signup" data-testid="signup-button">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden border-t bg-gray-50/50 dark:bg-gray-900/50 px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-10 h-10 bg-white dark:bg-gray-800 rounded-lg"
          />
        </div>
      </div>
    </header>
  )
}
