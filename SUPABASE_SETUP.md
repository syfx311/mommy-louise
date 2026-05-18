# Supabase Setup Guide for Order Management

## Step 1: Get Your Supabase Credentials

1. Go to [supabase.com](https://supabase.com) and sign in
2. Create a new project or select your existing project
3. Go to **Settings → API** in your project dashboard
4. Copy:
   - **Project URL** → Use as `NEXT_PUBLIC_SUPABASE_URL`
   - **Anon public key** → Use as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Step 2: Add Credentials to .env.local

Update your `.env.local` file with your Supabase credentials:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 3: Create the Orders Table

1. In your Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Paste and run this SQL:

```sql
CREATE TABLE orders (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  package_name TEXT NOT NULL,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT,
  binder_type TEXT,
  colors TEXT,
  inserts TEXT[],
  challenges TEXT,
  special_requests TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::TEXT, NOW())
);

-- Create index for faster queries
CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
```

## Step 4: Set Row Level Security (RLS)

1. Go to **Authentication → Policies** in Supabase
2. Find the `orders` table
3. Click **New Policy** and select **For INSERT**
4. Enable anonymous inserts (this allows your form to work)
   - Or create a custom policy based on your security needs

## Step 5: Test the Order Form

1. Refresh your website
2. Click "Order Now" on any package
3. Fill out the form and submit
4. Check your Supabase dashboard → **orders** table to see the submission

## Step 6: View & Manage Orders

- Go to **Table Editor** in Supabase
- Click the **orders** table
- All submitted orders will appear here with timestamps
- You can export to CSV, filter, and manage orders directly

## Customization Tips

### Change Email on Submission
To get notified when orders come in, add an email integration:
1. Install a service like SendGrid or Mailgun
2. Create a webhook in Supabase that triggers on new orders
3. This will send you an email for each order automatically

### Add Status Tracking
Add a `status` column to track order progress:
```sql
ALTER TABLE orders ADD COLUMN status TEXT DEFAULT 'pending';
```

Then update orders from `pending` → `confirmed` → `shipped` etc.

### Export Orders
1. Go to **Table Editor → orders**
2. Click the three dots menu
3. Select **Export** to download as CSV

---

Your order system is now live! 🎉
