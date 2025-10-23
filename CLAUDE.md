# Ecommerce Boilerplate Development Rules

## Project Overview
- **Name**: Ecommerce SaaS Boilerplate
- **Type**: Fullstack ecommerce platform with visual page builder
- **Deployment**: Vercel (Next.js) + Neon (PostgreSQL)
- **Goal**: Launch-ready ecommerce boilerplate with drag-and-drop page builder

## Current Status: 📋 FOUNDATION PHASE
**What's Ready:**
- ✅ Complete planning documentation
- ✅ System design and architecture
- ✅ Visual builder specifications
- ✅ Research and best practices
- 🚧 Next.js project initialization (IN PROGRESS)

---

## Documentation System

### `.agent/` Folder Structure
All project documentation lives in `.agent/` folder for optimal context:

```
.agent/
├── README.md           # Documentation index (READ THIS FIRST!)
├── tasks/              # PRDs and implementation plans
│   └── PRD.md         # Complete product requirements
├── system/             # Architecture and technical specs
│   ├── SYSTEM_DESIGN.md      # System architecture
│   ├── VISUAL_BUILDER.md     # Visual builder specs
│   └── RESEARCH_FINDINGS.md  # Best practices
└── sops/               # Standard Operating Procedures (added as we build)
```

### Documentation Rules

1. **Before planning ANY feature:**
   - READ `.agent/README.md` first to get full context
   - Check relevant task docs for similar implementations
   - Review system docs for architecture context
   - Follow SOPs for standard procedures

2. **After implementing features:**
   - Run `/update-doc feature <name>` to document implementation
   - Create SOPs for repeatable processes
   - Update system docs if architecture changed

3. **After fixing bugs:**
   - Run `/update-doc fix <description>` to create prevention SOP
   - Document the mistake and solution

4. **ALWAYS update `.agent/README.md`** when adding new docs

---

## Tech Stack (Planned)

### Core
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.8+
- **Styling:** Tailwind CSS v4

### Database & ORM
- **Database:** PostgreSQL 15+
- **ORM:** Prisma 6 (chosen for better DX)
- **Caching:** Redis (Upstash)

### Authentication
- **Auth:** Auth.js v5 (NextAuth) - chosen for flexibility
- **Providers:** Email/Password, Google, GitHub, Magic Links

### Payments
- **Primary:** Stripe
- **Alternative:** Lemon Squeezy (for digital products)

### UI & Styling
- **Components:** shadcn/ui (Radix UI + Tailwind)
- **Icons:** Lucide React
- **Forms:** React Hook Form + Zod

### Visual Builder
- **Page Builder:** Puck (open-source React visual editor)
- **Drag-Drop:** dnd-kit
- **State:** Zustand

### Email & File Storage
- **Email:** Resend + React Email
- **File Upload:** UploadThing

### Testing
- **Unit Tests:** Vitest
- **E2E Tests:** Playwright
- **Linting:** ESLint
- **Formatting:** Prettier

### DevOps
- **Hosting:** Vercel (frontend)
- **Database:** Neon (serverless Postgres)
- **Monitoring:** Sentry
- **CI/CD:** GitHub Actions

---

## Implementation Timeline (12 Weeks)

### Phase 1: Foundation (Weeks 1-2) - **CURRENT PHASE**
- [ ] Project setup and configuration
- [ ] Database schema implementation
- [ ] Authentication system
- [ ] Basic UI components
- [ ] Install Puck + dnd-kit dependencies

### Phase 2: Core Features (Weeks 3-4)
- [ ] Product management (CRUD)
- [ ] Shopping cart functionality
- [ ] Checkout flow
- [ ] Order management

### Phase 3: Payments & Email (Week 5)
- [ ] Stripe integration
- [ ] Payment webhooks
- [ ] Transactional emails
- [ ] Email templates

### Phase 4: Admin Dashboard (Week 6)
- [ ] Admin authentication
- [ ] Product management UI
- [ ] Order management UI
- [ ] Basic analytics

### Phase 5: Visual Builder Foundation (Weeks 7-8)
- [ ] Builder UI layout (sidebar, canvas, properties)
- [ ] Component registry system
- [ ] Basic drag-and-drop functionality
- [ ] Implement 10 core components
- [ ] Save/load page configurations

### Phase 6: Component Library (Weeks 9-10)
- [ ] Implement 15 product components
- [ ] Implement 15 marketing components
- [ ] Implement 10 cart/checkout components
- [ ] Implement 10 layout components
- [ ] Component property editors
- [ ] Responsive design controls

### Phase 7: Builder Polish & Features (Week 11)
- [ ] Undo/redo functionality
- [ ] Component tree view
- [ ] Page templates
- [ ] Visual style editor
- [ ] Export to code functionality
- [ ] SEO metadata editor

### Phase 8: Testing & Documentation (Week 12)
- [ ] Unit tests
- [ ] E2E tests
- [ ] Performance optimization
- [ ] Accessibility audit
- [ ] README and setup guide
- [ ] Builder documentation
- [ ] Video tutorials
- [ ] GitHub release

---

## Required Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/ecommerce"
REDIS_URL="redis://localhost:6379"

# Auth (Auth.js)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-min-32-chars"

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
```

---

## Directory Structure (Planned)

```
ecommerce-boilerplate/
├── .agent/                     # Documentation (context for Claude)
│   ├── README.md              # Documentation index
│   ├── tasks/                 # PRDs and implementation plans
│   ├── system/                # Architecture docs
│   └── sops/                  # Standard procedures
├── .claude/                    # Claude Code configuration
│   └── commands/              # Custom slash commands
│       └── update-doc.md      # Documentation update command
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/           # Auth routes
│   │   ├── (shop)/           # Shop routes
│   │   ├── (dashboard)/      # User dashboard
│   │   ├── (admin)/          # Admin dashboard
│   │   ├── (builder)/        # Visual page builder
│   │   └── api/              # API routes
│   ├── components/           # React components
│   │   ├── ui/               # shadcn/ui components
│   │   ├── builder/          # Visual builder components
│   │   ├── shop/             # Shop components
│   │   └── admin/            # Admin components
│   ├── lib/                  # Core libraries
│   │   ├── prisma.ts         # Prisma client
│   │   ├── auth.ts           # Auth.js config
│   │   ├── stripe.ts         # Stripe client
│   │   └── redis.ts          # Redis client
│   ├── services/             # Business logic
│   ├── repositories/         # Data access
│   ├── actions/              # Server actions
│   ├── hooks/                # Custom hooks
│   ├── types/                # TypeScript types
│   └── utils/                # Utilities
├── prisma/
│   ├── schema.prisma         # Database schema
│   └── migrations/           # DB migrations
├── public/                   # Static assets
├── tests/                    # Test files
├── .github/workflows/        # CI/CD
├── CLAUDE.md                 # This file
└── README.md                 # User-facing docs
```

---

## Coding Standards

### TypeScript
- Strict mode enabled
- No `any` types unless absolutely necessary
- Use type imports: `import type { ... }`

### Code Quality
- ESLint: @recommended + react + @typescript-eslint
- Prettier formatting (automated)
- Husky pre-commit hooks
- Conventional commits
- Max ESLint warnings: 0

### File Naming
- Components: PascalCase (e.g., `ProductCard.tsx`)
- Utilities: camelCase (e.g., `formatPrice.ts`)
- Types: PascalCase (e.g., `Product.types.ts`)
- API routes: kebab-case (e.g., `create-order.ts`)

### Component Structure
```typescript
// 1. Imports
import { useState } from 'react'
import type { Product } from '@/types'

// 2. Types/Interfaces
interface ProductCardProps {
  product: Product
  onAddToCart: (id: string) => void
}

// 3. Component
export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  // ... implementation
}
```

---

## Development Workflow

### Starting New Features

1. **Turn on Plan Mode** (`Cmd/Ctrl + Shift + P`)
2. **Read documentation:**
   ```
   Read .agent/README.md for context, then plan implementation
   ```
3. **Generate implementation plan** - Agent will create detailed plan
4. **Save plan:**
   ```
   Save implementation plan to .agent/tasks/ folder
   ```
5. **Implement feature** following the plan
6. **Update documentation:**
   ```
   /update-doc feature <feature-name>
   ```

### After Implementing Features

1. Run tests: `pnpm test`
2. Check types: `pnpm type-check`
3. Format code: `pnpm format`
4. Create SOP if needed: `/update-doc sop <name>`
5. Update `.agent/README.md` if docs changed

### After Fixing Bugs

1. Document the fix: `/update-doc fix <description>`
2. Create prevention SOP if recurring issue
3. Add test to prevent regression

---

## Testing Requirements

### Unit Tests (Vitest)
```bash
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Coverage report
```

### E2E Tests (Playwright)
```bash
pnpm test:e2e          # Run E2E tests
pnpm test:e2e:ui       # With UI
```

### Test Coverage Goals
- Overall: 80%+
- Critical paths: 90%+
- Utils/helpers: 95%+

---

## Git Workflow

### Branches
```
main                    # Production-ready code
├── develop            # Integration branch
    ├── feature/auth   # Feature branches
    ├── feature/cart
    └── bugfix/...
```

### Commit Messages (Conventional Commits)
```bash
feat: add product search functionality
fix: resolve cart quantity update issue
docs: update API documentation
refactor: simplify checkout flow
test: add unit tests for cart service
chore: update dependencies
```

---

## Key Design Principles

### 1. **Server-First Architecture**
- Use Server Components by default
- Client Components only when needed (interactivity)
- Server Actions for mutations

### 2. **Type Safety**
- End-to-end TypeScript
- Zod for runtime validation
- Prisma for type-safe database access

### 3. **Performance**
- Optimize images (Next.js Image)
- Code splitting and lazy loading
- Caching strategy (React Cache + Redis)
- Minimize client-side JavaScript

### 4. **Accessibility**
- WCAG 2.1 Level AA compliance
- Keyboard navigation
- Screen reader support
- Proper ARIA labels

### 5. **Security**
- HTTPS everywhere
- CSRF protection
- Input validation (Zod)
- SQL injection prevention (Prisma)
- Rate limiting
- Secure session management

---

## Common Tasks

### Add New Database Table
1. Update `prisma/schema.prisma`
2. Run `pnpm prisma migrate dev --name add_<table>`
3. Update types in `src/types/`
4. Create repository in `src/repositories/`
5. Create service in `src/services/`
6. Document in `/update-doc sop add-database-table`

### Create New API Endpoint
1. Create file in `src/app/api/<endpoint>/route.ts`
2. Implement handler with proper types
3. Add authentication/authorization
4. Add input validation (Zod)
5. Add error handling
6. Write tests
7. Document in API docs

### Add New UI Component
1. Create in `src/components/<category>/`
2. Use shadcn/ui primitives when possible
3. Add proper TypeScript types
4. Make responsive (mobile-first)
5. Add accessibility features
6. Write component tests

---

## Troubleshooting

### Common Issues

**Prisma Client Not Generated:**
```bash
pnpm prisma generate
```

**Type Errors After Schema Change:**
```bash
pnpm prisma generate
pnpm type-check
```

**Build Failures:**
1. Check ESLint errors: `pnpm lint`
2. Check type errors: `pnpm type-check`
3. Clear `.next` folder: `rm -rf .next`
4. Rebuild: `pnpm build`

**Database Migration Issues:**
```bash
pnpm prisma migrate reset  # WARNING: deletes data
pnpm prisma migrate deploy
```

---

## Resources

### Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Auth.js Docs](https://authjs.dev)
- [Puck Builder Docs](https://puckeditor.com)
- [shadcn/ui](https://ui.shadcn.com)

### Internal Docs
- `.agent/README.md` - Documentation index
- `.agent/tasks/PRD.md` - Product requirements
- `.agent/system/SYSTEM_DESIGN.md` - Architecture
- `.agent/system/VISUAL_BUILDER.md` - Builder specs

---

## License
MIT License - Copyright Daniel Park

---

**Last Updated:** October 10, 2025
**Current Phase:** Foundation (Week 1)
