# Vercel Environment Variables Setup

## Quick Setup (Manual)

1. Go to: https://vercel.com/rowels-projects-2b801109/career-platform/settings/environment-variables

2. Add these environment variables (click "Add" for each):

### Required Variables:

**NEXT_PUBLIC_SUPABASE_URL**
```
https://rsrqcdiejjgankzdfydc.supabase.co
```

**NEXT_PUBLIC_SUPABASE_ANON_KEY**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzcnFjZGllampnYW5remRmeWRjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkzNDI2NjAsImV4cCI6MjA3NDkxODY2MH0.akq0S-qdBJGKHxrhNe1PDgW9KcJ4cNMlp3xsWJS244M
```

**SUPABASE_SERVICE_ROLE_KEY**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJzcnFjZGllampnYW5remRmeWRjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTM0MjY2MCwiZXhwIjoyMDc0OTE4NjYwfQ.ab9OkKICxRdAjUI-nDzrO_UDIm-zbZPkXn3-JO3g-e4
```

**NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY**
```
pk_test_bmV1dHJhbC1taXRlLTc4LmNsZXJrLmFjY291bnRzLmRldiQ
```

**CLERK_SECRET_KEY**
```
sk_test_ZSsSmMifDcDvjYTLbjE7A1eI780jLRBkYTXhrfI4L0
```

**NEXT_PUBLIC_CLERK_SIGN_IN_URL**
```
/sign-in
```

**NEXT_PUBLIC_CLERK_SIGN_UP_URL**
```
/sign-up
```

**NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL**
```
/dashboard
```

**NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL**
```
/onboarding
```

3. Click "Save" after adding all variables

4. Redeploy: https://vercel.com/rowels-projects-2b801109/career-platform/deployments

---

## Or Use CLI (Faster):

Run these commands in the terminal:

```bash
cd career-platform

vercel env add NEXT_PUBLIC_SUPABASE_URL production
# Paste: https://rsrqcdiejjgankzdfydc.supabase.co

vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
# Paste the anon key...

# ... repeat for all variables
```
