"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "default" | "ghost" | "outline";
type ButtonSize = "default" | "sm" | "lg";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-slate-200 text-slate-900 hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed",
  ghost: "bg-transparent hover:bg-white/10 text-white transition-colors",
  outline:
    "bg-transparent border border-white/20 hover:bg-white/10 text-white transition-colors",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-10 px-4 py-2 rounded-lg text-sm",
  sm: "h-9 px-3 rounded-md text-sm",
  lg: "h-11 px-6 rounded-xl text-sm",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(variantClasses[variant], sizeClasses[size], className)}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

