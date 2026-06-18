"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { SlidersHorizontal, Grid3X3, List, Search, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";
import { Select } from "@/components/ui/Select";
import { useCart } from "@/context/CartContext";
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popular");
  const [selectedSpice, setSelectedSpice] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const { addItem } = useCart();
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

  return (
    <section className="bg-neutral-50 py-12">
      <div className="container-custom">
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-neutral-500 hover:text-accent transition-colors mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="heading-2 mb-2">Our Pickles</h1>
            <p className="text-neutral-500">Discover our collection of {filtered.length} authentic homemade pickles</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input type="search" placeholder="Search pickles..." value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(ITEMS_PER_PAGE); }}
                className="input-base w-full pl-10 pr-4 py-2.5" />
            </div>
            <div className="hidden sm:flex items-center border border-neutral-200 rounded-md overflow-hidden">
              <button onClick={() => setViewMode("grid")} className={`p-2.5 transition-colors ${viewMode === "grid" ? "bg-accent text-white" : "bg-white text-neutral-400 hover:text-neutral-900"}`} aria-label="Grid view"><Grid3X3 className="w-4 h-4" /></button>
              <button onClick={() => setViewMode("list")} className={`p-2.5 transition-colors ${viewMode === "list" ? "bg-accent text-white" : "bg-white text-neutral-400 hover:text-neutral-900"}`} aria-label="List view"><List className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-56 flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div>
                <h3 className="font-semibold text-sm text-neutral-900 mb-3 flex items-center gap-2"><SlidersHorizontal className="w-4 h-4" /> Categories</h3>
                <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
                  {categories.map(cat => (
                    <button key={cat.slug} onClick={() => { setActiveCategory(cat.slug); setVisibleCount(ITEMS_PER_PAGE); }}
                      className={`flex items-center justify-between px-3 py-2 rounded-md text-sm whitespace-nowrap transition-colors ${activeCategory === cat.slug ? "bg-accent text-white" : "text-neutral-600 hover:bg-neutral-100"}`}>
                      <span>{cat.name}</span>
                      <span className={`text-xs ml-2 ${activeCategory === cat.slug ? "text-white/70" : "text-neutral-400"}`}>({cat.count})</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-neutral-900 mb-3">Spice Level</h3>
                <div className="space-y-1.5">
                  {spiceLevels.map(level => (
                    <label key={level} className="flex items-center gap-2.5 px-3 py-2 rounded-md hover:bg-neutral-100 cursor-pointer transition-colors">
                      <input type="checkbox" checked={selectedSpice.includes(level)} onChange={() => { toggleSpice(level); setVisibleCount(ITEMS_PER_PAGE); }} className="rounded accent-accent w-4 h-4" />
                      <span className="text-sm text-neutral-600">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-sm text-neutral-900 mb-3">Max Price: ₹{maxPrice}</h3>
                <div className="px-3">
                  <input type="range" min="100" max="1000" step="50" value={maxPrice} onChange={(e) => { setMaxPrice(Number(e.target.value)); setVisibleCount(ITEMS_PER_PAGE); }} className="w-full accent-accent" />
                  <div className="flex justify-between text-xs text-neutral-400 mt-1"><span>₹100</span><span>₹1,000</span></div>
                </div>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-neutral-500">Showing <span className="font-medium text-neutral-900">{visibleProducts.length}</span> of <span className="font-medium text-neutral-900">{filtered.length}</span> results</p>
              <Select options={sortOptions} value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-44" />
            </div>

            {visibleProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-lg text-neutral-400 mb-2">No products found</p>
                <p className="text-sm text-neutral-400 mb-6">Try adjusting your filters</p>
                <Button variant="outline" onClick={() => { setActiveCategory("all"); setSearchQuery(""); setSelectedSpice([]); setMaxPrice(1000); }}>Clear Filters</Button>
              </div>
            ) : (
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                {visibleProducts.map((product, i) => (
                  <motion.div key={product.id} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 6) * 0.05 }}>
                    {viewMode === "grid" ? (
                      <Card variant="hover" padding="none" className="overflow-hidden group">
                        <div className="aspect-square bg-neutral-100/60 flex items-center justify-center relative">
                          {product.badge && <Badge variant="default" className="absolute top-3 left-3">{product.badge}</Badge>}
                          <Badge variant={product.stock > 0 ? "success" : "error"} className="absolute top-3 right-3">{product.stock > 0 ? "In Stock" : "Out of Stock"}</Badge>
                          <span className="text-6xl">🥫</span>
                        </div>
                        <CardContent className="p-5">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant="spice" value={product.spiceLevel}>{product.spiceLevel.charAt(0).toUpperCase() + product.spiceLevel.slice(1)}</Badge>
                            <span className="text-sm text-neutral-500">{product.weight}</span>
                          </div>
                          <Link href={`/products/${product.slug}`}>
                            <h3 className="font-semibold text-lg text-neutral-900 group-hover:text-accent transition-colors">{product.name}</h3>
                          </Link>
                          <p className="text-sm text-neutral-400 mt-1 line-clamp-2">{product.description}</p>
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-neutral-200">
                            <span className="text-2xl font-semibold text-accent">{formatCurrency(product.price)}</span>
                            <Button size="sm" variant="primary" leftIcon={<ShoppingCart className="w-4 h-4" />}
                              disabled={product.stock <= 0} onClick={() => handleAddToCart(product)}>
                              Add
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card variant="hover" padding="none" className="overflow-hidden group flex">
                        <div className="w-48 aspect-square bg-neutral-100/60 flex items-center justify-center relative flex-shrink-0">
                          {product.badge && <Badge variant="default" className="absolute top-3 left-3">{product.badge}</Badge>}
                          <span className="text-5xl">🥫</span>
                        </div>
                        <CardContent className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="spice" value={product.spiceLevel}>{product.spiceLevel.charAt(0).toUpperCase() + product.spiceLevel.slice(1)}</Badge>
                              <span className="text-sm text-neutral-500">{product.weight}</span>
                              {product.stock <= 0 && <Badge variant="error">Out of Stock</Badge>}
                            </div>
                            <Link href={`/products/${product.slug}`}>
                              <h3 className="font-semibold text-xl text-neutral-900 group-hover:text-accent transition-colors">{product.name}</h3>
                            </Link>
                            <p className="text-sm text-neutral-400 mt-2">{product.description}</p>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <span className="text-2xl font-semibold text-accent">{formatCurrency(product.price)}</span>
                            <Button size="md" variant="primary" leftIcon={<ShoppingCart className="w-4 h-4" />}
                              disabled={product.stock <= 0} onClick={() => handleAddToCart(product)}>
                              Add to Cart
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )}
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
