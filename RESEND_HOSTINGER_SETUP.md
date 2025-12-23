# Setting Up Resend with Hostinger Domain

## Step 1: Add Domain to Resend

1. Go to https://resend.com/domains
2. Click **"Add Domain"**
3. Enter: `sfplayground.com` (without www or http)
4. Click **"Add"**

## Step 2: Get DNS Records from Resend

After adding your domain, Resend will show you DNS records to add. You'll typically see:

### SPF Record (TXT)

- **Name**: `@` (or leave blank)
- **Type**: `TXT`
- **Value**: `v=spf1 include:resend.com ~all`
- **TTL**: 3600 (or default)

### DKIM Records (3 CNAME records)

Resend will provide 3 CNAME records like:

- **Name**: `resend._domainkey` (or similar)
- **Type**: `CNAME`
- **Value**: `[provided by Resend]`
- **TTL**: 3600

### DMARC Record (TXT) - Optional but Recommended

- **Name**: `_dmarc`
- **Type**: `TXT`
- **Value**: `v=DMARC1; p=none; rua=mailto:hello@sfplayground.com`
- **TTL**: 3600

## Step 3: Add Records to Hostinger

1. **Log in to Hostinger**: https://hpanel.hostinger.com
2. **Go to Domains** → Select `sfplayground.com`
3. **Click "DNS / Name Servers"** or **"DNS Zone Editor"**
4. **Add the Resend DNS records**:

### Adding SPF Record:

- Click **"Add Record"** or **"+"**
- **Type**: Select `TXT`
- **Name**: `@` (or leave blank/root)
- **Value**: `v=spf1 include:resend.com ~all`
- **TTL**: 3600 (or default)
- **Save**

**Important**: If you already have an SPF record for Hostinger email, you need to combine them:

- **Value**: `v=spf1 include:_spf.hostinger.com include:resend.com ~all`

### Adding DKIM Records:

For each DKIM record from Resend:

- Click **"Add Record"** or **"+"**
- **Type**: Select `CNAME`
- **Name**: Enter the name Resend provides (e.g., `resend._domainkey`)
- **Value**: Enter the value Resend provides
- **TTL**: 3600 (or default)
- **Save**
- Repeat for all 3 DKIM records

### Adding DMARC Record:

- Click **"Add Record"** or **"+"**
- **Type**: Select `TXT`
- **Name**: `_dmarc`
- **Value**: `v=DMARC1; p=none; rua=mailto:hello@sfplayground.com`
- **TTL**: 3600 (or default)
- **Save**

## Step 4: Wait for Verification

1. Go back to https://resend.com/domains
2. Wait 5-30 minutes for DNS propagation
3. The status should change to **"Verified"** ✅

## Step 5: Update Your Code

Once verified, update these files:

### `src/app/api/apply/route.ts`

Change:

```typescript
from: "SF Playground <onboarding@resend.dev>";
```

To:

```typescript
from: "SF Playground <hello@sfplayground.com>";
```

### `src/app/api/newsletter/route.ts`

Change:

```typescript
from: "SF Playground <onboarding@resend.dev>";
```

To:

```typescript
from: "SF Playground <hello@sfplayground.com>";
```

## Troubleshooting

### Records Not Verifying?

- Wait up to 48 hours for DNS propagation (usually faster)
- Double-check record values match exactly what Resend provided
- Use a DNS checker: https://mxtoolbox.com/SuperTool.aspx
- Make sure there are no typos in the record values

### Already Have SPF Record?

If you have an existing SPF record for Hostinger email, combine them:

```
v=spf1 include:_spf.hostinger.com include:resend.com ~all
```

### Can't Add Records?

- Make sure you're in the DNS Zone Editor, not just viewing records
- Some Hostinger plans might have restrictions - contact support if needed

## Current Status

Your MX records are already set up correctly for receiving emails. Once you add Resend's DNS records, you'll be able to:

- ✅ Receive emails to hello@sfplayground.com (already working)
- ✅ Send emails FROM hello@sfplayground.com via Resend (after setup)
