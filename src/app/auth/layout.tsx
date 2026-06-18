"use client";

import { ReactNode } from "react";
import { Providers } from "@/components/Providers";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Providers>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-secondary-cream-white to-white p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </Providers>
  );
}