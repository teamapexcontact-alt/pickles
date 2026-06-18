"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  return (
    <div className="container-custom py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="heading-2 mb-6">Our Story</h1>
        <p className="body-lg text-neutral-600 mb-8">
          Coming soon. We&apos;re crafting our story of tradition, quality, and authentic homemade pickles.
        </p>
        <Link href="/">
          <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}