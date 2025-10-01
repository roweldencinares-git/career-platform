# Career Platform Setup Guide

## 🚀 Quick Start

### 1. Database Setup (Do this first!)

Go to your Supabase project: https://supabase.com/dashboard/project/rsrqcdiejjgankzdfydc

1. Click **SQL Editor** in left sidebar
2. Click **New Query**
3. Copy the entire contents of `sql/schema.sql`
4. Paste into the SQL editor
5. Click **Run** (or press Ctrl+Enter)
6. You should see "Success. No rows returned"

### 2. Install Dependencies

```bash
cd career-platform
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open http://localhost:3000

### 4. Deploy to Vercel

```bash
# Install Vercel CLI (if not already)
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# - NEXT_PUBLIC_SUPABASE_URL
# - NEXT_PUBLIC_SUPABASE_ANON_KEY
# - SUPABASE_SERVICE_ROLE_KEY
# - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# - CLERK_SECRET_KEY
```

## 📋 Environment Variables

Already configured in `.env.local` (not committed to Git)

## 🗄️ Database Schema Applied

- ✅ clients (job seekers)
- ✅ coaches (career coaches/admins)
- ✅ applications (job applications)
- ✅ resumes (resume versions + AI feedback)
- ✅ interviews (coaching sessions)
- ✅ interview_types (30min/60min sessions)
- ✅ coach_availability (weekly schedule)
- ✅ feedback (AI + coach feedback)

## 🔐 Authentication

Using Clerk for multi-role authentication:
- Clients (job seekers)
- Coaches (career coaches)
- Admins (platform administrators)

## 📁 Project Structure

```
career-platform/
├── app/                  # Next.js app directory
├── lib/                  # Shared utilities & services
├── components/           # React components
├── sql/                  # Database schema
└── .env.local           # Environment variables (not in Git)
```
