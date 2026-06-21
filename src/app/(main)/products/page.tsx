"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, ShoppingCart, Heart, ArrowLeft, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/context/ToastContext";
import { formatCurrency } from "@/lib/utils";

type ProductData = {
  id: string; name: string; slug: string; category: string;
  categorySlug: string; price: number; weight: string; stock: number;
  spiceLevel: string; description: string; badge?: string;
};

const allProducts: ProductData[] = [
  { id: "p1", name: "Classic Mango Pickle", slug: "classic-mango-pickle", category: "Mango Pickles", categorySlug: "mango-pickles", price: 299, weight: "500g", stock: 45, spiceLevel: "medium", description: "Traditional Andhra-style mango pickle with select raw mangoes and authentic spice blend.", badge: "Best Seller" },
  { id: "p2", name: "Gongura Pickle", slug: "gongura-pickle", category: "Gongura", categorySlug: "gongura", price: 349, weight: "500g", stock: 32, spiceLevel: "hot", description: "Authentic gongura pickle made with fresh sorrel leaves and traditional spices.", badge: "Premium" },
  { id: "p3", name: "Chicken Pickle", slug: "chicken-pickle", category: "Chicken Pickles", categorySlug: "chicken-pickles", price: 449, weight: "500g", stock: 18, spiceLevel: "extra-hot", description: "Homestyle chicken pickle cooked with traditional Andhra masala.", badge: "Popular" },
  { id: "p4", name: "Prawn Pickle", slug: "prawn-pickle", category: "Prawn Pickles", categorySlug: "prawn-pickles", price: 499, weight: "500g", stock: 12, spiceLevel: "hot", description: "Coastal-style prawn pickle with tangy and spicy flavors.", badge: "Special" },
  { id: "p5", name: "Mixed Vegetable Pickle", slug: "mixed-veg-pickle", category: "Vegetarian", categorySlug: "vegetarian", price: 249, weight: "500g", stock: 28, spiceLevel: "medium", description: "Crunchy mixed vegetables pickled in traditional spices." },
  { id: "p6", name: "Lemon Pickle", slug: "lemon-pickle", category: "Vegetarian", categorySlug: "vegetarian", price: 199, weight: "500g", stock: 0, spiceLevel: "mild", description: "Tangy lemon pickle with a hint of turmeric and asafoetida." },
  { id: "p7", name: "Mango Ginger Pickle", slug: "mango-ginger", category: "Spicy Specials", categorySlug: "spicy-specials", price: 349, weight: "400g", stock: 15, spiceLevel: "extra-hot", description: "Unique mango ginger pickle for the adventurous palate." },
  { id: "p8", name: "Garlic Pickle", slug: "garlic-pickle", category: "Spicy Specials", categorySlug: "spicy-specials", price: 299, weight: "300g", stock: 22, spiceLevel: "hot", description: "Whole garlic cloves pickled in aromatic spices and vinegar." },
  { id: "p9", name: "Cut Mango Pickle", slug: "cut-mango-pickle", category: "Mango Pickles", categorySlug: "mango-pickles", price: 329, weight: "500g", stock: 38, spiceLevel: "medium", description: "Chunky cut mango pieces in traditional pickle masala." },
  { id: "p10", name: "Tomato Pickle", slug: "tomato-pickle", category: "Vegetarian", categorySlug: "vegetarian", price: 249, weight: "500g", stock: 20, spiceLevel: "medium", description: "Sweet and tangy tomato pickle, a household favorite." },
  { id: "p11", name: "Gongura Mutton Pickle", slug: "gongura-mutton", category: "Gongura", categorySlug: "gongura", price: 549, weight: "500g", stock: 8, spiceLevel: "hot", description: "Premium mutton pickle blended with gongura leaves.", badge: "Limited Batch" },
  { id: "p12", name: "Fish Pickle", slug: "fish-pickle", category: "Spicy Specials", categorySlug: "spicy-specials", price: 599, weight: "500g", stock: 6, spiceLevel: "extra-hot", description: "Traditional Andhra fish pickle, slow-cooked in spicy masala." },
];

const categories = [
  { name: "All Pickles", slug: "all", count: allProducts.length },
  { name: "Mango Pickles", slug: "mango-pickles", count: allProducts.filter(p => p.categorySlug === "mango-pickles").length },
  { name: "Gongura", slug: "gongura", count: allProducts.filter(p => p.categorySlug === "gongura").length },
  { name: "Chicken Pickles", slug: "chicken-pickles", count: allProducts.filter(p => p.categorySlug === "chicken-pickles").length },
  { name: "Prawn Pickles", slug: "prawn-pickles", count: allProducts.filter(p => p.categorySlug === "prawn-pickles").length },
  { name: "Vegetarian", slug: "vegetarian", count: allProducts.filter(p => p.categorySlug === "vegetarian").length },
  { name: "Spicy Specials", slug: "spicy-specials", count: allProducts.filter(p => p.categorySlug === "spicy-specials").length },
];

const spiceLevels = ["Mild", "Medium", "Hot", "Extra Hot"];
const sortOptions = [
  { value: "popular", label: "Most Popular" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "name", label: "Name: A-Z" },
];

const ITEMS_PER_PAGE = 6;

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedSpice, setSelectedSpice] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [filterOpen, setFilterOpen] = useState(false);
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { showToast } = useToast();

  const filtered = useMemo(() => {
    let result = [...allProducts];
    if (activeCategory !== "all") {
      result = result.filter(p => p.categorySlug === activeCategory);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    if (selectedSpice.length > 0) {
      result = result.filter(p => selectedSpice.includes(p.spiceLevel.charAt(0).toUpperCase() + p.spiceLevel.slice(1)));
    }
    result = result.filter(p => p.price <= maxPrice);
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") result.sort((a, b) => b.price - a.price);
    else if (sortBy === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [activeCategory, searchQuery, selectedSpice, maxPrice, sortBy]);

  const visibleProducts = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const toggleSpice = (level: string) => {
    setSelectedSpice(prev => prev.includes(level) ? prev.filter(s => s !== level) : [...prev, level]);
  };

  const handleAddToCart = (product: ProductData) => {
    if (product.stock <= 0) {
      showToast({ type: "error", title: "Out of stock", message: `${product.name} is currently out of stock` });
      return;
    }
    addItem(
      { id: product.id, categoryId: product.categorySlug, name: product.name, slug: product.slug, description: product.description, ingredients: [], spiceLevel: product.spiceLevel as any, shelfLifeDays: 180, isActive: true, featured: false, createdAt: new Date(), updatedAt: new Date() },
      { id: `v-${product.id}`, productId: product.id, weightGrams: parseInt(product.weight), price: product.price, stockQuantity: product.stock, sku: product.id, isActive: true, createdAt: new Date(), updatedAt: new Date() }
    );
    showToast({ type: "success", title: "Added to cart!", message: `${product.name} added to your cart` });
  };

  const FilterPanel = () => (
    <div className="space-y-5">
      <div>
        <h3 className="font-heading font-semibold text-sm text-neutral-900 mb-3 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4" /> Categories
        </h3>
        <div className="flex flex-wrap lg:flex-col gap-1.5">
          {categories.map(cat => (
            <button key={cat.slug}
              onClick={() => { setActiveCategory(cat.slug); setVisibleCount(ITEMS_PER_PAGE); }}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                activeCategory === cat.slug ? "bg-brand-600 text-white shadow-sm" : "text-neutral-600 hover:bg-neutral-100"
              }`}
            >
              <span>{cat.name}</span>
              <span className={`text-xs ml-2 ${activeCategory === cat.slug ? "text-white/70" : "text-neutral-400"}`}>({cat.count})</span>
            </button>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-heading font-semibold text-sm text-neutral-900 mb-3">Spice Level</h3>
        <div className="space-y-1.5">
          {spiceLevels.map(level => (
            <label key={level} className="flex items-center gap-2.5 px-3 py-2 rounded-lg hover:bg-neutral-50 cursor-pointer transition-colors">
              <input type="checkbox" checked={selectedSpice.includes(level)}
                onChange={() => { toggleSpice(level); setVisibleCount(ITEMS_PER_PAGE); }}
                className="w-4 h-4 rounded accent-brand-600" />
              <span className="text-sm text-neutral-600">{level}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <h3 className="font-heading font-semibold text-sm text-neutral-900 mb-3">Max Price: ₹{maxPrice}</h3>
        <input type="range" min="100" max="1000" step="50" value={maxPrice}
          onChange={(e) => { setMaxPrice(Number(e.target.value)); setVisibleCount(ITEMS_PER_PAGE); }}
          className="w-full accent-brand-600" />
        <div className="flex justify-between text-xs text-neutral-400 mt-1"><span>₹100</span><span>₹1,000</span></div>
      </div>
    </div>
  );

  return (
    <section className="bg-neutral-50 py-12">
      <div className="container-custom">
        {/* Breadcrumb */}
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-brand-600 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="heading-2 mb-1">Our Pickles</h1>
            <p className="text-neutral-500 text-sm">Discover our collection of {filtered.length} authentic homemade pickles</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input type="search" placeholder="Search pickles..." value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
                className="input-base w-full pl-10 pr-4 py-2.5" />
            </div>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="lg:hidden p-2.5 rounded-lg border border-neutral-200 hover:bg-neutral-100 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-neutral-600" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters - desktop */}
          <aside className="hidden lg:block lg:w-56 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <FilterPanel />
            </div>
          </aside>

          {/* Mobile filters drawer */}
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:hidden bg-white rounded-xl border border-neutral-200 p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Filters</h3>
                <button onClick={() => setFilterOpen(false)} className="text-sm text-brand-600 font-medium">Done</button>
              </div>
              <FilterPanel />
            </motion.div>
          )}

          {/* Product grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-neutral-500">
                Showing <span className="font-medium text-neutral-900">{visibleProducts.length}</span> of <span className="font-medium text-neutral-900">{filtered.length}</span>
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-neutral-200 rounded-lg px-3 py-2 bg-white text-neutral-700 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
              >
                {sortOptions.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>

            {visibleProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-neutral-400 mb-2">No products found</p>
                <p className="text-sm text-neutral-400 mb-6">Try adjusting your filters</p>
                <Button variant="outline" onClick={() => { setActiveCategory("all"); setSearchQuery(""); setSelectedSpice([]); setMaxPrice(1000); }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {visibleProducts.map((product, i) => (
                  <motion.div key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (i % 6) * 0.05 }}
                  >
                    <Card variant="hover" padding="none" className="overflow-hidden group">
                      <div className="relative aspect-[4/5] bg-gradient-to-br from-brand-50 via-warm-50 to-neutral-100 flex items-center justify-center overflow-hidden">
                        {product.badge && (
                          <Badge variant="default" className="absolute top-3 left-3 z-10 !bg-white/90 text-neutral-800 border-0 shadow-sm">
                            {product.badge}
                          </Badge>
                        )}
                        {product.stock <= 0 && (
                          <Badge variant="error" className="absolute top-3 right-3 z-10">Out of Stock</Badge>
                        )}
                        <div className="absolute top-3 right-3 z-10">
                          <button
                            onClick={() => {
                              toggleItem({ id: product.id, categoryId: product.categorySlug, name: product.name, slug: product.slug, description: product.description, ingredients: [], spiceLevel: product.spiceLevel as any, shelfLifeDays: 180, isActive: true, featured: false, createdAt: new Date(), updatedAt: new Date() });
                              showToast({ type: isInWishlist(product.id) ? "info" : "success", title: isInWishlist(product.id) ? "Removed" : "Saved!", message: `${product.name} ${isInWishlist(product.id) ? "removed from" : "added to"} wishlist` });
                            }}
                            className="p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all shadow-sm"
                          >
                            <Heart className={`w-4 h-4 transition-colors ${isInWishlist(product.id) ? "fill-brand-500 text-brand-500" : "text-neutral-400"}`} />
                          </button>
                        </div>
                        <span className="text-5xl sm:text-6xl opacity-80 group-hover:scale-110 transition-transform duration-500">🥫</span>
                        {product.stock > 0 && (
                          <button
                            onClick={() => handleAddToCart(product)}
                            className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-brand-600 text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 shadow-lg"
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                      <CardContent className="p-4 md:p-5">
                        <div className="flex items-center justify-between mb-1.5">
                          <Badge variant="spice" value={product.spiceLevel} size="sm">
                            {product.spiceLevel.charAt(0).toUpperCase() + product.spiceLevel.slice(1)}
                          </Badge>
                          <span className="text-xs text-neutral-400">{product.weight}</span>
                        </div>
                        <Link href={`/products/${product.slug}`}>
                          <h3 className="font-heading font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors">{product.name}</h3>
                        </Link>
                        <p className="text-xs text-neutral-400 mt-1 line-clamp-2">{product.description}</p>
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100">
                          <span className="text-xl font-bold text-brand-600">{formatCurrency(product.price)}</span>
                          <Button size="sm" variant="primary" disabled={product.stock <= 0}
                            onClick={() => handleAddToCart(product)}
                            leftIcon={<ShoppingCart className="w-3.5 h-3.5" />}
                          >
                            {product.stock > 0 ? "Add" : "Sold out"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}

            {hasMore && (
              <div className="mt-12 text-center">
                <Button variant="outline" size="lg" onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}>
                  Load More ({filtered.length - visibleCount} remaining)
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
