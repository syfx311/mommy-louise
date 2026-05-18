# Admin Panel Setup Guide

Your professional admin dashboard is ready at `/admin`!

## Quick Setup

### 1. Set Your Admin Password

Update your `.env.local` file with a strong password:

```
NEXT_PUBLIC_ADMIN_PASSWORD=your_super_secure_password_here
```

⚠️ **IMPORTANT**: Change this to something secure that only you know!

### 2. Access Your Admin Dashboard

1. Go to: `http://your-domain.com/admin`
2. Enter your password
3. You're in!

## Features

✅ **View All Orders**
- Clean table view of all incoming orders
- Sorted by most recent first
- Real-time updates (refreshes every 30 seconds)

✅ **Search & Filter**
- Search by customer name or email
- Filter by package type
- Quick clear button to reset filters

✅ **Order Details**
- Click the eye icon to view full order details
- See all customization preferences
- View customer contact information

✅ **Export Data**
- Export all filtered orders to CSV
- Perfect for billing, shipping, or analysis
- One-click download

✅ **Manage Orders**
- Delete orders if needed
- Modal view for detailed information

## Security Notes

- Password is stored in `.env.local` (not committed to git)
- Uses browser localStorage for session (clears on browser close recommended)
- Only basic password auth (suitable for personal use)
- For production: consider adding proper authentication

### Upgrade to Better Security

If you want more secure authentication:

1. **Option 1: Email-based login** (recommended)
   - Users enter email code sent to their inbox
   - More secure than password

2. **Option 2: Supabase Auth**
   - Built-in auth system
   - Password recovery, 2FA, SSO options
   - More robust for shared access

Let me know if you'd like me to implement either of these!

## Troubleshooting

**"Password incorrect" error**
- Make sure you restarted your dev server after changing `.env.local`
- Check for typos in your password

**Orders not showing**
- Make sure your Supabase database is set up with the `orders` table
- Check that your Supabase credentials in `.env.local` are correct

**CSV export not working**
- Try a different browser
- Check browser console for errors (F12 → Console)

---

Your admin dashboard is now live! 🎉

