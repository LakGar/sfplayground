import { sql } from "@vercel/postgres";

export { sql };

export type Subscriber = {
  id: number;
  email: string;
  name: string | null;
  subscribed_at: Date;
};

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  image_url: string | null;
  published_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type NewsletterDraft = {
  id: number;
  subject: string;
  body_html: string;
  created_at: Date;
  updated_at: Date;
};

export type NewsletterSend = {
  id: number;
  draft_id: number | null;
  sent_at: Date;
  subscriber_count: number;
};

export type NextEventRow = {
  id: number;
  title: string;
  date: string;
  time: string | null;
  location: string;
  hook: string;
  cta_text: string;
  image_url: string | null;
  updated_at: Date;
};

export async function getSubscribers(): Promise<Subscriber[]> {
  const { rows } = await sql`
    SELECT id, email, name, subscribed_at
    FROM subscribers
    ORDER BY subscribed_at DESC
  `;
  return rows as Subscriber[];
}

export async function insertSubscriber(
  email: string,
  name?: string | null
): Promise<{ id: number } | null> {
  try {
    const { rows } = await sql`
      INSERT INTO subscribers (email, name)
      VALUES (${email}, ${name ?? null})
      ON CONFLICT (email) DO NOTHING
      RETURNING id
    `;
    return rows[0] ? { id: (rows[0] as { id: number }).id } : null;
  } catch {
    return null;
  }
}

export async function deleteSubscriberByEmail(email: string): Promise<boolean> {
  const { rowCount } = await sql`
    DELETE FROM subscribers
    WHERE LOWER(TRIM(email)) = LOWER(TRIM(${email}))
  `;
  return (rowCount ?? 0) > 0;
}

export async function getBlogPosts(onlyPublished = false): Promise<BlogPost[]> {
  if (onlyPublished) {
    const { rows } = await sql`
      SELECT id, slug, title, excerpt, body, image_url, published_at, created_at, updated_at
      FROM blog_posts
      WHERE published_at IS NOT NULL
      ORDER BY published_at DESC
    `;
    return rows as BlogPost[];
  }
  const { rows } = await sql`
    SELECT id, slug, title, excerpt, body, image_url, published_at, created_at, updated_at
    FROM blog_posts
    ORDER BY updated_at DESC
  `;
  return rows as BlogPost[];
}

export async function getBlogPostBySlug(
  slug: string,
  onlyPublished = false
): Promise<BlogPost | null> {
  const { rows } = onlyPublished
    ? await sql`
        SELECT id, slug, title, excerpt, body, image_url, published_at, created_at, updated_at
        FROM blog_posts
        WHERE slug = ${slug} AND published_at IS NOT NULL
        LIMIT 1
      `
    : await sql`
        SELECT id, slug, title, excerpt, body, image_url, published_at, created_at, updated_at
        FROM blog_posts
        WHERE slug = ${slug}
        LIMIT 1
      `;
  return (rows[0] as BlogPost) ?? null;
}

export async function getBlogPostById(id: number): Promise<BlogPost | null> {
  const { rows } = await sql`
    SELECT id, slug, title, excerpt, body, image_url, published_at, created_at, updated_at
    FROM blog_posts
    WHERE id = ${id}
    LIMIT 1
  `;
  return (rows[0] as BlogPost) ?? null;
}

export async function createBlogPost(data: {
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  image_url?: string | null;
}): Promise<BlogPost> {
  const image_url = data.image_url ?? null;
  const { rows } = await sql`
    INSERT INTO blog_posts (slug, title, excerpt, body, image_url, updated_at)
    VALUES (${data.slug}, ${data.title}, ${data.excerpt}, ${data.body}, ${image_url}, NOW())
    RETURNING id, slug, title, excerpt, body, image_url, published_at, created_at, updated_at
  `;
  return rows[0] as BlogPost;
}

export async function updateBlogPost(
  id: number,
  data: {
    slug?: string;
    title?: string;
    excerpt?: string | null;
    body?: string;
    image_url?: string | null;
    published_at?: Date | null;
  }
): Promise<BlogPost | null> {
  const existing = await getBlogPostById(id);
  if (!existing) return null;
  const slug = data.slug ?? existing.slug;
  const title = data.title ?? existing.title;
  const excerpt = data.excerpt !== undefined ? data.excerpt : existing.excerpt;
  const body = data.body ?? existing.body;
  const image_url = data.image_url !== undefined ? data.image_url : existing.image_url;
  const published_at =
    data.published_at !== undefined ? data.published_at : existing.published_at;
  await sql`
    UPDATE blog_posts
    SET slug = ${slug}, title = ${title}, excerpt = ${excerpt}, body = ${body},
        image_url = ${image_url}, published_at = ${published_at ? published_at.toISOString() : null}, updated_at = NOW()
    WHERE id = ${id}
  `;
  return getBlogPostById(id);
}

export async function deleteBlogPost(id: number): Promise<boolean> {
  const { rowCount } = await sql`DELETE FROM blog_posts WHERE id = ${id}`;
  return (rowCount ?? 0) > 0;
}

export async function getNewsletterDrafts(): Promise<NewsletterDraft[]> {
  const { rows } = await sql`
    SELECT id, subject, body_html, created_at, updated_at
    FROM newsletter_drafts
    ORDER BY updated_at DESC
  `;
  return rows as NewsletterDraft[];
}

export async function getNewsletterDraftById(
  id: number
): Promise<NewsletterDraft | null> {
  const { rows } = await sql`
    SELECT id, subject, body_html, created_at, updated_at
    FROM newsletter_drafts
    WHERE id = ${id}
    LIMIT 1
  `;
  return (rows[0] as NewsletterDraft) ?? null;
}

export async function createNewsletterDraft(data: {
  subject: string;
  body_html: string;
}): Promise<NewsletterDraft> {
  const { rows } = await sql`
    INSERT INTO newsletter_drafts (subject, body_html, updated_at)
    VALUES (${data.subject}, ${data.body_html}, NOW())
    RETURNING id, subject, body_html, created_at, updated_at
  `;
  return rows[0] as NewsletterDraft;
}

export async function updateNewsletterDraft(
  id: number,
  data: { subject?: string; body_html?: string }
): Promise<NewsletterDraft | null> {
  const draft = await getNewsletterDraftById(id);
  if (!draft) return null;
  const subject = data.subject ?? draft.subject;
  const body_html = data.body_html ?? draft.body_html;
  await sql`
    UPDATE newsletter_drafts
    SET subject = ${subject}, body_html = ${body_html}, updated_at = NOW()
    WHERE id = ${id}
  `;
  return getNewsletterDraftById(id);
}

export async function deleteNewsletterDraft(id: number): Promise<boolean> {
  const { rowCount } = await sql`DELETE FROM newsletter_drafts WHERE id = ${id}`;
  return (rowCount ?? 0) > 0;
}

export async function recordNewsletterSend(
  draftId: number | null,
  subscriberCount: number
): Promise<void> {
  await sql`
    INSERT INTO newsletter_sends (draft_id, subscriber_count)
    VALUES (${draftId}, ${subscriberCount})
  `;
}

export async function getNewsletterSendsCount(): Promise<number> {
  const { rows } = await sql`
    SELECT COUNT(*)::int AS count FROM newsletter_sends
  `;
  return (rows[0] as { count: number })?.count ?? 0;
}

export async function getLatestNewsletterSend(): Promise<{
  sent_at: Date;
  subscriber_count: number;
} | null> {
  const { rows } = await sql`
    SELECT sent_at, subscriber_count
    FROM newsletter_sends
    ORDER BY sent_at DESC
    LIMIT 1
  `;
  return (rows[0] as { sent_at: Date; subscriber_count: number }) ?? null;
}

export type NewsletterSendHistoryRow = {
  id: number;
  draft_id: number | null;
  sent_at: Date;
  subscriber_count: number;
  subject: string | null;
};

export async function getNewsletterSendsHistory(): Promise<
  NewsletterSendHistoryRow[]
> {
  const { rows } = await sql`
    SELECT ns.id, ns.draft_id, ns.sent_at, ns.subscriber_count, nd.subject
    FROM newsletter_sends ns
    LEFT JOIN newsletter_drafts nd ON nd.id = ns.draft_id
    ORDER BY ns.sent_at DESC
  `;
  return rows as NewsletterSendHistoryRow[];
}

/** Latest send per draft (by sent_at DESC). Keys are draft_id. */
export async function getLatestSendPerDraftId(): Promise<
  Map<number, { sent_at: Date; subscriber_count: number }>
> {
  const { rows } = await sql`
    SELECT draft_id, sent_at, subscriber_count
    FROM newsletter_sends
    WHERE draft_id IS NOT NULL
    ORDER BY sent_at DESC
  `;
  const map = new Map<number, { sent_at: Date; subscriber_count: number }>();
  for (const r of rows as { draft_id: number; sent_at: Date; subscriber_count: number }[]) {
    if (!map.has(r.draft_id)) map.set(r.draft_id, { sent_at: r.sent_at, subscriber_count: r.subscriber_count });
  }
  return map;
}

export async function getNextEvent(): Promise<NextEventRow | null> {
  const { rows } = await sql`
    SELECT id, title, date, time, location, hook, cta_text, image_url, updated_at
    FROM next_event
    LIMIT 1
  `;
  return (rows[0] as NextEventRow) ?? null;
}

export async function upsertNextEvent(data: {
  title: string;
  date: string;
  time: string | null;
  location: string;
  hook: string;
  cta_text: string;
  image_url?: string | null;
}): Promise<NextEventRow> {
  const existing = await getNextEvent();
  const image_url = data.image_url ?? existing?.image_url ?? null;
  if (existing) {
    await sql`
      UPDATE next_event
      SET title = ${data.title}, date = ${data.date}, time = ${data.time},
          location = ${data.location}, hook = ${data.hook}, cta_text = ${data.cta_text},
          image_url = ${image_url}, updated_at = NOW()
      WHERE id = ${existing.id}
    `;
  } else {
    await sql`
      INSERT INTO next_event (title, date, time, location, hook, cta_text, image_url)
      VALUES (${data.title}, ${data.date}, ${data.time}, ${data.location}, ${data.hook}, ${data.cta_text}, ${image_url})
    `;
  }
  const next = await getNextEvent();
  if (!next) throw new Error("Failed to upsert next_event");
  return next;
}

// Website content (visual editor)
export async function getWebsiteContent(): Promise<Record<string, string>> {
  const { rows } = await sql`
    SELECT key, value FROM website_content
  `;
  return Object.fromEntries((rows as { key: string; value: string }[]).map((r) => [r.key, r.value]));
}

export async function setWebsiteContent(
  updates: Record<string, string>
): Promise<void> {
  for (const [key, value] of Object.entries(updates)) {
    await sql`
      INSERT INTO website_content (key, value)
      VALUES (${key}, ${value})
      ON CONFLICT (key) DO UPDATE SET value = ${value}
    `;
  }
}

// --- Events (past events) ---

export type EventRow = {
  id: number;
  slug: string;
  title: string;
  date: string;
  location: string;
  attendees: number;
  status: string;
  cover_image: string | null;
  description: string;
  images: string[];
  created_at: Date;
  updated_at: Date;
};

export async function getEvents(): Promise<EventRow[]> {
  const { rows } = await sql`
    SELECT id, slug, title, date, location, attendees, status, cover_image, description, images, created_at, updated_at
    FROM events
    ORDER BY date DESC
  `;
  return (rows as { images: unknown }[]).map((r) => ({
    ...r,
    images: Array.isArray(r.images) ? r.images : [],
  })) as EventRow[];
}

export async function getEventBySlug(slug: string): Promise<EventRow | null> {
  const { rows } = await sql`
    SELECT id, slug, title, date, location, attendees, status, cover_image, description, images, created_at, updated_at
    FROM events
    WHERE LOWER(TRIM(slug)) = LOWER(TRIM(${slug}))
    LIMIT 1
  `;
  const r = rows[0] as (EventRow & { images: unknown }) | undefined;
  if (!r) return null;
  return { ...r, images: Array.isArray(r.images) ? r.images : [] } as EventRow;
}

export async function getEventById(id: number): Promise<EventRow | null> {
  const { rows } = await sql`
    SELECT id, slug, title, date, location, attendees, status, cover_image, description, images, created_at, updated_at
    FROM events
    WHERE id = ${id}
    LIMIT 1
  `;
  const r = rows[0] as (EventRow & { images: unknown }) | undefined;
  if (!r) return null;
  return { ...r, images: Array.isArray(r.images) ? r.images : [] } as EventRow;
}

export async function createEvent(data: {
  slug: string;
  title: string;
  date: string;
  location: string;
  attendees?: number;
  status?: string;
  cover_image?: string | null;
  description: string;
  images?: string[];
}): Promise<EventRow> {
  const images = data.images ?? [];
  const { rows } = await sql`
    INSERT INTO events (slug, title, date, location, attendees, status, cover_image, description, images, updated_at)
    VALUES (${data.slug}, ${data.title}, ${data.date}, ${data.location}, ${data.attendees ?? 0}, ${data.status ?? "past"}, ${data.cover_image ?? null}, ${data.description}, ${JSON.stringify(images)}::jsonb, NOW())
    RETURNING id, slug, title, date, location, attendees, status, cover_image, description, images, created_at, updated_at
  `;
  const r = rows[0] as EventRow & { images: unknown };
  return { ...r, images: Array.isArray(r.images) ? r.images : [] } as EventRow;
}

export async function updateEvent(
  id: number,
  data: Partial<{
    slug: string;
    title: string;
    date: string;
    location: string;
    attendees: number;
    status: string;
    cover_image: string | null;
    description: string;
    images: string[];
  }>
): Promise<EventRow | null> {
  const existing = await getEventById(id);
  if (!existing) return null;
  const slug = data.slug ?? existing.slug;
  const title = data.title ?? existing.title;
  const date = data.date ?? existing.date;
  const location = data.location ?? existing.location;
  const attendees = data.attendees ?? existing.attendees;
  const status = data.status ?? existing.status;
  const cover_image = data.cover_image !== undefined ? data.cover_image : existing.cover_image;
  const description = data.description ?? existing.description;
  const images = data.images ?? existing.images;
  await sql`
    UPDATE events
    SET slug = ${slug}, title = ${title}, date = ${date}, location = ${location},
        attendees = ${attendees}, status = ${status}, cover_image = ${cover_image},
        description = ${description}, images = ${JSON.stringify(images)}::jsonb, updated_at = NOW()
    WHERE id = ${id}
  `;
  return getEventById(id);
}

export async function deleteEvent(id: number): Promise<boolean> {
  const { rowCount } = await sql`DELETE FROM events WHERE id = ${id}`;
  return (rowCount ?? 0) > 0;
}

// --- Success stories ---

export type SuccessStoryRow = {
  id: number;
  slug: string;
  title: string;
  tagline: string | null;
  description: string;
  image: string | null;
  challenge: string | null;
  challenge_points: string[];
  our_role: string | null;
  role_points: string[];
  experience: string | null;
  impact: string | null;
  impact_points: string[];
  founder_quote: string | null;
  attendee_quote: string | null;
  founder_quote2: string | null;
  why_matters: string | null;
  created_at: Date;
  updated_at: Date;
};

function parseJsonArray(val: unknown): string[] {
  if (Array.isArray(val)) return val.filter((x) => typeof x === "string");
  return [];
}

export async function getSuccessStories(): Promise<SuccessStoryRow[]> {
  const { rows } = await sql`
    SELECT id, slug, title, tagline, description, image, challenge, challenge_points, our_role, role_points,
           experience, impact, impact_points, founder_quote, attendee_quote, founder_quote2, why_matters, created_at, updated_at
    FROM success_stories
    ORDER BY updated_at DESC
  `;
  return (rows as Record<string, unknown>[]).map((r) => ({
    ...r,
    challenge_points: parseJsonArray(r.challenge_points),
    role_points: parseJsonArray(r.role_points),
    impact_points: parseJsonArray(r.impact_points),
  })) as SuccessStoryRow[];
}

export async function getSuccessStoryBySlug(slug: string): Promise<SuccessStoryRow | null> {
  const { rows } = await sql`
    SELECT id, slug, title, tagline, description, image, challenge, challenge_points, our_role, role_points,
           experience, impact, impact_points, founder_quote, attendee_quote, founder_quote2, why_matters, created_at, updated_at
    FROM success_stories
    WHERE LOWER(TRIM(slug)) = LOWER(TRIM(${slug}))
    LIMIT 1
  `;
  const r = rows[0] as Record<string, unknown> | undefined;
  if (!r) return null;
  return {
    ...r,
    challenge_points: parseJsonArray(r.challenge_points),
    role_points: parseJsonArray(r.role_points),
    impact_points: parseJsonArray(r.impact_points),
  } as SuccessStoryRow;
}

export async function getSuccessStoryById(id: number): Promise<SuccessStoryRow | null> {
  const { rows } = await sql`
    SELECT id, slug, title, tagline, description, image, challenge, challenge_points, our_role, role_points,
           experience, impact, impact_points, founder_quote, attendee_quote, founder_quote2, why_matters, created_at, updated_at
    FROM success_stories
    WHERE id = ${id}
    LIMIT 1
  `;
  const r = rows[0] as Record<string, unknown> | undefined;
  if (!r) return null;
  return {
    ...r,
    challenge_points: parseJsonArray(r.challenge_points),
    role_points: parseJsonArray(r.role_points),
    impact_points: parseJsonArray(r.impact_points),
  } as SuccessStoryRow;
}

export async function createSuccessStory(data: {
  slug: string;
  title: string;
  tagline?: string | null;
  description: string;
  image?: string | null;
  challenge?: string | null;
  challenge_points?: string[];
  our_role?: string | null;
  role_points?: string[];
  experience?: string | null;
  impact?: string | null;
  impact_points?: string[];
  founder_quote?: string | null;
  attendee_quote?: string | null;
  founder_quote2?: string | null;
  why_matters?: string | null;
}): Promise<SuccessStoryRow> {
  const challenge_points = JSON.stringify(data.challenge_points ?? []);
  const role_points = JSON.stringify(data.role_points ?? []);
  const impact_points = JSON.stringify(data.impact_points ?? []);
  const { rows } = await sql`
    INSERT INTO success_stories (slug, title, tagline, description, image, challenge, challenge_points, our_role, role_points, experience, impact, impact_points, founder_quote, attendee_quote, founder_quote2, why_matters, updated_at)
    VALUES (${data.slug}, ${data.title}, ${data.tagline ?? null}, ${data.description}, ${data.image ?? null}, ${data.challenge ?? null}, ${challenge_points}::jsonb, ${data.our_role ?? null}, ${role_points}::jsonb, ${data.experience ?? null}, ${data.impact ?? null}, ${impact_points}::jsonb, ${data.founder_quote ?? null}, ${data.attendee_quote ?? null}, ${data.founder_quote2 ?? null}, ${data.why_matters ?? null}, NOW())
    RETURNING id, slug, title, tagline, description, image, challenge, challenge_points, our_role, role_points, experience, impact, impact_points, founder_quote, attendee_quote, founder_quote2, why_matters, created_at, updated_at
  `;
  const r = rows[0] as Record<string, unknown>;
  return {
    ...r,
    challenge_points: parseJsonArray(r.challenge_points),
    role_points: parseJsonArray(r.role_points),
    impact_points: parseJsonArray(r.impact_points),
  } as SuccessStoryRow;
}

export async function updateSuccessStory(
  id: number,
  data: Partial<{
    slug: string;
    title: string;
    tagline: string | null;
    description: string;
    image: string | null;
    challenge: string | null;
    challenge_points: string[];
    our_role: string | null;
    role_points: string[];
    experience: string | null;
    impact: string | null;
    impact_points: string[];
    founder_quote: string | null;
    attendee_quote: string | null;
    founder_quote2: string | null;
    why_matters: string | null;
  }>
): Promise<SuccessStoryRow | null> {
  const existing = await getSuccessStoryById(id);
  if (!existing) return null;
  const challenge_points = JSON.stringify(data.challenge_points ?? existing.challenge_points);
  const role_points = JSON.stringify(data.role_points ?? existing.role_points);
  const impact_points = JSON.stringify(data.impact_points ?? existing.impact_points);
  await sql`
    UPDATE success_stories
    SET slug = ${data.slug ?? existing.slug}, title = ${data.title ?? existing.title}, tagline = ${data.tagline !== undefined ? data.tagline : existing.tagline},
        description = ${data.description ?? existing.description}, image = ${data.image !== undefined ? data.image : existing.image},
        challenge = ${data.challenge !== undefined ? data.challenge : existing.challenge}, challenge_points = ${challenge_points}::jsonb,
        our_role = ${data.our_role !== undefined ? data.our_role : existing.our_role}, role_points = ${role_points}::jsonb,
        experience = ${data.experience !== undefined ? data.experience : existing.experience}, impact = ${data.impact !== undefined ? data.impact : existing.impact}, impact_points = ${impact_points}::jsonb,
        founder_quote = ${data.founder_quote !== undefined ? data.founder_quote : existing.founder_quote}, attendee_quote = ${data.attendee_quote !== undefined ? data.attendee_quote : existing.attendee_quote},
        founder_quote2 = ${data.founder_quote2 !== undefined ? data.founder_quote2 : existing.founder_quote2}, why_matters = ${data.why_matters !== undefined ? data.why_matters : existing.why_matters},
        updated_at = NOW()
    WHERE id = ${id}
  `;
  return getSuccessStoryById(id);
}

export async function deleteSuccessStory(id: number): Promise<boolean> {
  const { rowCount } = await sql`DELETE FROM success_stories WHERE id = ${id}`;
  return (rowCount ?? 0) > 0;
}
