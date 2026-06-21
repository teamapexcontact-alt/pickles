"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const handleMoveToCart = (product: any) => {
    addItem(
      { id: product.id, categoryId: "", name: product.name, slug: product.slug, description: product.description || "", ingredients: [], spiceLevel: "medium", shelfLifeDays: 180, isActive: true, featured: false, createdAt: new Date(), updatedAt: new Date() },
      { id: `v-${product.id}`, productId: product.id, weightGrams: 500, price: 299, stockQuantity: 10, sku: product.id, isActive: true, createdAt: new Date(), updatedAt: new Date() }
    );
    showToast({ type: "success", title: "Added to cart!", message: `${product.name} moved to your cart` });
  };

  return (
    <section className="bg-white py-12 min-h-[60vh]">
      <div className="container-custom">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-brand-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Heart className="w-5 h-5 text-brand-500" />
              <h1 className="heading-2">Saved Pickles</h1>
            </div>
            <p className="text-neutral-500 text-sm">{items.length} items saved</p>
          </div>
          {items.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearWishlist} leftIcon={<Trash2 className="w-4 h-4" />}>
              Clear all
            </Button>
          )}
        </div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <Heart className="w-16 h-16 text-neutral-200 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-neutral-900 mb-2">Your wishlist is empty</h2>
            <p className="text-neutral-500 mb-6">Save pickles you love by tapping the heart icon</p>
            <Link href="/products">
              <Button variant="primary">Explore pickles</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {items.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card variant="hover" padding="none" className="overflow-hidden group">
                  <div className="aspect-square bg-gradient-to-br from-brand-50 to-warm-50 flex items-center justify-center relative">
                    <button
                      onClick={() => {
                        removeItem(product.id);
                        showToast({ type: "info", title: "Removed", message: `${product.name} removed from wishlist` });
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white/80 hover:bg-white transition-all shadow-sm z-10"
                    >
                      <Trash2 className="w-4 h-4 text-neutral-400 hover:text-brand-500 transition-colors" />
                    </button>
                    <span className="text-5xl">🥫</span>
                  </div>
                  <CardContent className="p-4">
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-heading font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors">{product.name}</h3>
                    </Link>
                    <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{product.description}</p>
                    <Button
                      variant="primary"
                      size="sm"
                      fullWidth
                      className="mt-3"
                      leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}
                      onClick={() => handleMoveToCart(product)}
                    >
                      Move to cart
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
