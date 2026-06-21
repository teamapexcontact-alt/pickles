"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const faqs = [
  {
    category: "Orders & Delivery",
    items: [
      { q: "How do I place an order?", a: "Simply browse our products, add items to your cart, and proceed to checkout. You can pay via card, UPI, or COD." },
      { q: "What is the delivery timeframe?", a: "We deliver within 3-5 business days across India. Free shipping on orders above ₹499." },
      { q: "Do you deliver outside India?", a: "Currently we only deliver within India. We're working on international shipping." },
      { q: "Can I change my delivery address after placing an order?", a: "Please contact us within 2 hours of placing your order to change the address." },
    ],
  },
  {
    category: "Products & Quality",
    items: [
      { q: "How long do your pickles last?", a: "Our pickles have a shelf life of 6-12 months when stored in a cool, dry place away from direct sunlight." },
      { q: "Do you use preservatives?", a: "No! We use absolutely no preservatives or artificial additives. Our pickles are 100% natural." },
      { q: "Are your pickles gluten-free?", a: "Yes, all our pickles are naturally gluten-free as they are made from traditional ingredients." },
      { q: "Do you offer custom spice levels?", a: "Yes! You can add a note at checkout with your spice preference and we'll customize your order." },
    ],
  },
  {
    category: "Payments & Refunds",
    items: [
      { q: "What payment methods do you accept?", a: "We accept all major credit/debit cards, UPI (GPay, PhonePe, PayTM), and Cash on Delivery." },
      { q: "What is your refund policy?", a: "If your order arrives damaged or spoiled, we offer a full refund or replacement within 48 hours of delivery." },
      { q: "How long do refunds take?", a: "Refunds are processed within 5-7 business days to your original payment method." },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set());

  const toggleItem = (q: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(q)) next.delete(q);
      else next.add(q);
      return next;
    });
  };

  return (
    <div className="container-custom py-16">
      <div className="text-center mb-12">
        <h1 className="heading-2 mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto mb-8">Everything you need to know about our pickles, ordering, and delivery</p>
        <div className="max-w-md mx-auto relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-neutral-200 pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-brand-600"
          />
        </div>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {faqs.map((category) => {
          const filtered = category.items.filter(
            (item) =>
              item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.a.toLowerCase().includes(searchQuery.toLowerCase())
          );
          if (filtered.length === 0) return null;
          return (
            <div key={category.category}>
              <h2 className="font-heading font-semibold text-xl text-neutral-900 mb-4">{category.category}</h2>
              <div className="space-y-2">
                {filtered.map((item) => (
                  <div key={item.q} className="rounded-lg border border-neutral-200 bg-white shadow-sm overflow-hidden">
                    <button
                      onClick={() => toggleItem(item.q)}
                      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-neutral-50/50 transition-colors"
                    >
                      <span className="font-medium text-neutral-900">{item.q}</span>
                      <ChevronDown className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${openItems.has(item.q) ? "rotate-180" : ""}`} />
                    </button>
                    {openItems.has(item.q) && (
                      <div className="px-6 pb-4">
                        <p className="text-neutral-600 leading-relaxed">{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center mt-16 p-8 rounded-lg border border-neutral-200 bg-neutral-50">
        <h2 className="heading-4 mb-2">Still have questions?</h2>
        <p className="text-neutral-500 mb-6">We&apos;re here to help! Reach out to us anytime.</p>
        <div className="flex items-center justify-center gap-4">
          <Button variant="primary" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button variant="secondary" size="lg">
            <a href="https://wa.me/919XXXXXXXXX" target="_blank" rel="noopener noreferrer">WhatsApp</a>
          </Button>
        </div>
      </div>
    </div>
  );
}
