# Quick Start Guide

Get the production order system running in 15 minutes.

## Prerequisites

- Supabase project (already created)
- Resend account (create free at https://resend.com)
- Node.js 18+

## Step 1: Get Your Keys (5 minutes)

### Supabase Keys
Already in your environment:
```
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### Resend API Key
1. Go to https://resend.com
2. Sign up (free)
3. Create API key
4. Copy key: `re_xxxxx...`

## Step 2: Set Up Environment (2 minutes)

Create `.env.local`:

```env
# Already set in environment
NEXT_PUBLIC_SUPABASE_URL=https://mottnljsgmmqppzeevax.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[from environment]

# Add these
RESEND_API_KEY=re_your_actual_key_here
NEXT_PUBLIC_ADMIN_PASSWORD=YourSecurePassword123!
ADMIN_EMAIL=tramiecha@gmail.com
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Step 3: Create Database (3 minutes)

1. Go to Supabase dashboard
2. SQL Editor → New Query
3. Copy-paste entire contents of: `supabase/migrations/001_create_orders_schema.sql`
4. Click Run ▶️
5. Wait for success ✅

That's it! All tables created.

## Step 4: Install Dependencies (3 minutes)

```bash
npm install resend
npm run dev
```

Server starts at http://localhost:3000

## Step 5: Test It (2 minutes)

### Create Test Order

Go to http://localhost:3000 and submit an order in the form.

Or use curl:

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "packageName": "Test Package",
    "customerName": "Test User",
    "customerEmail": "test@example.com"
  }'
```

Expected: `{ "success": true, "orderNumber": "ML-2026-000001", ... }`

### Check in Supabase

1. Go to Supabase Dashboard
2. Table Editor
3. Select `orders` table
4. You should see your test order ✅

### Access Admin Dashboard

1. Go to http://localhost:3000/admin
2. Enter password: `YourSecurePassword123!`
3. See your order in the list
4. Click the eye icon to view details

## Common Tasks

### Test Email Sending

Check Resend dashboard:
1. Go to https://resend.com
2. Login
3. Go to Emails tab
4. Should see recent sends ✅

If not received:
- Check spam folder
- Try resending from admin dashboard
- Check RESEND_API_KEY is correct

### Update Admin Password

Edit `.env.local`:
```env
NEXT_PUBLIC_ADMIN_PASSWORD=NewPassword123!
```

Restart server (Ctrl+C, `npm run dev`)

### View Email Logs

In Supabase:
1. Table Editor
2. Select `email_logs` table
3. See all sent/failed emails
4. Check `error_message` for failures

### Export Orders as CSV

1. Go to http://localhost:3000/admin
2. Use filters if needed
3. Click "Export CSV" button
4. Opens in Excel

## Architecture Overview

```
Form Submission
    ↓
Save to Supabase (GUARANTEED)
    ↓
Generate Order Number
    ↓
Send Emails via Resend (async)
    ↓
Show Success Message
```

**Key Point**: Order is saved to database BEFORE sending emails. If emails fail, the order still exists.

## File Map

- **Customer facing**: `app/page.tsx` (order form)
- **API**: `app/api/orders/route.ts` (creates order + sends emails)
- **Admin**: `app/admin/page.tsx` (manage orders)
- **Database**: `lib/database.ts` (queries)
- **Email**: `lib/resend.ts` (templates)

## Troubleshooting

### "Cannot find module 'resend'"
```bash
npm install resend
npm run dev
```

### "Supabase credentials not found"
Check `.env.local` has:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### "Email not sending"
Check:
1. `RESEND_API_KEY` is set
2. No typos in API key
3. Check https://resend.com for delivery status

### "Admin dashboard blank"
1. Check database has orders (go to Supabase table editor)
2. Check browser console for errors (F12)
3. Verify Supabase connection

### "Orders not saving"
1. Check Supabase is connected
2. Check RLS policies (should allow inserts)
3. Check network tab in browser for 500 errors

## Next Steps

### For Development
- Add form validation in frontend
- Create tests in `__tests__` folder
- Add more email templates
- Set up staging environment

### For Production
1. Follow `docs/SETUP.md` completely
2. Follow `docs/DEPLOYMENT_CHECKLIST.md`
3. Deploy to Vercel: `git push origin main`
4. Set env vars in Vercel dashboard
5. Test everything again

### For Enhanced Features
- Add payment processing (Stripe)
- Add SMS notifications
- Create customer portal
- Add inventory tracking

## Support Resources

- **Supabase Docs**: https://supabase.com/docs
- **Resend Docs**: https://resend.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs

## Key Commands

```bash
# Start development server
npm run dev

# Run type checking
npx tsc --noEmit

# Build for production
npm run build

# Start production server
npm start

# Install dependencies
npm install
```

## Environment Variables Reference

| Variable | Purpose | Required | Example |
|----------|---------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase API key | Yes | `eyJxx...` |
| `RESEND_API_KEY` | Resend email API | Yes | `re_xxx...` |
| `NEXT_PUBLIC_ADMIN_PASSWORD` | Admin dashboard password | Yes | `MyPassword123!` |
| `ADMIN_EMAIL` | Where to send new order alerts | Yes | `admin@example.com` |
| `NEXT_PUBLIC_APP_URL` | App URL for email links | Yes | `http://localhost:3000` |

## Done! 🎉

Your order system is running. Now you can:

1. **Users**: Submit orders via the form
2. **System**: Saves to database, sends emails
3. **Admin**: Manage at `/admin`
4. **Database**: Track everything in Supabase

You're ready to ship! 🚀

---

Questions? Check `docs/SETUP.md` for detailed guide or `docs/IMPLEMENTATION_SUMMARY.md` for architecture details.
