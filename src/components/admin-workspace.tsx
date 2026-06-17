"use client";

import * as React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Check, Code2, Eye, FileText, Mail, Send, ShieldCheck, Users } from "lucide-react";
import { toast } from "sonner";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { DataTable } from "@/components/data-table";
import { SectionCards } from "@/components/section-cards";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { CrmChartPoint, CrmRecord, CrmStat } from "@/lib/admin-crm-types";

type AdminSession = {
  id: string;
  name: string;
};

type BlogPostItem = {
  id: number;
  slug: string;
  title: string;
  excerpt: string | null;
  body: string;
  image_url: string | null;
  published_at: string | null;
  updated_at: string;
};

type NewsletterDraftItem = {
  id: number;
  subject: string;
  body_html: string;
  updated_at: string;
};

type SubscriberItem = {
  id: number;
  email: string;
  name: string | null;
};

type AuditItem = {
  id: number;
  admin_name: string;
  action: string;
  target_type: string;
  target_id: string | null;
  details: Record<string, unknown>;
  created_at: string;
};

type AdminWorkspaceProps = {
  session: AdminSession;
  stats: CrmStat[];
  chart: CrmChartPoint[];
  records: CrmRecord[];
  posts: BlogPostItem[];
  drafts: NewsletterDraftItem[];
  subscribers: SubscriberItem[];
  audit: AuditItem[];
};

function slugify(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function generateNewsletterHtml(input: {
  eyebrow: string;
  headline: string;
  intro: string;
  ctaLabel: string;
  ctaUrl: string;
}): string {
  const cta =
    input.ctaLabel && input.ctaUrl
      ? `<p style="margin:22px 0 0;"><a href="${input.ctaUrl}" style="display:inline-block;border-radius:999px;background:#f8fafc;color:#0f172a;padding:12px 18px;text-decoration:none;font-weight:700;">${input.ctaLabel}</a></p>`
      : "";

  return `<p style="margin:0 0 10px;font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:#94a3b8;">${input.eyebrow}</p>
<h2 style="margin:0 0 14px;font-size:26px;line-height:1.15;color:#f8fafc;">${input.headline}</h2>
<p style="margin:0;color:#cbd5e1;">${input.intro}</p>
${cta}`;
}

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const payload = (await response.json().catch(() => ({}))) as { error?: string };
    throw new Error(payload.error ?? "Request failed");
  }
  return response.json() as Promise<T>;
}

export function AdminWorkspace({
  session,
  stats,
  chart,
  records,
  posts: initialPosts,
  drafts: initialDrafts,
  subscribers,
  audit: initialAudit,
}: AdminWorkspaceProps) {
  const [posts, setPosts] = React.useState(initialPosts);
  const [drafts, setDrafts] = React.useState(initialDrafts);
  const [audit, setAudit] = React.useState(initialAudit);
  const [blogTitle, setBlogTitle] = React.useState("");
  const [blogSlug, setBlogSlug] = React.useState("");
  const [blogExcerpt, setBlogExcerpt] = React.useState("");
  const [blogImageUrl, setBlogImageUrl] = React.useState("");
  const [blogBody, setBlogBody] = React.useState("# New SFPlayground post\n\nWrite in **Markdown** here.");
  const [selectedPostId, setSelectedPostId] = React.useState<number | null>(null);

  const [newsletterSubject, setNewsletterSubject] = React.useState("");
  const [newsletterHtml, setNewsletterHtml] = React.useState("<h2>SFPlayground update</h2><p>Write raw HTML here.</p>");
  const [selectedDraftId, setSelectedDraftId] = React.useState<number | null>(null);
  const [selectAllRecipients, setSelectAllRecipients] = React.useState(true);
  const [recipientQuery, setRecipientQuery] = React.useState("");
  const [selectedRecipients, setSelectedRecipients] = React.useState<Set<number>>(new Set());
  const [builder, setBuilder] = React.useState({
    eyebrow: "SFPLAYGROUND",
    headline: "Community update",
    intro: "A short update for founders, investors, sponsors, and friends of SFPlayground.",
    ctaLabel: "Open SFPlayground",
    ctaUrl: "https://sfplayground.com",
  });
  const [isBusy, setIsBusy] = React.useState(false);

  const filteredSubscribers = React.useMemo(() => {
    const query = recipientQuery.trim().toLowerCase();
    if (!query) return subscribers.slice(0, 80);
    return subscribers
      .filter((subscriber) =>
        `${subscriber.name ?? ""} ${subscriber.email}`.toLowerCase().includes(query),
      )
      .slice(0, 80);
  }, [recipientQuery, subscribers]);

  const selectedPost = posts.find((post) => post.id === selectedPostId) ?? null;
  function loadPost(post: BlogPostItem) {
    setSelectedPostId(post.id);
    setBlogTitle(post.title);
    setBlogSlug(post.slug);
    setBlogExcerpt(post.excerpt ?? "");
    setBlogImageUrl(post.image_url ?? "");
    setBlogBody(post.body);
  }

  function loadDraft(draft: NewsletterDraftItem) {
    setSelectedDraftId(draft.id);
    setNewsletterSubject(draft.subject);
    setNewsletterHtml(draft.body_html);
  }

  async function refreshAudit() {
    const nextAudit = await parseResponse<AuditItem[]>(await fetch("/api/admin/audit"));
    setAudit(nextAudit);
  }

  async function saveBlog(publish: boolean) {
    if (!blogTitle.trim() || !blogBody.trim()) {
      toast.error("Blog title and Markdown body are required.");
      return;
    }
    setIsBusy(true);
    try {
      const payload = {
        title: blogTitle,
        slug: blogSlug || slugify(blogTitle),
        excerpt: blogExcerpt,
        body: blogBody,
        image_url: blogImageUrl,
        publish,
      };
      const response = selectedPostId
        ? await fetch(`/api/admin/blog/${selectedPostId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/admin/blog", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
      const saved = await parseResponse<BlogPostItem>(response);
      setSelectedPostId(saved.id);
      setPosts((current) => [saved, ...current.filter((post) => post.id !== saved.id)]);
      await refreshAudit();
      toast.success(publish ? "Blog post published." : "Blog draft saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save blog post.");
    } finally {
      setIsBusy(false);
    }
  }

  async function deleteBlog() {
    if (!selectedPostId || !confirm("Delete this blog post?")) return;
    setIsBusy(true);
    try {
      const response = await fetch(`/api/admin/blog/${selectedPostId}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Could not delete blog post.");
      setPosts((current) => current.filter((post) => post.id !== selectedPostId));
      setSelectedPostId(null);
      setBlogTitle("");
      setBlogSlug("");
      setBlogExcerpt("");
      setBlogImageUrl("");
      setBlogBody("# New SFPlayground post\n\nWrite in **Markdown** here.");
      await refreshAudit();
      toast.success("Blog post deleted.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not delete blog post.");
    } finally {
      setIsBusy(false);
    }
  }

  async function saveNewsletter() {
    if (!newsletterSubject.trim() || !newsletterHtml.trim()) {
      toast.error("Newsletter subject and HTML body are required.");
      return;
    }
    setIsBusy(true);
    try {
      const payload = { subject: newsletterSubject, body_html: newsletterHtml };
      const response = selectedDraftId
        ? await fetch(`/api/admin/newsletters/${selectedDraftId}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          })
        : await fetch("/api/admin/newsletters", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
          });
      const saved = await parseResponse<NewsletterDraftItem>(response);
      setSelectedDraftId(saved.id);
      setDrafts((current) => [saved, ...current.filter((draft) => draft.id !== saved.id)]);
      await refreshAudit();
      toast.success("Newsletter draft saved.");
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not save newsletter.");
    } finally {
      setIsBusy(false);
    }
  }

  async function sendNewsletter() {
    if (!selectedDraftId) {
      toast.error("Save or select a newsletter draft before sending.");
      return;
    }
    const selectedCount = selectAllRecipients ? subscribers.length : selectedRecipients.size;
    if (selectedCount === 0) {
      toast.error("Select at least one recipient.");
      return;
    }
    const ok = confirm(
      selectAllRecipients
        ? `Send this newsletter to all ${subscribers.length.toLocaleString()} subscribers through Resend?`
        : `Send this newsletter to ${selectedRecipients.size.toLocaleString()} selected recipients through Resend?`,
    );
    if (!ok) return;
    setIsBusy(true);
    try {
      const response = await fetch("/api/admin/newsletters/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          draftId: selectedDraftId,
          recipientIds: selectAllRecipients ? undefined : Array.from(selectedRecipients),
        }),
      });
      const result = await parseResponse<{ message: string }>(response);
      await refreshAudit();
      toast.success(result.message);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Could not send newsletter.");
    } finally {
      setIsBusy(false);
    }
  }

  return (
    <div className="@container/main flex flex-1 flex-col gap-2">
      <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
        <SectionCards stats={stats} />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive data={chart} />
        </div>
        <Tabs defaultValue="crm" className="w-full gap-5 px-4 lg:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Workspace</h2>
              <p className="text-sm text-muted-foreground">Signed in as {session.name}</p>
            </div>
            <TabsList className="flex flex-wrap">
              <TabsTrigger value="crm"><Users /> CRM</TabsTrigger>
              <TabsTrigger value="blogs"><FileText /> Blogs</TabsTrigger>
              <TabsTrigger value="newsletter"><Mail /> Newsletters</TabsTrigger>
              <TabsTrigger value="audit"><ShieldCheck /> Audit</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="crm" className="m-0">
            <DataTable data={records} />
          </TabsContent>
          <TabsContent value="blogs" className="m-0 grid gap-4 xl:grid-cols-[360px_1fr]">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Posts</CardTitle>
                <CardDescription>Drafts are hidden publicly until published.</CardDescription>
              </CardHeader>
              <div className="grid gap-2 px-6 pb-6">
                {posts.map((post) => (
                  <button
                    type="button"
                    key={post.id}
                    onClick={() => loadPost(post)}
                    className="rounded-md border p-3 text-left text-sm transition hover:bg-muted"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-medium">{post.title}</span>
                      <Badge variant={post.published_at ? "default" : "secondary"}>
                        {post.published_at ? "Published" : "Draft"}
                      </Badge>
                    </div>
                    <div className="mt-1 text-xs text-muted-foreground">/{post.slug}</div>
                  </button>
                ))}
              </div>
            </Card>
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Markdown editor</CardTitle>
                  <CardDescription>Saved to the database. Published posts render on `/blog`.</CardDescription>
                </CardHeader>
                <div className="grid gap-4 px-6 pb-6">
                  <div className="grid gap-3 md:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="blog-title">Title</Label>
                      <Input id="blog-title" value={blogTitle} onChange={(e) => {
                        setBlogTitle(e.target.value);
                        if (!selectedPostId) setBlogSlug(slugify(e.target.value));
                      }} />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="blog-slug">Slug</Label>
                      <Input id="blog-slug" value={blogSlug} onChange={(e) => setBlogSlug(slugify(e.target.value))} />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="blog-excerpt">Excerpt</Label>
                    <Input id="blog-excerpt" value={blogExcerpt} onChange={(e) => setBlogExcerpt(e.target.value)} />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="blog-image">Hero image URL</Label>
                    <Input id="blog-image" value={blogImageUrl} onChange={(e) => setBlogImageUrl(e.target.value)} />
                  </div>
                  <div className="grid gap-4 xl:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="blog-body">Markdown</Label>
                      <textarea
                        id="blog-body"
                        value={blogBody}
                        onChange={(e) => setBlogBody(e.target.value)}
                        className="min-h-[420px] rounded-md border bg-background p-3 font-mono text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Preview</Label>
                      <div className="min-h-[420px] overflow-auto rounded-md border bg-card p-5 text-sm leading-7">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{blogBody}</ReactMarkdown>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={() => saveBlog(false)} disabled={isBusy}><Check /> Save draft</Button>
                    <Button variant="secondary" onClick={() => saveBlog(true)} disabled={isBusy}><Eye /> Publish</Button>
                    <Button variant="outline" asChild disabled={!selectedPost}>
                      <a href={selectedPost ? `/blog/${selectedPost.slug}` : "/blog"} target="_blank" rel="noreferrer">
                        <Eye /> View public
                      </a>
                    </Button>
                    <Button variant="destructive" onClick={deleteBlog} disabled={!selectedPostId || isBusy}>Delete</Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="newsletter" className="m-0 grid gap-4 xl:grid-cols-[360px_1fr]">
            <Card className="h-fit">
              <CardHeader>
                <CardTitle>Drafts</CardTitle>
                <CardDescription>HTML is stored in the database.</CardDescription>
              </CardHeader>
              <div className="grid gap-2 px-6 pb-6">
                {drafts.map((draft) => (
                  <button
                    type="button"
                    key={draft.id}
                    onClick={() => loadDraft(draft)}
                    className="rounded-md border p-3 text-left text-sm transition hover:bg-muted"
                  >
                    <div className="font-medium">{draft.subject}</div>
                    <div className="mt-1 text-xs text-muted-foreground">Updated {draft.updated_at}</div>
                  </button>
                ))}
              </div>
            </Card>
            <div className="grid gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Visual builder</CardTitle>
                  <CardDescription>Generate HTML, then edit the raw HTML before saving or sending.</CardDescription>
                </CardHeader>
                <div className="grid gap-3 px-6 pb-6 md:grid-cols-2">
                  {Object.entries(builder).map(([key, value]) => (
                    <div className="grid gap-2" key={key}>
                      <Label htmlFor={`builder-${key}`}>{key}</Label>
                      <Input
                        id={`builder-${key}`}
                        value={value}
                        onChange={(event) => setBuilder((current) => ({ ...current, [key]: event.target.value }))}
                      />
                    </div>
                  ))}
                  <div className="md:col-span-2">
                    <Button
                      variant="secondary"
                      onClick={() => setNewsletterHtml(generateNewsletterHtml(builder))}
                    >
                      <Code2 /> Generate HTML
                    </Button>
                  </div>
                </div>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Newsletter editor</CardTitle>
                  <CardDescription>Raw HTML plus live preview. Sending uses Resend.</CardDescription>
                </CardHeader>
                <div className="grid gap-4 px-6 pb-6">
                  <div className="grid gap-2">
                    <Label htmlFor="newsletter-subject">Subject</Label>
                    <Input id="newsletter-subject" value={newsletterSubject} onChange={(e) => setNewsletterSubject(e.target.value)} />
                  </div>
                  <div className="grid gap-4 xl:grid-cols-2">
                    <div className="grid gap-2">
                      <Label htmlFor="newsletter-html">Raw HTML</Label>
                      <textarea
                        id="newsletter-html"
                        value={newsletterHtml}
                        onChange={(e) => setNewsletterHtml(e.target.value)}
                        className="min-h-[360px] rounded-md border bg-background p-3 font-mono text-sm outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Preview</Label>
                      <div
                        className="min-h-[360px] overflow-auto rounded-md border bg-[#0b1020] p-5 text-sm text-slate-100"
                        dangerouslySetInnerHTML={{ __html: newsletterHtml }}
                      />
                    </div>
                  </div>
                  <Separator />
                  <div className="grid gap-3">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="select-all-recipients"
                        checked={selectAllRecipients}
                        onCheckedChange={(checked) => setSelectAllRecipients(Boolean(checked))}
                      />
                      <Label htmlFor="select-all-recipients">
                        Send to all subscribers ({subscribers.length.toLocaleString()})
                      </Label>
                    </div>
                    {!selectAllRecipients ? (
                      <div className="grid gap-3">
                        <Input
                          placeholder="Search recipients by name or email"
                          value={recipientQuery}
                          onChange={(event) => setRecipientQuery(event.target.value)}
                        />
                        <div className="max-h-56 overflow-auto rounded-md border">
                          {filteredSubscribers.map((subscriber) => (
                            <label
                              className="flex cursor-pointer items-center gap-2 border-b px-3 py-2 text-sm last:border-b-0"
                              key={subscriber.id}
                            >
                              <Checkbox
                                checked={selectedRecipients.has(subscriber.id)}
                                onCheckedChange={(checked) => {
                                  setSelectedRecipients((current) => {
                                    const next = new Set(current);
                                    if (checked) next.add(subscriber.id);
                                    else next.delete(subscriber.id);
                                    return next;
                                  });
                                }}
                              />
                              <span>{subscriber.name || subscriber.email}</span>
                              <span className="text-muted-foreground">{subscriber.email}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button onClick={saveNewsletter} disabled={isBusy}><Check /> Save draft</Button>
                    <Button variant="secondary" onClick={sendNewsletter} disabled={isBusy}>
                      <Send /> Send newsletter
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
          <TabsContent value="audit" className="m-0">
            <Card>
              <CardHeader>
                <CardTitle>Audit trail</CardTitle>
                <CardDescription>Who did what inside the admin workspace.</CardDescription>
              </CardHeader>
              <div className="overflow-auto px-6 pb-6">
                <table className="w-full min-w-[760px] text-sm">
                  <thead className="text-left text-muted-foreground">
                    <tr>
                      <th className="py-2">Time</th>
                      <th>Admin</th>
                      <th>Action</th>
                      <th>Target</th>
                      <th>Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {audit.map((item) => (
                      <tr className="border-t" key={item.id}>
                        <td className="py-2">{new Date(item.created_at).toLocaleString()}</td>
                        <td>{item.admin_name}</td>
                        <td><Badge variant="secondary">{item.action}</Badge></td>
                        <td>{item.target_type}{item.target_id ? ` #${item.target_id}` : ""}</td>
                        <td className="max-w-[320px] truncate text-muted-foreground">
                          {JSON.stringify(item.details)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
