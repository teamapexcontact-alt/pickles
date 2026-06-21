"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Package, MapPin, LogOut, ShoppingBag, LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useAuth } from "@/context/AuthContext";

const tabs = [
  { id: "orders", label: "Orders", icon: Package },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "profile", label: "Profile", icon: User },
];

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState("orders");
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm text-neutral-500 mt-3">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-lg bg-neutral-100 flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-neutral-400" />
          </div>
          <h1 className="text-2xl font-semibold text-neutral-900 mb-2">Sign in to view your account</h1>
          <p className="text-sm text-neutral-500 mb-6">Access your orders, saved addresses, and profile information.</p>
          <Link href="/auth/login?redirect=/account">
            <Button variant="primary" leftIcon={<LogIn className="w-4 h-4" />}>
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="heading-2">My Account</h1>
          <p className="text-neutral-500 mt-1">{user.email || user.phoneNumber || "Welcome"}</p>
        </div>
        <Button variant="ghost" size="sm" leftIcon={<LogOut className="w-4 h-4" />} onClick={signOut}>
          Sign Out
        </Button>
      </div>

      <div className="grid lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <nav className="space-y-1 lg:sticky lg:top-24">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-brand-600 text-white"
                    : "text-neutral-600 hover:bg-neutral-50 hover:text-neutral-900"
                }`}
              >
                <span className="flex items-center gap-3">
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="lg:col-span-3">
          {activeTab === "orders" && (
            <div>
              <h2 className="font-semibold text-xl mb-6">Order History</h2>
              <Card>
                <CardContent className="text-center py-12">
                  <ShoppingBag className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No orders yet</h3>
                  <p className="text-sm text-neutral-500 mb-4">Your order history will appear here once you make a purchase.</p>
                  <Link href="/products">
                    <Button variant="primary">Browse Pickles</Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "addresses" && (
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-semibold text-xl">Saved Addresses</h2>
                <Button variant="primary" size="sm">Add New Address</Button>
              </div>
              <Card>
                <CardContent className="text-center py-12">
                  <MapPin className="w-12 h-12 mx-auto text-neutral-300 mb-4" />
                  <h3 className="font-semibold text-lg mb-2">No addresses saved</h3>
                  <p className="text-sm text-neutral-500 mb-4">Add a delivery address to speed up checkout.</p>
                  <Button variant="secondary">Add Address</Button>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "profile" && (
            <div>
              <h2 className="font-semibold text-xl mb-6">Profile Information</h2>
              <Card>
                <CardContent className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 mb-0.5">Full Name</label>
                    <p className="text-neutral-900">{user.displayName || "Not set"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 mb-0.5">Email</label>
                    <p className="text-neutral-900">{user.email || "Not set"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-500 mb-0.5">Phone</label>
                    <p className="text-neutral-900">{user.phoneNumber || "Not set"}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}