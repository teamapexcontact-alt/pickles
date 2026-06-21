"use client";

import Link from "next/link";
import { Shield, Lock, Eye, Database, UserCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

const sections = [
  {
    icon: Shield,
    title: "Information We Collect",
    content: "We collect information you provide directly: name, email address, phone number, shipping address, and payment details. We also automatically collect certain technical information when you visit our site, including IP address, browser type, and device information.",
  },
  {
    icon: Lock,
    title: "How We Use Your Information",
    content: "We use your information to process orders, deliver products, send order updates, improve our services, and send promotional communications (with your consent). We never sell your personal information to third parties.",
  },
  {
    icon: Database,
    title: "Data Storage & Security",
    content: "Your data is stored securely using industry-standard encryption. Payment information is processed by Razorpay and never stored on our servers. We implement appropriate technical measures to protect your personal data against unauthorized access.",
  },
  {
    icon: Eye,
    title: "Cookies & Tracking",
    content: "We use essential cookies for site functionality and analytics cookies to improve your experience. You can control cookie preferences through your browser settings. Third-party services like Razorpay may set their own cookies for payment processing.",
  },
  {
    icon: UserCheck,
    title: "Your Rights",
    content: "You have the right to access, correct, or delete your personal data at any time. You can unsubscribe from marketing emails at any time. Contact us to exercise any of these rights, and we'll respond within 30 days.",
  },
];

export default function PrivacyPage() {
  return (
    <div className="container-custom py-16">
      <div className="text-center mb-12">
        <h1 className="heading-2 mb-4">Privacy Policy</h1>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">Last updated: June 2026</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-6 mb-8">
        {sections.map((section) => (
          <div key={section.title} className="p-6 rounded-lg border border-neutral-200 bg-white shadow-sm hover:bg-neutral-50/30 transition-colors">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                <section.icon className="w-5 h-5 text-brand-600" />
              </div>
              <div>
                <h2 className="font-heading font-semibold text-lg text-neutral-900 mb-2">{section.title}</h2>
                <p className="text-neutral-600 leading-relaxed">{section.content}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-3xl mx-auto">
        <p className="text-sm text-neutral-500">
          For any privacy-related questions or requests, please contact us at{" "}
          <a href="mailto:privacy@apexpickles.com" className="text-brand-600 hover:underline">privacy@apexpickles.com</a>
        </p>
      </div>
    </div>
  );
}
