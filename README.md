This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Email Setup

This project uses [Resend](https://resend.com) for sending emails. To set up email functionality:

1. **Create a Resend account** at https://resend.com
2. **Get your API key** from https://resend.com/api-keys
3. **Create a `.env.local` file** in the root directory:
   ```
   RESEND_API_KEY=re_your_api_key_here
   ```
4. **Verify your domain** (optional but recommended):
   - Go to https://resend.com/domains
   - Add and verify your domain
   - Update the `from` email in `/src/app/api/apply/route.ts` and `/src/app/api/newsletter/route.ts` to use your verified domain

### Email Features

- **Pitch Applications**: When someone applies to pitch, you'll receive an email at `hello@sfplayground.com` with all their details, and they'll receive a confirmation email.
- **Newsletter Signups**: When someone subscribes to the newsletter, you'll receive a notification email, and they'll receive a welcome email.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

**Important**: Don't forget to add your `RESEND_API_KEY` to your Vercel environment variables!

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
