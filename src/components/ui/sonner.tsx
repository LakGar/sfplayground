"use client";

import type { ComponentProps } from "react";
import { Toaster as Sonner } from "sonner";

type ToasterProps = ComponentProps<typeof Sonner>;

export function Toaster({ ...props }: ToasterProps) {
  return (
    <Sonner
      theme="dark"
      position="top-center"
      richColors
      closeButton
      offset="5.5rem"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:border-white/10 group-[.toaster]:bg-neutral-950/95 group-[.toaster]:text-white group-[.toaster]:backdrop-blur-md group-[.toaster]:shadow-lg",
          title: "group-[.toast]:text-[15px] group-[.toast]:font-semibold",
          description: "group-[.toast]:text-neutral-300",
          actionButton:
            "group-[.toast]:!bg-white group-[.toast]:!text-neutral-900 group-[.toast]:hover:!bg-white/90",
          cancelButton: "group-[.toast]:border-white/15 group-[.toast]:bg-transparent group-[.toast]:text-white/80",
          closeButton:
            "group-[.toast]:border-white/10 group-[.toast]:bg-white/5 group-[.toast]:text-white/70 group-[.toast]:hover:bg-white/10 group-[.toast]:hover:text-white",
        },
      }}
      {...props}
    />
  );
}
