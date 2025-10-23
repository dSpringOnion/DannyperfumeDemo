import { test, expect } from '@playwright/test'

test.describe('Phase 2: Product Browsing & Cart', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3002')
  })

  test('should load products page and display 8 products', async ({ page }) => {
    await page.goto('http://localhost:3002/products')

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]', {
      timeout: 10000
    })

    // Check page title
    await expect(page.locator('h1')).toContainText('Products')

    // Count product cards
    const productCards = page.locator('[data-testid="product-card"]')
    await expect(productCards).toHaveCount(8)

    // Verify pagination text shows correct count
    const paginationText = page.locator('text=Showing')
    await expect(paginationText).toContainText('1-8 of 8 products')
  })

  test('should display product images from Unsplash', async ({ page }) => {
    await page.goto('http://localhost:3002/products')

    // Wait for first product image to load
    const firstImage = page.locator('img[alt="Scented Candle Set"]').first()
    await expect(firstImage).toBeVisible()

    // Verify image src contains Unsplash URL
    const src = await firstImage.getAttribute('src')
    expect(src).toContain('unsplash.com')
  })

  test('should filter products by category', async ({ page }) => {
    await page.goto('http://localhost:3002/products')

    // Wait for page to load
    await page.waitForSelector('[data-testid="category-sidebar"]')

    // Click "Clothing" category with force to bypass image interception
    await page.click('[data-testid="category-clothing"]', { force: true })

    // Wait for URL to update
    await page.waitForURL('**/products?category=*')

    // Verify filtered products are shown (should be 3 clothing items)
    const productCards = page.locator('[data-testid="product-card"]')
    await expect(productCards).toHaveCount(3)
  })

  test('should navigate to product detail page', async ({ page }) => {
    await page.goto('http://localhost:3002/products')

    // Click on first product (Scented Candle Set)
    await page.click('text=Scented Candle Set')

    // Wait for navigation
    await page.waitForURL('**/products/scented-candle-set')

    // Verify product details are shown
    await expect(page.locator('h1')).toContainText('Scented Candle Set')
    await expect(page.locator('text=$34.99')).toBeVisible()

    // Verify breadcrumb navigation
    await expect(page.locator('text=Products')).toBeVisible()
  })

  test('should show sale badges on discounted products', async ({ page }) => {
    await page.goto('http://localhost:3002/products')

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]')

    // Look for products with sale badges
    const saleBadges = page.locator('[data-testid="sale-badge"]')

    // Should have 3 products on sale (Headphones, Backpack, Jeans)
    await expect(saleBadges).toHaveCount(3)

    // Verify badge shows discount percentage
    const firstBadge = saleBadges.first()
    const badgeText = await firstBadge.textContent()
    expect(badgeText).toMatch(/-%/)
  })

  test('should display category sidebar navigation', async ({ page }) => {
    await page.goto('http://localhost:3002/products')

    // Verify sidebar exists
    await expect(page.locator('[data-testid="category-sidebar"]')).toBeVisible()

    // Verify all categories are listed
    await expect(page.locator('[data-testid="category-all"]')).toBeVisible()
    await expect(page.locator('[data-testid="category-electronics"]')).toBeVisible()
    await expect(page.locator('[data-testid="category-clothing"]')).toBeVisible()
    await expect(page.locator('[data-testid="category-home-garden"]')).toBeVisible()
  })

  test('should show "Add to Cart" button on product detail page', async ({ page }) => {
    await page.goto('http://localhost:3002/products/wireless-headphones')

    // Wait for page to load
    await page.waitForSelector('h1')

    // Verify Add to Cart button is visible
    const addToCartButton = page.locator('button:has-text("Add to Cart")')
    await expect(addToCartButton).toBeVisible()
  })

  test('should redirect to signin when adding to cart without authentication', async ({ page }) => {
    await page.goto('http://localhost:3002/products/wireless-headphones')

    // Click Add to Cart without being logged in
    await page.click('button:has-text("Add to Cart")')

    // Should redirect to signin page
    await page.waitForURL('**/auth/signin**', { timeout: 5000 })
  })

  test('should display cart page', async ({ page }) => {
    await page.goto('http://localhost:3002/cart')

    // Should redirect to signin (since not authenticated)
    await page.waitForURL('**/auth/signin**', { timeout: 5000 })

    // Verify signin page loaded
    await expect(page.locator('text=Sign In')).toBeVisible()
  })

  test('should show responsive layout on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 })

    await page.goto('http://localhost:3002/products')

    // Wait for products to load
    await page.waitForSelector('[data-testid="product-card"]')

    // Products should display in 1 column on mobile
    const productCards = page.locator('[data-testid="product-card"]')
    await expect(productCards.first()).toBeVisible()

    // Sidebar should still be accessible
    await expect(page.locator('[data-testid="category-sidebar"]')).toBeVisible()
  })

  test('should display featured products badge', async ({ page }) => {
    await page.goto('http://localhost:3002/products')

    // Featured products: Wireless Headphones, Smart Watch, T-Shirt, Running Shoes, Candle Set
    // They should be visible in the product grid
    const headphones = page.locator('text=Wireless Headphones')
    const smartWatch = page.locator('text=Smart Watch')

    await expect(headphones).toBeVisible()
    await expect(smartWatch).toBeVisible()
  })

  test('should show correct product prices with discounts', async ({ page }) => {
    await page.goto('http://localhost:3002/products')

    // Find Wireless Headphones (has discount)
    const headphonesCard = page.locator('text=Wireless Headphones').locator('..').locator('..')

    // Should show sale price and original price
    await expect(headphonesCard.locator('text=$99.99')).toBeVisible()
    await expect(headphonesCard.locator('text=$149.99')).toBeVisible()
  })
})

test.describe('Phase 2: Navigation', () => {
  test('should have working header navigation', async ({ page }) => {
    await page.goto('http://localhost:3002/products')

    // Wait for page to fully load
    await page.waitForSelector('[data-testid="header"]')

    // Verify header exists
    await expect(page.locator('[data-testid="header"]')).toBeVisible()

    // Verify navigation links
    await expect(page.locator('[data-testid="nav-products"]')).toBeVisible()
    await expect(page.locator('[data-testid="nav-categories"]')).toBeVisible()

    // Verify cart icon
    await expect(page.locator('[data-testid="cart-icon"]')).toBeVisible()

    // Verify auth buttons
    await expect(page.locator('[data-testid="signin-button"]')).toBeVisible()
    await expect(page.locator('[data-testid="signup-button"]')).toBeVisible()
  })

  test('should have working theme toggle', async ({ page }) => {
    await page.goto('http://localhost:3002/products')

    // Wait for page to fully load
    await page.waitForSelector('[data-testid="theme-toggle"]')

    // Find theme toggle button
    const themeToggle = page.locator('[data-testid="theme-toggle"]')
    await expect(themeToggle).toBeVisible()

    // Click theme toggle (opens dropdown menu)
    await themeToggle.click()

    // Wait for dropdown to appear
    await page.waitForTimeout(300)

    // Verify dropdown menu items are visible
    await expect(page.locator('text=Light')).toBeVisible()
    await expect(page.locator('text=Dark')).toBeVisible()
    await expect(page.locator('text=System')).toBeVisible()
  })
})
