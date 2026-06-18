"use client";

import { useState } from "react";
import { Package, Search, ArrowRight, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [tracked, setTracked] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTracked(true);
  };

  const timeline = [
    { status: "Order Placed", date: "Jun 15, 2026", time: "10:30 AM", done: true },
    { status: "Preparing", date: "Jun 15, 2026", time: "2:15 PM", done: true },
    { status: "Packed", date: "Jun 16, 2026", time: "11:00 AM", done: true },
    { status: "Shipped", date: "Jun 16, 2026", time: "4:30 PM", done: false },
    { status: "Out for Delivery", date: "—", time: "—", done: false },
    { status: "Delivered", date: "—", time: "—", done: false },
  ];

  return (
    <div className="container-custom py-16">
      <div className="text-center mb-12">
        <h1 className="heading-2 mb-4">Track Your Order</h1>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">Enter your order number to track your delivery status in real-time.</p>
      </div>

      <div className="max-w-md mx-auto mb-12">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <div className="relative flex-1">
            <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Order number (e.g. APEX-12345)"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full rounded-lg border border-neutral-200 pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-accent"
              required
            />
          </div>
          <Button type="submit" variant="primary" size="lg" rightIcon={<Search className="w-4 h-4" />}>Track</Button>
        </form>
      </div>

      {tracked && (
        <div className="max-w-2xl mx-auto space-y-8">
          <Card>
            <CardContent>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-sm text-neutral-500">Order #APEX-12345</p>
                  <p className="text-lg font-heading font-semibold text-neutral-900">Classic Mango Pickle (500g) × 2</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">In Transit</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-neutral-500">
                <MapPin className="w-4 h-4" />
                <span>Estimated delivery: <strong className="text-neutral-900">Jun 19, 2026</strong></span>
              </div>
            </CardContent>
          </Card>

          <div className="relative">
            {timeline.map((step, i) => (
              <div key={step.status} className="flex gap-4 pb-8 last:pb-0 relative">
                <div className="flex flex-col items-center">
                  <div className={`w-4 h-4 rounded-full border-2 z-10 ${step.done ? "bg-accent border-accent" : "bg-white border-neutral-300"}`} />
                  {i < timeline.length - 1 && (
                    <div className={`w-0.5 flex-1 -mt-0.5 ${step.done ? "bg-accent" : "bg-neutral-200"}`} />
                  )}
                </div>
                <div className="flex-1 -mt-1">
                  <p className={`font-medium ${step.done ? "text-neutral-900" : "text-neutral-400"}`}>{step.status}</p>
                  {step.done && (
                    <p className="text-sm text-neutral-500 mt-0.5">
                      <Clock className="w-3.5 h-3.5 inline mr-1" />
                      {step.date} at {step.time}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!tracked && (
        <div className="text-center">
          <p className="text-neutral-500">Didn&apos;t receive an order number? <a href="/contact" className="text-accent hover:underline">Contact us</a></p>
        </div>
      )}
    </div>
  );
}
