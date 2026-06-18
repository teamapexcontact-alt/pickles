"use client";

import { useState } from "react";
import { Search, Plus, Eye, Edit, MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

const products = [
  { name: "Classic Mango Pickle", category: "Mango Pickles", price: "₹299", stock: 45, sold: 156, status: "active" as const, spice: "medium" as const, weight: "500g" },
  { name: "Gongura Pickle", category: "Gongura", price: "₹349", stock: 32, sold: 124, status: "active" as const, spice: "hot" as const, weight: "500g" },
  { name: "Chicken Pickle", category: "Chicken Pickles", price: "₹449", stock: 18, sold: 98, status: "active" as const, spice: "extra-hot" as const, weight: "500g" },
  { name: "Prawn Pickle", category: "Prawn Pickles", price: "₹499", stock: 12, sold: 87, status: "active" as const, spice: "hot" as const, weight: "500g" },
  { name: "Mixed Vegetable Pickle", category: "Vegetarian", price: "₹299", stock: 28, sold: 72, status: "active" as const, spice: "medium" as const, weight: "500g" },
  { name: "Lemon Pickle", category: "Vegetarian", price: "₹249", stock: 0, sold: 54, status: "inactive" as const, spice: "mild" as const, weight: "500g" },
];

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-neutral-900">Products</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage your product catalog and inventory</p>
        </div>
        <Link href="/admin/products/new">
          <Button variant="primary" size="sm" leftIcon={<Plus className="w-4 h-4" />}>Add Product</Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-4 border-b border-neutral-100">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-md border border-neutral-200 bg-white pl-10 pr-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card padding="none">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/50">
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Product</th>
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Category</th>
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Price</th>
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Stock</th>
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Sold</th>
                <th className="text-left px-6 py-4 font-medium text-neutral-500">Status</th>
                <th className="text-right px-6 py-4 font-medium text-neutral-500">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {products.map((product) => (
                <tr key={product.name} className="hover:bg-neutral-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-md bg-neutral-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">🥫</span>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{product.name}</p>
                        <p className="text-xs text-neutral-400">{product.weight} &middot; <Badge variant="spice" value={product.spice} size="sm">{product.spice}</Badge></p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{product.category}</td>
                  <td className="px-6 py-4 font-semibold">{product.price}</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${product.stock === 0 ? "text-red-600" : product.stock < 20 ? "text-amber-600" : "text-green-600"}`}>
                      {product.stock === 0 ? "Out of stock" : product.stock}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-neutral-600">{product.sold}</td>
                  <td className="px-6 py-4">
                    <Badge variant={product.status === "active" ? "success" : "warning"}>{product.status}</Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Link href={`/admin/products/${product.name.toLowerCase().replace(/\s+/g, "-")}/edit`}>
                        <Button variant="ghost" size="sm"><Edit className="w-4 h-4" /></Button>
                      </Link>
                      <Button variant="ghost" size="sm"><Eye className="w-4 h-4" /></Button>
                      <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
                    </div>
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
