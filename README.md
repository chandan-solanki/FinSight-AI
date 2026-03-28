## FinSight AI

**Preface:** FinSight AI is a production-ready, full-stack personal finance management platform that empowers users to take control of their money through intelligent automation and AI-driven insights. Built on a modern tech stack featuring Next.js 15.5, Prisma ORM, and PostgreSQL, it seamlessly combines multi-account tracking, AI-powered receipt scanning with Google Gemini, automated budget alerts, and background job processing to deliver a secure, scalable, and beautiful financial management experience. Whether you're a developer exploring full-stack architecture patterns, a contributor looking to extend functionality, or a user seeking intelligent control over your finances, FinSight AI provides a comprehensive platform backed by enterprise-grade security, responsive design, and cutting-edge automation.

---

## FinSight AI - Overview

Master your money with FinSight AI — a modern, AI-powered finance tracker built with Next.js. Track your income and expenses, manage multiple accounts, set budgets, and get intelligent insights from receipt scanning. Built with cutting-edge technologies for performance, security, and user experience.

---

## 🚀 Features

### 💼 Financial Management
- **Multi-Account Support** - Manage multiple bank accounts (Current & Savings)
- **Transaction Tracking** - Record and categorize income and expenses
- **Recurring Transactions** - Automated handling of recurring bills and income (Daily, Weekly, Monthly, Yearly)
- **Budget Management** - Set monthly budgets with automatic alerts
- **Dashboard Analytics** - Comprehensive financial overview with charts and statistics
- **Transaction History** - Detailed transaction logs with filtering and search

### 🤖 AI-Powered Features
- **Receipt Scanning** - AI-powered receipt OCR using Google Gemini AI
- **Smart Categorization** - Automatic transaction categorization
- **Financial Insights** - AI-generated spending analytics

### 🔔 Automation & Notifications
- **Budget Alerts** - Automated email notifications for budget thresholds (50%, 75%, 90%, 100%)
- **Recurring Transaction Processing** - Background jobs for automatic recurring transactions
- **Email Notifications** - Beautiful HTML email templates with React Email
- **Scheduled Jobs** - Cron-based background tasks with Inngest

### 🔒 Security & Auth
- **User Authentication** - Secure authentication with Clerk
- **Protected Routes** - Middleware-based route protection
- **Rate Limiting** - Arcjet security middleware for API protection
- **Data Validation** - Zod schema validation for all inputs

### 🎨 User Experience
- **Responsive Design** - Mobile-first, fully responsive UI
- **Dark Mode** - Theme switching support
- **Modern UI Components** - Beautiful components built with Radix UI and shadcn/ui
- **Interactive Charts** - Data visualization with Recharts
- **Real-time Updates** - Optimistic UI updates
- **Toast Notifications** - User feedback with Sonner

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15.5 (App Router, React Server Components)
- **Language**: React 19.2
- **Styling**: Tailwind CSS 4, tailwind-merge
- **UI Components**: Radix UI primitives, shadcn/ui, Vaul (drawer)
- **Icons**: Lucide React
- **Forms**: React Hook Form with Zod validation
- **Charts**: Recharts
- **Date Handling**: date-fns, react-day-picker
- **Loading States**: react-spinners
- **Notifications**: Sonner (toast)

### Backend & Database
- **Database**: PostgreSQL
- **ORM**: Prisma 6.14
- **Authentication**: Clerk
- **API**: Next.js Server Actions & API Routes

### AI & Automation
- **AI**: Google Generative AI (Gemini) for receipt scanning
- **Background Jobs**: Inngest (cron jobs, event-driven functions)
- **Email Service**: Resend
- **Email Templates**: React Email

### Security & Middleware
- **Security**: Arcjet (rate limiting, bot protection)
- **Validation**: Zod

### DevOps & Tooling
- **Package Manager**: npm
- **Linting**: ESLint 9
- **Build**: Next.js Turbopack
- **Development**: Inngest CLI for local background jobs

---

## 📊 Data Models

### User
- Clerk integration for authentication
- Email, name, profile image
- Linked to accounts, transactions, and budgets

### Account
- **Types**: Current, Savings
- Balance tracking
- Default account flag
- User-specific accounts

### Transaction
- **Types**: Income, Expense
- Amount, description, category
- Date tracking
- Receipt URL storage
- **Recurring Support**: Daily, Weekly, Monthly, Yearly intervals
- **Status**: Pending, Completed, Failed
- Linked to user and account

### Budget
- Monthly budget amount
- Alert tracking (last alert sent timestamp)
- User-specific budgets

---

## 🔌 API Reference

### Server Actions

#### Account Management (`actions/account.js`)
- `getAccounts()` - Fetch user accounts
- `createAccount(data)` - Create new account
- `updateAccount(id, data)` - Update account details
- `deleteAccount(id)` - Delete account

#### Budget Operations (`actions/budget.js`)
- `getCurrentBudget(accountId)` - Get current budget and spending
- `updateBudget(amount)` - Update budget amount

#### Transaction Management (`actions/createtransaction.js`)
- `createTransaction(data)` - Create new transaction
- `getTransaction(id)` - Get transaction by ID
- `updateTransaction(id, data)` - Update transaction
- `scanReceipt(file)` - AI-powered receipt scanning

#### Dashboard (`actions/dashboard.js`)
- `getDashboardData(params)` - Get comprehensive dashboard data
- `getAccounts()` - Fetch all user accounts

#### Email Service (`actions/send-email.js`)
- `sendEmail({ to, subject, react })` - Send HTML emails

#### Utilities (`actions/seeds.js`)
- `seedTransactions()` - Seed sample transaction data

### API Routes

#### `/api/inngest`
- Inngest webhook endpoint for background job processing
- Handles cron triggers and event-driven functions

#### `/api/seed`
- Database seeding endpoint
- Populates sample data for testing

### Background Functions (Inngest)

#### Budget Alert Checker
- **Schedule**: Every 6 hours (`0 */6 * * *`)
- **Function**: Monitors spending against budget
- **Alerts**: Sends email notifications at 50%, 75%, 90%, and 100% thresholds

#### Recurring Transaction Processor
- **Schedule**: Daily at midnight (`0 0 * * *`)
- **Function**: Processes due recurring transactions
- **Actions**: Creates new transactions based on recurring schedules

#### AI Transaction Insights
- **Trigger**: Event-based
- **Function**: Generates spending insights using Gemini AI
- **Output**: Personalized financial recommendations

---

## 📁 Project Structure

```
FinSight AI/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes
│   │   ├── sign-in/         # Clerk sign-in page
│   │   └── sign-up/         # Clerk sign-up page
│   ├── (main)/              # Protected main app routes
│   │   ├── dashboard/       # Dashboard with analytics
│   │   ├── account/         # Account management
│   │   └── transaction/     # Transaction management
│   ├── api/                 # API routes
│   │   ├── inngest/         # Inngest webhook
│   │   └── seed/            # Database seeding
│   └── lib/                 # App-specific utilities
│       └── schema.js        # Zod validation schemas
├── actions/                 # Server actions
│   ├── account.js           # Account operations
│   ├── budget.js            # Budget management
│   ├── createtransaction.js # Transaction CRUD
│   ├── dashboard.js         # Dashboard data
│   ├── send-email.js        # Email service
│   └── seeds.js             # Data seeding
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── CreateAccountDrawer.jsx
│   ├── Header.jsx
│   └── HeroSection.jsx
├── lib/                     # Shared utilities
│   ├── prisma.js            # Prisma client
│   ├── arject.js            # Arcjet config
│   ├── checkUser.js         # User verification
│   ├── utils.js             # Helper functions
│   └── inngest/             # Inngest configuration
│       ├── client.js        # Inngest client
│       └── functions.js     # Background functions
├── prisma/                  # Database
│   ├── schema.prisma        # Database schema
│   └── migrations/          # Migration history
├── emails/                  # Email templates
│   └── my-email.jsx         # React Email template
├── data/                    # Static data
│   ├── categories.js        # Transaction categories
│   └── landing.js           # Landing page content
├── hooks/                   # Custom React hooks
│   └── use-fetch.js         # Data fetching hook
└── middleware.js            # Auth & security middleware

```

---

## ⚙️ Prerequisites

Before running this project, ensure you have:

- **Node.js** 18.18+ or 20+
- **PostgreSQL** database (local or cloud-hosted)
- **Clerk Account** - For authentication ([clerk.com](https://clerk.com))
- **Inngest Account** - For background jobs ([inngest.com](https://inngest.com))
- **Google AI API Key** - For Gemini AI ([aistudio.google.com](https://aistudio.google.com))
- **Resend API Key** - For email service ([resend.com](https://resend.com))
- **Arcjet API Key** - For security ([arcjet.com](https://arcjet.com))

---

## 🔐 Environment Variables

Create a `.env` file in the project root with the following variables:

```env
# Database
DATABASE_URL="postgresql://user:password@host:port/database"
DIRECT_URL="postgresql://user:password@host:port/database"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx

# Optional: Custom Clerk routes
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Google AI (Gemini)
GEMINI_API_KEY=your_gemini_api_key

# Inngest
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Resend (Email)
RESEND_API_KEY=re_xxxxx

# Arcjet (Security)
ARCJET_KEY=ajkey_xxxxx
```

---

## 🚀 Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/chandan-solanki/FinSight-AI.git
cd FinSight-AI
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Set Up Database
```bash
# Generate Prisma Client
npx prisma generate

# Run migrations to create database tables
npx prisma migrate dev --name init

# (Optional) Seed sample data
npm run dev
# Then visit http://localhost:3000/api/seed
```

### 4. Start Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Run Inngest Dev Server (Optional)
For testing background jobs locally:
```bash
npm run inngest-cli
```

This starts the Inngest dev server at [http://localhost:8288](http://localhost:8288) where you can trigger and monitor background functions.

---

## 📜 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js development server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run email` | Start React Email development server |
| `npm run inngest-cli` | Start Inngest dev server for local testing |
| `npm run postinstall` | Auto-generates Prisma Client (runs after npm install) |

---

## 🎯 Usage Guide

### Creating an Account
1. Sign up using Clerk authentication
2. Navigate to Dashboard
3. Click "Create Account" drawer
4. Enter account details (name, type, initial balance)
5. Set as default account if desired

### Adding Transactions
1. Go to "Create Transaction" page
2. Fill in transaction details:
   - Type (Income/Expense)
   - Amount
   - Category
   - Description
   - Date
   - Account selection
3. Optional: Upload receipt for AI scanning
4. Optional: Set as recurring transaction
5. Submit

### AI Receipt Scanning
1. When creating a transaction, upload a receipt image
2. AI will automatically extract:
   - Amount
   - Merchant name
   - Date
   - Category suggestion
3. Review and adjust if needed

### Setting Budget
1. Access Budget settings from Dashboard
2. Enter monthly budget amount
3. Receive email alerts at 50%, 75%, 90%, and 100% of budget

### Viewing Analytics
- **Dashboard**: Overview of all accounts, recent transactions, budget progress
- **Account Details**: Transaction history per account with charts
- **Charts**: Spending trends, category breakdowns, income vs expenses

---

## 🔄 Background Jobs

### Budget Alerts
- **Frequency**: Every 6 hours
- **Function**: Checks spending vs budget for all users
- **Action**: Sends email alerts when reaching budget thresholds

### Recurring Transactions
- **Frequency**: Daily at midnight
- **Function**: Processes all due recurring transactions
- **Action**: Automatically creates transactions based on schedule

### AI Insights
- **Trigger**: On-demand or scheduled
- **Function**: Analyzes spending patterns
- **Action**: Generates personalized financial insights

---

## 🔒 Security Features

- **Authentication**: Clerk-based secure authentication
- **Route Protection**: Middleware guards all protected routes
- **Rate Limiting**: Arcjet prevents API abuse
- **Input Validation**: Zod schemas validate all inputs
- **SQL Injection Protection**: Prisma ORM parameterized queries
- **XSS Protection**: React automatic escaping
- **CSRF Protection**: Next.js built-in protection

---

## 🎨 UI Components

Built with shadcn/ui and Radix UI primitives:
- Button, Input, Select, Checkbox, Switch
- Card, Dialog, Dropdown Menu, Popover
- Table, Pagination, Tooltip, Progress
- Calendar, Date Picker
- Drawer (Vaul)
- Toast Notifications (Sonner)

---

## 📧 Email Templates

HTML email templates built with React Email:
- Budget alert emails
- Welcome emails
- Transaction notifications
- Monthly summaries

Test emails locally:
```bash
npm run email
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Chandan Solanki**
- GitHub: [@chandan-solanki](https://github.com/chandan-solanki)

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Clerk](https://clerk.com/) - Authentication
- [Prisma](https://www.prisma.io/) - Database ORM
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [Inngest](https://www.inngest.com/) - Background jobs
- [Resend](https://resend.com/) - Email service
- [Google AI](https://ai.google.dev/) - Gemini AI
- [Arcjet](https://arcjet.com/) - Security

---

## 📞 Support

For support, email your-email@example.com or open an issue on GitHub.

---

<div align="center">
  <strong>Built with ❤️ using Next.js and modern web technologies</strong>
</div>


