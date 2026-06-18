"use client";

import { HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

const spiceColors: Record<string, string> = {
  mild: "bg-neutral-100 text-neutral-700",
  medium: "bg-accent-light text-accent",
  hot: "bg-warning-light text-warning",
  "extra-hot": "bg-error-light text-error",
};

const statusColors: Record<string, string> = {
  active: "bg-accent-light text-accent",
  inactive: "bg-neutral-100 text-neutral-500",
  placed: "bg-neutral-100 text-neutral-600",
  preparing: "bg-warning-light text-warning",
  packed: "bg-accent-light text-accent",
  shipped: "bg-blue-50 text-blue-700",
  out_for_delivery: "bg-blue-50 text-blue-700",
  delivered: "bg-accent-light text-accent",
  cancelled: "bg-error-light text-error",
  returned: "bg-warning-light text-warning",
  pending: "bg-warning-light text-warning",
  paid: "bg-accent-light text-accent",
  failed: "bg-error-light text-error",
  refunded: "bg-neutral-100 text-neutral-600",
  partial: "bg-warning-light text-warning",
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
        success: "bg-accent-light text-accent",
        warning: "bg-warning-light text-warning",
        error: "bg-error-light text-error",
        info: "bg-blue-50 text-blue-700",
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