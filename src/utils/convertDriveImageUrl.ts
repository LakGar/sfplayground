/** Max width requested from Drive’s thumbnail API (smaller = faster loads). */
export type DriveThumbWidth = 480 | 800 | 1200 | 1600 | 2000;

export type DriveImageOptions = {
  /** Default 1200 — enough for most full-width layouts without 2000px payloads */
  w?: DriveThumbWidth;
};

function driveThumbnailForId(fileId: string, w: DriveThumbWidth): string {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${w}`;
}

/**
 * Converts Google Drive share links and legacy direct URLs into the thumbnail
 * image endpoint for reliable display.
 *
 * Input examples:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/file/d/FILE_ID/view
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?export=view&id=FILE_ID
 * - https://drive.google.com/thumbnail?id=FILE_ID&sz=w2000  (re-sized to `w`)
 *
 * Non–Drive URLs are returned unchanged.
 */
export function convertGoogleDriveImageUrl(
  url: string,
  opts?: DriveImageOptions,
): string {
  if (typeof url !== "string" || !url.trim()) return url;

  const trimmed = url.trim();
  const w: DriveThumbWidth = opts?.w ?? 1200;

  // /d/FILE_ID/ (share link path)
  const pathMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)\//);
  if (pathMatch) {
    return driveThumbnailForId(pathMatch[1], w);
  }

  // drive.google.com ... ?id=FILE_ID (thumbnail, uc?export=view, /open?id=, etc.)
  if (trimmed.includes("drive.google.com")) {
    const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch) {
      return driveThumbnailForId(idMatch[1], w);
    }
  }

  return trimmed;
}

/**
 * Converts an array of image URLs (e.g. event gallery). Non-strings are skipped.
 */
export function convertGoogleDriveImageUrls(
  urls: string[],
  opts?: DriveImageOptions,
): string[] {
  return urls.map((u) =>
    typeof u === "string" ? convertGoogleDriveImageUrl(u, opts) : u,
  );
}

/** Returns true if the URL is a Google Drive image URL. */
export function isGoogleDriveImageUrl(url: string): boolean {
  if (typeof url !== "string" || !url.trim()) return false;
  return url.includes("drive.google.com");
}

/**
 * For Google Drive image URLs, returns the app's image proxy URL so the image
 * loads reliably (avoids Drive's Content-Disposition: attachment). Other URLs
 * are returned unchanged (after convertGoogleDriveImageUrl).
 */
export function getProxiedImageUrl(
  url: string,
  opts?: DriveImageOptions,
): string {
  const converted = convertGoogleDriveImageUrl(url, opts);
  if (!isGoogleDriveImageUrl(converted)) return converted;
  return `/api/image?url=${encodeURIComponent(converted)}`;
}
