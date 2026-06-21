"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingCart, Star, Heart, ShieldCheck, Truck, Clock, Flame, Sparkles, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { formatCurrency } from "@/lib/utils";

const products: Record<string, { id: string; name: string; slug: string; description: string; category: string; spiceLevel: string; ingredients: string[]; shelfLife: string; emoji: string; variants: { id: string; weightGrams: number; price: number; stock: number; sku: string }[]; reviews: { name: string; rating: number; text: string; date: string }[] }> = {
  "classic-mango-pickle": {
    id: "p1", name: "Classic Mango Pickle", slug: "classic-mango-pickle",
    description: "A traditional Andhra-style mango pickle made with raw, sun-dried mangoes and a secret blend of authentic spices. This recipe has been passed down through generations and captures the true essence of South Indian cuisine.",
    category: "Mango Pickles", spiceLevel: "medium",
    ingredients: ["Raw Mango", "Mustard Oil", "Red Chili Powder", "Fenugreek", "Turmeric", "Salt", "Garlic"],
    shelfLife: "12 months", emoji: "🥭",
    variants: [
      { id: "v1", weightGrams: 200, price: 149, stock: 50, sku: "MANGO-200" },
      { id: "v2", weightGrams: 500, price: 299, stock: 45, sku: "MANGO-500" },
      { id: "v3", weightGrams: 1000, price: 549, stock: 20, sku: "MANGO-1000" },
    ],
    reviews: [
      { name: "Priya S.", rating: 5, text: "Tastes just like homemade! The perfect balance of spices.", date: "2 weeks ago" },
      { name: "Rahul M.", rating: 5, text: "Best mango pickle I've had outside of my mother's kitchen.", date: "1 month ago" },
      { name: "Ananya K.", rating: 4, text: "Great quality and authentic taste. Will order again!", date: "2 months ago" },
      { name: "Vikram R.", rating: 5, text: "Regular customer now. Never going back to store-bought.", date: "3 months ago" },
    ],
  },
  "gongura-pickle": {
    id: "p2", name: "Gongura Pickle", slug: "gongura-pickle",
    description: "Authentic gongura pickle made with fresh sorrel leaves and traditional spices. A beloved Andhra delicacy that pairs perfectly with rice.",
    category: "Gongura", spiceLevel: "hot",
    ingredients: ["Gongura Leaves", "Mustard Oil", "Red Chili Powder", "Garlic", "Fenugreek", "Salt", "Turmeric"],
    shelfLife: "10 months", emoji: "🌿",
    variants: [
      { id: "v4", weightGrams: 200, price: 199, stock: 35, sku: "GONG-200" },
      { id: "v5", weightGrams: 500, price: 349, stock: 32, sku: "GONG-500" },
    ],
    reviews: [
      { name: "Kavita P.", rating: 5, text: "The gongura pickle is incredible. Reminds me of Andhra Sundays.", date: "1 week ago" },
      { name: "Suresh N.", rating: 4, text: "Great authentic taste. Slight less spicy than expected but delicious.", date: "2 weeks ago" },
    ],
  },
};

const spiceConfig: Record<string, { label: string; color: string; peppers: number }> = {
  mild: { label: "Mild", color: "bg-herb-100 text-herb-700", peppers: 1 },
  medium: { label: "Medium", color: "bg-gold-100 text-gold-700", peppers: 2 },
  hot: { label: "Hot", color: "bg-brand-100 text-brand-700", peppers: 3 },
  "extra-hot": { label: "Extra Hot", color: "bg-brand-200 text-brand-800", peppers: 4 },
};

const SpiceIndicator = ({ level }: { level: string }) => {
  const config = spiceConfig[level] || spiceConfig.medium;
  return (
    <div className="flex items-center gap-2">
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>{config.label}</span>
      <div className="flex items-center gap-0.5">
        {[...Array(4)].map((_, i) => (
          <Flame key={i} className={`w-3.5 h-3.5 ${i < config.peppers ? "text-brand-500" : "text-neutral-200"}`} />
        ))}
      </div>
    </div>
  );
};

export default function ProductDetailPage() {
  const params = useParams();
  const product = products[params.slug as string] || products["classic-mango-pickle"];
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { showToast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState(product.variants[1] || product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (selectedVariant.stock <= 0) {
      showToast({ type: "error", title: "Out of stock", message: "This variant is currently out of stock" });
      return;
    }
    addItem(
      { id: product.id, categoryId: "", name: product.name, slug: product.slug, description: product.description, ingredients: product.ingredients, spiceLevel: product.spiceLevel as any, shelfLifeDays: 365, isActive: true, featured: false, createdAt: new Date(), updatedAt: new Date() },
      { id: selectedVariant.id, productId: product.id, weightGrams: selectedVariant.weightGrams, price: selectedVariant.price, stockQuantity: selectedVariant.stock, sku: selectedVariant.sku, isActive: true, createdAt: new Date(), updatedAt: new Date() },
      quantity
    );
    showToast({ type: "success", title: "Added to cart!", message: `${product.name} (${selectedVariant.weightGrams}g) × ${quantity} added` });
  };

  const inStock = selectedVariant.stock > 0;
  const lowStock = selectedVariant.stock > 0 && selectedVariant.stock <= 15;

  return (
    <>
      {/* Main content */}
      <div className="container-custom py-8 lg:py-12 pb-28 lg:pb-12">
        <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-brand-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-brand-50 via-warm-50 to-neutral-100 flex items-center justify-center border border-neutral-200 overflow-hidden">
              <div className="text-center">
                <span className="text-8xl lg:text-9xl">{product.emoji}</span>
                <p className="text-sm text-neutral-400 mt-2">{product.name}</p>
              </div>
            </div>
            <div className="flex gap-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-1 aspect-square rounded-xl bg-gradient-to-br from-brand-50/50 via-warm-50/50 to-neutral-100 border border-neutral-200 flex items-center justify-center">
                  <span className="text-3xl">{product.emoji}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <Badge variant="default" className="bg-brand-50 text-brand-700 border-0 mb-2">{product.category}</Badge>
                <h1 className="heading-2 mb-2">{product.name}</h1>
                <SpiceIndicator level={product.spiceLevel} />
              </div>
              <button
                onClick={() => {
                  toggleItem({ id: product.id, categoryId: "", name: product.name, slug: product.slug, description: product.description, ingredients: product.ingredients, spiceLevel: product.spiceLevel as any, shelfLifeDays: 365, isActive: true, featured: false, createdAt: new Date(), updatedAt: new Date() });
                  showToast({ type: isInWishlist(product.id) ? "info" : "success", title: isInWishlist(product.id) ? "Removed" : "Saved!", message: `${product.name} ${isInWishlist(product.id) ? "removed from" : "added to"} wishlist` });
                }}
                className="p-2.5 rounded-xl border border-neutral-200 hover:bg-brand-50 hover:border-brand-200 transition-all"
              >
                <Heart className={`w-5 h-5 transition-colors ${isInWishlist(product.id) ? "fill-brand-500 text-brand-500" : "text-neutral-400"}`} />
              </button>
            </div>

            <div className="flex items-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-4 h-4 ${i < 4 ? "fill-gold-500 text-gold-500" : "text-neutral-200"}`} />
              ))}
              <span className="text-sm text-neutral-400 ml-2">({product.reviews.length} reviews)</span>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <Badge variant="default" size="sm" className="bg-herb-50 text-herb-700 border-0">
                <Sparkles className="w-3 h-3 mr-1" /> No preservatives
              </Badge>
              <Badge variant="default" size="sm" className="bg-blue-50 text-blue-700 border-0">
                <ShieldCheck className="w-3 h-3 mr-1" /> FSSAI certified
              </Badge>
              {lowStock && (
                <Badge variant="warning" size="sm">Low stock — only {selectedVariant.stock} left</Badge>
              )}
            </div>

            <p className="text-3xl lg:text-4xl font-bold text-brand-600 mb-2">{formatCurrency(selectedVariant.price)}</p>
            <p className="text-sm text-neutral-400 mb-6">+ Free shipping on orders above ₹499</p>

            <p className="text-neutral-600 leading-relaxed mb-8">{product.description}</p>

            {/* Size selector */}
            <div className="mb-6">
              <p className="text-sm font-medium text-neutral-700 mb-3">Select Size:</p>
              <div className="flex flex-wrap gap-3">
                {product.variants.map((v) => (
                  <button
                    key={v.id}
                    onClick={() => { setSelectedVariant(v); setQuantity(1); }}
                    className={`px-5 py-3 rounded-xl border text-sm font-medium transition-all ${
                      selectedVariant.id === v.id
                        ? "border-brand-600 bg-brand-50 text-brand-700 shadow-sm"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                    }`}
                  >
                    <span className="font-semibold">{v.weightGrams}g</span>
                    <span className="ml-2 text-brand-600">{formatCurrency(v.price)}</span>
                    {v.stock <= 0 && <span className="block text-xs text-brand-500 mt-0.5">Sold out</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop add to cart */}
            <div className="hidden lg:flex items-center gap-4 mb-8">
              <div className="flex items-center border border-neutral-200 rounded-xl overflow-hidden">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-neutral-50 transition-colors" aria-label="Decrease">
                  <Minus className="w-4 h-4 text-neutral-600" />
                </button>
                <span className="w-12 text-center font-medium text-neutral-900">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-neutral-50 transition-colors" aria-label="Increase">
                  <Plus className="w-4 h-4 text-neutral-600" />
                </button>
              </div>
              <Button variant="primary" size="xl" className="flex-1 shadow-lg shadow-brand-600/20"
                leftIcon={<ShoppingCart className="w-5 h-5" />}
                disabled={!inStock}
                onClick={handleAddToCart}
              >
                {inStock ? `Add to Cart — ${formatCurrency(selectedVariant.price * quantity)}` : "Sold Out"}
              </Button>
            </div>

            {/* Trust features */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <div className="text-center p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <Truck className="w-5 h-5 text-brand-500 mx-auto mb-1" />
                <p className="text-xs text-neutral-600 font-medium">Free shipping</p>
                <p className="text-[10px] text-neutral-400">on orders ₹499+</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <ShieldCheck className="w-5 h-5 text-herb-600 mx-auto mb-1" />
                <p className="text-xs text-neutral-600 font-medium">100% Natural</p>
                <p className="text-[10px] text-neutral-400">no preservatives</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                <Clock className="w-5 h-5 text-gold-600 mx-auto mb-1" />
                <p className="text-xs text-neutral-600 font-medium">Shelf life</p>
                <p className="text-[10px] text-neutral-400">{product.shelfLife}</p>
              </div>
            </div>

            {/* Ingredients */}
            <details className="group rounded-xl border border-neutral-200 overflow-hidden">
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                <span className="text-sm font-medium text-neutral-900">Ingredients</span>
                <ChevronDown className="w-4 h-4 text-neutral-400 transition-transform duration-200 group-open:rotate-180" />
              </summary>
              <div className="px-4 pb-4 border-t border-neutral-100 pt-3">
                <div className="flex flex-wrap gap-2">
                  {product.ingredients.map((ing) => (
                    <span key={ing} className="px-3 py-1.5 rounded-lg bg-neutral-50 text-sm text-neutral-700 border border-neutral-200">{ing}</span>
                  ))}
                </div>
              </div>
            </details>
          </div>
        </div>

        {/* Reviews section */}
        <div className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="heading-3">Customer Reviews</h2>
            <Badge variant="default" className="bg-gold-50 text-gold-700 border-0">{product.reviews.length} reviews</Badge>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {product.reviews.map((review, i) => (
              <Card key={i} variant="hover">
                <CardContent>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center text-sm font-semibold text-brand-700">
                        {review.name.charAt(0)}
                      </div>
                      <p className="font-medium text-sm text-neutral-900">{review.name}</p>
                    </div>
                    <span className="text-xs text-neutral-400">{review.date}</span>
                  </div>
                  <div className="flex items-center gap-0.5 mb-2">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} className={`w-3.5 h-3.5 ${s < review.rating ? "fill-gold-500 text-gold-500" : "text-neutral-200"}`} />
                    ))}
                  </div>
                  <p className="text-sm text-neutral-600 leading-relaxed">&ldquo;{review.text}&rdquo;</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* ────── STICKY MOBILE ADD-TO-BAG BAR ────── */}
      <div className="fixed bottom-0 inset-x-0 lg:hidden z-30 bg-white border-t border-neutral-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
        <div className="flex items-center gap-3 px-4 py-3">
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-neutral-900 truncate">{product.name}</p>
            <p className="text-lg font-bold text-brand-600">{formatCurrency(selectedVariant.price)}</p>
          </div>
          <div className="flex items-center border border-neutral-200 rounded-lg overflow-hidden">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 hover:bg-neutral-50" aria-label="Decrease">
              <Minus className="w-4 h-4 text-neutral-600" />
            </button>
            <span className="w-8 text-center text-sm font-medium">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="p-2 hover:bg-neutral-50" aria-label="Increase">
              <Plus className="w-4 h-4 text-neutral-600" />
            </button>
          </div>
          <Button variant="primary" size="md" disabled={!inStock} onClick={handleAddToCart} className="!rounded-xl !px-5">
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
        {lowStock && (
          <div className="px-4 pb-2">
            <p className="text-xs text-brand-600 font-medium">Only {selectedVariant.stock} left in stock</p>
          </div>
        )}
      </div>
    </>
  );
}
