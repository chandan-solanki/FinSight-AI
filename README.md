## FinSight AI

Master your money with FinSight AI — a modern finance tracker built with Next.js. It provides authentication, a landing experience, and a robust Postgres data model (via Prisma) for users, accounts, transactions, and budgets. The UI uses Tailwind and shadcn components.

Inspired by: https://github.com/piyush-eon/ai-finance-platform

### Features
- Authentication with Clerk (protected routes via middleware)
- Landing page with features, stats, testimonials (`app/page.js`)
- Prisma schema for Users, Accounts, Transactions (incl. recurring fields), and Budgets (`prisma/schema.prisma`)
- Reusable UI components (shadcn) in `components/ui/*`

Planned/optional (not yet wired in this repo):
- AI receipt scanning and insights (Gemini)
- Background jobs for recurring transactions and budget alerts (Inngest)
- Transaction analytics and emails (Resend + templates)

### Tech Stack
- Next.js (App Router), React 19
- Tailwind CSS 4, shadcn UI (Radix primitives)
- Clerk auth (`@clerk/nextjs`)
- Prisma ORM with PostgreSQL

### Prerequisites
- Node.js 18.18+ or 20+
- PostgreSQL database (connection URL)
- Clerk account (publishable + secret keys)

### Environment Variables
Create a `.env` file in the project root:

```
DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<db>
DIRECT_URL=postgres://<user>:<password>@<host>:<port>/<db>

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

# Optional Clerk paths if you customize routes
# NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
# NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

### Install & Run

```bash
# install deps
npm install

# generate prisma client
npx prisma generate

# apply schema to DB (creates tables)
npx prisma migrate dev --name init

# start dev server
npm run dev
```

Open http://localhost:3000

### Scripts
- `npm run dev` — start Next.js in dev mode (Turbopack)
- `npm run build` — production build
- `npm run start` — start prod server
- `npm run lint` — lint the project

### Project Structure (high level)
- `app/` — app router pages and layouts
	- `layout.js` — root layout, Clerk provider, header/footer
	- `page.js` — landing page
	- `(auth)/sign-in`, `(auth)/sign-up` — Clerk auth routes
- `components/` — `Header`, `HeroSection`, and `ui/*` primitives
- `prisma/schema.prisma` — data models for User, Account, Transaction, Budget
- `lib/utils.js` — utility helpers (className merge)
- `middleware.js` — protects routes with Clerk
- `next.config.mjs`, `postcss.config.mjs`, `tailwind` config files

### Data Model Overview
- User: links to Accounts, Transactions, Budgets
- Account: name, type (CURRENT/SAVINGS), balance, isDefault
- Transaction: type (INCOME/EXPENSE), amount, date, category, recurring fields
- Budget: per-user budget amount

### Auth & Protected Routes
Middleware guards routes like `/dashboard`, `/account`, `/transactions`. Unauthenticated users are redirected to sign-in.

### Notes / Next Steps
- Seed data: add a Prisma seed script if needed.
- If you want AI receipts/insights or scheduled jobs like the reference project, add server actions and providers (Gemini, Inngest, Resend) and wire them to these models.

### License
This project is for learning/demo purposes. Credits to the original inspiration linked above.
