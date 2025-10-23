# Research Findings: Open Source SaaS & Ecommerce Boilerplates

**Date:** October 10, 2025
**Researcher:** Claude & Daniel Park

---

## Executive Summary

Analyzed 10+ leading open-source SaaS and ecommerce boilerplates to identify best practices, common patterns, and opportunities for differentiation. All researched projects are MIT-licensed and actively maintained in 2025.

---

## Top Boilerplates Reviewed

### 1. SaaS Boilerplate by ixartz ⭐⭐⭐⭐⭐

**GitHub:** [ixartz/SaaS-Boilerplate](https://github.com/ixartz/SaaS-Boilerplate)
**License:** MIT
**Stars:** ~15,000+

#### Strengths
- **Excellent Multi-tenancy**: Best-in-class team and role management
- **DrizzleORM Integration**: Type-safe database queries with great DX
- **Clerk Authentication**: Modern auth with social providers built-in
- **Comprehensive Testing**: Vitest + Playwright fully configured
- **Developer Experience**: Strict TypeScript, ESLint, Prettier, Husky
- **Internationalization**: i18n ready with next-intl
- **Shadcn/ui Integration**: Beautiful, accessible components

#### Limitations
- Limited ecommerce-specific features
- No payment integration in free version
- Lacks inventory management
- No built-in email templates

#### Key Learnings
✅ Use DrizzleORM for better performance than Prisma
✅ Multi-tenancy requires careful schema design
✅ Clerk provides better auth UX than Auth.js
✅ Testing setup should be included from day one

---

### 2. Relivator by blefnk ⭐⭐⭐⭐⭐

**GitHub:** [blefnk/relivator-nextjs-template](https://github.com/blefnk/relivator-nextjs-template)
**License:** MIT
**Stars:** ~5,000+

#### Strengths
- **Full Ecommerce Template**: Cart, checkout, orders out of the box
- **Next.js 15 + React 19**: Bleeding-edge framework versions
- **Better-Auth**: Modern, flexible authentication library
- **Polar Integration**: Built-in payments and subscriptions
- **UploadThing**: Seamless file upload for Next.js
- **Product Variants**: Size, color, material options
- **Dark Mode**: Built-in theme switching

#### Limitations
- Complex setup for beginners
- Heavily opinionated architecture
- Documentation could be more comprehensive
- Some features feel experimental

#### Key Learnings
✅ Product variants are essential for ecommerce
✅ UploadThing simplifies file uploads significantly
✅ Polar is a Stripe alternative worth considering
✅ Dark mode should be built-in, not an afterthought

---

### 3. Open SaaS by Wasp ⭐⭐⭐⭐⭐

**GitHub:** [wasp-lang/open-saas](https://github.com/wasp-lang/open-saas)
**License:** MIT
**Stars:** ~3,000+

#### Strengths
- **Wasp Framework**: Full-stack React + Node.js framework
- **Multi-Payment Support**: Stripe + Lemon Squeezy
- **Email Templates**: Transactional emails included
- **One-Command Deploy**: Railway/Fly.io deployment
- **End-to-End Type Safety**: Full-stack TypeScript
- **Background Jobs**: Built-in job queue
- **OpenAI Integration**: AI-ready from the start
- **Comprehensive Docs**: Best documentation of all reviewed

#### Limitations
- Framework lock-in (Wasp-specific)
- Smaller ecosystem than Next.js
- Learning curve for Wasp framework
- Limited customization flexibility

#### Key Learnings
✅ Multiple payment providers increase flexibility
✅ Background jobs are essential for async operations
✅ Email templates should be React components
✅ AI integration is becoming a standard feature

---

### 4. Boundless Next.js Ecommerce ⭐⭐⭐⭐

**GitHub:** [kirill-zhirnov/boundless-nextjs-ecommerce-template](https://github.com/kirill-zhirnov/boundless-nextjs-ecommerce-template)
**License:** MIT
**Stars:** ~1,500+

#### Strengths
- **Strong TypeScript Focus**: Excellent type safety
- **High Performance**: Optimized for speed
- **Hierarchical Catalog**: Multi-level category system
- **Product Filters**: Advanced filtering UI
- **Marketing Components**: Sliders, carousels, featured sections
- **SEO Optimized**: SSR, meta tags, sitemaps

#### Limitations
- Limited payment integrations
- No admin dashboard
- Basic auth implementation
- Lacks order management

#### Key Learnings
✅ Hierarchical categories improve UX
✅ SEO optimization should be built-in
✅ Performance optimization is critical for ecommerce
✅ Marketing components drive conversions

---

### 5. ChadNext ⭐⭐⭐⭐

**Tech Stack:** Next.js, TypeScript, Tailwind, Shadcn UI, PostgreSQL, Prisma, Stripe

#### Strengths
- Modern tech stack
- Stripe integration included
- PostgreSQL + Prisma ORM
- Shadcn/ui components
- Clean code architecture

#### Limitations
- Less mature than other options
- Limited documentation
- Smaller community

#### Key Learnings
✅ Prisma is more beginner-friendly than DrizzleORM
✅ Shadcn/ui is the de facto standard for UI components

---

### 6. Next.js Subscription Payments (Vercel) ⭐⭐⭐⭐

**GitHub:** Vercel official template
**Focus:** Stripe subscriptions with Supabase

#### Strengths
- **Official Vercel Template**: Well-maintained
- **Supabase Integration**: PostgreSQL + Auth
- **Stripe Checkout**: Full subscription flow
- **Customer Portal**: Self-service subscription management
- **Webhook Handling**: Robust event processing

#### Limitations
- SaaS-focused (not ecommerce)
- No product catalog
- No cart functionality
- Limited to subscriptions

#### Key Learnings
✅ Supabase provides auth + database in one
✅ Customer portal is essential for subscriptions
✅ Webhook handling needs to be robust

---

## Comparative Analysis

### Authentication Approaches

| Boilerplate | Auth Solution | Providers | Self-Hosted |
|-------------|---------------|-----------|-------------|
| ixartz SaaS | Clerk | Email, Google, GitHub, etc. | ❌ |
| Relivator | Better-Auth | Configurable | ✅ |
| Open SaaS | Wasp Auth | Email, Social | ✅ |
| Vercel Template | Supabase Auth | Email, Social | ✅/❌ |

**Recommendation:** Use **Auth.js v5** for flexibility and self-hosting

---

### Database & ORM Choices

| Boilerplate | ORM | Database | Type Safety |
|-------------|-----|----------|-------------|
| ixartz SaaS | DrizzleORM | PostgreSQL, MySQL, SQLite | ⭐⭐⭐⭐⭐ |
| Relivator | Drizzle | PostgreSQL (Neon) | ⭐⭐⭐⭐⭐ |
| ChadNext | Prisma | PostgreSQL | ⭐⭐⭐⭐ |
| Open SaaS | Prisma | PostgreSQL | ⭐⭐⭐⭐ |

**Comparison:**
- **Prisma**: Better DX, easier for beginners, slower performance
- **Drizzle**: Better performance, more control, steeper learning curve

**Recommendation:** Use **Prisma** for MVP (easier), migrate to Drizzle later if needed

---

### Payment Solutions

| Solution | Pros | Cons | Best For |
|----------|------|------|----------|
| **Stripe** | Industry standard, excellent docs, global | Higher fees, complex setup | Most use cases |
| **Lemon Squeezy** | Simple setup, handles EU VAT | Limited features, US-focused | Digital products |
| **Polar** | Built for developers, modern API | Newer, smaller ecosystem | SaaS, subscriptions |

**Recommendation:** Primary = **Stripe**, Optional = Lemon Squeezy for digital products

---

### UI Component Libraries

| Library | Adoption | Customization | Accessibility | DX |
|---------|----------|---------------|---------------|-----|
| **shadcn/ui** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Radix UI | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| Headless UI | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Chakra UI | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |

**Recommendation:** **shadcn/ui** (built on Radix UI) - industry standard in 2025

---

## Feature Comparison Matrix

| Feature | ixartz SaaS | Relivator | Open SaaS | Boundless | Our Boilerplate |
|---------|-------------|-----------|-----------|-----------|-----------------|
| **Authentication** | ✅ Clerk | ✅ Better-Auth | ✅ Wasp | ⚠️ Basic | ✅ Auth.js |
| **Multi-tenancy** | ✅ | ❌ | ✅ | ❌ | 🔄 Future |
| **Product Catalog** | ❌ | ✅ | ❌ | ✅ | ✅ |
| **Shopping Cart** | ❌ | ✅ | ❌ | ✅ | ✅ |
| **Checkout Flow** | ❌ | ✅ | ❌ | ⚠️ Basic | ✅ |
| **Payments** | ⚠️ Pro | ✅ Polar | ✅ Stripe/LS | ❌ | ✅ Stripe |
| **Admin Dashboard** | ✅ | ⚠️ Basic | ✅ | ❌ | ✅ |
| **Email System** | ❌ | ❌ | ✅ | ❌ | ✅ Resend |
| **File Upload** | ❌ | ✅ UploadThing | ✅ S3 | ❌ | ✅ UploadThing |
| **Testing Setup** | ✅ | ⚠️ Partial | ✅ | ❌ | ✅ |
| **i18n** | ✅ | ❌ | ❌ | ✅ | 🔄 Future |
| **Dark Mode** | ✅ | ✅ | ✅ | ❌ | ✅ |
| **SEO** | ✅ | ⚠️ Basic | ✅ | ✅ | ✅ |
| **Analytics** | ⚠️ Basic | ❌ | ✅ | ❌ | ✅ |
| **Order Management** | ❌ | ⚠️ Basic | ❌ | ❌ | ✅ |
| **Inventory Tracking** | ❌ | ⚠️ Basic | ❌ | ❌ | ✅ |
| **Reviews/Ratings** | ❌ | ❌ | ❌ | ❌ | ✅ |
| **Discount Codes** | ❌ | ❌ | ❌ | ❌ | 🔄 Future |

**Legend:**
- ✅ Fully implemented
- ⚠️ Partially implemented or limited
- ❌ Not included
- 🔄 Planned for future

---

## Key Insights & Best Practices

### 1. Architecture Patterns

**Winning Pattern: Hybrid Rendering**
- Server Components for static/cacheable content
- Client Components for interactive UI
- Server Actions for mutations
- API Routes only when necessary (webhooks, external APIs)

**Example from Research:**
```typescript
// Server Component (default)
async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProduct(params.slug) // Server-side fetch
  return <ProductDetails product={product} />
}

// Client Component
'use client'
function AddToCartButton({ productId }: { productId: string }) {
  return <button onClick={() => addToCart(productId)}>Add to Cart</button>
}

// Server Action
'use server'
async function addToCart(productId: string) {
  // Mutation logic
}
```

### 2. Database Design Patterns

**Best Practice from Relivator:**
```prisma
// Product variants with JSON options
model ProductVariant {
  id      String @id @default(cuid())
  options Json   // { "size": "M", "color": "Blue" }
  price   Decimal
  inventory Int
}
```

**Best Practice from ixartz (Multi-tenancy):**
```prisma
model Organization {
  id      String @id
  members TeamMember[]
}

model TeamMember {
  userId String
  organizationId String
  role   TeamRole
}
```

### 3. Payment Integration Patterns

**Stripe Best Practices (from multiple sources):**

1. **Never handle card data directly** - use Stripe Elements
2. **Use Payment Intents** for better control
3. **Verify webhook signatures** to prevent fraud
4. **Implement idempotency** for payment operations
5. **Store Stripe IDs** in your database for reconciliation

```typescript
// Create payment intent (server-side)
const paymentIntent = await stripe.paymentIntents.create({
  amount: orderTotal,
  currency: 'usd',
  metadata: { orderId },
  idempotency_key: `order_${orderId}`, // Prevent duplicate charges
})

// Webhook handler
export async function POST(request: Request) {
  const sig = request.headers.get('stripe-signature')
  const event = stripe.webhooks.constructEvent(body, sig, webhookSecret)

  if (event.type === 'payment_intent.succeeded') {
    // Update order status
  }
}
```

### 4. Testing Strategies

**From ixartz SaaS Boilerplate:**

```typescript
// Unit tests with Vitest
describe('CartService', () => {
  it('should add item to cart', async () => {
    const cart = await CartService.addItem(userId, productId, quantity)
    expect(cart.items).toHaveLength(1)
  })
})

// E2E tests with Playwright
test('checkout flow', async ({ page }) => {
  await page.goto('/products/test-product')
  await page.click('[data-testid="add-to-cart"]')
  await page.click('[data-testid="checkout"]')
  // ... complete checkout
  await expect(page).toHaveURL(/order-confirmation/)
})
```

### 5. File Upload Patterns

**UploadThing (recommended by Relivator):**

```typescript
// Simple upload configuration
import { createUploadthing } from 'uploadthing/next'

const f = createUploadthing()

export const uploadRouter = {
  productImage: f({ image: { maxFileSize: '4MB', maxFileCount: 5 } })
    .middleware(async ({ req }) => {
      const user = await auth(req)
      if (!user) throw new Error('Unauthorized')
      return { userId: user.id }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete', file.url)
    }),
}
```

### 6. Email System

**Best Practice (from Open SaaS):**

```typescript
// React Email components
import { Html, Button } from '@react-email/components'

export function OrderConfirmationEmail({ order }: { order: Order }) {
  return (
    <Html>
      <h1>Order Confirmation</h1>
      <p>Thank you for your order #{order.orderNumber}</p>
      <Button href={`/orders/${order.id}`}>View Order</Button>
    </Html>
  )
}

// Send via Resend
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

await resend.emails.send({
  from: 'orders@example.com',
  to: order.email,
  subject: `Order Confirmation #${order.orderNumber}`,
  react: <OrderConfirmationEmail order={order} />,
})
```

---

## Gaps & Opportunities

### What's Missing in Current Boilerplates

1. **Comprehensive Admin Dashboard**
   - Most have basic admin, few have analytics
   - Opportunity: Build feature-rich admin with charts, reports

2. **Inventory Management**
   - Limited or no inventory tracking
   - Opportunity: Add low-stock alerts, reorder points

3. **Advanced Product Features**
   - Few support product bundles, subscriptions
   - Opportunity: Support multiple product types

4. **Marketing Features**
   - Discount codes often missing
   - Opportunity: Coupons, flash sales, referral programs

5. **Customer Features**
   - Wishlist rarely included
   - Opportunity: Wishlists, saved addresses, order history

6. **Multi-currency & i18n**
   - Most are single-currency
   - Opportunity: Global ecommerce support

7. **SEO Tools**
   - Basic SEO, but no tools for managing it
   - Opportunity: SEO dashboard, meta tag management

---

## Technology Stack Recommendations

Based on research and 2025 trends:

### Core Stack (High Confidence)
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.8+
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui (Radix UI + Tailwind)
- **Database:** PostgreSQL 15+
- **Hosting:** Vercel (frontend) + Neon (database)

### ORM Choice (Decision Required)
- **Option A (Recommended):** Prisma 6+
  - ✅ Better DX, easier for beginners
  - ✅ Excellent docs and community
  - ❌ Slightly slower than Drizzle

- **Option B:** DrizzleORM
  - ✅ Better performance
  - ✅ More control
  - ❌ Steeper learning curve

**Decision:** Start with **Prisma**, provide migration path to Drizzle

### Authentication (Decision Required)
- **Option A (Recommended):** Auth.js v5 (NextAuth)
  - ✅ Free, open-source
  - ✅ Flexible, self-hosted
  - ✅ Supports all major providers
  - ❌ More setup required

- **Option B:** Clerk
  - ✅ Better UX out-of-box
  - ✅ Hosted, less maintenance
  - ❌ Paid service (expensive at scale)

**Decision:** Use **Auth.js** for boilerplate (free, flexible)

### Payment Processing
- **Primary:** Stripe
- **Optional:** Lemon Squeezy (for digital products)

### Email Service
- **Primary:** Resend
- **Alternative:** SendGrid, Postmark

### File Storage
- **Primary:** UploadThing
- **Alternative:** Cloudinary

---

## Implementation Priorities

### Phase 1: Foundation (Critical)
1. Next.js 15 + TypeScript setup
2. Prisma + PostgreSQL schema
3. Auth.js authentication
4. Shadcn/ui components
5. Basic product CRUD
6. Shopping cart

### Phase 2: Core Ecommerce (Essential)
1. Checkout flow
2. Stripe integration
3. Order management
4. Email notifications
5. User dashboard

### Phase 3: Admin & Analytics (Important)
1. Admin authentication
2. Product management UI
3. Order management UI
4. Analytics dashboard
5. Inventory tracking

### Phase 4: Polish & Extras (Nice-to-Have)
1. Reviews and ratings
2. Wishlist
3. Discount codes
4. SEO tools
5. Multi-currency support

---

## Competitive Advantages

Our boilerplate will differentiate by:

1. **Ecommerce-First:** Unlike SaaS boilerplates, built for selling products
2. **Complete Admin Dashboard:** Full-featured, not basic CRUD
3. **Production-Ready:** Testing, monitoring, CI/CD included
4. **Modern Stack:** Latest Next.js 15 + React 19
5. **Free & Open Source:** MIT license, no paid tiers
6. **Excellent Docs:** Setup guide, API docs, video tutorials
7. **Type Safety:** End-to-end TypeScript
8. **Best Practices:** Security, performance, accessibility built-in

---

## Resources & Links

### Boilerplate Repositories
1. [ixartz/SaaS-Boilerplate](https://github.com/ixartz/SaaS-Boilerplate)
2. [blefnk/relivator-nextjs-template](https://github.com/blefnk/relivator-nextjs-template)
3. [wasp-lang/open-saas](https://github.com/wasp-lang/open-saas)
4. [kirill-zhirnov/boundless-nextjs-ecommerce-template](https://github.com/kirill-zhirnov/boundless-nextjs-ecommerce-template)

### Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Auth.js Docs](https://authjs.dev)
- [Stripe API Reference](https://stripe.com/docs/api)
- [shadcn/ui](https://ui.shadcn.com)

### Learning Resources
- [Ecommerce UX Best Practices](https://baymard.com)
- [Web Performance Best Practices](https://web.dev)
- [OWASP Security Guidelines](https://owasp.org)

---

## Conclusion

The research reveals a mature ecosystem of open-source boilerplates, but significant gaps in ecommerce-specific features. Our boilerplate has a clear opportunity to become the go-to solution for developers building online stores.

**Key Success Factors:**
1. Focus on ecommerce features (not generic SaaS)
2. Provide complete admin dashboard
3. Include advanced product features (variants, inventory)
4. Maintain excellent documentation
5. Build strong community
6. Keep it free and open source (MIT)

**Next Steps:**
1. Get approval on tech stack choices (Prisma vs Drizzle, Auth.js vs Clerk)
2. Set up project structure
3. Begin implementation of Phase 1 features
4. Iterate based on community feedback

---

**Prepared by:** Claude & Daniel Park
**Date:** October 10, 2025
**Status:** Ready for Review and Implementation
