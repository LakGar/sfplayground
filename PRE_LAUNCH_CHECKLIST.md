# Pre-Launch Checklist for SF Playground

## ✅ Critical (Must Do Before Launch)

### 1. Environment Variables

- [ ] **Set `RESEND_API_KEY` in production environment**
  - If deploying to Vercel: Go to Project Settings → Environment Variables → Add `RESEND_API_KEY`
  - If deploying elsewhere: Add to your hosting platform's environment variables
  - **Without this, email forms won't work!**

### 2. Email Domain Verification

- [ ] **Verify domain in Resend** (recommended but not blocking)
  - Go to https://resend.com/domains
  - Add `sfplayground.com`
  - Add DNS records (SPF, DKIM, DMARC) to Hostinger
  - Wait for verification (5-30 minutes)
  - Update `from` addresses in:
    - `src/app/api/apply/route.ts` (line 38)
    - `src/app/api/newsletter/route.ts` (line 30)
  - **Note**: Currently using `hello@sfplayground.com` - make sure this email account exists in Hostinger!

### 3. Email Account Setup

- [ ] **Create `hello@sfplayground.com` email account in Hostinger**
  - Log in to Hostinger hPanel
  - Go to Email → Email Accounts
  - Create the account if it doesn't exist
  - Test receiving emails to this address

### 4. Test All Forms

- [ ] **Test Pitch Application Form**
  - Submit a test application
  - Verify you receive email at `hello@sfplayground.com`
  - Verify applicant receives confirmation email
- [ ] **Test Newsletter Subscription**
  - Subscribe from nav modal
  - Subscribe from newsletter section
  - Verify you receive notification email
  - Verify subscriber receives welcome email

## 🔍 Important (Should Do)

### 5. SEO & Analytics

- [ ] **Set up Google Search Console**

  - Add property for `sfplayground.com`
  - Verify ownership
  - Submit sitemap: `https://sfplayground.com/sitemap.xml`
  - Add verification code to `src/app/layout.tsx` (line 50)

- [ ] **Set up Google Analytics** (optional but recommended)

  - Create GA4 property
  - Add tracking code to `src/app/layout.tsx`

- [ ] **Test SEO**
  - Check meta tags with: https://www.opengraph.xyz/
  - Verify sitemap: `https://sfplayground.com/sitemap.xml`
  - Verify robots.txt: `https://sfplayground.com/robots.txt`

### 6. Performance Testing

- [ ] **Run Lighthouse audit**

  - Test on mobile and desktop
  - Aim for 90+ scores
  - Check Core Web Vitals

- [ ] **Test on real devices**
  - Test on iPhone/Android
  - Test on different browsers (Chrome, Safari, Firefox)
  - Test all interactive elements

### 7. Content Review

- [ ] **Review all text content**

  - Check for typos
  - Verify all links work
  - Check all images load correctly
  - Verify event dates and information

- [ ] **Test all navigation**
  - Desktop nav links
  - Mobile nav links
  - Footer links
  - Internal page links

## 🎨 Nice to Have (Can Do Later)

### 8. Additional Features

- [ ] Add loading states for images
- [ ] Add error boundaries
- [ ] Add analytics tracking for form submissions
- [ ] Add cookie consent banner (if needed for GDPR)
- [ ] Add social media meta tags for better sharing

### 9. Security

- [ ] Review API routes for security
- [ ] Add rate limiting to API routes (if needed)
- [ ] Ensure all user inputs are validated
- [ ] Check for any exposed API keys or secrets

### 10. Documentation

- [ ] Update README with deployment instructions
- [ ] Document any custom configurations
- [ ] Add comments to complex code sections

## 🚀 Deployment Checklist

### Before Deploying:

1. ✅ Run `npm run build` locally to check for build errors
2. ✅ Fix any TypeScript/linting errors
3. ✅ Test all forms in development
4. ✅ Set environment variables in production
5. ✅ Verify domain DNS settings

### After Deploying:

1. ✅ Test the live site
2. ✅ Submit forms and verify emails work
3. ✅ Check all pages load correctly
4. ✅ Test on mobile devices
5. ✅ Verify sitemap and robots.txt are accessible
6. ✅ Submit sitemap to Google Search Console

## 📧 Email Testing Checklist

After deployment, test:

- [ ] Pitch application sends notification to `hello@sfplayground.com`
- [ ] Pitch application sends confirmation to applicant
- [ ] Newsletter subscription sends notification to `hello@sfplayground.com`
- [ ] Newsletter subscription sends welcome email to subscriber
- [ ] Check spam folders if emails don't arrive
- [ ] Verify email formatting looks good

## 🔗 Quick Links

- **Resend Dashboard**: https://resend.com/emails
- **Resend Domains**: https://resend.com/domains
- **Hostinger hPanel**: https://hpanel.hostinger.com
- **Google Search Console**: https://search.google.com/search-console
- **Lighthouse**: Built into Chrome DevTools

## ⚠️ Common Issues

1. **Emails not sending**: Check `RESEND_API_KEY` is set in production
2. **Emails going to spam**: Verify domain in Resend and add SPF/DKIM records
3. **Forms not working**: Check browser console for errors, verify API routes are deployed
4. **Images not loading**: Check image paths, verify files are in `public/` folder
5. **Build errors**: Run `npm run build` locally to catch issues before deploying

---

**Ready to launch?** Make sure all Critical items (1-4) are checked! ✅
