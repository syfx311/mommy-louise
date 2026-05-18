# Production Deployment Checklist

## Pre-Deployment

### Database
- [ ] Supabase project created
- [ ] SQL migration executed (`supabase/migrations/001_create_orders_schema.sql`)
- [ ] All tables created: customers, orders, order_items, payments, email_logs
- [ ] RLS policies enabled on all tables
- [ ] Indexes created for performance
- [ ] Backup configured in Supabase

### Email Service
- [ ] Resend account created at https://resend.com
- [ ] API key generated
- [ ] Domain verified (or using resend.dev for testing)
- [ ] SPF/DKIM records configured if using custom domain
- [ ] Test email sent successfully

### Environment Variables
Set in Vercel dashboard or `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password (NOT admin123)
NEXT_PUBLIC_APP_URL=https://yourdomain.com
RESEND_API_KEY=re_your_key
ADMIN_EMAIL=your-email@yourdomain.com
```

### Code Changes
- [ ] Removed old Nodemailer/Gmail references (if not needed)
- [ ] Updated email sender address in `lib/resend.ts`
- [ ] Verified all imports are correct
- [ ] No console.log or debug code in production
- [ ] Error handling is graceful

### Testing
- [ ] Created test order via `/api/orders`
- [ ] Verified order appears in Supabase dashboard
- [ ] Customer confirmation email received
- [ ] Admin notification email received
- [ ] Admin dashboard loads at `/admin`
- [ ] Can update order status
- [ ] Can resend emails from admin dashboard
- [ ] Email logs recorded correctly

## Deployment Steps

### 1. Verify Build

```bash
npm run build
```

No errors should occur.

### 2. Test Locally

```bash
npm run dev
```

- Order form submission works
- Orders saved to Supabase
- Emails sent via Resend
- Admin dashboard functional

### 3. Deploy to Vercel

```bash
git push origin main
```

Vercel will:
- Detect Next.js project
- Build automatically
- Deploy to production
- Set environment variables

### 4. Post-Deployment Verification

1. **Test Order Submission**
   - Go to homepage
   - Submit order
   - Verify email received
   - Check Supabase for order record

2. **Test Admin Dashboard**
   - Go to `/admin`
   - Login with password
   - Verify orders appear
   - Test resend email
   - Test status updates

3. **Monitor Resend**
   - Check Resend dashboard for delivery status
   - Verify no bounces or failures
   - Check email logs in Supabase

4. **Check Vercel Logs**
   - Go to Vercel dashboard
   - Check function logs for errors
   - Monitor API route response times

## Production Monitoring

### Daily Checks

- [ ] No API errors in Vercel logs
- [ ] Email delivery success rate in Resend
- [ ] New orders appearing in Supabase
- [ ] Admin dashboard responsive

### Weekly Reviews

- [ ] Review failed email logs
- [ ] Check for any unprocessed orders
- [ ] Verify backup status
- [ ] Review admin notes for patterns

### Monthly Maintenance

- [ ] Clean up old email logs (optional)
- [ ] Update admin password if needed
- [ ] Review database performance
- [ ] Update dependencies

## Troubleshooting

### Emails Not Sending

**Symptom**: Orders created but emails not received

**Checklist**:
1. [ ] RESEND_API_KEY is set in Vercel
2. [ ] Domain verified in Resend dashboard
3. [ ] Check Resend email dashboard for bounces
4. [ ] Check email_logs table for errors
5. [ ] Verify customer email is valid

**Solution**:
```bash
# Check API key is working
curl https://api.resend.com/emails -H "Authorization: Bearer $RESEND_API_KEY"
```

### Orders Not Saving

**Symptom**: API returns success but order not in database

**Checklist**:
1. [ ] NEXT_PUBLIC_SUPABASE_URL is correct
2. [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY is correct
3. [ ] Supabase project is running
4. [ ] RLS policies allow inserts
5. [ ] Customers table exists

**Solution**:
1. Check Supabase dashboard for errors
2. Verify RLS policies in SQL Editor
3. Check network tab in browser dev tools

### Admin Dashboard Blank

**Symptom**: Dashboard loads but no orders shown

**Checklist**:
1. [ ] Orders table has data
2. [ ] Supabase connection working
3. [ ] RLS policies allow reads
4. [ ] Admin user is authenticated

**Solution**:
1. Check browser console for errors
2. Check Vercel function logs
3. Verify Supabase connection in real-time

## Rollback Plan

If issues occur in production:

1. **Stop accepting orders**: Remove order form from homepage temporarily
2. **Revert code**: `git revert <commit-hash>`
3. **Redeploy**: Push to main
4. **Restore data**: Supabase has automatic backups
5. **Notify customers**: Send emails manually if needed

## Security Checklist

- [ ] RESEND_API_KEY is not in source code
- [ ] NEXT_PUBLIC_ADMIN_PASSWORD is strong
- [ ] Admin dashboard only accessible via password
- [ ] No sensitive data in client-side code
- [ ] CORS headers configured if needed
- [ ] Rate limiting on API routes (future enhancement)
- [ ] Input validation on all forms
- [ ] SQL injection prevention (Supabase handles)
- [ ] XSS prevention in templates

## Success Metrics

- ✅ Orders processed successfully: 100%
- ✅ Emails delivered: >95%
- ✅ Admin dashboard uptime: >99%
- ✅ API response time: <500ms
- ✅ Error rate: <1%

## Support Contacts

- **Supabase**: https://supabase.com/support
- **Resend**: https://resend.com/support
- **Vercel**: https://vercel.com/support
- **Next.js**: https://nextjs.org/docs

## Final Notes

- Always backup before major changes
- Test on staging environment first
- Monitor logs after deployment
- Have a communication plan for customers
- Document any custom changes
