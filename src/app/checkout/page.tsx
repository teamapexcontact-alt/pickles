"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, CreditCard, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardContent } from "@/components/ui/Card";
import { useCart } from "@/context/CartContext";
import { formatCurrency } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, subtotal } = useCart();
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const shipping = 0;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  return (
    <div className="container-custom py-12">
      <div className="mb-8">
        <Link href="/cart" className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-accent transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Cart
        </Link>
        <h1 className="heading-2 mt-2">Checkout</h1>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent>
              <h2 className="font-heading font-semibold text-lg mb-4">Contact Information</h2>
              <div className="space-y-4">
                <Input label="Email Address" type="email" placeholder="you@example.com" required />
                <Input label="Phone Number" type="tel" placeholder="+91 9XXXXXXXXX" required />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="font-heading font-semibold text-lg mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Full Name" placeholder="Your name" required />
                  <Input label="Phone" type="tel" placeholder="+91 9XXXXXXXXX" required />
                </div>
                <Input label="Address Line 1" placeholder="House/Flat number, Street, Area" required />
                <Input label="Address Line 2" placeholder="Landmark, Building (optional)" />
                <div className="grid grid-cols-3 gap-4">
                  <Input label="City" placeholder="City" required />
                  <Input label="State" placeholder="State" required />
                  <Input label="Pincode" placeholder="6 digits" required />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="font-heading font-semibold text-lg mb-4">Payment Method</h2>
              <div className="space-y-3">
                {[
                  { id: "upi", name: "UPI", icon: "📱" },
                  { id: "card", name: "Credit/Debit Card", icon: "💳" },
                  { id: "netbanking", name: "Net Banking", icon: "🏦" },
                  { id: "wallet", name: "Wallet", icon: "👛" },
                ].map((method) => (
                  <label
                    key={method.id}
                    className="flex items-center gap-3 p-4 rounded-md border border-neutral-200 cursor-pointer hover:border-accent/50 transition-colors has-checked:border-accent has-checked:bg-accent-light"
                  >
                    <input type="radio" name="payment" defaultChecked={method.id === "upi"} className="accent-accent" />
                    <span className="text-xl">{method.icon}</span>
                    <span className="text-sm font-medium">{method.name}</span>
                  </label>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="font-heading font-semibold text-lg mb-4">Order Notes</h2>
              <Textarea placeholder="Any special instructions or preferences?" />
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 space-y-6">
            <Card>
              <CardContent>
                <h2 className="font-heading font-semibold text-lg mb-4">Order Summary</h2>
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.productVariantId} className="flex justify-between text-sm">
                      <span className="text-neutral-600 truncate max-w-[200px]">
                        {item.product.name} x{item.quantity}
                      </span>
                      <span className="font-medium">{formatCurrency(item.variant.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-neutral-200 mt-4 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Shipping</span>
                    <span className="text-accent font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Tax (GST)</span>
                    <span>{formatCurrency(tax)}</span>
                  </div>
                </div>
                <div className="border-t border-neutral-200 mt-4 pt-4 flex justify-between items-center">
                  <span className="font-heading font-semibold text-lg">Total</span>
                  <span className="font-heading font-bold text-2xl text-accent">{formatCurrency(total)}</span>
                </div>
                <Button variant="primary" size="xl" fullWidth className="mt-6" leftIcon={<Lock className="w-4 h-4" />}>
                  Pay {formatCurrency(total)}
                </Button>
                <div className="flex items-center justify-center gap-1.5 mt-3 text-xs text-neutral-400">
                  <Shield className="w-3.5 h-3.5" />
                  Secured by Razorpay
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
