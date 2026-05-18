# Complete Supabase Setup Guide (Copy & Paste Ready)

Follow these steps exactly. It takes about 10 minutes total.

---

## **STEP 1: Create Supabase Account (2 min)**

1. Go to https://supabase.com
2. Click **"Start your project"** or **Sign Up**
3. Sign in with GitHub, Google, or email
4. Click **"New Project"**
5. Fill in:
   - **Name**: `mommy-louise-orders` (or whatever you want)
   - **Password**: Create a strong password and save it
   - **Region**: Choose the closest to your location
6. Click **Create new project**
7. Wait for it to finish (2-3 minutes)

---

## **STEP 2: Get Your Credentials (2 min)**

1. In your Supabase project, go to **Settings** (bottom left icon)
2. Click **API** in the sidebar
3. Copy these two values:
   - **Project URL** (starts with `https://`)
   - **Anon public key** (long string starting with `eyJ...`)

**Keep these open - you'll need them next!**

---

## **STEP 3: Update Your .env.local File (1 min)**

Replace the placeholder values in your `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
NEXT_PUBLIC_ADMIN_PASSWORD=MommyLouise#Budget2024
```

**Example of what it should look like:**
```
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTI4MTIzMjAsImV4cCI6MTk4ODQxMjMyMH0.abc123def456ghi789
NEXT_PUBLIC_ADMIN_PASSWORD=MommyLouise#Budget2024
```

---

## **STEP 4: Create the Orders Table (3 min)**

1. In Supabase, click **SQL Editor** (left sidebar)
2. Click **New Query**
3. Paste this entire SQL code:

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

-- Create indexes for faster queries
CREATE INDEX idx_orders_email ON orders(customer_email);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);
CREATE INDEX idx_orders_package ON orders(package_name);
```

4. Click **Run** button (or press Ctrl+Enter)
5. You should see ✅ "Success" at the bottom

---

## **STEP 5: Enable Row Level Security (2 min)**

This allows your form to submit orders without a user account.

1. In Supabase, go to **Authentication** (left sidebar)
2. Click **Policies**
3. Make sure you're on the **"public" schema**
4. Find the **"orders" table** in the dropdown
5. Click **"New Policy"** button
6. Choose **"For INSERT"**
7. Click **"Start with a template"** → Select **"Enable insert for anonymous users"**
8. Click **"Review"**
9. Click **"Save policy"**

Done! ✅

---

## **STEP 6: Restart Your Dev Server (1 min)**

1. In your terminal, stop the dev server (Ctrl+C)
2. Run: `npm run dev`
3. Wait for it to start (you should see "Ready on http://localhost:3000")

---

## **STEP 7: Test It Out! (1 min)**

1. Open your website: http://localhost:3000
2. Scroll to the **Packages** section
3. Click **"Order Now"** on any package
4. Fill out the form
5. Click **"Submit Order"**
6. You should see ✅ "Order Submitted!" message

---

## **STEP 8: View Your Order in Admin Panel**

1. Go to http://localhost:3000/admin
2. Enter password: `MommyLouise#Budget2024`
3. You should see your test order in the dashboard!

---

## **Troubleshooting**

### "Cannot find supabase" error
- Did you restart the dev server after updating `.env.local`?
- Try restarting again!

### Order form shows error on submit
- Check that your `.env.local` has the correct URLs (no extra spaces)
- Make sure the RLS policy is enabled
- Check browser console (F12 → Console) for error messages

### Can't see orders in admin dashboard
- Make sure the `orders` table was created successfully
- Check Supabase → Table Editor → "orders" table exists

### Password doesn't work for admin panel
- Did you restart the dev server?
- Check that `.env.local` has exactly: `NEXT_PUBLIC_ADMIN_PASSWORD=MommyLouise#Budget2024`

---

## **Next Steps**

Once everything is working:

✅ Your website is fully functional!
✅ Orders go straight to Supabase
✅ You can view/manage them in the admin panel
✅ Export orders as CSV anytime

### Optional Future Enhancements:
- Add email notifications when orders arrive
- Create a Stripe integration for payments
- Add order status tracking
- Set up automated order confirmation emails

---

**You've got this! 💪 Let me know if you get stuck on any step.**
