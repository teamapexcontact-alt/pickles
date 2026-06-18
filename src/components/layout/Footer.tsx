"use client";

import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { businessConfig } from "@/lib/business.config";

const { contact, social } = businessConfig;

const footerLinks = {
  shop: {
    title: "Shop",
    links: [
      { name: "All Pickles", href: "/products" },
      { name: "Mango Pickles", href: "/products?category=mango" },
      { name: "Gongura", href: "/products?category=gongura" },
      { name: "Chicken Pickles", href: "/products?category=chicken" },
      { name: "Prawn Pickles", href: "/products?category=prawn" },
      { name: "Vegetarian", href: "/products?category=vegetarian" },
      { name: "Spicy Specials", href: "/products?category=spicy-specials" },
      { name: "Best Sellers", href: "/products?sort=best-sellers" },
    ],
  },
  support: {
    title: "Support",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Shipping Policy", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "Track Order", href: "/track-order" },
    ],
  },
  company: {
    title: "Company",
    links: [
      { name: "About Us", href: "/about" },
      { name: "Our Process", href: "/process" },
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <div className="container-custom py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-xl font-heading font-semibold text-neutral-900 tracking-tight">
                {businessConfig.company.shortName}
              </span>
              <span className="text-sm font-medium text-neutral-500 hidden sm:inline">
                {businessConfig.company.name.replace(businessConfig.company.shortName + " ", "")}
              </span>
            </Link>
            <p className="text-sm text-neutral-500 max-w-sm mb-6 leading-relaxed">
              {businessConfig.footer.description}
            </p>
            <div className="space-y-2 text-sm text-neutral-500">
              <a href={`tel:${contact.phone}`} className="flex items-center gap-2 hover:text-neutral-900 transition-colors">
                <Phone className="w-4 h-4" />
                {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-neutral-900 transition-colors">
                <Mail className="w-4 h-4" />
                {contact.email}
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>{contact.address.line1}, {contact.address.line2}</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([key, section]) => (
            <div key={key}>
              <h3 className="font-semibold text-sm uppercase tracking-wider text-neutral-900 mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-neutral-500 hover:text-neutral-900 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-600 hover:text-neutral-900" aria-label="Instagram">
              <Instagram className="w-4 h-4" />
            </a>
            <a href={social.facebook} target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-600 hover:text-neutral-900" aria-label="Facebook">
              <Facebook className="w-4 h-4" />
            </a>
            <a href={social.youtube} target="_blank" rel="noopener noreferrer" className="p-2 rounded-md bg-neutral-100 hover:bg-neutral-200 transition-colors text-neutral-600 hover:text-neutral-900" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-neutral-400">
            {businessConfig.footer.copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}