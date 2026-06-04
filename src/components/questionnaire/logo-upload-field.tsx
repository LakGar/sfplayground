"use client";

import { IntakeFileUpload } from "@/components/questionnaire/intake-file-upload";

type LogoUploadFieldProps = {
  value: string;
  onChange: (url: string) => void;
  label?: string;
};

export function LogoUploadField({
  value,
  onChange,
  label = "Upload logo",
}: LogoUploadFieldProps) {
  return (
    <IntakeFileUpload
      value={value}
      onChange={(url) => onChange(url)}
      category="logo"
      label={label}
    />
  );
}
