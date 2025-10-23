# Ecommerce Boilerplate Setup Guide

## Prerequisites

- Node.js 18.18.0 or later
- pnpm 10.x or later
- PostgreSQL database (see options below)

## Database Setup Options

### Option 1: Neon (Recommended for Development)

Neon is a serverless PostgreSQL platform that's perfect for development and production.

1. Sign up at [https://neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string
4. Update your `.env` file:
   ```
   DATABASE_URL="postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require"
   ```

### Option 2: Local PostgreSQL with Docker

1. Ensure Docker is installed and running
2. Start the database containers:
   ```bash
   docker-compose up -d
   ```
3. Update your `.env` file:
   ```
   DATABASE_URL="postgresql://ecommerce:ecommerce@localhost:5432/ecommerce"
   ```

### Option 3: Vercel Postgres

1. Deploy to Vercel or use Vercel CLI
2. Add Vercel Postgres from the dashboard
3. Copy the connection string from Vercel dashboard
4. Update your `.env` file with the provided connection string

## Installation Steps

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.example .env
```

Update the `.env` file with your values:

```env
# Database
DATABASE_URL="your-database-connection-string"

# Auth.js v5
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"

# OAuth Providers (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"
```

### 3. Generate Prisma Client

```bash
pnpm prisma generate
```

### 4. Run Database Migrations

```bash
pnpm prisma migrate dev --name init
```

### 5. (Optional) Seed the Database

```bash
pnpm prisma db seed
```

### 6. Start Development Server

```bash
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your application.

## Authentication Setup

### Email/Password Authentication

Email/password authentication works out of the box. Users can:
1. Sign up at `/auth/signup`
2. Sign in at `/auth/signin`

### OAuth Setup (Optional)

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to `.env`

#### GitHub OAuth

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Set Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and generate Client Secret
5. Add to `.env`

## Prisma Studio

To view and edit your database with a GUI:

```bash
pnpm prisma studio
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm prisma studio` - Open Prisma Studio
- `pnpm prisma migrate dev` - Create and apply migrations
- `pnpm prisma generate` - Generate Prisma Client

## Troubleshooting

### Database Connection Issues

If you see "Can't reach database server" error:
1. Check that your database is running
2. Verify DATABASE_URL in `.env` is correct
3. For Docker: ensure containers are running with `docker-compose ps`
4. For Neon/Vercel: check connection string is copied correctly

### Auth.js Errors

If you see auth-related errors:
1. Ensure NEXTAUTH_SECRET is set (minimum 32 characters)
2. Verify NEXTAUTH_URL matches your development URL
3. For OAuth: check client IDs and secrets are correct

### Prisma Errors

If Prisma migrations fail:
1. Delete `prisma/migrations` folder
2. Run `pnpm prisma migrate dev --name init` again
3. Or use `pnpm prisma db push` for development

## Next Steps

1. ✅ Authentication is set up and working
2. 📝 Add products using the dashboard
3. 🎨 Customize the visual page builder
4. 💳 Set up Stripe for payments
5. 📧 Configure email with Resend
6. 🚀 Deploy to production

## Documentation

- [PRD (Product Requirements)](./.agent/tasks/PRD.md)
- [System Design](./.agent/system/SYSTEM_DESIGN.md)
- [Visual Builder Specs](./.agent/system/VISUAL_BUILDER.md)
- [Project Instructions](./CLAUDE.md)

## Need Help?

Check the [documentation folder](./.agent/) or refer to:
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Auth.js Docs](https://authjs.dev)
