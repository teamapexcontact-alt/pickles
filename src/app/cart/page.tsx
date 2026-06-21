"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingCart as CartIcon, Trash2, Minus, Plus, ArrowLeft, ArrowRight, LogIn } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { formatCurrency } from "@/lib/utils";

export default function CartPage() {
  const { items, itemCount, subtotal, updateQuantity, removeItem } = useCart();
  const { user } = useAuth();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-lg bg-neutral-100 flex items-center justify-center mx-auto mb-6">
            <CartIcon className="w-10 h-10 text-neutral-400" />
          </div>
          <h1 className="heading-3 mb-2">Your Cart is Empty</h1>
          <p className="text-neutral-500 mb-6">Looks like you haven&apos;t added any pickles yet</p>
          <Link href="/products">
            <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Browse Pickles
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
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-brand-600 transition-colors mb-2">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <h1 className="heading-2">Shopping Cart</h1>
        </div>
        <p className="text-sm text-neutral-500">{itemCount} {itemCount === 1 ? "item" : "items"}</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.productVariantId}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card padding="none" className="overflow-hidden">
                <div className="flex items-center gap-4 p-4">
                  <div className="w-20 h-20 rounded-md bg-gradient-to-br from-neutral-100 to-accent/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-3xl">🥫</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/products/${item.product.slug}`}>
                      <h3 className="font-heading font-semibold text-neutral-900 hover:text-brand-600 transition-colors truncate">
                        {item.product.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-neutral-400">{item.variant.weightGrams}g</p>
                    <p className="text-lg font-heading font-bold text-brand-600 mt-1">
                      {formatCurrency(item.variant.price)}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 border border-neutral-200 rounded-md overflow-hidden">
                    <button onClick={() => updateQuantity(item.productVariantId, item.quantity - 1)} className="p-2 hover:bg-neutral-100 transition-colors" aria-label="Decrease quantity">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.productVariantId, item.quantity + 1)} className="p-2 hover:bg-neutral-100 transition-colors" aria-label="Increase quantity">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right min-w-[80px]">
                    <p className="font-heading font-semibold text-neutral-900">
                      {formatCurrency(item.variant.price * item.quantity)}
                    </p>
                  </div>
                  <button onClick={() => removeItem(item.productVariantId)} className="p-2 rounded-md hover:bg-brand-50 text-neutral-400 hover:text-brand-600 transition-colors" aria-label="Remove item">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24">
            <Card>
              <CardContent>
                <h2 className="font-heading font-semibold text-lg text-neutral-900 mb-4">Order Summary</h2>

                <div className="space-y-3 border-b border-neutral-200 pb-4 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Subtotal</span>
                    <span className="font-medium">{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-neutral-500">Shipping</span>
                    <span className="text-brand-600 font-medium">Free</span>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-6">
                  <span className="font-heading font-semibold text-lg">Total</span>
                  <span className="font-heading font-bold text-2xl text-brand-600">{formatCurrency(subtotal)}</span>
                </div>

                {user ? (
                  <Link href="/checkout">
                    <Button variant="primary" size="xl" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />}>
                      Proceed to Checkout
                    </Button>
                  </Link>
                ) : (
                  <Link href="/auth/login?redirect=/checkout">
                    <Button variant="primary" size="xl" fullWidth leftIcon={<LogIn className="w-4 h-4" />}>
                      Sign In to Checkout
                    </Button>
                  </Link>
                )}

                <Link href="/products" className="block mt-3">
                  <Button variant="ghost" size="md" fullWidth leftIcon={<ArrowLeft className="w-4 h-4" />}>
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
