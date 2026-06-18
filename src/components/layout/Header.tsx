"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart, User, Search, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { businessConfig } from "@/lib/business.config";

const navigation = [
  { name: "Home", href: "/" },
  {
    name: "Products",
    href: "/products",
    children: [
      { name: "All Pickles", href: "/products" },
      { name: "Mango Pickles", href: "/products?category=mango" },
      { name: "Gongura", href: "/products?category=gongura" },
      { name: "Chicken Pickles", href: "/products?category=chicken" },
      { name: "Prawn Pickles", href: "/products?category=prawn" },
      { name: "Vegetarian", href: "/products?category=vegetarian" },
      { name: "Spicy Specials", href: "/products?category=spicy-specials" },
    ],
  },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user } = useAuth();
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <nav className="container-custom flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-heading font-semibold text-neutral-900 tracking-tight">
            {businessConfig.company.shortName}
          </span>
          <span className="text-sm font-medium text-neutral-500 hidden sm:inline">
            {businessConfig.company.name.replace(businessConfig.company.shortName + " ", "")}
          </span>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navigation.map((item) =>
            item.children ? (
              <div key={item.name} className="relative"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
                >
                  {item.name}
                  <ChevronDown className={`w-3.5 h-3.5 mt-0.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>
                <div className={`absolute top-full left-0 mt-2 w-44 rounded-md border border-neutral-200 bg-white shadow-lg transition-all duration-200 ${dropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible translate-y-1 pointer-events-none"}`}>
                  <div className="p-1.5">
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setDropdownOpen(false)}
                        className="block px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-md transition-colors"
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
                className="text-sm font-medium text-neutral-600 hover:text-neutral-900 transition-colors"
              >
                {item.name}
              </Link>
            )
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 rounded-md hover:bg-neutral-100 transition-colors"
            aria-label="Search"
          >
            <Search className="w-5 h-5 text-neutral-600" />
          </button>

          <Link
            href="/account"
            className="p-2 rounded-md hover:bg-neutral-100 transition-colors"
            aria-label="Account"
          >
            <User className="w-5 h-5 text-neutral-600" />
          </Link>

          <Link
            href="/cart"
            className="relative p-2 rounded-md hover:bg-neutral-100 transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5 text-neutral-600" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 flex items-center justify-center bg-accent text-white text-[10px] font-medium rounded-full min-w-[18px] min-h-[18px]">
                {itemCount}
              </span>
            )}
          </Link>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 rounded-md hover:bg-neutral-100 transition-colors"
            aria-label="Menu"
          >
            <Menu className="w-5 h-5 text-neutral-600" />
          </button>
        </div>
      </nav>

      {searchOpen && (
        <div className="border-t border-neutral-200 bg-white">
          <div className="container-custom py-3">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-md border border-neutral-300 bg-neutral-50 pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
                autoFocus
              />
            </div>
          </div>
        </div>
      )}

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black/40" onClick={() => setMobileMenuOpen(false)} />
          <div className="fixed right-0 top-0 bottom-0 w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b border-neutral-200">
              <span className="font-semibold text-neutral-900">Menu</span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 rounded-md hover:bg-neutral-100 transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4 space-y-1">
              {navigation.map((item) =>
                item.children ? (
                  <div key={item.name} className="space-y-1">
                    <span className="block px-3 py-2 text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                      {item.name}
                    </span>
                    {item.children.map((child) => (
                      <Link
                        key={child.name}
                        href={child.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className="block px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-md transition-colors"
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
                    className="block px-3 py-2 text-sm text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-md transition-colors"
                  >
                    {item.name}
                  </Link>
                )
              )}
              <div className="border-t border-neutral-200 pt-4 mt-4">
                {user ? (
                  <Link
                    href="/account"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-accent"
                  >
                    My Account
                  </Link>
                ) : (
                  <Link
                    href="/auth/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 text-sm font-medium text-accent"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}