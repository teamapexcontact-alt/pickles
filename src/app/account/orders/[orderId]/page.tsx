"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Package, MapPin, CreditCard, Truck, LogIn, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency, formatDate } from "@/lib/utils";

const mockOrder = {
  id: "PKL-ABC-1234",
  date: new Date("2026-06-10"),
  status: "delivered" as const,
  total: 1247,
  subtotal: 1098,
  shipping: 0,
  tax: 149,
  items: [
    { name: "Classic Mango Pickle", variant: "500g", qty: 2, price: 299 },
    { name: "Gongura Pickle", variant: "200g", qty: 1, price: 199 },
    { name: "Chicken Pickle", variant: "500g", qty: 1, price: 449 },
  ],
  shippingAddress: {
    name: "Ravi Kumar",
    phone: "+91 9876543210",
    line1: "42, Lakeview Apartments",
    line2: "Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500033",
  },
  payment: { method: "UPI (GPay)", id: "pay_ABC123XYZ", status: "paid" as const },
  timeline: [
    { status: "Order Placed", date: "Jun 10, 10:30 AM", done: true },
    { status: "Confirmed", date: "Jun 10, 11:00 AM", done: true },
    { status: "Prepared", date: "Jun 11, 2:00 PM", done: true },
    { status: "Packed", date: "Jun 11, 4:30 PM", done: true },
    { status: "Shipped", date: "Jun 12, 9:00 AM", done: true },
    { status: "Delivered", date: "Jun 14, 3:15 PM", done: true },
  ],
};

export default function OrderDetailPage() {
  const params = useParams();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-600 border-t-transparent rounded-full animate-spin" />
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
          <h1 className="text-2xl font-semibold text-neutral-900 mb-2">Sign in to view order details</h1>
          <p className="text-sm text-neutral-500 mb-6">Please sign in to access your order information.</p>
          <Link href="/auth/login?redirect=/account">
            <Button variant="primary" leftIcon={<LogIn className="w-4 h-4" />}>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <Link href="/account" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-brand-600 transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Account
      </Link>

      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="heading-3">Order #{mockOrder.id}</h1>
          <p className="text-sm text-neutral-500 mt-1">Placed on {formatDate(mockOrder.date)}</p>
        </div>
        <Badge variant={mockOrder.status === "delivered" ? "success" : "info"}>{mockOrder.status}</Badge>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent>
              <h2 className="font-semibold text-lg text-neutral-900 mb-4">Items</h2>
              <div className="divide-y divide-neutral-100">
                {mockOrder.items.map((item) => (
                  <div key={item.name} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                    <div className="w-14 h-14 rounded-md bg-neutral-100 flex items-center justify-center flex-shrink-0">
                      <Package className="w-6 h-6 text-neutral-400" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-neutral-900">{item.name}</p>
                      <p className="text-sm text-neutral-400">{item.variant} × {item.qty}</p>
                    </div>
                    <p className="font-semibold">{formatCurrency(item.price * item.qty)}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h2 className="font-semibold text-lg text-neutral-900 mb-4">Order Timeline</h2>
              <div className="space-y-0">
                {mockOrder.timeline.map((step, i) => (
                  <div key={step.status} className="flex gap-4 pb-4 last:pb-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-3 h-3 rounded-full ${step.done ? "bg-brand-600" : "bg-neutral-300"}`} />
                      {i < mockOrder.timeline.length - 1 && <div className={`w-0.5 flex-1 ${step.done ? "bg-brand-600" : "bg-neutral-200"}`} />}
                    </div>
                    <div className="flex-1 -mt-1">
                      <p className={`text-sm font-medium ${step.done ? "text-neutral-900" : "text-neutral-400"}`}>{step.status}</p>
                      <p className="text-xs text-neutral-400">{step.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent>
              <h2 className="font-semibold text-lg text-neutral-900 mb-4">Order Summary</h2>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-neutral-500">Subtotal</span><span>{formatCurrency(mockOrder.subtotal)}</span></div>
                <div className="flex justify-between"><span className="text-neutral-500">Shipping</span><span className="text-brand-600">Free</span></div>
                <div className="flex justify-between"><span className="text-neutral-500">Tax</span><span>{formatCurrency(mockOrder.tax)}</span></div>
                <div className="flex justify-between border-t pt-2 mt-2"><span className="font-semibold">Total</span><span className="font-bold text-lg text-brand-600">{formatCurrency(mockOrder.total)}</span></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <div className="flex items-start gap-3 mb-4">
                <MapPin className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-sm text-neutral-900 mb-1">Shipping Address</h3>
                  <p className="text-sm text-neutral-500">{mockOrder.shippingAddress.name}<br />{mockOrder.shippingAddress.line1}<br />{mockOrder.shippingAddress.line2}<br />{mockOrder.shippingAddress.city}, {mockOrder.shippingAddress.state} - {mockOrder.shippingAddress.pincode}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CreditCard className="w-5 h-5 text-neutral-400 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="font-medium text-sm text-neutral-900 mb-1">Payment</h3>
                  <p className="text-sm text-neutral-500">{mockOrder.payment.method}<br /><span className="text-brand-600 font-medium">Paid</span></p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-3">
            <Link href="/track-order" className="flex-1"><Button variant="secondary" size="md" fullWidth leftIcon={<Truck className="w-4 h-4" />}>Track Order</Button></Link>
            <Link href="/contact" className="flex-1"><Button variant="ghost" size="md" fullWidth>Need Help?</Button></Link>
          </div>
        </div>
      </div>
    </div>
  );
}