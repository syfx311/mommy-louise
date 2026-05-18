# Production Order System Setup Guide

## Prerequisites

- Next.js 16+ App Router
- Supabase account with a project
- Resend account (free tier available)
- Vercel account (for deployment)

## Step 1: Supabase Setup

### 1.1 Create Supabase Database Tables

1. Go to your Supabase dashboard: https://supabase.com
2. Select your project
3. Go to SQL Editor
4. Copy and paste the SQL from `supabase/migrations/001_create_orders_schema.sql`
5. Run the migration

The migration creates these tables:
- `customers` - Customer information
- `orders` - Order records
- `order_items` - Line items for each order
- `payments` - Payment tracking
- `email_logs` - Email delivery history

### 1.2 Supabase Environment Variables

Your Supabase project is already connected. Verify these env vars are set:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

These are already in your environment variables.

## Step 2: Resend Email Setup

### 2.1 Create Resend Account

1. Go to https://resend.com
2. Sign up for a free account
3. Create a new API key
4. Verify your sending domain (use `resend.dev` for testing)

### 2.2 Add Resend API Key

Add to `.env.local`:

```env
RESEND_API_KEY=re_your_actual_api_key_here
```

**For Production:**

To send from your own domain:

1. In Resend dashboard, add your domain
2. Follow DNS instructions for SPF and DKIM
3. Once verified, update email sender:

In `lib/resend.ts`, change:
```typescript
from: 'Mommy Louise Budget PH <orders@resend.dev>',
```

To:
```typescript
from: 'Mommy Louise Budget PH <orders@yourdomain.com>',
```

### 2.3 Update Admin Email

The admin notification email is sent to the `ADMIN_EMAIL` env var:

```env
ADMIN_EMAIL=tramiecha@gmail.com
```

This is already set in your environment.

## Step 3: Installation

### 3.1 Install Dependencies

Resend is already installed. Verify:

```bash
npm list resend
```

### 3.2 Verify File Structure

Ensure these files exist:

```
lib/
├── resend.ts          ✅ Email service
├── database.ts        ✅ Database layer
├── supabase.ts        ✅ Supabase client
└── email.ts           ⚠️ (deprecated, kept for backwards compatibility)

app/api/orders/
├── route.ts           ✅ Create order endpoint
└── [orderId]/
    └── resend-email/
        └── route.ts   ✅ Retry email endpoint

components/
├── admin-dashboard.tsx          ✅ Enhanced dashboard
├── order-detail-modal.tsx       ✅ Order details
└── admin-login.tsx              ✅ Admin auth

supabase/migrations/
└── 001_create_orders_schema.sql ✅ Database schema
```

## Step 4: Order Flow (Updated)

When a customer submits an order:

1. **API receives request** → `/api/orders` (POST)
2. **Database FIRST** → Order created in Supabase (guaranteed)
3. **Generate order number** → Format: `ML-2026-000123`
4. **Customer email** → Resend sends confirmation email
5. **Admin email** → Resend sends notification to ADMIN_EMAIL
6. **Email logs** → Stored in `email_logs` table
7. **Response** → Returns order ID and number (success even if emails fail)

### Important: Order is saved BEFORE emails

Even if email sending fails, the order exists in the database. Email delivery failures don't block the order creation.

## Step 5: Admin Dashboard Features

### Access the Dashboard

- URL: `/admin`
- Password: Set via `NEXT_PUBLIC_ADMIN_PASSWORD` env var
- Default: `admin123` (change this in production!)

### Dashboard Capabilities

✅ **View all orders**
- Order number, date, customer
- Order status, payment status
- Quick actions

✅ **Search and filter**
- Search by name, email, order number
- Filter by order status (pending, processing, shipped, etc.)
- Filter by payment status (paid, unpaid, refunded)

✅ **Order management**
- Click order to view full details
- Update order status with dropdown
- Update payment status with dropdown
- Add internal admin notes

✅ **Email management**
- Resend customer confirmation email
- Resend admin notification email
- Email delivery history in email_logs table

✅ **Data export**
- Export all filtered orders to CSV
- Includes all order details

✅ **Security**
- Admin password protected
- Server-side validation
- Environment variable protection

## Step 6: Email Templates

### Customer Confirmation Email

- Order number (e.g., ML-2026-000123)
- Package details
- Custom specifications (binder type, colors, inserts)
- Special requests acknowledgment

### Admin Notification Email

- Customer contact information
- Full order details
- Link to admin dashboard
- Call to action for order processing

### Email Template Files

Located in `lib/resend.ts`:

```typescript
emailTemplates.customerConfirmation(...)  // For customers
emailTemplates.adminNotification(...)     // For admin
```

## Step 7: Testing

### Test Local Order Creation

```bash
curl -X POST http://localhost:3000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "packageName": "Deluxe Package",
    "customerName": "John Doe",
    "customerEmail": "john@example.com",
    "customerPhone": "555-1234",
    "binderType": "A4",
    "colors": "Pink and White",
    "challenges": "Tight budget",
    "specialRequests": "Please add gold accents"
  }'
```

Expected response:
```json
{
  "success": true,
  "orderId": "uuid-here",
  "orderNumber": "ML-2026-000001",
  "emailSent": true
}
```

### Test Admin Dashboard

1. Go to `/admin`
2. Enter password
3. View orders from Supabase
4. Test resend email functionality
5. Test status updates

### Test Email Resend

In admin dashboard, click the three-dot menu on any order and select:
- "Resend Customer Email"
- "Resend Admin Email"

This hits `/api/orders/[orderId]/resend-email`

## Step 8: Deployment to Vercel

### 8.1 Environment Variables

In Vercel dashboard, add these env vars:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
NEXT_PUBLIC_APP_URL=https://yourdomain.com
RESEND_API_KEY=re_your_api_key
EMAIL_USER=your-email@gmail.com     (deprecated, can be removed)
EMAIL_PASSWORD=your-app-password     (deprecated, can be removed)
ADMIN_EMAIL=admin@yourdomain.com
```

### 8.2 Deploy

```bash
git push origin main
```

Vercel will automatically deploy. Verify:

1. `/api/orders` responds
2. `/admin` loads
3. Emails are being sent (check Resend dashboard)

### 8.3 Monitor Production

- Resend dashboard: https://resend.com/emails
- Supabase dashboard: Check orders/email_logs tables
- Vercel logs: Check function logs

## Step 9: Security Checklist

✅ **Server-side validation**
- All API routes validate input
- Email regex validation
- Required fields checking

✅ **Database security**
- RLS (Row Level Security) enabled
- UUID primary keys
- Timestamps for audit trail

✅ **Environment variables**
- RESEND_API_KEY is secret
- NEXT_PUBLIC_ADMIN_PASSWORD should be strong
- No sensitive data in client-side code

✅ **Email security**
- No customer emails exposed in admin UI (only show on demand)
- Admin notes are internal only
- Email logs track all sending

✅ **API security**
- POST only, no GET
- Error handling without sensitive details
- No direct database queries from client

## Troubleshooting

### Emails not sending

1. Check RESEND_API_KEY in env vars
2. Check Resend dashboard for errors
3. Verify sender domain is verified in Resend
4. Check email_logs table for failure records

### Orders not saving

1. Check Supabase connection: `lib/supabase.ts`
2. Verify database tables exist
3. Check Supabase logs for errors
4. Verify RLS policies allow writes

### Admin dashboard issues

1. Check localStorage for `admin_authenticated`
2. Verify NEXT_PUBLIC_ADMIN_PASSWORD is set
3. Check browser console for errors
4. Verify orders table has data

### Order resend email fails

1. Check if order exists in database
2. Verify ADMIN_EMAIL is set
3. Check Resend API key
4. Check email_logs for error messages

## Support

- Supabase docs: https://supabase.com/docs
- Resend docs: https://resend.com/docs
- Next.js docs: https://nextjs.org/docs

## File Summary

### New Files
- `lib/resend.ts` - Resend email service
- `lib/database.ts` - Database operations
- `app/api/orders/[orderId]/resend-email/route.ts` - Email retry endpoint
- `supabase/migrations/001_create_orders_schema.sql` - Database schema

### Modified Files
- `app/api/orders/route.ts` - Updated for database-first flow
- `components/admin-dashboard.tsx` - Enhanced with full features
- `components/order-detail-modal.tsx` - Added admin notes and actions

### Kept Files (backwards compatible)
- `lib/email.ts` - Can be removed if no longer needed
