"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, ShoppingCart, Users, BarChart3, Settings, FileText, Menu, X, LogOut, Bell, ChevronDown, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

const sidebarLinks = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { name: "Products", href: "/admin/products", icon: Package },
  { name: "Content", href: "/admin/content", icon: FileText },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { name: "Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="sticky top-0 z-40 bg-white border-b border-neutral-200">
        <div className="flex items-center justify-between h-16 px-4 lg:px-8">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-md hover:bg-neutral-100">
              <Menu className="w-5 h-5" />
            </button>
            <Link href="/admin" className="text-lg font-heading font-semibold text-brand-600">
              APEX <span className="text-neutral-500 font-normal">Admin</span>
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 rounded-md hover:bg-neutral-100">
              <Bell className="w-5 h-5 text-neutral-600" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-brand-600" />
            </button>
            <div className="flex items-center gap-2 pl-3 border-l border-neutral-200">
              <div className="w-8 h-8 rounded-full bg-brand-500/10 flex items-center justify-center">
                <span className="text-sm font-medium text-brand-600">A</span>
              </div>
              <div className="hidden sm:block text-sm">
                <p className="font-medium text-neutral-900">Admin</p>
                <p className="text-xs text-neutral-500">admin@apexpickles.com</p>
              </div>
              <ChevronDown className="w-4 h-4 text-neutral-400" />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-neutral-200 transform transition-transform duration-200 lg:translate-x-0 lg:static lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-200">
            <Link href="/admin" className="text-lg font-heading font-semibold text-brand-600">
              APEX <span className="text-neutral-500 font-normal">Admin</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-2 rounded-md hover:bg-neutral-100">
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="p-4 space-y-1">
            {sidebarLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-2.5 rounded-md text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "text-brand-600 bg-brand-50"
                    : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900"
                )}
              >
                <link.icon className="w-5 h-5" />
                {link.name}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t border-neutral-200">
              <Link href="/" className="flex items-center gap-3 px-4 py-2.5 rounded-md text-sm text-neutral-500 hover:bg-neutral-100 transition-colors">
                <Truck className="w-5 h-5" />
                View Store
              </Link>
              <button className="w-full flex items-center gap-3 px-4 py-2.5 rounded-md text-sm text-neutral-500 hover:bg-neutral-100 transition-colors">
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </nav>
        </aside>

        {sidebarOpen && (
          <div className="fixed inset-0 z-40 bg-black/30 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        <main className="flex-1 min-w-0 p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
