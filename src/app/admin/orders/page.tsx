"use client";

import { useState } from "react";
import { Search, Filter, Download, Eye, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";
import { formatCurrency, getOrderStatusLabel } from "@/lib/utils";

const orders = [
  { id: "PKL-ABC-1234", customer: { name: "Priya Sharma", email: "priya@example.com", phone: "+91 9876543210" }, items: 3, total: 1247, status: "preparing" as const, payment: "paid" as const, date: "2026-06-14", address: "Hyderabad, Telangana" },
  { id: "PKL-DEF-5678", customer: { name: "Rajesh Kumar", email: "rajesh@example.com", phone: "+91 9876543211" }, items: 2, total: 598, status: "shipped" as const, payment: "paid" as const, date: "2026-06-14", address: "Bangalore, Karnataka" },
  { id: "PKL-GHI-9012", customer: { name: "Ananya Reddy", email: "ananya@example.com", phone: "+91 9876543212" }, items: 5, total: 1896, status: "placed" as const, payment: "paid" as const, date: "2026-06-13", address: "Chennai, Tamil Nadu" },
  { id: "PKL-JKL-3456", customer: { name: "Sandeep Rao", email: "sandeep@example.com", phone: "+91 9876543213" }, items: 1, total: 349, status: "out_for_delivery" as const, payment: "paid" as const, date: "2026-06-13", address: "Mumbai, Maharashtra" },
  { id: "PKL-MNO-7890", customer: { name: "Lakshmi Devi", email: "lakshmi@example.com", phone: "+91 9876543214" }, items: 4, total: 1548, status: "delivered" as const, payment: "paid" as const, date: "2026-06-12", address: "Delhi" },
  { id: "PKL-PQR-1122", customer: { name: "Venkat Rao", email: "venkat@example.com", phone: "+91 9876543215" }, items: 2, total: 897, status: "cancelled" as const, payment: "refunded" as const, date: "2026-06-11", address: "Hyderabad, Telangana" },
].map(o => ({ ...o, status: o.status as any, payment: o.payment as any }));

export default function AdminOrders() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-neutral-900">Orders</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage and track all customer orders</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" leftIcon={<Download className="w-4 h-4" />}>Export</Button>
          <Button variant="primary" size="sm" leftIcon={<Filter className="w-4 h-4" />}>Filter</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-4 border-b border-neutral-100">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="search"
                placeholder="Search by order ID, customer name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-neutral-200 bg-white pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-brand-500"
              />
            </div>
            <Select
              options={[
                { value: "all", label: "All Status" },
                { value: "placed", label: "Placed" },
                { value: "preparing", label: "Preparing" },
                { value: "packed", label: "Packed" },
                { value: "shipped", label: "Shipped" },
                { value: "delivered", label: "Delivered" },
                { value: "cancelled", label: "Cancelled" },
              ]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-40"
            />
          </div>
        </CardContent>
      </Card>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50">
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Order ID</th>
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Customer</th>
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Items</th>
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Total</th>
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Status</th>
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Payment</th>
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Date</th>
                <th className="text-right px-6 py-4 font-medium text-neutral-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {orders.map((order) => (
                <tr key={order.id} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <span className="font-medium text-brand-600">{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-neutral-900">{order.customer.name}</p>
                      <p className="text-xs text-neutral-400">{order.customer.phone}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-neutral-600">{order.items} items</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold">{formatCurrency(order.total)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="order-status" value={order.status}>{getOrderStatusLabel(order.status)}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="payment-status" value={order.payment}>{order.payment}</Badge>
                  </td>
                  <td className="px-6 py-4 text-neutral-500">{order.date}</td>
                  <td className="px-6 py-4 text-right">
                    <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
