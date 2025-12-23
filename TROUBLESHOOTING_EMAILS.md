# Troubleshooting Email Issues

## Problem: Not Receiving Emails to hello@sfplayground.com

If you're receiving confirmation/welcome emails to applicants/subscribers but NOT receiving notification emails to hello@sfplayground.com, try these steps:

### 1. Check Your Spam/Junk Folder
- Emails from `onboarding@resend.dev` might be going to spam
- Check your spam, junk, and promotions folders
- Mark as "Not Spam" if found

### 2. Verify the Email Address Exists
- Make sure `hello@sfplayground.com` is a valid, active email address
- Check if you can send/receive emails to this address normally
- If using Gmail/Google Workspace, make sure the mailbox exists

### 3. Check Resend Dashboard
1. Go to https://resend.com/emails
2. Look for emails sent to `hello@sfplayground.com`
3. Check the status:
   - ✅ **Delivered** = Email was sent successfully (check spam)
   - ❌ **Bounced** = Email address doesn't exist or is invalid
   - ⏳ **Pending** = Still being processed
   - ❌ **Failed** = There was an error (check error message)

### 4. Check Server Logs
When you submit a form, check your terminal/console for:
- `"Notification email sent to hello@sfplayground.com:"` - Success message
- `"Error sending notification email to hello@sfplayground.com:"` - Error message

### 5. Test with a Different Email
Temporarily change the email in the API routes to test:
- Use your personal email (Gmail, etc.) to verify emails are working
- Update `to: "hello@sfplayground.com"` to `to: "your-email@gmail.com"` in both route files
- Test again and see if you receive the email

### 6. Verify Resend API Key
- Make sure your `RESEND_API_KEY` in `.env.local` is correct
- Check at https://resend.com/api-keys
- Restart your dev server after adding/changing the key

### 7. Check Email Service Provider Settings
If `hello@sfplayground.com` is hosted by:
- **Google Workspace**: Check admin settings, spam filters
- **Microsoft 365**: Check Exchange admin center, spam policies
- **Other providers**: Check spam filters and email routing

### 8. Common Issues

**Issue**: Emails show as "Delivered" in Resend but not received
- **Solution**: Check spam folder, email filters, or forwarding rules

**Issue**: Emails show as "Bounced"
- **Solution**: The email address might not exist. Create the mailbox or use a different address

**Issue**: Getting errors in console
- **Solution**: Check the error message - might be API key issue or rate limiting

### Quick Test

To test if emails are working at all, you can:
1. Submit a pitch application
2. Check the browser console (F12) for any errors
3. Check your terminal/console for logs
4. Check Resend dashboard at https://resend.com/emails

### Still Not Working?

If none of the above works:
1. Check Resend dashboard for detailed error messages
2. Try using a different email address temporarily (like your personal Gmail)
3. Verify your Resend account is active and not rate-limited
4. Check if there are any email forwarding rules that might be interfering

