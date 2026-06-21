"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, User, Heart, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { cn } from "@/lib/utils";
import { businessConfig } from "@/lib/business.config";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "/products",
    children: [
      { name: "All Pickles", href: "/products" },
      { name: "Mango Pickles", href: "/products?category=mango-pickles" },
      { name: "Gongura", href: "/products?category=gongura" },
      { name: "Chicken Pickles", href: "/products?category=chicken-pickles" },
      { name: "Prawn Pickles", href: "/products?category=prawn-pickles" },
      { name: "Vegetarian", href: "/products?category=vegetarian" },
      { name: "Spicy Specials", href: "/products?category=spicy-specials" },
    ],
  },
  { name: "Story", href: "/process" },
  { name: "FAQ", href: "/faq" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuth();
  const { itemCount, openCart } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-neutral-100">
      <nav className="container-custom flex items-center justify-between h-16 lg:h-20">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl lg:text-2xl font-heading font-bold text-brand-700 tracking-tight">
            {businessConfig.company.shortName}
          </span>
          <span className="hidden sm:block h-5 w-px bg-neutral-200" />
          <span className="hidden sm:block text-sm font-medium text-neutral-400">
            {businessConfig.company.tagline}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.name} className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-brand-600 transition-colors rounded-lg hover:bg-brand-50"
                >
                  {item.name}
                  <ChevronDown className={`w-3.5 h-3.5 mt-0.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`absolute top-full left-0 mt-1 w-48 rounded-xl border border-neutral-100 bg-white shadow-lg shadow-neutral-900/5 transition-all duration-200 ${dropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-1 pointer-events-none"}`}>
                  <div className="p-1.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-3 py-2.5 text-sm text-neutral-600 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                      >
                        {child.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.name}
                href={item.href}
                className="px-3 py-2 text-sm font-medium text-neutral-600 hover:text-brand-600 transition-colors rounded-lg hover:bg-brand-50"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-0.5">
          <Link
            href="/wishlist"
            className="relative p-2.5 rounded-xl hover:bg-neutral-100 transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5 text-neutral-600" />
            {wishlistItems.length > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-brand-500 text-white text-[9px] font-bold rounded-full">
                {wishlistItems.length}
              </span>
            )}
          </Link>

          <Link
            href="/account"
            className="p-2.5 rounded-xl hover:bg-neutral-100 transition-colors"
            aria-label="Account"
          >
            <User className="w-5 h-5 text-neutral-600" />
          </Link>

          <button
            onClick={openCart}
            className="relative p-2.5 rounded-xl hover:bg-neutral-100 transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5 text-neutral-600" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 flex items-center justify-center bg-brand-600 text-white text-[9px] font-bold rounded-full">
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2.5 rounded-xl hover:bg-neutral-100 transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`fixed inset-0 z-50 lg:hidden ${mobileMenuOpen ? "" : "pointer-events-none"}`}>
        <div
          className={`fixed inset-0 bg-neutral-900/40 backdrop-blur-sm transition-opacity duration-300 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-2xl transition-transform duration-300 ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        >
          <div className="flex items-center justify-between p-4 border-b border-neutral-100">
            <span className="font-heading font-bold text-lg text-brand-700">{businessConfig.company.shortName}</span>
            <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-neutral-100 transition-colors" aria-label="Close">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-5rem)]">
            {navigation.map((item) =>
              item.children ? (
                <div key={item.name} className="space-y-0.5">
                  <span className="block px-3 py-2 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                    {item.name}
                  </span>
                  {item.children.map((child) => (
                    <Link
                      key={child.name}
                      href={child.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="block px-3 py-2.5 text-sm text-neutral-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                    >
                      {child.name}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-neutral-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                >
                  {item.name}
                </Link>
              )
            )}
            <div className="border-t border-neutral-100 pt-4 mt-4 space-y-1">
              <Link
                href="/wishlist"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 text-sm text-neutral-700 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
              >
                <Heart className="w-4 h-4" /> Saved ({wishlistItems.length})
              </Link>
              {user ? (
                <Link
                  href="/account"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                >
                  My Account
                </Link>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 text-sm font-medium text-brand-600 hover:bg-brand-50 rounded-lg transition-colors"
                >
                  Sign In
                </Link>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
