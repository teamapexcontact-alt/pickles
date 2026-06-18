"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Search } from "lucide-react";

const customers = [
  { name: "Priya Sharma", email: "priya@example.com", phone: "+91 9876543210", orders: 5, spent: 3247, lastOrder: "2026-06-14", status: "active" },
  { name: "Rajesh Kumar", email: "rajesh@example.com", phone: "+91 9876543211", orders: 3, spent: 1598, lastOrder: "2026-06-14", status: "active" },
  { name: "Ananya Reddy", email: "ananya@example.com", phone: "+91 9876543212", orders: 8, spent: 7896, lastOrder: "2026-06-13", status: "active" },
  { name: "Sandeep Rao", email: "sandeep@example.com", phone: "+91 9876543213", orders: 2, spent: 898, lastOrder: "2026-06-12", status: "active" },
  { name: "Venkat Rao", email: "venkat@example.com", phone: "+91 9876543215", orders: 1, spent: 897, lastOrder: "2026-06-11", status: "inactive" },
];

export default function AdminCustomers() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-heading font-semibold text-neutral-900">Customers</h1>
      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50">
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Customer</th>
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Phone</th>
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Orders</th>
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Total Spent</th>
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Last Order</th>
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {customers.map((c) => (
                <tr key={c.email} className="hover:bg-neutral-50">
                  <td className="px-6 py-4">
                    <p className="font-medium text-neutral-900">{c.name}</p>
                    <p className="text-xs text-neutral-400">{c.email}</p>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{c.phone}</td>
                  <td className="px-6 py-4 font-medium">{c.orders}</td>
                  <td className="px-6 py-4 font-medium">₹{c.spent.toLocaleString()}</td>
                  <td className="px-6 py-4 text-neutral-500">{c.lastOrder}</td>
                  <td className="px-6 py-4"><span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${c.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
