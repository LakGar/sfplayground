-- SF Playground admin dashboard schema
-- Run this in Vercel Postgres query console or via: npx tsx scripts/run-migrations.ts

-- Subscribers (newsletter signups)
CREATE TABLE IF NOT EXISTS subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  name VARCHAR(255),
  subscribed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);
CREATE INDEX IF NOT EXISTS idx_subscribers_subscribed_at ON subscribers(subscribed_at DESC);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  excerpt TEXT,
  body TEXT NOT NULL,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC) WHERE published_at IS NOT NULL;

-- Add image_url to blog_posts if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN image_url TEXT;
  END IF;
END $$;

-- Newsletter drafts
CREATE TABLE IF NOT EXISTS newsletter_drafts (
  id SERIAL PRIMARY KEY,
  subject VARCHAR(500) NOT NULL,
  body_html TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Newsletter sends (history)
CREATE TABLE IF NOT EXISTS newsletter_sends (
  id SERIAL PRIMARY KEY,
  draft_id INTEGER REFERENCES newsletter_drafts(id) ON DELETE SET NULL,
  sent_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  subscriber_count INTEGER NOT NULL DEFAULT 0
);

-- Next event (single row)
CREATE TABLE IF NOT EXISTS next_event (
  id SERIAL PRIMARY KEY,
  title VARCHAR(500) NOT NULL,
  date VARCHAR(100) NOT NULL,
  time VARCHAR(100),
  location VARCHAR(500) NOT NULL,
  hook TEXT NOT NULL,
  cta_text VARCHAR(100) NOT NULL,
  image_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add image_url if missing (existing installs)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'next_event' AND column_name = 'image_url'
  ) THEN
    ALTER TABLE next_event ADD COLUMN image_url TEXT;
  END IF;
END $$;

-- Ensure only one row: insert default if empty
INSERT INTO next_event (title, date, time, location, hook, cta_text)
SELECT 'Pitch Playoffs #002', 'March 15, 2026', '6:00 PM', 'Frontier Tower SF', 'Demo your startup, get crowd votes, pitch to real VCs.', 'Get my spot'
WHERE NOT EXISTS (SELECT 1 FROM next_event LIMIT 1);

-- Past events (editable)
CREATE TABLE IF NOT EXISTS events (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  date VARCHAR(100) NOT NULL,
  location VARCHAR(500) NOT NULL,
  attendees INTEGER NOT NULL DEFAULT 0,
  status VARCHAR(50) NOT NULL DEFAULT 'past',
  cover_image TEXT,
  description TEXT NOT NULL,
  images JSONB NOT NULL DEFAULT '[]',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_events_slug ON events(slug);
CREATE INDEX IF NOT EXISTS idx_events_date ON events(date DESC);

-- Success stories (editable)
CREATE TABLE IF NOT EXISTS success_stories (
  id SERIAL PRIMARY KEY,
  slug VARCHAR(255) NOT NULL UNIQUE,
  title VARCHAR(500) NOT NULL,
  tagline VARCHAR(500),
  description TEXT NOT NULL,
  image TEXT,
  challenge TEXT,
  challenge_points JSONB NOT NULL DEFAULT '[]',
  our_role TEXT,
  role_points JSONB NOT NULL DEFAULT '[]',
  experience TEXT,
  impact TEXT,
  impact_points JSONB NOT NULL DEFAULT '[]',
  founder_quote TEXT,
  attendee_quote TEXT,
  founder_quote2 TEXT,
  why_matters TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_success_stories_slug ON success_stories(slug);

-- Website content (visual editor key-value store)
CREATE TABLE IF NOT EXISTS website_content (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);
