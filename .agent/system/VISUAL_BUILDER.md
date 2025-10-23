# Visual Page Builder Architecture
## Ecommerce Boilerplate - Drag & Drop Component System

**Version:** 1.0
**Date:** October 10, 2025
**Status:** Planning Phase

---

## Table of Contents
1. [Overview](#1-overview)
2. [Technology Selection](#2-technology-selection)
3. [Architecture Design](#3-architecture-design)
4. [Component Library](#4-component-library)
5. [Builder Interface](#5-builder-interface)
6. [Data Model](#6-data-model)
7. [Implementation Plan](#7-implementation-plan)
8. [AI Assistant Integration](#8-ai-assistant-integration)

---

## 1. Overview

### 1.1 Vision

Transform the ecommerce boilerplate into a **visual-first development platform** where users can:
- Drag and drop pre-built ecommerce components
- Customize layouts without writing code
- Create custom product pages, landing pages, and marketing content
- Export production-ready React/Next.js code
- (Future) Use AI assistant to generate custom components

### 1.2 Key Features

#### **Visual Page Builder**
- Drag-and-drop interface for page creation
- Real-time preview of changes
- Responsive design controls (mobile, tablet, desktop)
- Component property editor
- Layer/tree view of page structure

#### **Pre-built Component Library**
- 50+ ecommerce-ready components
- Product displays (grids, lists, featured, carousels)
- Shopping components (cart, checkout, product cards)
- Marketing blocks (hero sections, testimonials, CTAs)
- Layout components (headers, footers, sections, containers)

#### **Customization System**
- Visual style editor (colors, spacing, typography)
- Property panels for each component
- Responsive breakpoint controls
- CSS class customization
- Theme management

#### **Code Generation**
- Export to production-ready React components
- TypeScript support
- Server Component / Client Component optimization
- SEO-friendly HTML output

---

## 2. Technology Selection

### 2.1 Evaluated Options

| Library | Pros | Cons | Score |
|---------|------|------|-------|
| **Puck** | Open-source, React-focused, MIT license, modular | Newer (less battle-tested) | ⭐⭐⭐⭐⭐ |
| **Craft.js** | Highly extensible, React hooks, MIT license | Complex setup, steeper learning curve | ⭐⭐⭐⭐ |
| **Destack** | Next.js focused, zero-config, Tailwind integration | Limited customization, less active | ⭐⭐⭐ |
| **GrapesJS** | Mature, feature-rich | Not React-native, less TypeScript support | ⭐⭐⭐ |
| **Builder.io** | Professional, full-featured | Vendor lock-in, paid plans required | ⭐⭐ |

### 2.2 Final Decision: **Puck + dnd-kit**

**Primary Framework: Puck**
- ✅ Open-source (MIT) and free
- ✅ Built specifically for React
- ✅ TypeScript support
- ✅ Modular architecture
- ✅ Component-based approach
- ✅ Active development and community

**Drag-Drop Library: dnd-kit**
- ✅ Modern, performant, accessible
- ✅ React 19 compatible
- ✅ TypeScript first
- ✅ Customizable and flexible
- ✅ Better than deprecated react-beautiful-dnd

**Reasoning:**
1. Both are actively maintained and modern
2. Full control over our codebase (no vendor lock-in)
3. TypeScript-first development
4. Perfect for Next.js 15 integration
5. Can be customized for ecommerce needs

---

## 3. Architecture Design

### 3.1 System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Visual Builder UI                        │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐  ┌──────────────────┐  ┌──────────────┐  │
│  │  Component   │  │   Canvas Area    │  │  Properties  │  │
│  │   Sidebar    │  │  (Live Preview)  │  │    Panel     │  │
│  │              │  │                  │  │              │  │
│  │  - Hero      │  │  ┌────────────┐ │  │  - Settings  │  │
│  │  - Product   │  │  │ Component  │ │  │  - Styles    │  │
│  │  - Cart      │  │  │   Tree     │ │  │  - Props     │  │
│  │  - CTA       │  │  └────────────┘ │  │  - Actions   │  │
│  └──────────────┘  └──────────────────┘  └──────────────┘  │
│                                                               │
└───────────────────────────┬───────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Puck Editor Engine                          │
├─────────────────────────────────────────────────────────────┤
│  - State Management (Zustand)                               │
│  - Component Registry                                        │
│  - Drag & Drop Logic (dnd-kit)                              │
│  - Serialization / Deserialization                          │
│  - Validation & Constraints                                  │
└───────────────────────────┬───────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│               Component Library System                       │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Product    │  │   Layout     │  │   Marketing  │     │
│  │  Components  │  │  Components  │  │  Components  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└───────────────────────────┬───────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Database & Storage                          │
├─────────────────────────────────────────────────────────────┤
│  - Page configurations (JSON)                               │
│  - Component presets                                         │
│  - User templates                                            │
│  - Media assets                                              │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Component Registration System

```typescript
// lib/builder/registry.ts
import { ComponentConfig } from '@measured/puck'

export type EcommerceComponent = {
  type: string
  category: 'product' | 'layout' | 'marketing' | 'cart' | 'custom'
  label: string
  icon?: string
  defaultProps: Record<string, any>
  fields: ComponentConfig['fields']
  render: ComponentConfig['render']
  editable?: boolean
  deletable?: boolean
}

// Example: Product Card Component
export const ProductCardComponent: EcommerceComponent = {
  type: 'ProductCard',
  category: 'product',
  label: 'Product Card',
  icon: 'ShoppingBag',
  defaultProps: {
    productId: '',
    showPrice: true,
    showRating: true,
    imageAspect: 'square',
    buttonText: 'Add to Cart',
  },
  fields: {
    productId: {
      type: 'select',
      label: 'Product',
      options: async () => {
        // Fetch products from database
        const products = await getProducts()
        return products.map(p => ({ label: p.name, value: p.id }))
      },
    },
    showPrice: { type: 'radio', label: 'Show Price', options: [
      { label: 'Yes', value: true },
      { label: 'No', value: false },
    ]},
    imageAspect: {
      type: 'select',
      label: 'Image Aspect Ratio',
      options: [
        { label: 'Square (1:1)', value: 'square' },
        { label: 'Portrait (3:4)', value: 'portrait' },
        { label: 'Landscape (16:9)', value: 'landscape' },
      ],
    },
  },
  render: ({ productId, showPrice, showRating, imageAspect, buttonText }) => {
    const product = useProduct(productId)

    return (
      <div className="product-card">
        <Image src={product.image} aspect={imageAspect} />
        <h3>{product.name}</h3>
        {showPrice && <p className="price">${product.price}</p>}
        {showRating && <Rating value={product.rating} />}
        <Button>{buttonText}</Button>
      </div>
    )
  },
}
```

### 3.3 Page Builder State Management

```typescript
// lib/builder/store.ts
import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

export type BuilderState = {
  // Current page being edited
  currentPage: PageData | null

  // Editor state
  selectedComponent: string | null
  hoveredComponent: string | null
  isDragging: boolean

  // View state
  viewport: 'mobile' | 'tablet' | 'desktop'
  showGrid: boolean
  showOutlines: boolean

  // History (undo/redo)
  history: PageData[]
  historyIndex: number

  // Actions
  setCurrentPage: (page: PageData) => void
  selectComponent: (id: string | null) => void
  updateComponent: (id: string, props: any) => void
  deleteComponent: (id: string) => void
  duplicateComponent: (id: string) => void
  moveComponent: (id: string, newParentId: string, index: number) => void

  // History actions
  undo: () => void
  redo: () => void
  canUndo: () => boolean
  canRedo: () => boolean
}

export const useBuilderStore = create<BuilderState>()(
  devtools(
    persist(
      (set, get) => ({
        currentPage: null,
        selectedComponent: null,
        hoveredComponent: null,
        isDragging: false,
        viewport: 'desktop',
        showGrid: false,
        showOutlines: true,
        history: [],
        historyIndex: -1,

        setCurrentPage: (page) => set({ currentPage: page }),

        selectComponent: (id) => set({ selectedComponent: id }),

        updateComponent: (id, props) => {
          const state = get()
          // Update component logic...
          // Add to history
        },

        // ... other actions
      }),
      { name: 'builder-store' }
    )
  )
)
```

---

## 4. Component Library

### 4.1 Component Categories

#### **Product Components** (15 components)
1. **ProductCard** - Single product display
2. **ProductGrid** - Grid of products with filters
3. **ProductList** - List view of products
4. **ProductCarousel** - Horizontal scrolling products
5. **ProductQuickView** - Modal product preview
6. **ProductComparison** - Side-by-side product comparison
7. **ProductReviews** - Customer reviews section
8. **ProductGallery** - Image gallery with zoom
9. **ProductVariantSelector** - Size/color picker
10. **ProductRecommendations** - "You may also like"
11. **ProductBadge** - Sale/new/featured badges
12. **ProductRating** - Star rating display
13. **ProductPrice** - Price with sale price
14. **ProductInventory** - Stock status indicator
15. **ProductShareButtons** - Social sharing

#### **Cart & Checkout Components** (10 components)
1. **CartDrawer** - Sliding cart sidebar
2. **CartSummary** - Cart totals and checkout button
3. **CartItem** - Individual cart item
4. **CartEmpty** - Empty cart state
5. **CheckoutForm** - Multi-step checkout
6. **CheckoutSummary** - Order review
7. **PaymentMethods** - Payment option selector
8. **ShippingOptions** - Delivery method picker
9. **DiscountCodeInput** - Coupon code field
10. **OrderConfirmation** - Success message

#### **Marketing Components** (15 components)
1. **Hero** - Large banner with CTA
2. **HeroSplit** - Image + text split hero
3. **HeroVideo** - Video background hero
4. **FeatureGrid** - 3-column feature highlights
5. **Testimonials** - Customer reviews carousel
6. **CTABanner** - Call-to-action banner
7. **Newsletter** - Email signup form
8. **SocialProof** - Trust badges, logos
9. **CountdownTimer** - Sale countdown
10. **PricingTable** - Subscription plans
11. **FAQ** - Accordion FAQ section
12. **AnnouncementBar** - Top bar notification
13. **BenefitsBar** - Free shipping, returns, etc.
14. **BeforeAfter** - Image comparison slider
15. **VideoEmbed** - YouTube/Vimeo embed

#### **Layout Components** (10 components)
1. **Container** - Centered content wrapper
2. **Section** - Full-width section with padding
3. **Grid** - Responsive grid layout
4. **Columns** - 2-4 column layout
5. **Spacer** - Vertical spacing
6. **Divider** - Horizontal line
7. **Header** - Site navigation
8. **Footer** - Site footer with links
9. **Sidebar** - Side navigation/filters
10. **Modal** - Popup overlay

### 4.2 Component Configuration Schema

```typescript
// types/builder.types.ts
export interface ComponentInstance {
  id: string
  type: string
  props: Record<string, any>
  children?: ComponentInstance[]
  styles?: {
    desktop?: CSSProperties
    tablet?: CSSProperties
    mobile?: CSSProperties
  }
  conditions?: {
    showIf?: string // Conditional rendering
    hideIf?: string
  }
}

export interface PageData {
  id: string
  title: string
  slug: string
  type: 'landing' | 'product' | 'category' | 'custom'
  meta: {
    title?: string
    description?: string
    ogImage?: string
  }
  components: ComponentInstance[]
  settings: {
    theme?: string
    layout?: string
    customCSS?: string
  }
  createdAt: Date
  updatedAt: Date
  publishedAt?: Date
  status: 'draft' | 'published'
}
```

### 4.3 Component Props System

```typescript
// Example: Hero Component with Props
import { ComponentConfig } from '@measured/puck'

export const HeroComponent: ComponentConfig = {
  fields: {
    // Content
    heading: {
      type: 'text',
      label: 'Heading',
    },
    subheading: {
      type: 'textarea',
      label: 'Subheading',
    },
    ctaText: {
      type: 'text',
      label: 'Button Text',
    },
    ctaLink: {
      type: 'text',
      label: 'Button Link',
    },

    // Media
    backgroundImage: {
      type: 'custom',
      label: 'Background Image',
      render: ({ value, onChange }) => (
        <ImageUpload value={value} onChange={onChange} />
      ),
    },

    // Layout
    alignment: {
      type: 'radio',
      label: 'Text Alignment',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Center', value: 'center' },
        { label: 'Right', value: 'right' },
      ],
    },
    height: {
      type: 'select',
      label: 'Height',
      options: [
        { label: 'Small (400px)', value: 'sm' },
        { label: 'Medium (600px)', value: 'md' },
        { label: 'Large (800px)', value: 'lg' },
        { label: 'Full Screen', value: 'full' },
      ],
    },

    // Styling
    overlayOpacity: {
      type: 'number',
      label: 'Overlay Opacity',
      min: 0,
      max: 100,
    },
    textColor: {
      type: 'custom',
      label: 'Text Color',
      render: ({ value, onChange }) => (
        <ColorPicker value={value} onChange={onChange} />
      ),
    },
  },

  defaultProps: {
    heading: 'Welcome to our store',
    subheading: 'Discover amazing products',
    ctaText: 'Shop Now',
    ctaLink: '/products',
    alignment: 'center',
    height: 'lg',
    overlayOpacity: 50,
    textColor: '#ffffff',
  },

  render: ({ heading, subheading, ctaText, ctaLink, backgroundImage, alignment, height, overlayOpacity, textColor }) => {
    return (
      <section
        className={cn('hero', `hero-${height}`, `text-${alignment}`)}
        style={{
          backgroundImage: `url(${backgroundImage})`,
          color: textColor
        }}
      >
        <div className="hero-overlay" style={{ opacity: overlayOpacity / 100 }} />
        <div className="hero-content">
          <h1>{heading}</h1>
          <p>{subheading}</p>
          <Button href={ctaLink}>{ctaText}</Button>
        </div>
      </section>
    )
  },
}
```

---

## 5. Builder Interface

### 5.1 UI Layout

```
┌──────────────────────────────────────────────────────────────────────────┐
│  Top Bar: [Logo] [Page Title] [Save] [Preview] [Publish] [History] [?]  │
├─────────────┬──────────────────────────────────────────┬────────────────┤
│             │                                          │                │
│  Component  │          Canvas (Live Preview)           │   Properties   │
│   Sidebar   │                                          │     Panel      │
│             │  ┌────────────────────────────────────┐  │                │
│ [Search]    │  │  Header                            │  │  Component:    │
│             │  │  ▼                                 │  │  Hero Section  │
│ Product ▼   │  │  ┌──────────────────────────────┐ │  │                │
│  - Card     │  │  │ Hero Section                 │ │  │  [Content]     │
│  - Grid     │  │  │  "Welcome to Store"          │ │  │  Heading: ...  │
│  - Carousel │  │  │  [Shop Now]                  │ │  │  CTA: ...      │
│             │  │  └──────────────────────────────┘ │  │                │
│ Cart ▼      │  │  ┌──────────────────────────────┐ │  │  [Styling]     │
│  - Drawer   │  │  │ Product Grid                 │ │  │  Background    │
│  - Summary  │  │  │  [P1] [P2] [P3] [P4]        │ │  │  Colors        │
│             │  │  └──────────────────────────────┘ │  │  Spacing       │
│ Marketing ▼ │  │                                    │  │                │
│  - Hero     │  │  Footer                            │  │  [Actions]     │
│  - CTA      │  │  ▲                                 │  │  [Duplicate]   │
│  - Features │  └────────────────────────────────────┘  │  [Delete]      │
│             │                                          │                │
│ Layout ▼    │  Responsive: [📱] [📱] [💻] [🖥️]        │  [Tree View]   │
│  - Section  │  Zoom: [-] [100%] [+]                  │  ├─ Header      │
│  - Grid     │                                          │  ├─ Hero        │
│             │                                          │  ├─ Products    │
└─────────────┴──────────────────────────────────────────┴────────────────┘
│  Bottom Bar: [Device View] [Undo] [Redo] [Grid] [Outline] [AI Help]    │
└──────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Builder Features

#### **Drag & Drop Interactions**
- Click component in sidebar → drag to canvas
- Drag to reorder components within canvas
- Visual drop zones with highlighting
- Snap-to-grid for alignment
- Nested components support (drop inside containers)

#### **Responsive Design Controls**
```typescript
// Breakpoint switcher
const breakpoints = {
  mobile: { icon: '📱', width: 375 },
  tablet: { icon: '📱', width: 768 },
  desktop: { icon: '💻', width: 1024 },
  wide: { icon: '🖥️', width: 1440 },
}

// Component can have different props per breakpoint
interface ResponsiveProps {
  desktop: { columns: 4, spacing: 'lg' }
  tablet: { columns: 2, spacing: 'md' }
  mobile: { columns: 1, spacing: 'sm' }
}
```

#### **Property Editor Types**
1. **Text Input** - Single line text
2. **Textarea** - Multi-line text
3. **Number** - Numeric input with min/max
4. **Select** - Dropdown options
5. **Radio** - Single choice
6. **Checkbox** - Boolean toggle
7. **Color Picker** - Visual color selection
8. **Image Upload** - File upload with preview
9. **URL Input** - Link picker with validation
10. **Custom** - Custom React component

#### **Keyboard Shortcuts**
- `Cmd/Ctrl + Z` - Undo
- `Cmd/Ctrl + Shift + Z` - Redo
- `Cmd/Ctrl + C` - Copy component
- `Cmd/Ctrl + V` - Paste component
- `Cmd/Ctrl + D` - Duplicate component
- `Delete` - Remove selected component
- `Cmd/Ctrl + S` - Save page
- `Escape` - Deselect component

---

## 6. Data Model

### 6.1 Database Schema (Prisma)

```prisma
// prisma/schema.prisma

model Page {
  id          String   @id @default(cuid())
  title       String
  slug        String   @unique
  type        PageType
  data        Json     // Component tree
  settings    Json?    // Page settings
  metaTitle   String?
  metaDesc    String?
  ogImage     String?
  status      PageStatus @default(DRAFT)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  userId      String
  user        User     @relation(fields: [userId], references: [id])

  versions    PageVersion[]

  @@index([slug])
  @@index([userId])
  @@index([status])
}

enum PageType {
  LANDING
  PRODUCT_PAGE
  CATEGORY_PAGE
  BLOG_POST
  CUSTOM
}

enum PageStatus {
  DRAFT
  PUBLISHED
  ARCHIVED
}

model PageVersion {
  id        String   @id @default(cuid())
  pageId    String
  version   Int
  data      Json
  createdAt DateTime @default(now())
  createdBy String

  page      Page     @relation(fields: [pageId], references: [id], onDelete: Cascade)

  @@unique([pageId, version])
  @@index([pageId])
}

model ComponentPreset {
  id          String   @id @default(cuid())
  name        String
  description String?
  category    String
  thumbnail   String?
  data        Json     // Component configuration
  isPublic    Boolean  @default(false)
  usageCount  Int      @default(0)
  createdAt   DateTime @default(now())

  userId      String
  user        User     @relation(fields: [userId], references: [id])

  @@index([userId])
  @@index([category])
}

model Template {
  id          String   @id @default(cuid())
  name        String
  description String?
  thumbnail   String?
  category    String
  pages       Json     // Array of page configurations
  price       Decimal  @default(0) @db.Decimal(10,2)
  isPublic    Boolean  @default(false)
  downloads   Int      @default(0)
  createdAt   DateTime @default(now())

  userId      String
  user        User     @relation(fields: [userId], references: [id])

  @@index([userId])
  @@index([category])
}
```

### 6.2 Page Data Structure (JSON)

```typescript
// Example: Complete page data structure
const examplePageData: PageData = {
  id: 'page_123',
  title: 'Summer Sale Landing Page',
  slug: 'summer-sale',
  type: 'landing',
  meta: {
    title: 'Summer Sale - Up to 50% Off',
    description: 'Shop our biggest summer sale with discounts up to 50%',
    ogImage: '/images/summer-sale-og.jpg',
  },
  components: [
    {
      id: 'comp_1',
      type: 'Header',
      props: {
        logo: '/logo.png',
        navigation: [
          { label: 'Shop', href: '/shop' },
          { label: 'Sale', href: '/sale' },
          { label: 'About', href: '/about' },
        ],
        showCart: true,
      },
    },
    {
      id: 'comp_2',
      type: 'Hero',
      props: {
        heading: 'Summer Sale',
        subheading: 'Up to 50% off on selected items',
        backgroundImage: '/images/hero-bg.jpg',
        ctaText: 'Shop Now',
        ctaLink: '/products',
        alignment: 'center',
        height: 'lg',
        overlayOpacity: 40,
      },
      styles: {
        desktop: { padding: '80px 0' },
        mobile: { padding: '40px 0' },
      },
    },
    {
      id: 'comp_3',
      type: 'ProductGrid',
      props: {
        title: 'Featured Products',
        categoryId: 'cat_summer',
        columns: 4,
        limit: 8,
        showFilters: true,
      },
      styles: {
        desktop: { columns: 4 },
        tablet: { columns: 2 },
        mobile: { columns: 1 },
      },
    },
    {
      id: 'comp_4',
      type: 'Footer',
      props: {
        columns: [
          {
            title: 'Shop',
            links: [
              { label: 'All Products', href: '/products' },
              { label: 'New Arrivals', href: '/new' },
            ],
          },
          {
            title: 'Help',
            links: [
              { label: 'Contact', href: '/contact' },
              { label: 'FAQs', href: '/faq' },
            ],
          },
        ],
        showNewsletter: true,
      },
    },
  ],
  settings: {
    theme: 'default',
    customCSS: '',
  },
  status: 'published',
  publishedAt: new Date('2025-10-01'),
  createdAt: new Date('2025-09-25'),
  updatedAt: new Date('2025-10-01'),
}
```

---

## 7. Implementation Plan

### 7.1 Phase 1: Core Builder (Weeks 1-2)

#### **Week 1: Setup & Foundation**
- [ ] Install Puck and dnd-kit dependencies
- [ ] Create builder UI layout (sidebar, canvas, properties)
- [ ] Set up Zustand store for builder state
- [ ] Implement basic drag-drop with dnd-kit
- [ ] Create component registry system

#### **Week 2: Basic Components**
- [ ] Implement 5 essential components (Hero, ProductGrid, Container, Header, Footer)
- [ ] Create property editor panel
- [ ] Add component selection and highlighting
- [ ] Implement save/load functionality
- [ ] Add basic undo/redo

### 7.2 Phase 2: Component Library (Weeks 3-4)

#### **Week 3: Product Components**
- [ ] Implement 15 product components
- [ ] Add dynamic data fetching for products
- [ ] Create component property configurations
- [ ] Add component preview thumbnails

#### **Week 4: Marketing & Cart Components**
- [ ] Implement 15 marketing components
- [ ] Implement 10 cart/checkout components
- [ ] Create component templates/presets
- [ ] Add component search and filtering

### 7.3 Phase 3: Advanced Features (Weeks 5-6)

#### **Week 5: Responsive & Styling**
- [ ] Add responsive breakpoint controls
- [ ] Implement device preview modes
- [ ] Create visual style editor
- [ ] Add custom CSS support
- [ ] Implement theme management

#### **Week 6: Polish & Optimization**
- [ ] Add keyboard shortcuts
- [ ] Implement component tree view
- [ ] Add page version history
- [ ] Create component duplication
- [ ] Add export to code functionality

### 7.4 Phase 4: AI Assistant (Future)

#### **Future Enhancement: AI Component Generator**
- [ ] Integrate OpenAI API
- [ ] Create natural language component generator
- [ ] Implement AI-powered layout suggestions
- [ ] Add component customization assistant
- [ ] Create AI content writer for components

---

## 8. AI Assistant Integration (Future Phase)

### 8.1 Vision

An AI assistant that helps users:
1. Generate custom components from descriptions
2. Suggest layout improvements
3. Write compelling product descriptions
4. Optimize for SEO
5. Create variations of existing components

### 8.2 AI Features

#### **Component Generation**
```typescript
// User prompt: "Create a product card with image, title, price, and add to cart button"

const AIComponentGenerator = async (prompt: string) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
        content: `You are a React component generator. Generate TypeScript React components
                  using Tailwind CSS and shadcn/ui. Return only valid JSX code.`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  })

  const componentCode = response.choices[0].message.content

  // Parse and register component
  const component = await parseComponent(componentCode)
  registerComponent(component)

  return component
}
```

#### **Layout Suggestions**
```typescript
// AI analyzes page and suggests improvements
const suggestLayoutImprovements = async (pageData: PageData) => {
  const analysis = await analyzeLayout(pageData)

  return {
    suggestions: [
      {
        type: 'add_component',
        component: 'SocialProof',
        location: 'after_hero',
        reason: 'Adding trust badges can increase conversion by 15%',
      },
      {
        type: 'reorder',
        component: 'comp_3',
        newPosition: 2,
        reason: 'Moving product grid higher increases engagement',
      },
    ],
  }
}
```

#### **Content Generation**
```typescript
// AI writes product descriptions
const generateProductDescription = async (product: Product) => {
  const prompt = `Write a compelling product description for:
    Name: ${product.name}
    Category: ${product.category}
    Key Features: ${product.features.join(', ')}
    Target Audience: ${product.targetAudience}`

  const description = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }],
  })

  return description.choices[0].message.content
}
```

### 8.3 AI Assistant UI

```
┌─────────────────────────────────────────┐
│  AI Assistant                      [X]  │
├─────────────────────────────────────────┤
│                                         │
│  💬 How can I help you today?          │
│                                         │
│  [I want to...]                         │
│  ○ Generate a custom component          │
│  ○ Improve my page layout               │
│  ○ Write product descriptions           │
│  ○ Optimize for SEO                     │
│                                         │
│  Or type your request:                  │
│  ┌─────────────────────────────────┐   │
│  │ Create a testimonial section    │   │
│  │ with star ratings...            │   │
│  └─────────────────────────────────┘   │
│                      [Generate] [→]     │
│                                         │
└─────────────────────────────────────────┘
```

### 8.4 Implementation Timeline

**Phase 1 (Future):**
- Basic AI chat interface
- Component generation from prompts
- Integration with OpenAI API

**Phase 2 (Future):**
- Layout analysis and suggestions
- Content generation (descriptions, copy)
- SEO optimization recommendations

**Phase 3 (Future):**
- AI-powered A/B test suggestions
- Conversion rate optimization tips
- Automated component variations

---

## 9. User Flows

### 9.1 Creating a New Landing Page

```
1. User clicks "Create New Page"
   ↓
2. Select page type: "Landing Page"
   ↓
3. Choose template or start blank
   ↓
4. Builder opens with canvas
   ↓
5. Drag "Hero" component from sidebar to canvas
   ↓
6. Configure hero props in property panel:
   - Upload background image
   - Enter heading text
   - Set button CTA
   ↓
7. Drag "Product Grid" below hero
   ↓
8. Select category to display
   ↓
9. Add more components (testimonials, CTA, footer)
   ↓
10. Preview on different devices
   ↓
11. Save as draft
   ↓
12. Publish page
   ↓
13. Page is live at yourdomain.com/slug
```

### 9.2 Editing an Existing Page

```
1. Navigate to "Pages" dashboard
   ↓
2. Click "Edit" on desired page
   ↓
3. Builder loads with page data
   ↓
4. Click component to select
   ↓
5. Edit properties in panel
   ↓
6. Changes update in real-time
   ↓
7. Save changes
   ↓
8. Optionally publish updates
```

---

## 10. Technical Considerations

### 10.1 Performance Optimization

```typescript
// Lazy load component library
const componentRegistry = {
  Hero: lazy(() => import('@/components/builder/Hero')),
  ProductGrid: lazy(() => import('@/components/builder/ProductGrid')),
  // ... other components
}

// Virtual scrolling for large component trees
import { FixedSizeList } from 'react-window'

// Debounce property changes
const debouncedUpdate = useDebouncedCallback((id, props) => {
  updateComponent(id, props)
}, 300)
```

### 10.2 Code Export

```typescript
// Export page to production-ready React component
const exportToCode = (page: PageData): string => {
  const imports = generateImports(page.components)
  const jsx = generateJSX(page.components)

  return `
    ${imports}

    export default function ${toPascalCase(page.slug)}() {
      return (
        <>
          ${jsx}
        </>
      )
    }
  `
}

// Example output:
/*
  import { Hero } from '@/components/Hero'
  import { ProductGrid } from '@/components/ProductGrid'

  export default function SummerSale() {
    return (
      <>
        <Hero
          heading="Summer Sale"
          subheading="Up to 50% off"
          backgroundImage="/images/hero.jpg"
        />
        <ProductGrid
          categoryId="cat_summer"
          columns={4}
          limit={8}
        />
      </>
    )
  }
*/
```

### 10.3 SEO Considerations

```typescript
// Generate SEO metadata for builder pages
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug)

  return {
    title: page.metaTitle || page.title,
    description: page.metaDesc,
    openGraph: {
      title: page.metaTitle || page.title,
      description: page.metaDesc,
      images: [page.ogImage],
    },
  }
}

// Render builder page as Server Component
export default async function BuilderPage({ params }: { params: { slug: string } }) {
  const page = await getPage(params.slug)

  return <PageRenderer data={page.data} />
}
```

---

## 11. Success Metrics

### 11.1 User Engagement
- Time to create first page: < 10 minutes
- Component usage distribution
- Most popular component types
- Average components per page: 5-10

### 11.2 Technical Metrics
- Builder load time: < 2 seconds
- Canvas rendering performance: 60fps
- Auto-save latency: < 500ms
- Page export time: < 1 second

### 11.3 Business Metrics
- Pages created per user
- Published vs draft ratio
- User retention (return to builder)
- Feature adoption rates

---

## 12. Future Enhancements

### 12.1 Advanced Features (6+ months)
- [ ] Animation builder (Framer Motion integration)
- [ ] Global style system (design tokens)
- [ ] Component marketplace
- [ ] Team collaboration (multiplayer editing)
- [ ] Version control and branching
- [ ] A/B testing integration
- [ ] Analytics integration
- [ ] Form builder
- [ ] Workflow automation

### 12.2 AI Capabilities (9+ months)
- [ ] Full AI component generator
- [ ] AI layout optimizer
- [ ] AI content writer
- [ ] AI image generator integration
- [ ] Conversion optimization AI

---

## 13. Conclusion

The visual page builder transforms the ecommerce boilerplate from a code template into a **complete no-code/low-code platform**. With 50+ pre-built components, drag-and-drop interface, and future AI assistance, users can:

- Launch professional ecommerce stores without coding
- Customize every aspect visually
- Maintain full code ownership (export to React)
- Scale from simple landing pages to complex storefronts

**Next Steps:**
1. Approve this architecture
2. Begin Phase 1 implementation
3. Gather early user feedback
4. Iterate on component library
5. Plan AI assistant integration

---

**Document Owner:** Daniel Park
**Last Updated:** October 10, 2025
**Status:** Ready for Implementation
