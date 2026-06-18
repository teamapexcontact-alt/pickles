"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingCart, Star, Shield, Truck, Clock, Heart } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { formatCurrency } from "@/lib/utils";

const mockProduct = {
  id: "1",
  name: "Classic Mango Pickle",
  slug: "classic-mango-pickle",
  description: "A traditional Andhra-style mango pickle made with raw, sun-dried mangoes and a secret blend of authentic spices. This recipe has been passed down through generations and captures the true essence of South Indian cuisine.",
  category: "Mango Pickles",
  spiceLevel: "medium" as const,
  ingredients: ["Raw Mango", "Mustard Oil", "Red Chili Powder", "Fenugreek", "Turmeric", "Salt", "Garlic"],
  shelfLife: "12 months",
  image: "🥫",
  variants: [
    { id: "v1", weightGrams: 200, price: 149, stock: 50, sku: "MANGO-200" },
    { id: "v2", weightGrams: 500, price: 299, stock: 45, sku: "MANGO-500" },
    { id: "v3", weightGrams: 1000, price: 549, stock: 20, sku: "MANGO-1000" },
  ],
  reviews: [
    { name: "Priya S.", rating: 5, text: "Tastes just like homemade! The perfect balance of spices.", date: "2 weeks ago" },
    { name: "Rahul M.", rating: 5, text: "Best mango pickle I've had outside of my mother's kitchen.", date: "1 month ago" },
    { name: "Ananya K.", rating: 4, text: "Great quality and authentic taste. Will order again!", date: "2 months ago" },
  ],
};

const relatedProducts = [
  { name: "Gongura Pickle", price: "₹349", spice: "Hot", image: "🥬" },
  { name: "Chicken Pickle", price: "₹449", spice: "Extra Hot", image: "🍗" },
  { name: "Mixed Vegetable", price: "₹299", spice: "Medium", image: "🥕" },
];

export default function ProductDetailPage() {
  const params = useParams();
  const { addItem } = useCart();
  const { showToast } = useToast();
  const [selectedVariant, setSelectedVariant] = useState(mockProduct.variants[1]);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addItem({
      productVariantId: selectedVariant.id,
      quantity,
      product: mockProduct as any,
      variant: selectedVariant as any,
    });
    showToast({ type: "success", title: "Added to cart", message: `${mockProduct.name} (${selectedVariant.weightGrams}g) × ${quantity} added to your cart` });
  };

  return (
    <div className="container-custom py-12">
      <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-accent transition-colors mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Products
      </Link>

      <div className="grid lg:grid-cols-2 gap-12 mb-16">
        <div className="aspect-square rounded-lg bg-neutral-100/60 flex items-center justify-center border border-neutral-200">
          <span className="text-8xl">{mockProduct.image}</span>
        </div>

        <div>
          <Badge variant="spice" value={mockProduct.spiceLevel}>{mockProduct.spiceLevel}</Badge>
          <h1 className="heading-2 mt-3 mb-2">{mockProduct.name}</h1>
          <p className="text-sm text-neutral-500 mb-2">{mockProduct.category}</p>

          <div className="flex items-center gap-1 mb-6">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className={`w-4 h-4 ${i < 4 ? "text-accent fill-accent" : "text-neutral-300"}`} />
            ))}
            <span className="text-sm text-neutral-500 ml-2">(24 reviews)</span>
          </div>

          <p className="text-3xl font-semibold text-accent mb-6">{formatCurrency(selectedVariant.price)}</p>
          <p className="text-neutral-600 leading-relaxed mb-8">{mockProduct.description}</p>

          <div className="mb-6">
            <p className="text-sm font-medium text-neutral-700 mb-3">Select Size:</p>
            <div className="flex gap-3">
              {mockProduct.variants.map((v) => (
                <button
                  key={v.id}
                  onClick={() => setSelectedVariant(v)}
                  className={`px-6 py-3 rounded-md border text-sm font-medium transition-all ${
                    selectedVariant.id === v.id
                      ? "border-accent bg-accent/5 text-accent"
                      : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                  }`}
                >
                  {v.weightGrams}g - {formatCurrency(v.price)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-1 border border-neutral-200 rounded-md overflow-hidden">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-neutral-100 transition-colors" aria-label="Decrease">
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-neutral-100 transition-colors" aria-label="Increase">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <Button variant="primary" size="xl" className="flex-1" leftIcon={<ShoppingCart className="w-5 h-5" />} onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <button className="p-3 rounded-md border border-neutral-200 hover:bg-neutral-100 transition-colors">
              <Heart className="w-5 h-5 text-neutral-400" />
            </button>
          </div>

          <div className="grid grid-cols-3 gap-4 p-4 rounded-lg bg-neutral-50 border border-neutral-200">
            <div className="text-center">
              <Truck className="w-5 h-5 text-accent mx-auto mb-1" />
              <p className="text-xs text-neutral-600">Free shipping</p>
            </div>
            <div className="text-center">
              <Shield className="w-5 h-5 text-accent mx-auto mb-1" />
              <p className="text-xs text-neutral-600">Quality assured</p>
            </div>
            <div className="text-center">
              <Clock className="w-5 h-5 text-accent mx-auto mb-1" />
              <p className="text-xs text-neutral-600">Shelf: {mockProduct.shelfLife}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-16">
        <div className="lg:col-span-2">
          <Card>
            <CardContent>
              <h2 className="font-semibold text-xl text-neutral-900 mb-4">Ingredients</h2>
              <div className="flex flex-wrap gap-2">
                {mockProduct.ingredients.map((ing) => (
                  <span key={ing} className="px-3 py-1.5 rounded-md bg-neutral-50 text-sm text-neutral-700 border border-neutral-200">{ing}</span>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="mt-6">
            <h2 className="font-semibold text-xl text-neutral-900 mb-4">Customer Reviews</h2>
            <div className="space-y-4">
              {mockProduct.reviews.map((review) => (
                <Card key={review.name}>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <p className="font-medium text-neutral-900">{review.name}</p>
                      <span className="text-xs text-neutral-400">{review.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-accent fill-accent" : "text-neutral-300"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-600">{review.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Card>
            <CardContent>
              <h2 className="font-semibold text-lg text-neutral-900 mb-4">Why Choose Us</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-sm text-neutral-600">
                  <Truck className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  Free delivery on orders above ₹499
                </li>
                <li className="flex items-start gap-3 text-sm text-neutral-600">
                  <Shield className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  100% natural, no preservatives
                </li>
                <li className="flex items-start gap-3 text-sm text-neutral-600">
                  <Heart className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  Made with traditional family recipes
                </li>
                <li className="flex items-start gap-3 text-sm text-neutral-600">
                  <Clock className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  Fresh batches made weekly
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      <div>
        <h2 className="heading-3 mb-6">You May Also Like</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {relatedProducts.map((p) => (
            <Link key={p.name} href={`/products/${p.name.toLowerCase().replace(/\s+/g, "-")}`}>
              <Card padding="none" className="overflow-hidden group hover:shadow-sm transition-all duration-300">
                <div className="p-8 bg-neutral-100/60 flex items-center justify-center">
                  <span className="text-5xl group-hover:scale-110 transition-transform duration-300">{p.image}</span>
                </div>
                <CardContent>
                  <Badge variant="spice" value={p.spice.toLowerCase() as any} size="sm">{p.spice}</Badge>
                  <h3 className="font-semibold text-neutral-900 mt-2 group-hover:text-accent transition-colors">{p.name}</h3>
                  <p className="text-lg font-semibold text-accent mt-1">{p.price}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
