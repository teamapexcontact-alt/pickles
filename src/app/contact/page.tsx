"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  return (
    <div className="container-custom py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="heading-2 mb-6">Contact Us</h1>
        <p className="body-lg text-neutral-600 mb-8">Coming soon. Reach out to us via WhatsApp or email for inquiries.</p>
        <Link href="/">
          <Button variant="primary" leftIcon={<ArrowLeft className="w-4 h-4" />}>Back to Home</Button>
        </Link>
      </div>
    </div>
  );
}