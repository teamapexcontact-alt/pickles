"use client";

import Link from "next/link";
import { FileText, AlertTriangle, Scale, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function TermsPage() {
  return (
    <div className="container-custom py-16">
      <div className="text-center mb-12">
        <h1 className="heading-2 mb-4">Terms & Conditions</h1>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">Last updated: June 2026</p>
      </div>

      <div className="max-w-3xl mx-auto prose prose-neutral">
        <section className="mb-8">
          <h2 className="font-heading font-semibold text-xl text-neutral-900 mb-3">1. Acceptance of Terms</h2>
          <p className="text-neutral-600 leading-relaxed">By accessing and using APEX Pickles website, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use our services.</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-xl text-neutral-900 mb-3">2. Products & Pricing</h2>
          <p className="text-neutral-600 leading-relaxed mb-3">All products are handmade in small batches. Product images are for illustration purposes; actual products may vary slightly. Prices are subject to change without prior notice. We reserve the right to modify or discontinue products at any time.</p>
          <p className="text-neutral-600 leading-relaxed">All prices are in Indian Rupees (₹) and inclusive of applicable taxes unless stated otherwise.</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-xl text-neutral-900 mb-3">3. Orders & Payments</h2>
          <p className="text-neutral-600 leading-relaxed mb-3">All orders are subject to availability and confirmation. We reserve the right to cancel any order for any reason, including pricing errors or stock unavailability.</p>
          <p className="text-neutral-600 leading-relaxed">Payments are processed securely through Razorpay. By placing an order, you authorize us to charge the applicable amount to your chosen payment method.</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-xl text-neutral-900 mb-3">4. Shipping & Delivery</h2>
          <p className="text-neutral-600 leading-relaxed mb-3">Delivery timelines are estimates and not guaranteed. We are not responsible for delays caused by courier partners, weather conditions, or other factors beyond our control.</p>
          <p className="text-neutral-600 leading-relaxed">Risk of loss passes to you upon delivery. Please inspect packages immediately upon receipt.</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-xl text-neutral-900 mb-3">5. Returns & Refunds</h2>
          <p className="text-neutral-600 leading-relaxed">Our return policy is outlined in detail on our Returns page. Due to the perishable nature of food products, we cannot accept returns for opened items. Please contact us within 48 hours of delivery for any quality issues.</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-xl text-neutral-900 mb-3">6. User Accounts</h2>
          <p className="text-neutral-600 leading-relaxed">You are responsible for maintaining the confidentiality of your account credentials and for all activities under your account. Notify us immediately of any unauthorized use.</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-xl text-neutral-900 mb-3">7. Limitation of Liability</h2>
          <p className="text-neutral-600 leading-relaxed">APEX Pickles shall not be liable for any indirect, incidental, or consequential damages arising from your use of our products or services. Our total liability is limited to the amount paid for the product in question.</p>
        </section>

        <section className="mb-8">
          <h2 className="font-heading font-semibold text-xl text-neutral-900 mb-3">8. Contact</h2>
          <p className="text-neutral-600 leading-relaxed">For questions about these terms, please contact us at <a href="mailto:support@apexpickles.com" className="text-brand-600 hover:underline">support@apexpickles.com</a>.</p>
        </section>
      </div>

      <div className="text-center mt-12 p-6 rounded-lg border border-neutral-200 bg-neutral-50">
        <p className="text-neutral-500">These terms were last updated on June 1, 2026.</p>
      </div>
    </div>
  );
}
