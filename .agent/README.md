# Documentation Index - Ecommerce Boilerplate

This folder contains all project documentation organized for optimal Claude Code context consumption.

## 📁 Folder Structure

```
.agent/
├── README.md           # This file - documentation index
├── tasks/              # Implementation plans and PRDs
├── system/             # Architecture, schemas, and technical specs
└── sops/               # Standard Operating Procedures
```

---

## 📋 When to Read Which Documentation

### Before Planning New Features
1. **Read this README first** to understand available docs
2. **Read relevant task docs** for similar implementations
3. **Read system docs** for architecture context
4. **Read relevant SOPs** for standard processes

### Before Implementation
1. **Review the specific task/PRD** you're implementing
2. **Check system architecture** for integration points
3. **Follow SOPs** for standard procedures (DB migrations, API endpoints, etc.)

---

## 📚 Available Documentation

### Tasks (PRDs & Implementation Plans)

#### `tasks/PRD.md`
**Purpose:** Complete product requirements document
**When to Read:**
- Planning any new feature
- Understanding project scope and goals
- Checking feature specifications
- Before major implementations

**Contains:**
- Executive summary and problem statement
- Complete feature specifications (MVP + Future)
- User stories (customers, admins, developers, non-technical users)
- Database schema design
- API design
- Security and performance requirements
- Implementation timeline (12 weeks)

---

### System (Architecture & Technical Specs)

#### `system/SYSTEM_DESIGN.md`
**Purpose:** Complete technical architecture and implementation details
**When to Read:**
- Before implementing core features
- Understanding system architecture
- Database schema questions
- API design decisions
- Security implementation
- Deployment configuration

**Contains:**
- High-level architecture diagrams
- Complete technology stack with versions
- Detailed component architecture
- Full Prisma database schema (11 models)
- RESTful API design + Server Actions
- Security architecture and auth flow
- Docker containerization
- CI/CD pipeline configuration
- Caching and performance optimization
- Monitoring setup

#### `system/VISUAL_BUILDER.md`
**Purpose:** Visual page builder architecture and specifications
**When to Read:**
- Implementing visual builder features
- Adding new drag-drop components
- Understanding builder state management
- Component property systems
- AI assistant integration planning

**Contains:**
- Complete builder architecture
- Puck + dnd-kit integration
- 50+ component specifications
- Component registration system
- Page data model and serialization
- Builder UI layout and features
- AI assistant roadmap (future)

#### `system/RESEARCH_FINDINGS.md`
**Purpose:** Analysis of best practices from top open-source projects
**When to Read:**
- Making technology decisions
- Understanding why we chose specific tools
- Learning from competitor analysis
- Finding implementation patterns

**Contains:**
- Analysis of 10+ leading boilerplates
- Technology comparisons (ORMs, auth, payments, UI)
- Best practices and patterns
- Feature gap analysis
- Implementation examples
- Competitive advantages

---

### SOPs (Standard Operating Procedures)

*SOPs will be added as we implement features and establish processes.*

**Purpose:** Step-by-step procedures for common tasks
**Examples (to be created):**
- Adding a new database table
- Creating a new API endpoint
- Integrating a new payment provider
- Adding a new visual builder component
- Deploying to production
- Running database migrations

---

## 🔄 Documentation Maintenance

### When to Update Docs

1. **After implementing features** - Update task docs with actual implementation
2. **After fixing bugs** - Create SOP to prevent same mistakes
3. **After making architectural changes** - Update system docs
4. **When establishing new processes** - Create new SOPs

### How to Update

Use the `/update-doc` command to automatically:
- Generate new SOPs
- Update system architecture docs
- Maintain this README index
- Keep docs in sync with codebase

---

## 🎯 Quick Reference

### Core Technologies (from SYSTEM_DESIGN.md)
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript 5.8+
- **Database:** PostgreSQL 15 + Prisma 6
- **Auth:** Auth.js v5
- **Payments:** Stripe
- **UI:** Tailwind CSS v4 + shadcn/ui
- **Builder:** Puck + dnd-kit
- **Testing:** Vitest + Playwright

### Key Decisions Made
- ✅ **ORM:** Prisma (easier DX, better for MVP)
- ✅ **Auth:** Auth.js v5 (free, flexible, self-hosted)
- ✅ **Payments:** Stripe (industry standard)
- ✅ **Builder:** Puck + dnd-kit (open-source, no vendor lock-in)
- ✅ **Deployment:** Vercel + Neon (serverless)

### Implementation Phases (from PRD.md)
1. **Weeks 1-2:** Foundation (setup, auth, UI)
2. **Weeks 3-4:** Core ecommerce (products, cart, checkout)
3. **Week 5:** Payments & email
4. **Week 6:** Admin dashboard
5. **Weeks 7-8:** Visual builder foundation
6. **Weeks 9-10:** Component library (50+ components)
7. **Week 11:** Builder polish
8. **Week 12:** Testing & documentation

---

## 📖 Related Files

- **`CLAUDE.md`** (root) - Main project instructions for Claude Code
- **`README.md`** (root) - User-facing project documentation
- **`.claude/commands/`** - Custom slash commands

---

**Last Updated:** October 10, 2025
**Maintained By:** Auto-updated via `/update-doc` command
