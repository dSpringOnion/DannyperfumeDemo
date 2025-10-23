# Fullstack Ecommerce SaaS Boilerplate

A modern, production-ready ecommerce boilerplate with **visual page builder** - built with Next.js 15, React 19, TypeScript, and Tailwind CSS. Launch your online store in days, not months, **no coding required**.

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-blue)](https://www.typescriptlang.org/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

---

## Features

### 🎨 Visual Page Builder (FLAGSHIP FEATURE)
- **Drag-and-Drop Editor**: Build pages visually without coding
- **50+ Pre-built Components**: Product cards, heroes, CTAs, cart, checkout, and more
- **Live Preview**: See changes in real-time across all devices
- **Responsive Controls**: Design for mobile, tablet, and desktop
- **Component Library**: Product, cart, marketing, and layout components
- **Export to Code**: Generate production-ready React components
- **Template System**: Pre-made page templates and component presets
- **No Vendor Lock-in**: Built with open-source Puck + dnd-kit

### Ecommerce Core
- **Product Management**: Full CRUD with variants, categories, tags
- **Shopping Cart**: Persistent cart with real-time updates
- **Checkout**: Multi-step checkout with address validation
- **Orders**: Complete order management and tracking
- **Payments**: Stripe integration with webhooks
- **Inventory**: Real-time stock tracking and alerts
- **Reviews**: Customer reviews and ratings system

### Admin Dashboard
- **Analytics**: Revenue, orders, and customer insights
- **Product Management**: Easy-to-use product editor
- **Order Management**: Update status, process refunds
- **Customer Management**: View customer data and order history
- **Reports**: Export data to CSV

### Authentication & Users
- **Multiple Auth Providers**: Email/password, Google, GitHub
- **Magic Links**: Passwordless authentication
- **Role-Based Access**: Customer, Admin, Super Admin roles
- **User Dashboard**: Order history, saved addresses, wishlist

### Developer Experience
- **Type Safety**: End-to-end TypeScript
- **Modern Stack**: Next.js 15, React 19, Tailwind CSS v4
- **Testing**: Vitest for unit tests, Playwright for E2E
- **Code Quality**: ESLint, Prettier, Husky pre-commit hooks
- **Documentation**: Comprehensive guides and API docs

### Production Ready
- **Security**: CSRF protection, rate limiting, input validation
- **Performance**: Optimized images, caching, code splitting
- **SEO**: Meta tags, sitemaps, structured data
- **Monitoring**: Sentry error tracking, analytics
- **CI/CD**: GitHub Actions workflows

---

## Tech Stack

### Core
- **Framework:** [Next.js 15](https://nextjs.org/) (App Router)
- **Language:** [TypeScript 5.8+](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)

### Database & ORM
- **Database:** [PostgreSQL 15+](https://www.postgresql.org/)
- **ORM:** [Prisma 6](https://www.prisma.io/)
- **Caching:** [Redis](https://redis.io/) (via Upstash)

### Authentication
- **Auth:** [Auth.js v5](https://authjs.dev/) (NextAuth)
- **Providers:** Email/Password, Google, GitHub, Magic Links

### Payments & Email
- **Payments:** [Stripe](https://stripe.com/)
- **Email:** [Resend](https://resend.com/) + [React Email](https://react.email/)
- **File Upload:** [UploadThing](https://uploadthing.com/)

### UI & Components
- **Components:** [shadcn/ui](https://ui.shadcn.com/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Forms:** [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- **State:** [Zustand](https://zustand-demo.pmnd.rs/)

### Visual Builder
- **Page Builder:** [Puck](https://puckeditor.com/) (open-source React visual editor)
- **Drag-Drop:** [dnd-kit](https://dndkit.com/) (modern, accessible drag-and-drop)
- **State:** Zustand for builder state management

### Testing & Quality
- **Unit Tests:** [Vitest](https://vitest.dev/)
- **E2E Tests:** [Playwright](https://playwright.dev/)
- **Linting:** [ESLint](https://eslint.org/)
- **Formatting:** [Prettier](https://prettier.io/)

### DevOps
- **Hosting:** [Vercel](https://vercel.com/) (recommended)
- **Database:** [Neon](https://neon.tech/) (serverless Postgres)
- **Monitoring:** [Sentry](https://sentry.io/)
- **CI/CD:** GitHub Actions

---

## Documentation

### Planning Documents
- **[Documentation Index](./.agent/README.md)** - **START HERE** - Complete guide to all documentation
- **[Product Requirements Document](./.agent/tasks/PRD.md)** - Complete feature specifications, user stories, and requirements
- **[System Design](./.agent/system/SYSTEM_DESIGN.md)** - Architecture, database schema, API design, and technical specifications
- **[Visual Builder Architecture](./.agent/system/VISUAL_BUILDER.md)** - Drag-drop builder design, component library, and AI assistant plans
- **[Research Findings](./.agent/system/RESEARCH_FINDINGS.md)** - Analysis of leading open-source boilerplates and best practices

> **Note for Claude Code:** Read `.agent/README.md` first before planning any features!

### Getting Started
1. [Quick Start Guide](#quick-start)
2. [Environment Setup](#environment-variables)
3. [Database Setup](#database-setup)
4. [Deployment Guide](#deployment)

---

## Quick Start

### Prerequisites
- Node.js 18.18.0 or higher
- pnpm 9.0.0 or higher
- PostgreSQL 15+ (local or hosted)
- Stripe account (for payments)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/ecommerce-boilerplate.git
cd ecommerce-boilerplate

# 2. Install dependencies
pnpm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Set up environment variables (see below)
# Edit .env.local with your values

# 5. Set up database (Docker - recommended for local dev)
docker-compose up -d

# OR use a hosted database (Neon, Supabase, etc.)
# Update DATABASE_URL in .env.local

# 6. Run database migrations
pnpm prisma migrate dev

# 7. Seed database with sample data (optional)
pnpm prisma db seed

# 8. Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the root directory:

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"

# Redis (optional, for caching)
REDIS_URL="redis://localhost:6379"

# Auth (Auth.js)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-min-32-chars" # Generate: openssl rand -base64 32

# OAuth Providers (optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."

# Email (Resend)
RESEND_API_KEY="re_..."
EMAIL_FROM="noreply@yourdomain.com"

# File Upload (UploadThing)
UPLOADTHING_SECRET="sk_..."
UPLOADTHING_APP_ID="..."

# Monitoring (optional)
NEXT_PUBLIC_SENTRY_DSN="https://..."
SENTRY_AUTH_TOKEN="..."

# Analytics (optional)
NEXT_PUBLIC_VERCEL_ANALYTICS_ID="..."
```

### Required Services

1. **Database (PostgreSQL)**
   - Local: Use Docker Compose (included)
   - Hosted: [Neon](https://neon.tech/), [Supabase](https://supabase.com/), [Railway](https://railway.app/)

2. **Stripe Account**
   - Sign up at [stripe.com](https://stripe.com/)
   - Get API keys from Dashboard > Developers > API keys
   - Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`

3. **Resend Account (Email)**
   - Sign up at [resend.com](https://resend.com/)
   - Get API key from Dashboard

4. **UploadThing Account (File Upload)**
   - Sign up at [uploadthing.com](https://uploadthing.com/)
   - Create new app and get credentials

---

## Database Setup

### Using Docker (Recommended for Local Development)

```bash
# Start PostgreSQL and Redis
docker-compose up -d

# Check services are running
docker-compose ps

# View logs
docker-compose logs -f
```

### Using Hosted Database

Update `DATABASE_URL` in `.env.local` with your hosted database URL:

```bash
# Neon
DATABASE_URL="postgresql://user:password@host.neon.tech/dbname?sslmode=require"

# Supabase
DATABASE_URL="postgresql://postgres:password@db.host.supabase.co:5432/postgres"

# Railway
DATABASE_URL="postgresql://postgres:password@containers-us-west-1.railway.app:1234/railway"
```

### Running Migrations

```bash
# Create a new migration
pnpm prisma migrate dev --name your-migration-name

# Apply migrations to production
pnpm prisma migrate deploy

# Reset database (WARNING: deletes all data)
pnpm prisma migrate reset
```

### Seeding Database

```bash
# Seed with sample data
pnpm prisma db seed

# This creates:
# - Sample products
# - Test admin user
# - Product categories
# - Sample orders
```

---

## Available Scripts

```bash
# Development
pnpm dev              # Start dev server on http://localhost:3000
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm format           # Format code with Prettier
pnpm type-check       # Run TypeScript compiler

# Database
pnpm prisma:studio    # Open Prisma Studio (DB GUI)
pnpm prisma:generate  # Generate Prisma client
pnpm prisma:migrate   # Run migrations
pnpm prisma:seed      # Seed database

# Testing
pnpm test             # Run unit tests (Vitest)
pnpm test:watch       # Run tests in watch mode
pnpm test:e2e         # Run E2E tests (Playwright)
pnpm test:e2e:ui      # Run E2E tests with UI

# Code Quality
pnpm lint:fix         # Fix ESLint errors
pnpm format:check     # Check formatting
pnpm format:write     # Fix formatting
```

---

## Project Structure

```
ecommerce-boilerplate/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Auth routes
│   │   ├── (shop)/            # Shop routes
│   │   ├── (dashboard)/       # User dashboard
│   │   ├── (admin)/           # Admin dashboard
│   │   └── api/               # API routes
│   ├── components/            # React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── layout/            # Layout components
│   │   ├── shop/              # Shop components
│   │   └── admin/             # Admin components
│   ├── lib/                   # Core libraries
│   ├── services/              # Business logic
│   ├── repositories/          # Data access
│   ├── actions/               # Server actions
│   ├── hooks/                 # Custom hooks
│   ├── types/                 # TypeScript types
│   └── utils/                 # Utilities
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── migrations/            # DB migrations
├── public/                    # Static assets
├── tests/                     # Test files
├── .github/workflows/         # CI/CD
└── docs/                      # Documentation
```

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your GitHub repository
   - Configure environment variables (see [Environment Variables](#environment-variables))
   - Deploy!

3. **Set up Database**
   - Create Postgres database on [Neon](https://neon.tech/)
   - Update `DATABASE_URL` in Vercel environment variables
   - Run migrations:
     ```bash
     pnpm prisma migrate deploy
     ```

4. **Configure Stripe Webhook**
   - In Vercel, copy your deployment URL
   - In Stripe Dashboard, create webhook pointing to:
     `https://yourdomain.com/api/webhooks/stripe`
   - Copy webhook secret to `STRIPE_WEBHOOK_SECRET` in Vercel

### Deploy to Other Platforms

<details>
<summary>Deploy to Railway</summary>

1. Install Railway CLI
   ```bash
   npm i -g @railway/cli
   ```

2. Login and initialize
   ```bash
   railway login
   railway init
   ```

3. Add PostgreSQL
   ```bash
   railway add --plugin postgresql
   ```

4. Set environment variables
   ```bash
   railway variables set NEXTAUTH_SECRET=your-secret
   # ... add other variables
   ```

5. Deploy
   ```bash
   railway up
   ```
</details>

<details>
<summary>Deploy with Docker</summary>

1. Build image
   ```bash
   docker build -t ecommerce-app .
   ```

2. Run container
   ```bash
   docker run -p 3000:3000 \
     -e DATABASE_URL="your-db-url" \
     -e NEXTAUTH_SECRET="your-secret" \
     ecommerce-app
   ```

3. Or use Docker Compose
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```
</details>

---

## Usage Examples

### Adding a New Product (Admin)

```typescript
// In admin dashboard
const product = await createProduct({
  name: 'Wireless Headphones',
  slug: 'wireless-headphones',
  price: 99.99,
  description: 'Premium noise-cancelling headphones',
  categoryId: 'electronics',
  inventory: 50,
  images: ['https://...'],
})
```

### Creating an Order (Customer)

```typescript
// After checkout
const order = await createOrder({
  items: [
    { productId: 'prod_123', quantity: 2 },
    { productId: 'prod_456', quantity: 1 },
  ],
  shippingAddressId: 'addr_123',
  paymentMethodId: 'pm_123',
})
```

### Processing a Payment

```typescript
// Server action
const paymentIntent = await stripe.paymentIntents.create({
  amount: order.total * 100, // Convert to cents
  currency: 'usd',
  metadata: { orderId: order.id },
})

return { clientSecret: paymentIntent.client_secret }
```

---

## Testing

### Unit Tests

```bash
# Run all unit tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run with coverage
pnpm test:coverage
```

Example test:
```typescript
// tests/services/cart.service.test.ts
import { describe, it, expect } from 'vitest'
import { CartService } from '@/services/cart.service'

describe('CartService', () => {
  it('should add item to cart', async () => {
    const result = await CartService.addItem('user-1', 'product-1', 2)
    expect(result.items).toHaveLength(1)
    expect(result.items[0].quantity).toBe(2)
  })
})
```

### E2E Tests

```bash
# Run E2E tests
pnpm test:e2e

# Run with UI
pnpm test:e2e:ui

# Run specific test
pnpm test:e2e tests/checkout.spec.ts
```

Example E2E test:
```typescript
// tests/e2e/checkout.spec.ts
import { test, expect } from '@playwright/test'

test('complete checkout flow', async ({ page }) => {
  await page.goto('/products/test-product')
  await page.click('[data-testid="add-to-cart"]')
  await page.click('[data-testid="checkout"]')

  // Fill checkout form
  await page.fill('[name="email"]', 'test@example.com')
  // ...

  await page.click('[data-testid="place-order"]')
  await expect(page).toHaveURL(/order-confirmation/)
})
```

---

## Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

## Roadmap

### Current Status: Planning Phase

- [x] Research existing boilerplates
- [x] Create PRD and system design
- [ ] Set up project structure
- [ ] Implement authentication
- [ ] Build product catalog
- [ ] Add shopping cart
- [ ] Integrate payments
- [ ] Create admin dashboard
- [ ] Write tests
- [ ] Deploy to production

### Future Features

- [ ] Visual Builder Phase 1 (Weeks 7-8)
- [ ] Visual Builder Phase 2 - Component Library (Weeks 9-10)
- [ ] AI Assistant for component generation
- [ ] Multi-currency support
- [ ] Internationalization (i18n)
- [ ] Subscription products
- [ ] Discount/coupon system
- [ ] Advanced analytics
- [ ] Mobile app (React Native)
- [ ] Multi-tenant SaaS mode

---

## Support

- **Documentation:** [Read the docs](./docs/)
- **Issues:** [GitHub Issues](https://github.com/yourusername/ecommerce-boilerplate/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/ecommerce-boilerplate/discussions)
- **Email:** support@yourdomain.com

---

## Acknowledgments

This project was inspired by and learned from:

- [ixartz/SaaS-Boilerplate](https://github.com/ixartz/SaaS-Boilerplate)
- [blefnk/relivator-nextjs-template](https://github.com/blefnk/relivator-nextjs-template)
- [wasp-lang/open-saas](https://github.com/wasp-lang/open-saas)
- [shadcn/ui](https://ui.shadcn.com/)
- [Vercel](https://vercel.com/) for excellent Next.js hosting

---

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/ecommerce-boilerplate&type=Date)](https://star-history.com/#yourusername/ecommerce-boilerplate&Date)

---

**Made with ❤️ by Daniel Park**

If you find this project helpful, please consider giving it a ⭐️ on GitHub!
