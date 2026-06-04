export type IntakeUploadCategory = "logo" | "document";

export const INTAKE_UPLOAD_CONFIG: Record<
  IntakeUploadCategory,
  {
    maxBytes: number;
    accept: string;
    hint: string;
    mimePrefixes: string[];
    extensions: string[];
  }
> = {
  logo: {
    maxBytes: 5 * 1024 * 1024,
    accept: "image/png,image/jpeg,image/webp,image/gif",
    hint: "PNG, JPG, or WebP · max 5MB",
    mimePrefixes: ["image/"],
    extensions: [".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"],
  },
  document: {
    maxBytes: 15 * 1024 * 1024,
    accept:
      "application/pdf,.pdf,application/vnd.ms-powerpoint,.ppt,application/vnd.openxmlformats-officedocument.presentationml.presentation,.pptx,application/msword,.doc,application/vnd.openxmlformats-officedocument.wordprocessingml.document,.docx,text/plain,.txt,image/png,image/jpeg,image/webp",
    hint: "PDF, PPT, DOC, or TXT · max 15MB",
    mimePrefixes: [
      "image/",
      "application/pdf",
      "application/msword",
      "application/vnd.",
      "text/plain",
    ],
    extensions: [
      ".pdf",
      ".ppt",
      ".pptx",
      ".doc",
      ".docx",
      ".txt",
      ".png",
      ".jpg",
      ".jpeg",
      ".webp",
    ],
  },
};

export function isAllowedIntakeUpload(
  category: IntakeUploadCategory,
  mime: string,
  fileName: string,
): boolean {
  const config = INTAKE_UPLOAD_CONFIG[category];
  const lowerMime = mime.toLowerCase();
  if (config.mimePrefixes.some((p) => lowerMime.startsWith(p))) {
    return true;
  }
  const ext = fileName.toLowerCase().slice(fileName.lastIndexOf("."));
  return config.extensions.includes(ext);
}
