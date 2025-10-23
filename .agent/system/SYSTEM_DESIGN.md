# System Design Document
## Fullstack Ecommerce SaaS Boilerplate

**Version:** 1.0
**Date:** October 10, 2025
**Author:** Daniel Park
**Status:** Design Phase

---

## Table of Contents
1. [Architecture Overview](#1-architecture-overview)
2. [Technology Stack](#2-technology-stack)
3. [System Components](#3-system-components)
4. [Data Models](#4-data-models)
5. [API Design](#5-api-design)
6. [Security Architecture](#6-security-architecture)
7. [Deployment Architecture](#7-deployment-architecture)
8. [Scalability & Performance](#8-scalability--performance)
9. [Monitoring & Observability](#9-monitoring--observability)
10. [Development Workflow](#10-development-workflow)

---

## 1. Architecture Overview

### 1.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                              │
├─────────────────────────────────────────────────────────────────┤
│  Next.js 15 App Router + React 19 + TypeScript                  │
│  - Server Components (RSC)                                       │
│  - Client Components (interactive UI)                            │
│  - Server Actions (mutations)                                    │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                           │ HTTP/HTTPS
                           ▼
┌─────────────────────────────────────────────────────────────────┐
│                      Application Layer                           │
├─────────────────────────────────────────────────────────────────┤
│  Next.js API Routes & Server Actions                            │
│  - Authentication endpoints                                      │
│  - Product CRUD operations                                       │
│  - Order processing                                              │
│  - Payment handling                                              │
│  - Admin operations                                              │
└──────────────────────────┬──────────────────────────────────────┘
                           │
          ┌────────────────┼────────────────┬──────────────────┐
          │                │                │                  │
          ▼                ▼                ▼                  ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Database   │  │  Auth Service│  │   Payment    │  │    Email     │
│  PostgreSQL  │  │  (Auth.js)   │  │   (Stripe)   │  │   (Resend)   │
│   + Redis    │  │              │  │              │  │              │
└──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘
```

### 1.2 Architecture Principles

#### **Separation of Concerns**
- **Presentation Layer**: React components, UI logic
- **Business Logic Layer**: Server actions, API routes
- **Data Access Layer**: Prisma ORM, database queries
- **Integration Layer**: Third-party services (Stripe, email, storage)

#### **Design Patterns**
1. **Repository Pattern**: Centralized data access
2. **Service Layer Pattern**: Business logic encapsulation
3. **Dependency Injection**: For testability
4. **Factory Pattern**: For object creation (emails, payments)
5. **Observer Pattern**: For webhooks and events

#### **Key Architectural Decisions**

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Rendering Strategy** | Hybrid (SSR + CSR + SSG) | Optimal SEO + interactivity |
| **State Management** | React Server Components + Zustand | Minimize client state, use server when possible |
| **API Style** | REST + Server Actions | Server actions for mutations, REST for reads |
| **Database** | PostgreSQL | ACID compliance, reliability, strong ecosystem |
| **Caching Strategy** | React Cache + Redis | Fast reads, reduced DB load |
| **File Storage** | UploadThing | Next.js integration, easy setup |

---

## 2. Technology Stack

### 2.1 Core Framework

```typescript
// package.json (key dependencies)
{
  "dependencies": {
    // Core
    "next": "^15.3.4",
    "react": "^19.1.0",
    "react-dom": "^19.1.0",
    "typescript": "^5.8.3",

    // Database & ORM
    "@prisma/client": "^6.11.0",
    "prisma": "^6.11.0",

    // Authentication
    "next-auth": "^5.0.0-beta",
    "@auth/prisma-adapter": "^2.0.0",
    "bcrypt": "^5.1.1",

    // Payments
    "stripe": "^17.5.0",
    "@stripe/stripe-js": "^5.6.0",

    // UI & Styling
    "tailwindcss": "^4.0.0",
    "@radix-ui/react-*": "latest",
    "lucide-react": "^0.468.0",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "tailwind-merge": "^2.8.0",

    // Forms & Validation
    "react-hook-form": "^7.54.2",
    "zod": "^3.24.1",
    "@hookform/resolvers": "^3.9.1",

    // Email
    "resend": "^4.0.1",
    "@react-email/components": "^0.0.25",

    // File Upload
    "uploadthing": "^7.4.3",

    // State Management
    "zustand": "^5.0.3",

    // Utilities
    "date-fns": "^4.1.0",
    "nanoid": "^5.0.9",
    "sharp": "^0.33.5"
  },
  "devDependencies": {
    // Testing
    "vitest": "^3.2.4",
    "@testing-library/react": "^16.1.0",
    "@testing-library/jest-dom": "^6.6.3",
    "playwright": "^1.53.2",

    // Code Quality
    "eslint": "^9.19.0",
    "prettier": "^3.4.2",
    "husky": "^9.1.7",
    "lint-staged": "^15.2.11",

    // Types
    "@types/node": "^22.5.0",
    "@types/react": "^19.0.6",
    "@types/bcrypt": "^5.0.2"
  }
}
```

### 2.2 Infrastructure Stack

```yaml
# Production Stack
Frontend Hosting: Vercel (recommended) or Netlify
Database: Neon (serverless Postgres) or Supabase
Redis: Upstash (serverless Redis)
File Storage: UploadThing or Cloudinary
Email: Resend
Monitoring: Sentry + Vercel Analytics
CDN: Vercel Edge Network

# Development Stack
Database: Local PostgreSQL via Docker
Redis: Local Redis via Docker
Email: Resend (test mode)
File Storage: Local filesystem (dev)
```

---

## 3. System Components

### 3.1 Frontend Components

#### **Component Architecture**

```
src/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Auth routes (login, signup)
│   ├── (shop)/                   # Shop routes (products, cart, checkout)
│   ├── (dashboard)/              # User dashboard
│   ├── (admin)/                  # Admin dashboard
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/   # Auth.js routes
│   │   ├── products/             # Product API
│   │   ├── orders/               # Order API
│   │   ├── webhooks/             # Webhook handlers
│   │   └── uploadthing/          # File upload
│   └── layout.tsx                # Root layout
│
├── components/                   # React components
│   ├── ui/                       # shadcn/ui components
│   ├── layout/                   # Layout components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Sidebar.tsx
│   │   └── MobileNav.tsx
│   ├── shop/                     # Shop-specific components
│   │   ├── ProductCard.tsx
│   │   ├── ProductGrid.tsx
│   │   ├── ProductFilters.tsx
│   │   ├── CartDrawer.tsx
│   │   └── CheckoutForm.tsx
│   ├── admin/                    # Admin-specific components
│   │   ├── ProductTable.tsx
│   │   ├── OrderTable.tsx
│   │   ├── AnalyticsChart.tsx
│   │   └── InventoryAlert.tsx
│   └── shared/                   # Shared components
│       ├── SearchBar.tsx
│       ├── Pagination.tsx
│       ├── LoadingSpinner.tsx
│       └── ErrorBoundary.tsx
│
├── lib/                          # Core libraries
│   ├── prisma.ts                 # Prisma client
│   ├── auth.ts                   # Auth.js config
│   ├── stripe.ts                 # Stripe client
│   ├── redis.ts                  # Redis client
│   ├── email.ts                  # Email utilities
│   └── uploadthing.ts            # File upload config
│
├── services/                     # Business logic
│   ├── product.service.ts
│   ├── order.service.ts
│   ├── cart.service.ts
│   ├── payment.service.ts
│   ├── user.service.ts
│   └── email.service.ts
│
├── repositories/                 # Data access layer
│   ├── product.repository.ts
│   ├── order.repository.ts
│   ├── user.repository.ts
│   └── cart.repository.ts
│
├── actions/                      # Server actions
│   ├── product.actions.ts
│   ├── order.actions.ts
│   ├── cart.actions.ts
│   └── auth.actions.ts
│
├── hooks/                        # Custom React hooks
│   ├── use-cart.ts
│   ├── use-wishlist.ts
│   ├── use-debounce.ts
│   └── use-media-query.ts
│
├── types/                        # TypeScript types
│   ├── product.types.ts
│   ├── order.types.ts
│   ├── user.types.ts
│   └── api.types.ts
│
├── utils/                        # Utility functions
│   ├── format.ts                 # Formatting utilities
│   ├── validation.ts             # Zod schemas
│   ├── constants.ts              # App constants
│   └── helpers.ts                # Helper functions
│
└── config/                       # Configuration
    ├── site.config.ts            # Site metadata
    ├── nav.config.ts             # Navigation config
    └── env.ts                    # Environment validation
```

### 3.2 Key Component Patterns

#### **Server Components (Default)**
```typescript
// app/(shop)/products/page.tsx
import { getProducts } from '@/services/product.service'

export default async function ProductsPage() {
  const products = await getProducts() // Fetch on server

  return (
    <div>
      <h1>Products</h1>
      <ProductGrid products={products} />
    </div>
  )
}
```

#### **Client Components (Interactive)**
```typescript
'use client'

// components/shop/CartDrawer.tsx
import { useCart } from '@/hooks/use-cart'
import { Sheet } from '@/components/ui/sheet'

export function CartDrawer() {
  const { items, removeItem, updateQuantity } = useCart()

  return (
    <Sheet>
      {/* Cart UI with client-side interactions */}
    </Sheet>
  )
}
```

#### **Server Actions (Mutations)**
```typescript
// actions/cart.actions.ts
'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { CartService } from '@/services/cart.service'

export async function addToCart(productId: string, quantity: number) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')

  await CartService.addItem(session.user.id, productId, quantity)
  revalidatePath('/cart')

  return { success: true }
}
```

---

## 4. Data Models

### 4.1 Complete Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// ============================================
// AUTHENTICATION & USERS
// ============================================

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String    @unique
  emailVerified DateTime?
  image         String?
  password      String?   // Hashed password (for email/password auth)
  role          UserRole  @default(CUSTOMER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt

  // Auth.js relations
  accounts      Account[]
  sessions      Session[]

  // Ecommerce relations
  cart          CartItem[]
  orders        Order[]
  reviews       Review[]
  wishlist      WishlistItem[]
  addresses     Address[]

  @@index([email])
}

enum UserRole {
  CUSTOMER
  ADMIN
  SUPER_ADMIN
}

model Account {
  id                String  @id @default(cuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
  @@index([userId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

// ============================================
// PRODUCTS & CATALOG
// ============================================

model Category {
  id          String    @id @default(cuid())
  name        String
  slug        String    @unique
  description String?
  image       String?
  parentId    String?
  isActive    Boolean   @default(true)
  createdAt   DateTime  @default(now())
  updatedAt   DateTime  @updatedAt

  parent      Category?  @relation("CategoryToCategory", fields: [parentId], references: [id])
  children    Category[] @relation("CategoryToCategory")
  products    Product[]

  @@index([slug])
  @@index([parentId])
}

model Product {
  id              String   @id @default(cuid())
  name            String
  slug            String   @unique
  description     String?  @db.Text
  price           Decimal  @db.Decimal(10,2)
  compareAtPrice  Decimal? @db.Decimal(10,2)
  costPerItem     Decimal? @db.Decimal(10,2)
  sku             String?  @unique
  barcode         String?
  inventory       Int      @default(0)
  trackInventory  Boolean  @default(true)
  weight          Decimal? @db.Decimal(10,2)
  weightUnit      String?  @default("kg")
  images          String[]
  metaTitle       String?
  metaDescription String?
  isActive        Boolean  @default(true)
  isFeatured      Boolean  @default(false)
  categoryId      String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  category      Category?       @relation(fields: [categoryId], references: [id])
  variants      ProductVariant[]
  tags          ProductTag[]
  cartItems     CartItem[]
  orderItems    OrderItem[]
  reviews       Review[]
  wishlistItems WishlistItem[]

  @@index([slug])
  @@index([categoryId])
  @@index([isActive])
  @@index([isFeatured])
}

model ProductVariant {
  id              String   @id @default(cuid())
  productId       String
  name            String
  sku             String?  @unique
  price           Decimal  @db.Decimal(10,2)
  compareAtPrice  Decimal? @db.Decimal(10,2)
  inventory       Int      @default(0)
  images          String[]
  options         Json     // { "size": "M", "color": "Blue" }
  isActive        Boolean  @default(true)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  product    Product     @relation(fields: [productId], references: [id], onDelete: Cascade)
  cartItems  CartItem[]
  orderItems OrderItem[]

  @@index([productId])
  @@index([sku])
}

model Tag {
  id        String   @id @default(cuid())
  name      String   @unique
  slug      String   @unique
  createdAt DateTime @default(now())

  products ProductTag[]

  @@index([slug])
}

model ProductTag {
  productId String
  tagId     String

  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  tag     Tag     @relation(fields: [tagId], references: [id], onDelete: Cascade)

  @@id([productId, tagId])
  @@index([productId])
  @@index([tagId])
}

// ============================================
// CART & WISHLIST
// ============================================

model CartItem {
  id        String   @id @default(cuid())
  userId    String
  productId String
  variantId String?
  quantity  Int      @default(1)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user    User            @relation(fields: [userId], references: [id], onDelete: Cascade)
  product Product         @relation(fields: [productId], references: [id], onDelete: Cascade)
  variant ProductVariant? @relation(fields: [variantId], references: [id], onDelete: Cascade)

  @@unique([userId, productId, variantId])
  @@index([userId])
  @@index([productId])
}

model WishlistItem {
  id        String   @id @default(cuid())
  userId    String
  productId String
  createdAt DateTime @default(now())

  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([userId, productId])
  @@index([userId])
  @@index([productId])
}

// ============================================
// ORDERS & PAYMENTS
// ============================================

model Order {
  id                String      @id @default(cuid())
  orderNumber       String      @unique
  userId            String?
  email             String
  status            OrderStatus @default(PENDING)
  paymentStatus     PaymentStatus @default(PENDING)
  fulfillmentStatus FulfillmentStatus @default(UNFULFILLED)

  // Amounts
  subtotal          Decimal     @db.Decimal(10,2)
  tax               Decimal     @db.Decimal(10,2)
  shipping          Decimal     @db.Decimal(10,2)
  discount          Decimal     @default(0) @db.Decimal(10,2)
  total             Decimal     @db.Decimal(10,2)

  // Stripe
  stripePaymentIntentId String?  @unique
  stripeCustomerId      String?

  // Addresses
  shippingAddressId String?
  billingAddressId  String?

  // Metadata
  customerNote      String?    @db.Text
  internalNote      String?    @db.Text
  ipAddress         String?
  userAgent         String?

  createdAt         DateTime   @default(now())
  updatedAt         DateTime   @updatedAt

  user             User?     @relation(fields: [userId], references: [id])
  items            OrderItem[]
  shippingAddress  Address?  @relation("ShippingAddress", fields: [shippingAddressId], references: [id])
  billingAddress   Address?  @relation("BillingAddress", fields: [billingAddressId], references: [id])
  discountCode     DiscountCode? @relation(fields: [discountCodeId], references: [id])
  discountCodeId   String?

  @@index([userId])
  @@index([orderNumber])
  @@index([email])
  @@index([status])
  @@index([createdAt])
}

enum OrderStatus {
  PENDING
  CONFIRMED
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
  REFUNDED
}

enum PaymentStatus {
  PENDING
  PAID
  FAILED
  REFUNDED
  PARTIALLY_REFUNDED
}

enum FulfillmentStatus {
  UNFULFILLED
  PARTIALLY_FULFILLED
  FULFILLED
}

model OrderItem {
  id              String   @id @default(cuid())
  orderId         String
  productId       String
  variantId       String?
  quantity        Int
  price           Decimal  @db.Decimal(10,2)
  total           Decimal  @db.Decimal(10,2)
  productSnapshot Json     // Store product details at time of purchase
  createdAt       DateTime @default(now())

  order   Order           @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product Product         @relation(fields: [productId], references: [id])
  variant ProductVariant? @relation(fields: [variantId], references: [id])

  @@index([orderId])
  @@index([productId])
}

model Address {
  id           String   @id @default(cuid())
  userId       String
  firstName    String
  lastName     String
  company      String?
  address1     String
  address2     String?
  city         String
  state        String?
  postalCode   String
  country      String
  phone        String?
  isDefault    Boolean  @default(false)
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt

  user           User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  shippingOrders Order[] @relation("ShippingAddress")
  billingOrders  Order[] @relation("BillingAddress")

  @@index([userId])
}

// ============================================
// DISCOUNTS & PROMOTIONS
// ============================================

model DiscountCode {
  id              String      @id @default(cuid())
  code            String      @unique
  type            DiscountType
  value           Decimal     @db.Decimal(10,2)
  minOrderAmount  Decimal?    @db.Decimal(10,2)
  maxUses         Int?
  usedCount       Int         @default(0)
  startsAt        DateTime?
  endsAt          DateTime?
  isActive        Boolean     @default(true)
  createdAt       DateTime    @default(now())
  updatedAt       DateTime    @updatedAt

  orders Order[]

  @@index([code])
  @@index([isActive])
}

enum DiscountType {
  PERCENTAGE
  FIXED_AMOUNT
  FREE_SHIPPING
}

// ============================================
// REVIEWS & RATINGS
// ============================================

model Review {
  id        String   @id @default(cuid())
  userId    String
  productId String
  rating    Int      // 1-5
  title     String?
  comment   String?  @db.Text
  isVerified Boolean @default(false)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  user    User    @relation(fields: [userId], references: [id], onDelete: Cascade)
  product Product @relation(fields: [productId], references: [id], onDelete: Cascade)

  @@unique([userId, productId])
  @@index([productId])
  @@index([rating])
}

// ============================================
// ANALYTICS & TRACKING
// ============================================

model PageView {
  id        String   @id @default(cuid())
  path      String
  userId    String?
  sessionId String?
  userAgent String?
  referrer  String?
  createdAt DateTime @default(now())

  @@index([path])
  @@index([userId])
  @@index([createdAt])
}
```

### 4.2 Database Indexes Strategy

```typescript
// Key indexes for performance
// - User lookups by email (auth)
// - Product lookups by slug (SEO-friendly URLs)
// - Order lookups by orderNumber (customer service)
// - Category hierarchy traversal
// - Product filtering by category, tags, price range
// - Order analytics by date range
```

---

## 5. API Design

### 5.1 RESTful API Endpoints

#### **Products API**

```typescript
// GET /api/products
// Query params: ?page=1&limit=20&category=shoes&minPrice=0&maxPrice=100&sort=price_asc
type GetProductsResponse = {
  products: Product[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  filters: {
    categories: Category[]
    priceRange: { min: number; max: number }
  }
}

// GET /api/products/[slug]
type GetProductResponse = {
  product: Product & {
    category: Category
    variants: ProductVariant[]
    reviews: Review[]
    averageRating: number
    reviewCount: number
  }
  relatedProducts: Product[]
}

// POST /api/products (Admin only)
type CreateProductRequest = {
  name: string
  slug: string
  description: string
  price: number
  categoryId: string
  images: string[]
  inventory: number
  // ... other fields
}

// PATCH /api/products/[id] (Admin only)
// DELETE /api/products/[id] (Admin only)
```

#### **Cart API**

```typescript
// GET /api/cart
type GetCartResponse = {
  items: (CartItem & {
    product: Product
    variant?: ProductVariant
  })[]
  subtotal: number
  itemCount: number
}

// POST /api/cart/items
type AddToCartRequest = {
  productId: string
  variantId?: string
  quantity: number
}

// PATCH /api/cart/items/[id]
type UpdateCartItemRequest = {
  quantity: number
}

// DELETE /api/cart/items/[id]
```

#### **Orders API**

```typescript
// GET /api/orders
type GetOrdersResponse = {
  orders: Order[]
  pagination: PaginationMeta
}

// GET /api/orders/[id]
type GetOrderResponse = {
  order: Order & {
    items: (OrderItem & { product: Product })[]
    shippingAddress: Address
    billingAddress: Address
  }
}

// POST /api/orders (Checkout)
type CreateOrderRequest = {
  items: { productId: string; variantId?: string; quantity: number }[]
  shippingAddressId: string
  billingAddressId: string
  discountCode?: string
  paymentMethodId: string
}

type CreateOrderResponse = {
  order: Order
  clientSecret: string // Stripe payment intent
}

// PATCH /api/orders/[id]/status (Admin only)
type UpdateOrderStatusRequest = {
  status: OrderStatus
  fulfillmentStatus?: FulfillmentStatus
  trackingNumber?: string
  internalNote?: string
}
```

#### **Payments API**

```typescript
// POST /api/payments/create-intent
type CreatePaymentIntentRequest = {
  amount: number
  currency: string
  orderId: string
}

type CreatePaymentIntentResponse = {
  clientSecret: string
  paymentIntentId: string
}

// POST /api/payments/webhook (Stripe webhooks)
// Handles: payment_intent.succeeded, payment_intent.failed, etc.
```

#### **Admin API**

```typescript
// GET /api/admin/analytics
type GetAnalyticsResponse = {
  revenue: {
    total: number
    thisMonth: number
    lastMonth: number
    percentageChange: number
  }
  orders: {
    total: number
    pending: number
    processing: number
    completed: number
  }
  products: {
    total: number
    lowStock: number
    outOfStock: number
  }
  customers: {
    total: number
    newThisMonth: number
  }
  topProducts: (Product & { totalSales: number })[]
  recentOrders: Order[]
}

// GET /api/admin/orders
// Query: ?status=pending&page=1&limit=50&search=order123

// GET /api/admin/customers
// Query: ?page=1&limit=50&search=john@example.com
```

### 5.2 Server Actions

```typescript
// actions/cart.actions.ts
'use server'

export async function addToCart(
  productId: string,
  variantId: string | null,
  quantity: number
) {
  const session = await auth()
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  await CartService.addItem(session.user.id, productId, variantId, quantity)
  revalidatePath('/cart')

  return { success: true }
}

export async function removeFromCart(cartItemId: string) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')

  await CartService.removeItem(session.user.id, cartItemId)
  revalidatePath('/cart')

  return { success: true }
}

// actions/order.actions.ts
export async function createOrder(data: CreateOrderData) {
  const session = await auth()
  if (!session?.user?.id) throw new Error('Unauthorized')

  const order = await OrderService.create(session.user.id, data)
  const paymentIntent = await PaymentService.createIntent(order)

  revalidatePath('/orders')

  return { order, clientSecret: paymentIntent.client_secret }
}
```

### 5.3 API Error Handling

```typescript
// lib/api-error.ts
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public code?: string
  ) {
    super(message)
  }
}

// Standardized error responses
type ErrorResponse = {
  error: {
    message: string
    code?: string
    field?: string
  }
}

// Example usage in API route
export async function GET(request: NextRequest) {
  try {
    const products = await ProductService.getAll()
    return NextResponse.json({ products })
  } catch (error) {
    if (error instanceof ApiError) {
      return NextResponse.json(
        { error: { message: error.message, code: error.code } },
        { status: error.statusCode }
      )
    }
    return NextResponse.json(
      { error: { message: 'Internal server error' } },
      { status: 500 }
    )
  }
}
```

---

## 6. Security Architecture

### 6.1 Authentication Flow

```
┌──────────┐         ┌──────────┐         ┌──────────┐
│  Client  │         │ Next.js  │         │ Database │
└────┬─────┘         └────┬─────┘         └────┬─────┘
     │                    │                     │
     │ 1. POST /api/auth/ │                     │
     │    signin          │                     │
     ├───────────────────>│                     │
     │                    │ 2. Verify credentials│
     │                    ├────────────────────>│
     │                    │                     │
     │                    │ 3. User data        │
     │                    │<────────────────────┤
     │                    │                     │
     │                    │ 4. Create session   │
     │                    ├────────────────────>│
     │                    │                     │
     │ 5. Set cookie      │                     │
     │    (httpOnly)      │                     │
     │<───────────────────┤                     │
     │                    │                     │
     │ 6. Authenticated   │                     │
     │    requests        │                     │
     ├───────────────────>│                     │
     │                    │ 7. Validate session │
     │                    ├────────────────────>│
     │                    │                     │
```

### 6.2 Security Measures

#### **Authentication Security**
- Passwords hashed with bcrypt (cost factor 12)
- Session tokens: cryptographically secure, httpOnly cookies
- CSRF protection via double-submit cookie pattern
- Rate limiting on auth endpoints (5 attempts per 15 min)
- Email verification required for new accounts
- Password requirements: 8+ chars, uppercase, lowercase, number

#### **Authorization**
```typescript
// lib/auth-guards.ts
export async function requireAuth() {
  const session = await auth()
  if (!session?.user) {
    throw new ApiError(401, 'Unauthorized')
  }
  return session.user
}

export async function requireAdmin() {
  const user = await requireAuth()
  if (user.role !== 'ADMIN' && user.role !== 'SUPER_ADMIN') {
    throw new ApiError(403, 'Forbidden')
  }
  return user
}

// Usage in API route
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await requireAdmin() // Throws if not admin
  await ProductService.delete(params.id)
  return NextResponse.json({ success: true })
}
```

#### **Data Security**
- Input validation using Zod schemas
- SQL injection prevention via Prisma (parameterized queries)
- XSS protection via React's automatic escaping
- Content Security Policy (CSP) headers
- Secure file upload validation (file type, size, malware scan)

#### **Payment Security**
- PCI DSS compliance via Stripe (no card data touches our servers)
- Stripe Elements for secure card input
- Webhook signature verification
- Idempotency keys for payment operations

#### **API Security**
```typescript
// middleware.ts
import { NextRequest } from 'next/server'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(10, '10 s'),
})

export async function middleware(request: NextRequest) {
  // Rate limiting
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const ip = request.ip ?? 'anonymous'
    const { success } = await ratelimit.limit(ip)

    if (!success) {
      return new Response('Rate limit exceeded', { status: 429 })
    }
  }

  // CSRF protection
  // Session validation
  // ... more middleware logic
}
```

### 6.3 Environment Variables Security

```typescript
// config/env.ts
import { z } from 'zod'

const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),

  // Auth
  NEXTAUTH_URL: z.string().url(),
  NEXTAUTH_SECRET: z.string().min(32),

  // OAuth
  GOOGLE_CLIENT_ID: z.string().optional(),
  GOOGLE_CLIENT_SECRET: z.string().optional(),
  GITHUB_CLIENT_ID: z.string().optional(),
  GITHUB_CLIENT_SECRET: z.string().optional(),

  // Stripe
  STRIPE_SECRET_KEY: z.string().startsWith('sk_'),
  STRIPE_WEBHOOK_SECRET: z.string().startsWith('whsec_'),
  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY: z.string().startsWith('pk_'),

  // Email
  RESEND_API_KEY: z.string(),

  // Upload
  UPLOADTHING_SECRET: z.string(),
  UPLOADTHING_APP_ID: z.string(),
})

export const env = envSchema.parse(process.env)
```

---

## 7. Deployment Architecture

### 7.1 Production Deployment (Vercel)

```yaml
# Recommended production stack
Frontend: Vercel (serverless Next.js)
Database: Neon (serverless Postgres)
Redis: Upstash (serverless Redis)
Storage: UploadThing
Email: Resend
Monitoring: Sentry + Vercel Analytics

# Environment setup
- Production environment
- Preview environments (per PR)
- Development environment (local)
```

### 7.2 Docker Containerization

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy dependency files
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build Next.js
ENV NEXT_TELEMETRY_DISABLED 1
RUN pnpm build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy built assets
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

```yaml
# docker-compose.yml (for local development)
version: '3.8'

services:
  postgres:
    image: postgres:15-alpine
    environment:
      POSTGRES_USER: ecommerce
      POSTGRES_PASSWORD: ecommerce
      POSTGRES_DB: ecommerce
    ports:
      - '5432:5432'
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - '6379:6379'
    volumes:
      - redis_data:/data

  app:
    build: .
    ports:
      - '3000:3000'
    environment:
      DATABASE_URL: postgresql://ecommerce:ecommerce@postgres:5432/ecommerce
      REDIS_URL: redis://redis:6379
    depends_on:
      - postgres
      - redis

volumes:
  postgres_data:
  redis_data:
```

### 7.3 CI/CD Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
        with:
          version: 9
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm lint

  type-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm tsc --noEmit

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm test

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: npx playwright install --with-deps
      - run: pnpm test:e2e

  build:
    runs-on: ubuntu-latest
    needs: [lint, type-check, test]
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v2
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: 'pnpm'
      - run: pnpm install --frozen-lockfile
      - run: pnpm build
```

---

## 8. Scalability & Performance

### 8.1 Caching Strategy

```typescript
// lib/cache.ts
import { unstable_cache } from 'next/cache'
import { Redis } from '@upstash/redis'

const redis = Redis.fromEnv()

// React Cache (in-memory, per-request)
export const getCachedProducts = unstable_cache(
  async () => {
    return await prisma.product.findMany({
      where: { isActive: true },
      include: { category: true },
    })
  },
  ['products'],
  { revalidate: 3600, tags: ['products'] }
)

// Redis Cache (shared, persistent)
export async function getCachedProduct(slug: string) {
  const cacheKey = `product:${slug}`

  // Try cache first
  const cached = await redis.get(cacheKey)
  if (cached) return cached

  // Fetch from DB
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true, variants: true },
  })

  // Cache for 1 hour
  await redis.set(cacheKey, product, { ex: 3600 })

  return product
}

// Cache invalidation
export async function invalidateProductCache(slug: string) {
  await redis.del(`product:${slug}`)
  revalidateTag('products')
}
```

### 8.2 Database Optimization

```typescript
// Indexes for common queries
// - Products by category: @index([categoryId])
// - Products by slug: @index([slug])
// - Orders by user: @index([userId])
// - Orders by date: @index([createdAt])

// Connection pooling
// prisma/schema.prisma
// datasource db {
//   provider = "postgresql"
//   url      = env("DATABASE_URL")
//   connectionLimit = 10
// }

// Query optimization examples
// Bad: N+1 queries
const products = await prisma.product.findMany()
for (const product of products) {
  const category = await prisma.category.findUnique({
    where: { id: product.categoryId }
  })
}

// Good: Single query with include
const products = await prisma.product.findMany({
  include: { category: true }
})
```

### 8.3 Performance Budgets

```typescript
// next.config.ts
const config = {
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },

  // Bundle analysis
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Vendor chunk for node_modules
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Common chunk for shared code
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'async',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      }
    }
    return config
  },
}
```

---

## 9. Monitoring & Observability

### 9.1 Error Tracking (Sentry)

```typescript
// lib/sentry.ts
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,

  // Filter out sensitive data
  beforeSend(event) {
    // Remove cookies, auth headers, etc.
    if (event.request?.cookies) {
      delete event.request.cookies
    }
    return event
  },
})

// Usage in API routes
export async function POST(request: NextRequest) {
  try {
    // ... operation
  } catch (error) {
    Sentry.captureException(error, {
      tags: { route: '/api/products' },
      user: { id: userId },
    })
    throw error
  }
}
```

### 9.2 Logging Strategy

```typescript
// lib/logger.ts
import pino from 'pino'

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  formatters: {
    level: (label) => {
      return { level: label }
    },
  },
  // Redact sensitive fields
  redact: {
    paths: ['password', 'token', 'apiKey'],
    remove: true,
  },
})

// Usage
logger.info({ userId, productId }, 'Product purchased')
logger.error({ error, userId }, 'Payment failed')
```

### 9.3 Analytics & Metrics

```typescript
// lib/analytics.ts
export async function trackEvent(
  event: string,
  properties: Record<string, any>
) {
  // PostHog, Mixpanel, or custom analytics
  await fetch('https://analytics-endpoint.com/track', {
    method: 'POST',
    body: JSON.stringify({
      event,
      properties,
      timestamp: new Date().toISOString(),
    }),
  })
}

// Usage
await trackEvent('product_viewed', {
  productId: product.id,
  productName: product.name,
  category: product.category.name,
})

await trackEvent('order_completed', {
  orderId: order.id,
  total: order.total,
  itemCount: order.items.length,
})
```

---

## 10. Development Workflow

### 10.1 Local Development Setup

```bash
# 1. Clone repository
git clone https://github.com/yourusername/ecommerce-boilerplate.git
cd ecommerce-boilerplate

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env.local
# Edit .env.local with your values

# 4. Start database (Docker)
docker-compose up -d postgres redis

# 5. Run database migrations
pnpm prisma migrate dev

# 6. Seed database (optional)
pnpm prisma db seed

# 7. Start development server
pnpm dev

# Open http://localhost:3000
```

### 10.2 Git Workflow

```
main (production)
  ├── develop (staging)
      ├── feature/add-wishlist
      ├── feature/admin-analytics
      └── bugfix/cart-quantity
```

### 10.3 Code Quality Tools

```json
// .eslintrc.json
{
  "extends": [
    "next/core-web-vitals",
    "plugin:@typescript-eslint/recommended",
    "prettier"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  }
}

// .prettierrc
{
  "semi": false,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 80
}

// .husky/pre-commit
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

pnpm lint-staged

// lint-staged.config.js
module.exports = {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{json,md}': ['prettier --write'],
}
```

---

## 11. Conclusion

This system design provides a comprehensive blueprint for building a production-ready fullstack ecommerce boilerplate. Key takeaways:

- **Modern Tech Stack**: Next.js 15, React 19, TypeScript, Prisma, Tailwind CSS
- **Scalable Architecture**: Serverless-first, with caching and optimization
- **Developer Experience**: Type-safe, well-tested, easy to customize
- **Production-Ready**: Security, monitoring, CI/CD built-in
- **Open Source**: MIT license, community-driven

**Next Steps:**
1. Review and approve this design
2. Set up project structure
3. Implement core features (auth, products, cart)
4. Add payment integration
5. Build admin dashboard
6. Write tests and documentation
7. Deploy to production

---

**Document Owner**: Daniel Park
**Last Updated**: October 10, 2025
**Status**: Ready for Implementation Review
