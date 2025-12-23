# Email Setup Guide for SF Playground

## Step 1: Create a Resend Account

1. Go to https://resend.com
2. Sign up for a free account (100 emails/day free tier)
3. Verify your email address

## Step 2: Get Your API Key

1. Go to https://resend.com/api-keys
2. Click "Create API Key"
3. Give it a name (e.g., "SF Playground Production")
4. Copy the API key (starts with `re_`)
5. **Important**: Save it immediately - you won't be able to see it again!

## Step 3: Add API Key to Your Project

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add your API key:
   ```
   RESEND_API_KEY=re_your_actual_api_key_here
   ```
3. Restart your development server after adding the key

## Step 4: Verify Your Domain (Recommended)

To send emails from `hello@sfplayground.com` instead of `onboarding@resend.dev`:

### Option A: Verify Your Domain (Best for Production)

1. **Go to Resend Domains**: https://resend.com/domains
2. **Click "Add Domain"**
3. **Enter your domain**: `sfplayground.com` (without www or http)
4. **Add DNS Records**: Resend will provide you with DNS records to add:

   - **SPF Record**: Add to your DNS
   - **DKIM Records**: Add 3 CNAME records to your DNS
   - **DMARC Record** (optional but recommended): Add to your DNS

5. **Where to add DNS records**:

   - If using a domain registrar (GoDaddy, Namecheap, etc.): Go to your domain's DNS settings
   - If using a hosting provider: Use their DNS management panel
   - If using Cloudflare: Add records in the DNS section

6. **Wait for verification**: It usually takes a few minutes to a few hours for DNS to propagate
7. **Check status**: Go back to Resend Domains page - it will show "Verified" when ready

### Option B: Use Resend's Default Email (Quick Start for Testing)

For testing, you can use `onboarding@resend.dev` without domain verification. The emails will work, but they'll come from Resend's domain.

## Step 5: Update Email Addresses in Code

Once your domain is verified, update the `from` email in these files:

1. **`src/app/api/apply/route.ts`** - Change `onboarding@resend.dev` to `hello@sfplayground.com`
2. **`src/app/api/newsletter/route.ts`** - Change `onboarding@resend.dev` to `hello@sfplayground.com`

## Step 6: Test Your Setup

1. Start your development server: `npm run dev`
2. Try submitting the pitch application form
3. Check `hello@sfplayground.com` for the notification email
4. Check the applicant's email for the confirmation email
5. Try subscribing to the newsletter
6. Check both emails for the welcome and notification emails

## Troubleshooting

### Emails not sending?

- Check that `RESEND_API_KEY` is set in `.env.local`
- Restart your dev server after adding the key
- Check the browser console and server logs for errors
- Verify your API key is correct at https://resend.com/api-keys

### Domain verification failing?

- Make sure all DNS records are added correctly
- Wait 24-48 hours for DNS propagation (usually faster)
- Double-check the record values match exactly what Resend provided
- Use a DNS checker tool to verify records are live

### Using Vercel for deployment?

- Add `RESEND_API_KEY` to your Vercel environment variables:
  1. Go to your project settings in Vercel
  2. Navigate to "Environment Variables"
  3. Add `RESEND_API_KEY` with your key value
  4. Redeploy your application

## Need Help?

- Resend Documentation: https://resend.com/docs
- Resend Support: https://resend.com/support
