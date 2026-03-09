/**
 * Converts Google Drive share links (HTML page URLs) into direct image URLs
 * suitable for <img src>, Next.js Image, and storage.
 *
 * Input examples:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/file/d/FILE_ID/view
 * - https://drive.google.com/open?id=FILE_ID
 *
 * Output: https://drive.google.com/uc?export=view&id=FILE_ID
 *
 * Non–Drive URLs are returned unchanged.
 */
export function convertGoogleDriveImageUrl(url: string): string {
  if (typeof url !== "string" || !url.trim()) return url;

  const trimmed = url.trim();

  // /file/d/FILE_ID/view (with optional query)
  const fileMatch = trimmed.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) {
    return `https://drive.google.com/uc?export=view&id=${fileMatch[1]}`;
  }

  // /open?id=FILE_ID
  const openMatch = trimmed.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch) {
    return `https://drive.google.com/uc?export=view&id=${openMatch[1]}`;
  }

  return trimmed;
}

/**
 * Converts an array of image URLs (e.g. event gallery). Non-strings are skipped.
 */
export function convertGoogleDriveImageUrls(urls: string[]): string[] {
  return urls.map((u) => (typeof u === "string" ? convertGoogleDriveImageUrl(u) : u));
}
