# SF Playground — Backend, Data & Frontend Reference

This doc explains **all frontend pages**, **where data comes from**, **how it reaches the UI**, and **what to keep** when you change only the look of the site (same functionality, new design).

**Env & API keys:** Use the **same** env variables and API keys in the new site. No need to change or rotate them; just copy `.env.example` / `.env.local` (e.g. `POSTGRES_URL`, `AUTH_SECRET`, `ADMIN_*_PASSWORD`, `RESEND_API_KEY`, `OPENROUTER_API_KEY`).

---

## 1. All frontend pages (routes)

You need these routes in the new site. Data sources and behavior stay the same; only layout/UI can change.

### Public pages

| Route | File | Purpose |
|-------|------|---------|
| `/` | `src/app/page.tsx` | Home: hero, next event, sponsors, about, how it works, events, featured, CTA, newsletter, FAQ, footer. |
| `/about` | `src/app/about/page.tsx` | About page (website content keys: about.*). |
| `/blog` | `src/app/blog/page.tsx` | Blog list (published posts from DB). |
| `/blog/[slug]` | `src/app/blog/[slug]/page.tsx` | Single blog post (markdown body, image via proxy). |
| `/events/[slug]` | `src/app/events/[slug]/page.tsx` | Past event detail (DB or site-data fallback, gallery). |
| `/success-stories` | `src/app/success-stories/page.tsx` | Success stories list (DB or site-data fallback). |
| `/success-stories/[slug]` | `src/app/success-stories/[slug]/page.tsx` | Single success story (DB or site-data fallback). |
| `/privacy` | `src/app/privacy/page.tsx` | Privacy policy (static or content). |
| `/terms` | `src/app/terms/page.tsx` | Terms of use (static or content). |

**Note:** There is no dedicated “events list” page; the home page has an Events section. You can add `/events` as a list page that uses the same `getEvents()` + site-data fallback if you want.

### Admin pages (behind auth)

All under `src/app/admin/`. Protected layout checks session and redirects to `/admin/signin` if not logged in.

| Route | File | Purpose |
|-------|------|---------|
| `/admin/signin` | `src/app/admin/signin/page.tsx` | Admin login (adminId + password → cookie). |
| `/admin` | `src/app/admin/(protected)/page.tsx` | Admin dashboard home. |
| `/admin/website` | `src/app/admin/(protected)/website/page.tsx` | Edit website: iframe of live site with `?editMode=1`, page/viewport toggles. |
| `/admin/next-event` | `src/app/admin/(protected)/next-event/page.tsx` | Edit next event (single row). |
| `/admin/events` | `src/app/admin/(protected)/events/page.tsx` | List events, link to new/edit. |
| `/admin/events/new` | `src/app/admin/(protected)/events/new/page.tsx` | Create event. |
| `/admin/events/[id]/edit` | `src/app/admin/(protected)/events/[id]/edit/page.tsx` | Edit event by id. |
| `/admin/blog` | `src/app/admin/(protected)/blog/page.tsx` | List blog posts, link to new/edit. |
| `/admin/blog/new` | `src/app/admin/(protected)/blog/new/page.tsx` | Create blog post. |
| `/admin/blog/[id]/edit` | `src/app/admin/(protected)/blog/[id]/edit/page.tsx` | Edit blog post by id. |
| `/admin/success-stories` | `src/app/admin/(protected)/success-stories/page.tsx` | List success stories, link to new/edit. |
| `/admin/success-stories/new` | `src/app/admin/(protected)/success-stories/new/page.tsx` | Create success story. |
| `/admin/success-stories/[id]/edit` | `src/app/admin/(protected)/success-stories/[id]/edit/page.tsx` | Edit success story by id. |
| `/admin/newsletters` | `src/app/admin/(protected)/newsletters/page.tsx` | List newsletter drafts. |
| `/admin/newsletters/new` | `src/app/admin/(protected)/newsletters/new/page.tsx` | Create draft. |
| `/admin/newsletters/[id]/edit` | `src/app/admin/(protected)/newsletters/[id]/edit/page.tsx` | Edit draft. |
| `/admin/newsletters/[id]/send` | `src/app/admin/(protected)/newsletters/[id]/send/page.tsx` | Send draft to subscribers. |
| `/admin/newsletters/sends` | `src/app/admin/(protected)/newsletters/sends/page.tsx` | Send history. |
| `/admin/subscribers` | `src/app/admin/(protected)/subscribers/page.tsx` | List + export subscribers. |

---

## 2. Key frontend components & layout

### Root layout

- **`src/app/layout.tsx`** — Root HTML, fonts (Geist, Geist Mono, Oswald), metadata, wraps children in `EditModeGate`. No `WebsiteContentProvider` here; it’s inside `EditModeGate` when needed.
- **`src/app/globals.css`** — Global styles, Tailwind, CSS variables.

### Edit mode & website content

- **`src/component/website-editor/EditModeGate.tsx`** — Wraps the app in `WebsiteContentProvider` so `getContent(key)` works on every page (provider fetches `/api/website-content`). If the URL has `?editMode=1` and the user has a valid admin session, also wraps in `EditOverlay` for click-to-edit.
- **`src/component/website-editor/EditOverlay.tsx`** — Click-to-edit overlay: finds `[data-editable]`, opens inline or modal editor, PATCHes `/api/admin/website-content`.
- **`src/context/WebsiteContentContext.tsx`** — Fetches `/api/website-content`, exposes `getContent(key)`, falls back to defaults from `website-content-keys.ts`.

### Home page sections (landing components)

Used by `src/app/page.tsx`. Each can be restyled; keep same data props and same `getContent` keys where applicable.

| Component | Path | Data source | Purpose |
|-----------|------|-------------|---------|
| Nav | `src/component/landing/nav.tsx` | `getContent("nav.logoLeft", "nav.logoRight")` | Header, logo, links, newsletter modal trigger. |
| Hero | `src/component/landing/hero.tsx` | Website content (hero.*), `site-data.nextEvent.ctaUrl`, event poster asset | Hero headline, subline, CTAs, event poster. |
| NextEvent | `src/component/landing/next-event.tsx` | Props from page (nextEventData from DB or site-data) | Next event block. |
| Sponsors | `src/component/landing/sponsors.tsx` | Likely static or site-data | Sponsor logos/names. |
| About | `src/component/landing/about.tsx` | `getContent("about.*")` | About section (can also be its own page). |
| HowItWorks | `src/component/landing/how-it-works.tsx` | Website content | How it works section. |
| Events | `src/component/landing/events.tsx` | Props from page (eventsList from DB or site-data) | Past events list/grid. |
| Featured | `src/component/landing/featured.tsx` | `siteData.startups` | Featured startups. |
| CTA | `src/component/landing/cta.tsx` | `getContent("cta.*")` | Apply CTA block (headline, subline, buttons, background). |
| Newsletter | `src/component/landing/newsletter.tsx` | — | Newsletter signup form → POST `/api/newsletter`. |
| FAQ | `src/component/landing/faq.tsx` | `getContent("faq.*")` | FAQ section. |
| Footer | `src/component/landing/footer.tsx` | Static or website content | Footer links, copy. |

### Other shared UI

- **Blog:** `src/component/blog/BlogMarkdown.tsx` — Renders post body (markdown), uses `getProxiedImageUrl` for images.
- **Admin:** `src/app/admin/(protected)/AdminShell.tsx` — Shell around protected admin pages (sidebar/nav, logout). Admin forms (e.g. `BlogPostForm`, `SuccessStoryForm`, `NextEventForm`, event/success-story/newsletter forms) call the admin APIs above; keep same request shapes.

### Sitemap & metadata

- **`src/app/sitemap.ts`** — Uses `site-data.json` (and can use DB) to build URLs for blog, events, success stories. Keep the same URL structure in the new site so the sitemap stays valid.

---

## 3. Data sources (high level)

| Source | Used for | When it wins |
|--------|----------|----------------|
| **Postgres (Vercel)** | Next event, events, blog, success stories, newsletter subscribers, newsletter drafts/sends, website content | Whenever the DB has data (e.g. after admin adds content). |
| **`src/data/site-data.json`** | Fallback for next event, events list, success stories list, hero CTA URL, featured startups | When DB is empty or fetch fails. |
| **`/api/website-content`** | Hero, nav, CTA, FAQ, about — all “editable” copy and media keys | Always for public site; keys/defaults in `website-content-keys.ts`. |
| **Env (`.env.local`)** | DB URL, auth, Resend, OpenRouter | Backend/API only. **Use the same env vars in the new site; no need to change them.** |

**Rule:** Pages try **DB first**, then fall back to **site-data.json**. Editable copy/media comes from **website_content** (DB) via the context that fetches `/api/website-content`.

---

## 4. Database (Postgres)

- **Setup:** Run `scripts/init-db.sql` in the Vercel Postgres query console (or your Postgres). Connection string: `POSTGRES_URL` in env (same as current project).
- **Access:** All reads/writes go through `src/lib/db.ts`.

### Tables (summary)

| Table | Purpose |
|-------|---------|
| `subscribers` | Newsletter signups (email, name). |
| `blog_posts` | Blog: slug, title, excerpt, body, image_url, published_at. |
| `newsletter_drafts` | Draft emails (subject, body_html). |
| `newsletter_sends` | Send history (draft_id, sent_at, subscriber_count). |
| `next_event` | Single row: title, date, time, location, hook, cta_text, image_url. |
| `events` | Past events: slug, title, date, location, attendees, status, cover_image, description, images (JSONB). |
| `success_stories` | Stories: slug, title, tagline, description, image, challenge, points arrays, quotes, etc. |
| `website_content` | Key-value store for visual editor (hero, nav, CTA, FAQ, about, etc.). |

---

## 5. Static fallback: `site-data.json`

- **Path:** `src/data/site-data.json`.
- **Shape:** Contains `nextEvent`, `events[]`, `successStories[]`, `startups` (featured), etc.
- **Used by:** Home (next event, events list), events list/detail, success stories list/detail, hero (`nextEvent.ctaUrl`), featured (`startups`), sitemap. When you redesign, keep the same fallback logic and URL structure.

---

## 6. Website content (editable copy & media)

- **Config:** `src/data/website-content-keys.ts` — every key, type (`text` | `image` | `video`), and default.
- **Storage:** DB table `website_content`. Admin edits via `setWebsiteContent()`; read via `getWebsiteContent()`.
- **Public read:** `GET /api/website-content` (no auth). Context fetches this and exposes `getContent(key)`; missing keys use defaults from config.
- **Admin edit:** With `?editMode=1` and session, overlay calls `PATCH /api/admin/website-content`. Image keys are normalized (e.g. Google Drive → thumbnail URL) before saving.

Keep the same keys and API in the new site so the new UI still shows and edits the same content.

---

## 7. Public API routes (no auth)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/website-content` | GET | All website_content key-value pairs for the public site. |
| `/api/newsletter` | POST | Newsletter signup: body `{ email, name? }`. Inserts into `subscribers`, optional Resend emails. |
| `/api/apply` | POST | Pitch application: validates body, sends notification + confirmation emails via Resend (no DB for applications). |
| `/api/image` | GET | Image proxy: `?url=...` allowlisted (e.g. drive.google.com). Streams image with `Content-Disposition: inline`. |
| `/api/auth/signin` | POST | Admin login: body `{ adminId, password }`. Sets signed cookie. |
| `/api/auth/signout` | POST | Clears admin session cookie. |

Keep the same request/response shapes in the new site.

---

## 8. Admin API routes (session required)

All under `/api/admin/...`. Session from `getSession()` (`src/lib/admin-auth.ts`). No session → 401.

| Route | Methods | Purpose |
|-------|---------|---------|
| `/api/admin/website-content` | GET, PATCH | Read/update website_content. |
| `/api/admin/next-event` | GET, PATCH | Read/update next_event row. |
| `/api/admin/events` | GET, POST | List events, create event. |
| `/api/admin/events/[id]` | GET, PATCH, DELETE | One event. |
| `/api/admin/blog` | GET, POST | List posts, create post. |
| `/api/admin/blog/[id]` | GET, PATCH, DELETE | One post. |
| `/api/admin/success-stories` | GET, POST | List stories, create story. |
| `/api/admin/success-stories/[id]` | GET, PATCH, DELETE | One story. |
| `/api/admin/newsletters` | GET, POST | List drafts, create draft. |
| `/api/admin/newsletters/[id]` | GET, PATCH, DELETE | One draft. |
| `/api/admin/newsletters/send` | POST | Send draft to subscribers (Resend), record in `newsletter_sends`. |
| `/api/admin/subscribers/export` | GET | Export subscribers (e.g. CSV). |
| `/api/admin/upload` | POST | File upload (e.g. images). |
| `/api/admin/ai/draft` | POST | AI draft (newsletter/blog) via OpenRouter. |

---

## 9. How each page gets its data (summary)

- **Home:** Server: `getNextEvent()`, `getEvents()`; fallback site-data. Renders landing sections; hero/nav/CTA/FAQ/about use `getContent(key)`.
- **Blog list:** Server: `getBlogPosts(true)`. Images: `convertGoogleDriveImageUrl`.
- **Blog post:** Server: `getBlogPostBySlug(slug, true)`. Markdown body; images via `getProxiedImageUrl` in `BlogMarkdown`.
- **Event detail:** Server: `getEventBySlug(slug)`; else from site-data. Gallery uses `convertGoogleDriveImageUrl`.
- **Success stories list:** Server: `getSuccessStories()`; else site-data mapped to list shape.
- **Success story detail:** Server: `getSuccessStoryBySlug(slug)`; else site-data mapped to full story with defaults.
- **About:** `getContent("about.*")`.
- **Edit website (admin):** Iframe of live site with `?editMode=1`; same data as public.

---

## 10. Auth (admin)

- **Mechanism:** Cookie-based. Sign-in checks password against env (e.g. `ADMIN_LAKSHAY_PASSWORD`); sets HTTP-only cookie signed with `AUTH_SECRET`, 7-day max age.
- **Profiles:** `src/data/admin-profiles.ts` (ids/names); passwords only in env.
- **Protection:** Protected layout and admin APIs use `getSession()`; redirect to `/admin/signin` if no session.
- Use the **same** env vars and auth logic in the new site so admin keeps working.

---

## 11. Utilities to keep

- **`src/utils/convertDriveImageUrl.ts`** — `convertGoogleDriveImageUrl(url)`, `getProxiedImageUrl(url)`. Used by hero, nav, CTA, about, events, success stories, blog.
- **`/api/image`** — Proxies allowlisted image URLs for reliable display (e.g. Drive).
- **`src/data/constants.ts`** — `SIGNUP_FORM_URL` (Apply/Register CTA). Next event CTA URL can also come from `site-data.nextEvent.ctaUrl`.

---

## 12. Env variables (same in new site)

Copy from `.env.example` / `.env.local`. **No need to change or rotate; reuse the same values.**

| Variable | Purpose |
|----------|---------|
| `POSTGRES_URL` | Postgres connection (e.g. Vercel Postgres). |
| `AUTH_SECRET` | Sign admin session cookie (e.g. `openssl rand -base64 32`). |
| `ADMIN_LAKSHAY_PASSWORD` | Password for admin profile `lakshay`. |
| `ADMIN_BEN_PASSWORD` | Password for admin profile `ben`. |
| `ADMIN_KAYVAN_PASSWORD` | Password for admin profile `kayvan`. |
| `RESEND_API_KEY` | Resend API key for apply/newsletter emails. |
| `OPENROUTER_API_KEY` | Optional; admin AI draft (newsletter/blog). |

---

## 13. What to keep when only changing the look

- **Same env and API keys** — Use the same `.env` values; no need to change them.
- **Same data layer** — `src/lib/db.ts`, same Postgres schema, same `site-data.json` fallback pattern.
- **Same APIs** — All `/api/...` and `/api/admin/...` routes with same request/response shapes.
- **Same website content system** — Same keys/defaults, `GET /api/website-content`, `WebsiteContentContext` + `getContent(key)` where editable content is shown.
- **Same auth** — `admin-auth.ts`, signin/signout, session cookie, `getSession()` on admin routes.
- **Same utilities** — `convertGoogleDriveImageUrl` / `getProxiedImageUrl`, `/api/image`.
- **Same public flows** — Newsletter POST `/api/newsletter`, apply POST `/api/apply`, and any external links (e.g. `SIGNUP_FORM_URL`).
- **Same page list** — Implement all public and admin routes listed in section 1; you can change layout and components only.

You can replace every page component and the entire admin UI with your new design; keep the routes, data flow, and API contracts so everything works the same while the front end looks different.
