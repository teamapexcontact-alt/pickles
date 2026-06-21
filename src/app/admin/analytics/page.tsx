"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Eye } from "lucide-react";

const metrics = [
  { label: "Page Views", value: "12,847", change: "+18.2%", trend: "up", icon: Eye },
  { label: "Conversion Rate", value: "3.24%", change: "+0.8%", trend: "up", icon: TrendingUp },
  { label: "Revenue", value: "₹1,24,780", change: "+12.5%", trend: "up", icon: DollarSign },
  { label: "Avg. Order Value", value: "₹547", change: "+₹32", trend: "up", icon: ShoppingCart },
  { label: "Repeat Rate", value: "42.8%", change: "+5.2%", trend: "up", icon: Users },
  { label: "Bounce Rate", value: "28.3%", change: "-2.1%", trend: "down", icon: TrendingDown },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-semibold text-neutral-900">Analytics</h1>
        <p className="text-sm text-neutral-500 mt-1">Key metrics and performance insights</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-neutral-500">{m.label}</span>
                <div className="w-9 h-9 rounded-md bg-brand-500/10 flex items-center justify-center">
                  <m.icon className="w-5 h-5 text-brand-600" />
                </div>
              </div>
              <p className="text-2xl font-heading font-semibold text-neutral-900">{m.value}</p>
              <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${m.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {m.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {m.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Revenue Trends</CardTitle>
          <CardDescription>Monthly revenue for the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-neutral-50 rounded-md">
            <p className="text-sm text-neutral-400">Chart visualization coming soon</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
