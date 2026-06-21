"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const spiceColors: Record<string, string> = {
  mild: "bg-neutral-100 text-neutral-700",
  medium: "bg-gold-100 text-gold-700",
  hot: "bg-brand-100 text-brand-700",
  "extra-hot": "bg-brand-200 text-brand-800",
};

const statusColors: Record<string, string> = {
  active: "bg-herb-100 text-herb-700",
  inactive: "bg-neutral-100 text-neutral-500",
  placed: "bg-neutral-100 text-neutral-600",
  preparing: "bg-gold-100 text-gold-700",
  packed: "bg-herb-100 text-herb-700",
  shipped: "bg-sky-50 text-sky-700",
  out_for_delivery: "bg-sky-50 text-sky-700",
  delivered: "bg-herb-100 text-herb-700",
  cancelled: "bg-brand-100 text-brand-700",
  returned: "bg-gold-100 text-gold-700",
  pending: "bg-gold-100 text-gold-700",
  paid: "bg-herb-100 text-herb-700",
  failed: "bg-brand-100 text-brand-700",
  refunded: "bg-neutral-100 text-neutral-600",
  partial: "bg-gold-100 text-gold-700",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "success" | "warning" | "error" | "info" | "spice" | "status";
  size?: "sm" | "md" | "lg";
  value?: string;
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = "default", size = "md", value, children, ...props }, ref) => {
    let variantClass = "bg-neutral-100 text-neutral-700";

    if (variant === "spice" && value) {
      variantClass = spiceColors[value.toLowerCase()] || "bg-neutral-100 text-neutral-700";
    } else if (variant === "status" && value) {
      variantClass = statusColors[value.toLowerCase()] || "bg-neutral-100 text-neutral-700";
    } else {
      const variantClasses: Record<string, string> = {
        default: "bg-neutral-100 text-neutral-700",
        success: "bg-herb-100 text-herb-700",
        warning: "bg-gold-100 text-gold-700",
        error: "bg-brand-100 text-brand-700",
        info: "bg-sky-50 text-sky-700",
      };
      variantClass = variantClasses[variant];
    }

    const sizeClasses = {
      sm: "px-2 py-0.5 text-xs",
      md: "px-2.5 py-0.5 text-xs",
      lg: "px-3 py-1 text-sm",
    };

    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full font-medium",
          variantClass,
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {children}
      </span>
    );
  }
);

Badge.displayName = "Badge";