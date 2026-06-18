"use client";

import { TrendingUp, DollarSign, ShoppingCart, Users, Package, Clock, ChevronRight, ArrowUp, ArrowDown } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency, getOrderStatusLabel } from "@/lib/utils";

const stats = [
  { label: "Total Revenue", value: "₹1,24,780", change: "+12.5%", trend: "up", icon: DollarSign },
  { label: "Total Orders", value: "342", change: "+8.2%", trend: "up", icon: ShoppingCart },
  { label: "Active Customers", value: "189", change: "+15.3%", trend: "up", icon: Users },
  { label: "Pending Orders", value: "12", change: "-3.1%", trend: "down", icon: Clock },
];

const recentOrders = [
  { id: "PKL-ABC-1234", customer: "Priya Sharma", items: 3, total: 1247, status: "preparing" as const, date: "10 min ago" },
  { id: "PKL-DEF-5678", customer: "Rajesh Kumar", items: 2, total: 598, status: "shipped" as const, date: "1 hour ago" },
  { id: "PKL-GHI-9012", customer: "Ananya Reddy", items: 5, total: 1896, status: "placed" as const, date: "2 hours ago" },
  { id: "PKL-JKL-3456", customer: "Sandeep Rao", items: 1, total: 349, status: "delivered" as const, date: "5 hours ago" },
  { id: "PKL-MNO-7890", customer: "Lakshmi Devi", items: 4, total: 1548, status: "out_for_delivery" as const, date: "6 hours ago" },
];

const topProducts = [
  { name: "Classic Mango Pickle", sold: 156, revenue: 46644, stock: 45 },
  { name: "Gongura Pickle", sold: 124, revenue: 43276, stock: 32 },
  { name: "Chicken Pickle", sold: 98, revenue: 44002, stock: 18 },
  { name: "Prawn Pickle", sold: 87, revenue: 43413, stock: 12 },
  { name: "Mixed Veg Pickle", sold: 72, revenue: 21528, stock: 28 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-neutral-900">Dashboard</h1>
          <p className="text-sm text-neutral-500">Welcome back! Here&apos;s what&apos;s happening today.</p>
        </div>
        <Badge variant="success" size="md">All systems normal</Badge>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-neutral-500 font-medium uppercase tracking-wider">{stat.label}</span>
                <div className="w-8 h-8 rounded-md bg-accent/10 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-accent" />
                </div>
              </div>
              <p className="text-xl font-semibold text-neutral-900">{stat.value}</p>
              <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${stat.trend === "up" ? "text-green-600" : "text-red-600"}`}>
                {stat.trend === "up" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="px-4 pt-4 pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm">Recent Orders</CardTitle>
                <CardDescription className="text-xs">Latest orders placed</CardDescription>
              </div>
              <Link href="/admin/orders">
                <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-neutral-100">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between px-4 py-3 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-md bg-neutral-100 flex items-center justify-center">
                      <Package className="w-4 h-4 text-neutral-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{order.customer}</p>
                      <p className="text-xs text-neutral-400">{order.id}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant="status" value={order.status} size="sm">{getOrderStatusLabel(order.status)}</Badge>
                    <span className="text-sm font-medium">{formatCurrency(order.total)}</span>
                    <span className="text-xs text-neutral-400 w-16 text-right">{order.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="px-4 pt-4 pb-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-sm">Top Products</CardTitle>
                <CardDescription className="text-xs">Best selling this month</CardDescription>
              </div>
              <Link href="/admin/products">
                <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="w-4 h-4" />}>View All</Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-neutral-100">
              {topProducts.map((product, i) => (
                <div key={product.name} className="flex items-center justify-between px-4 py-3 hover:bg-neutral-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <span className="w-5 text-xs font-medium text-neutral-400">#{i + 1}</span>
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{product.name}</p>
                      <p className="text-xs text-neutral-400">{product.sold} sold &middot; {product.stock} in stock</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold">{formatCurrency(product.revenue)}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-green-100 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Conversion Rate</p>
              <p className="text-lg font-semibold">3.24%</p>
              <p className="text-xs text-green-600 font-medium">+0.8% this week</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Repeat Customers</p>
              <p className="text-lg font-semibold">42.8%</p>
              <p className="text-xs text-accent font-medium">+5.2% this month</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-accent/10 flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-neutral-700" />
            </div>
            <div>
              <p className="text-xs text-neutral-500">Avg. Order Value</p>
              <p className="text-lg font-semibold">{formatCurrency(547)}</p>
              <p className="text-xs text-neutral-700 font-medium">+₹32 this month</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}