/**
 * Converts Google Drive share links and legacy direct URLs into the thumbnail
 * image endpoint for reliable display.
 *
 * Input examples:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/file/d/FILE_ID/view
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?export=view&id=FILE_ID
 *
 * Output: https://drive.google.com/thumbnail?id=FILE_ID&sz=w2000
 *
 * Non–Drive URLs are returned unchanged.
 */
export function convertGoogleDriveImageUrl(url: string): string {
  if (typeof url !== "string" || !url.trim()) return url;

  const trimmed = url.trim();

  // /d/FILE_ID/ (share link path)
  const pathMatch = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)\//);
  if (pathMatch) {
    return `https://drive.google.com/thumbnail?id=${pathMatch[1]}&sz=w2000`;
  }

  // drive.google.com ... ?id=FILE_ID (uc?export=view or /open?id=)
  if (trimmed.includes("drive.google.com")) {
    const idMatch = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (idMatch) {
      return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w2000`;
    }
  }

  return trimmed;
}

/**
 * Converts an array of image URLs (e.g. event gallery). Non-strings are skipped.
 */
export function convertGoogleDriveImageUrls(urls: string[]): string[] {
  return urls.map((u) => (typeof u === "string" ? convertGoogleDriveImageUrl(u) : u));
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
export function getProxiedImageUrl(url: string): string {
  const converted = convertGoogleDriveImageUrl(url);
  if (!isGoogleDriveImageUrl(converted)) return converted;
  return `/api/image?url=${encodeURIComponent(converted)}`;
}
