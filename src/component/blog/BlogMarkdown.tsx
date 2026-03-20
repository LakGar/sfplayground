"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getProxiedImageUrl } from "@/utils/convertDriveImageUrl";

const blogComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="mt-12 mb-4 font-oswald text-3xl font-semibold tracking-[-0.02em] text-white md:text-4xl"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className="mt-14 mb-4 font-oswald text-2xl font-semibold tracking-[-0.02em] text-white md:text-3xl"
      {...props}
    >
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className="mt-10 mb-3 font-oswald text-lg font-semibold tracking-wide text-white md:text-xl"
      {...props}
    >
      {children}
    </h3>
  ),
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="mb-5 text-[1.0625rem] leading-[1.75] text-white/88" {...props}>
      {children}
    </p>
  ),
  a: ({
    href,
    children,
    ...props
  }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <a
      href={href}
      className="text-white underline-offset-4 hover:text-white/80 hover:underline"
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="mb-4 list-disc space-y-1 pl-6 text-white/90" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="mb-4 list-decimal space-y-1 pl-6 text-white/90" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="my-8 border-l border-white/25 py-1 pl-6 text-base italic leading-relaxed text-white/72 md:pl-8"
      {...props}
    >
      {children}
    </blockquote>
  ),
  code: ({
    className,
    children,
    ...props
  }: React.HTMLAttributes<HTMLElement>) => {
    const isBlock = className?.includes("language-");
    if (isBlock) {
      return (
        <pre className="overflow-x-auto rounded-lg bg-white/10 p-4 my-4 text-sm font-mono text-white/90">
          <code className={className} {...props}>
            {children}
          </code>
        </pre>
      );
    }
    return (
      <code
        className="rounded bg-white/10 px-1.5 py-0.5 text-sm font-mono text-white/90"
        {...props}
      >
        {children}
      </code>
    );
  },
  hr: () => <hr className="border-white/20 my-8" />,
  img: ({ src, alt, ...props }: React.ImgHTMLAttributes<HTMLImageElement>) => (
    <span className="block my-4 rounded-lg overflow-hidden border border-white/20">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={
          typeof src === "string" ? getProxiedImageUrl(src) : (src ?? undefined)
        }
        alt={alt ?? ""}
        className="w-full h-auto object-contain"
        referrerPolicy={
          typeof src === "string" && src.includes("drive.google.com")
            ? "no-referrer"
            : undefined
        }
        {...props}
      />
    </span>
  ),
};

export function BlogMarkdown({ content }: { content: string }) {
  return (
    <div className="blog-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={blogComponents}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
