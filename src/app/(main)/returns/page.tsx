"use client";

import { RotateCcw, RefreshCw, Shield, AlertCircle, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function ReturnsPage() {
  return (
    <div className="container-custom py-16">
      <div className="text-center mb-12">
        <h1 className="heading-2 mb-4">Returns & Refunds</h1>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">Your satisfaction is our top priority. If something isn&apos;t right, we&apos;ll make it right.</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6">
        <div className="p-6 rounded-lg border border-neutral-200 bg-white shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
              <RotateCcw className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-xl text-neutral-900 mb-2">Easy Returns</h2>
              <p className="text-neutral-600">If your order arrives damaged, spoiled, or incorrect, we offer a full refund or replacement within 48 hours of delivery.</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border border-neutral-200 bg-white shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <RefreshCw className="w-6 h-6 text-accent" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-xl text-neutral-900 mb-2">Refund Process</h2>
              <ol className="space-y-2 text-neutral-600 list-decimal list-inside">
                <li>Contact us within 48 hours of delivery with photos of the issue</li>
                <li>Our team will review and process your request within 24 hours</li>
                <li>Refunds are processed within 5-7 business days to your original payment method</li>
                <li>Replacements are shipped within 2 business days</li>
              </ol>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border border-neutral-200 bg-white shadow-sm">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Shield className="w-6 h-6 text-neutral-700" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-xl text-neutral-900 mb-2">Quality Guarantee</h2>
              <p className="text-neutral-600">We stand behind every jar we sell. If you&apos;re not satisfied with the quality or taste, let us know and we&apos;ll make it right. Our pickles are made fresh in small batches, and we take full responsibility for your satisfaction.</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-lg border border-red-200 bg-red-50">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center flex-shrink-0">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="font-heading font-semibold text-xl text-neutral-900 mb-2">Non-Returnable Items</h2>
              <p className="text-neutral-600">Due to food safety regulations, we cannot accept returns for items that have been opened, partially consumed, or stored improperly. Please inspect your package upon delivery.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <Link href="/contact"><Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>Contact Support</Button></Link>
      </div>
    </div>
  );
}
