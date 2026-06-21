"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube, ShieldCheck, CreditCard, Truck } from "lucide-react";
import { businessConfig } from "@/lib/business.config";

const { contact, social } = businessConfig;

const footerLinks = {
  shop: {
    title: "Shop",
    links: [
      { name: "All Pickles", href: "/products" },
      { name: "Mango Pickles", href: "/products?category=mango-pickles" },
      { name: "Gongura", href: "/products?category=gongura" },
      { name: "Chicken Pickles", href: "/products?category=chicken-pickles" },
      { name: "Prawn Pickles", href: "/products?category=prawn-pickles" },
      { name: "Vegetarian", href: "/products?category=vegetarian" },
      { name: "Spicy Specials", href: "/products?category=spicy-specials" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { name: "FAQ", href: "/faq" },
      { name: "Shipping Policy", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "Track Order", href: "/track-order" },
      { name: "Contact", href: "/contact" },
    ],
  },
  policies: {
    title: "Policies",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Our Process", href: "/process" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-neutral-900 text-neutral-300">
      {/* Trust badges */}
      <div className="border-b border-neutral-800">
        <div className="container-custom py-5">
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            <div className="flex items-center gap-2.5 text-sm">
              <ShieldCheck className="w-5 h-5 text-herb-400" />
              <span>FSSAI Certified</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <CreditCard className="w-5 h-5 text-gold-400" />
              <span>UPI / Cards / COD</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <Truck className="w-5 h-5 text-brand-400" />
              <span>Free shipping above ₹499</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <span className="w-5 h-5 flex items-center justify-center text-herb-400 text-xs font-bold border-2 border-herb-400 rounded">100</span>
              <span>No preservatives</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-xl font-heading font-bold text-white tracking-tight">
                {businessConfig.company.shortName}
              </span>
            </Link>
            <p className="text-sm text-neutral-400 max-w-sm mb-6 leading-relaxed">
              {businessConfig.footer.description}
            </p>
            <div className="space-y-2 text-sm text-neutral-400">
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4 text-brand-400" />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4 text-brand-400" />
                {contact.email}
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-brand-400" />
                <span>{contact.address.line1}, {contact.address.line2}</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-heading font-semibold text-sm text-white mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-400 hover:text-white transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-neutral-800 hover:bg-brand-600 transition-colors text-neutral-400 hover:text-white" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-neutral-800 hover:bg-brand-600 transition-colors text-neutral-400 hover:text-white" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg bg-neutral-800 hover:bg-brand-600 transition-colors text-neutral-400 hover:text-white" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-neutral-500">
            {businessConfig.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}
