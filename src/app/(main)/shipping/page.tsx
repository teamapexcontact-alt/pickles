"use client";

import { Truck, Package, Clock, Shield, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const policies = [
  {
    icon: Truck,
    title: "Delivery Timeline",
    items: [
      "Orders are processed within 24 hours of placement",
      "Standard delivery: 3-5 business days across India",
      "Express delivery available in select cities (1-2 days)",
      "All orders are shipped via trusted courier partners",
    ],
  },
  {
    icon: Package,
    title: "Packaging",
    items: [
      "Each jar is securely packed in bubble wrap",
      "All packages use food-grade, leak-proof materials",
      "Eco-friendly packaging materials used where possible",
      "Fragile stickers applied to all packages",
    ],
  },
  {
    icon: Clock,
    title: "Delivery Hours",
    items: [
      "Deliveries are made Monday to Saturday, 9 AM to 8 PM",
      "Sunday deliveries available in select pin codes",
      "You'll receive a tracking link once your order ships",
      "Real-time delivery status updates via SMS",
    ],
  },
  {
    icon: MapPin,
    title: "Coverage Areas",
    items: [
      "Currently serving all major cities across India",
      "Tier-2 and tier-3 cities also covered",
      "International shipping coming soon",
      "Contact us for specific area availability",
    ],
  },
  {
    icon: Shield,
    title: "Shipping Charges",
    items: [
      "Free shipping on all orders above ₹499",
      "Flat ₹49 shipping fee for orders below ₹499",
      "No hidden charges - what you see is what you pay",
      "Cash on Delivery available with no extra fee",
    ],
  },
];

export default function ShippingPage() {
  return (
    <div className="container-custom py-16">
      <div className="text-center mb-12">
        <h1 className="heading-2 mb-4">Shipping Information</h1>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">We ensure your pickles reach you fresh and on time, every time.</p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {policies.map((policy) => (
          <div key={policy.title} className="flex items-start gap-4 p-6 rounded-lg border border-neutral-200 bg-white shadow-sm hover:bg-neutral-50/30 transition-colors">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
              <policy.icon className="w-6 h-6 text-accent" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-lg text-neutral-900 mb-3">{policy.title}</h3>
              <ul className="space-y-2">
                {policy.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-neutral-600">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link href="/products"><Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>Start Shopping</Button></Link>
      </div>
    </div>
  );
}
