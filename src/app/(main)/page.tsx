"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ChevronRight, Heart, ShoppingCart, Clock, ShieldCheck, ArrowRight, Sparkles, TrendingUp, Flame } from "lucide-react";
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

const bestsellers: ProductData[] = [
  { id: "p1", name: "Classic Mango Pickle", slug: "classic-mango-pickle", category: "Mango Pickles", categorySlug: "mango-pickles", price: 299, weight: "500g", stock: 45, spiceLevel: "medium", description: "Traditional Andhra-style mango pickle with select raw mangoes.", badge: "Best Seller" },
  { id: "p2", name: "Gongura Pickle", slug: "gongura-pickle", category: "Gongura", categorySlug: "gongura", price: 349, weight: "500g", stock: 32, spiceLevel: "hot", description: "Authentic gongura pickle made with fresh sorrel leaves.", badge: "Popular" },
  { id: "p3", name: "Chicken Pickle", slug: "chicken-pickle", category: "Chicken Pickles", categorySlug: "chicken-pickles", price: 449, weight: "500g", stock: 18, spiceLevel: "extra-hot", description: "Homestyle chicken pickle cooked with traditional Andhra masala.", badge: "Non-Veg" },
  { id: "p4", name: "Prawn Pickle", slug: "prawn-pickle", category: "Prawn Pickles", categorySlug: "prawn-pickles", price: 499, weight: "500g", stock: 12, spiceLevel: "hot", description: "Coastal-style prawn pickle with tangy and spicy flavors.", badge: "Premium" },
];

const categories = [
  { name: "Mango Pickles", slug: "mango-pickles", count: 3, emoji: "🥭" },
  { name: "Gongura", slug: "gongura", count: 2, emoji: "🌿" },
  { name: "Chicken Pickles", slug: "chicken-pickles", count: 1, emoji: "🍗" },
  { name: "Prawn Pickles", slug: "prawn-pickles", count: 1, emoji: "🦐" },
  { name: "Vegetarian", slug: "vegetarian", count: 3, emoji: "🥬" },
  { name: "Spicy Specials", slug: "spicy-specials", count: 3, emoji: "🌶️" },
];

const reviews = [
  { name: "Priya S.", location: "Hyderabad", rating: 5, text: "The mango pickle tastes just like my grandmother used to make. Absolutely authentic!", product: "Mango Pickle" },
  { name: "Rahul M.", location: "Bangalore", rating: 5, text: "Best gongura pickle I've had outside of home. The spice level is perfect!", product: "Gongura Pickle" },
  { name: "Ananya K.", location: "Mumbai", rating: 4, text: "Love the chicken pickle! Great quality and super fast delivery.", product: "Chicken Pickle" },
  { name: "Vikram R.", location: "Chennai", rating: 5, text: "Finally found authentic homemade pickles in the city. Regular customer now!", product: "Mixed Veg Pickle" },
  { name: "Kavita P.", location: "Delhi", rating: 5, text: "The prawn pickle is incredible. Reminds me of coastal Andhra Sundays.", product: "Prawn Pickle" },
  { name: "Suresh N.", location: "Pune", rating: 4, text: "No preservatives, real taste. This is how pickles should be made.", product: "Lemon Pickle" },
];

const faqs = [
  { q: "How long do your pickles last?", a: "Our pickles have a shelf life of 6-12 months when stored in a cool, dry place away from direct sunlight." },
  { q: "Do you use preservatives?", a: "No! We use absolutely no preservatives or artificial additives. Our pickles are 100% natural." },
  { q: "What is your delivery timeframe?", a: "We deliver within 3-5 business days across India. Free shipping on orders above ₹499." },
  { q: "Do you offer bulk orders?", a: "Yes! We offer special pricing for bulk orders. Contact us via WhatsApp for details." },
];

const fadeInUp = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5 } };
const staggerChildren = { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true }, transition: { staggerChildren: 0.08 } };
const fadeInUpItem = { initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true } };

export default function HomePage() {
  const { addItem } = useCart();
  const { toggleItem, isInWishlist } = useWishlist();
  const { showToast } = useToast();

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
    <>
      {/* ────── HERO – full-bleed, real kitchen imagery ────── */}
      <section className="relative min-h-[90vh] flex items-center bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625938145744-e1c9a5c0e55a?w=1600&q=80')] bg-cover bg-center opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/90 via-neutral-900/60 to-neutral-900/40" />
        <div className="relative z-10 container-custom py-20 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6">
              <Sparkles className="w-3.5 h-3.5 text-gold-400" />
              <span className="text-sm text-neutral-200">Homemade · Small-batch · No preservatives</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-semibold text-white leading-[1.05] tracking-tight mb-6">
              Taste the
              <span className="block text-brand-400">Real Andhra</span>
              Tradition
            </h1>
            <p className="text-lg sm:text-xl text-neutral-300 max-w-lg mb-8 leading-relaxed">
              Handcrafted pickles made the way grandmothers did — sun-dried spices, slow-cooked masala, zero shortcuts.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/products">
                <Button variant="primary" size="xl" className="bg-brand-600 hover:bg-brand-700 text-white shadow-lg shadow-brand-600/30" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Explore our pickles
                </Button>
              </Link>
              <Link href="#process">
                <Button variant="secondary" size="xl" className="bg-white/10 text-white border-white/20 hover:bg-white/20 hover:border-white/30 backdrop-blur-sm">
                  Our story
                </Button>
              </Link>
            </div>
            <div className="flex items-center gap-6 mt-10 pt-6 border-t border-white/10">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-herb-400" />
                <span className="text-sm text-neutral-300">FSSAI Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gold-400" />
                <span className="text-sm text-neutral-300">Fresh batches weekly</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (<Star key={i} className="w-4 h-4 fill-gold-400 text-gold-400" />))}
                <span className="text-sm text-neutral-300 ml-1">2,500+</span>
              </div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronRight className="w-6 h-6 text-white/40 rotate-90" />
        </div>
      </section>

      {/* ────── BESTSELLERS – 4-up grid ────── */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="container-custom">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...fadeInUp}>
            <Badge variant="default" className="bg-brand-50 text-brand-700 border-0 mb-3">Best Sellers</Badge>
            <h2 className="heading-2 mb-3">Customer Favorites</h2>
            <p className="text-neutral-500 text-lg">The pickles our customers keep coming back for</p>
          </motion.div>
          <motion.div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6" {...staggerChildren}>
            {bestsellers.map((product, i) => (
              <motion.div key={product.id} {...fadeInUpItem} transition={{ delay: i * 0.08 }} className="group">
                <Card variant="hover" padding="none" className="overflow-hidden">
                  <div className="relative aspect-[4/5] bg-gradient-to-br from-brand-50 via-warm-50 to-neutral-100 flex items-center justify-center overflow-hidden">
                    {product.badge && (
                      <Badge variant="default" className="absolute top-3 left-3 z-10 !bg-white/90 text-neutral-800 border-0 shadow-sm">
                        {product.badge}
                      </Badge>
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
                    <span className="text-5xl sm:text-6xl lg:text-7xl opacity-80 group-hover:scale-110 transition-transform duration-500">
                      {product.id === "p1" ? "🥭" : product.id === "p2" ? "🌿" : product.id === "p3" ? "🍗" : "🦐"}
                    </span>
                    <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-white/60 to-transparent" />
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="absolute bottom-3 right-3 p-2.5 rounded-xl bg-brand-600 text-white opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-200 shadow-lg"
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-1.5">
                      <Badge variant="spice" value={product.spiceLevel} size="sm">{product.spiceLevel.charAt(0).toUpperCase() + product.spiceLevel.slice(1)}</Badge>
                      <span className="text-xs text-neutral-400">{product.weight}</span>
                    </div>
                    <Link href={`/products/${product.slug}`}>
                      <h3 className="font-heading font-semibold text-neutral-900 group-hover:text-brand-600 transition-colors text-base">{product.name}</h3>
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-lg font-bold text-brand-600">{formatCurrency(product.price)}</span>
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="text-xs font-medium text-brand-600 hover:text-brand-700 flex items-center gap-0.5"
                      >
                        Add <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="text-center mt-10" {...fadeInUp}>
            <Link href="/products">
              <Button variant="outline" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View all pickles
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ────── PROCESS / STORY – full-bleed photo moment ────── */}
      <section id="process" className="relative py-20 lg:py-28 bg-neutral-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1590932617871-63eb5cea0f15?w=1600&q=80')] bg-cover bg-center opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-900/95 via-neutral-900/80 to-neutral-900/60" />
        <div className="relative z-10 container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <Badge variant="default" className="bg-brand-600/20 text-brand-300 border-0 mb-4">Our Story</Badge>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-semibold text-white leading-tight mb-6">
                Made the way<br />
                <span className="text-brand-400">grandmothers did</span>
              </h2>
              <div className="space-y-4 text-neutral-300 text-base md:text-lg leading-relaxed max-w-lg">
                <p>
                  Every jar starts with sun-dried red chillies picked at peak ripeness, spices ground fresh each morning, 
                  and oil infused with mustard, fenugreek, and curry leaves — just like our grandmothers taught us.
                </p>
                <p>
                  No shortcuts. No preservatives. No artificial colors. Just the slow, patient craft of turning fresh 
                  ingredients into pickles that taste like home.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-6">
                <div className="text-center">
                  <p className="text-3xl font-heading font-bold text-white">12+</p>
                  <p className="text-sm text-neutral-400">Flavors</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-heading font-bold text-white">100%</p>
                  <p className="text-sm text-neutral-400">Natural</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-heading font-bold text-white">2,500+</p>
                  <p className="text-sm text-neutral-400">Happy customers</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1590932617871-63eb5cea0f15?w=800&q=80"
                  alt="Homemade pickle preparation"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ────── SHOP BY FLAVOR ────── */}
      <section className="py-16 lg:py-20 bg-warm-50">
        <div className="container-custom">
          <motion.div className="text-center max-w-2xl mx-auto mb-10" {...fadeInUp}>
            <h2 className="heading-2 mb-3">Shop by Flavor</h2>
            <p className="text-neutral-500 text-lg">Find your perfect match from our range</p>
          </motion.div>
          <motion.div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4" {...staggerChildren}>
            {categories.map((cat, i) => (
              <motion.div key={cat.slug} {...fadeInUpItem} transition={{ delay: i * 0.05 }}>
                <Link href={`/products?category=${cat.slug}`} className="block group">
                  <Card variant="hover" padding="none" className="overflow-hidden text-center">
                    <CardContent className="p-5 md:p-6">
                      <span className="text-3xl md:text-4xl block mb-2 group-hover:scale-110 transition-transform duration-300">{cat.emoji}</span>
                      <h3 className="font-heading font-semibold text-sm text-neutral-900 group-hover:text-brand-600 transition-colors">{cat.name}</h3>
                      <p className="text-xs text-neutral-400 mt-0.5">{cat.count} varieties</p>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ────── REVIEWS – dense quote grid ────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <motion.div className="text-center max-w-2xl mx-auto mb-10" {...fadeInUp}>
            <Badge variant="default" className="bg-gold-50 text-gold-700 border-0 mb-3">Reviews</Badge>
            <h2 className="heading-2 mb-3">What our customers say</h2>
            <p className="text-neutral-500 text-lg">Real words from real people who love real pickles</p>
          </motion.div>
          <motion.div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6" {...staggerChildren}>
            {reviews.slice(0, 6).map((review, i) => (
              <motion.div key={i} {...fadeInUpItem} transition={{ delay: i * 0.05 }}>
                <Card variant="hover" className="h-full">
                  <CardContent>
                    <div className="flex items-center gap-0.5 mb-3">
                      {[...Array(5)].map((_, s) => (
                        <Star key={s} className={`w-4 h-4 ${s < review.rating ? "fill-gold-500 text-gold-500" : "text-neutral-200"}`} />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-600 leading-relaxed mb-4">&ldquo;{review.text}&rdquo;</p>
                    <div className="flex items-center justify-between pt-3 border-t border-neutral-100">
                      <div>
                        <p className="text-sm font-medium text-neutral-900">{review.name}</p>
                        <p className="text-xs text-neutral-400">{review.location}</p>
                      </div>
                      <Badge variant="default" size="sm" className="bg-brand-50 text-brand-600 border-0">{review.product}</Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ────── CTA + TRUST BADGES ────── */}
      <section className="py-16 lg:py-20 bg-gradient-to-br from-brand-700 via-brand-800 to-neutral-900 text-white">
        <div className="container-custom">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...fadeInUp}>
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4">Ready to taste the difference?</h2>
            <p className="text-brand-200 text-lg mb-8">Free shipping on orders above ₹499. Fresh batches made every week.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/products">
                <Button variant="secondary" size="xl" className="bg-white text-brand-800 hover:bg-neutral-100 border-0 shadow-lg">
                  Shop the collection
                </Button>
              </Link>
              <a href="https://wa.me/919XXXXXXXXX" target="_blank" rel="noopener">
                <Button variant="ghost" size="xl" className="text-white border border-white/30 hover:bg-white/10 hover:border-white/50">
                  Order via WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
          <motion.div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto" {...staggerChildren}>
            <motion.div {...fadeInUpItem} className="text-center">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6 text-herb-400" />
              </div>
              <p className="text-sm font-medium text-white">FSSAI Certified</p>
              <p className="text-xs text-brand-200 mt-0.5">License #123456</p>
            </motion.div>
            <motion.div {...fadeInUpItem} className="text-center">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-gold-400" />
              </div>
              <p className="text-sm font-medium text-white">UPI / Cards / COD</p>
              <p className="text-xs text-brand-200 mt-0.5">Secure payments</p>
            </motion.div>
            <motion.div {...fadeInUpItem} className="text-center">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3">
                <Truck className="w-6 h-6 text-brand-300" />
              </div>
              <p className="text-sm font-medium text-white">Free delivery</p>
              <p className="text-xs text-brand-200 mt-0.5">Orders above ₹499</p>
            </motion.div>
            <motion.div {...fadeInUpItem} className="text-center">
              <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mx-auto mb-3">
                <Flame className="w-6 h-6 text-brand-300" />
              </div>
              <p className="text-sm font-medium text-white">Fresh batches</p>
              <p className="text-xs text-brand-200 mt-0.5">Made every week</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ────── FAQ ────── */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom max-w-3xl">
          <motion.div className="text-center mb-10" {...fadeInUp}>
            <h2 className="heading-2 mb-3">Still curious?</h2>
            <p className="text-neutral-500 text-lg">Answers to common questions</p>
          </motion.div>
          <motion.div className="space-y-2" {...staggerChildren}>
            {faqs.map((faq, i) => (
              <motion.details
                key={i}
                {...fadeInUpItem}
                transition={{ delay: i * 0.05 }}
                className="group rounded-xl border border-neutral-200 [&[open]]:border-brand-200 transition-colors overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 md:p-5 cursor-pointer list-none">
                  <span className="text-sm font-medium text-neutral-900 pr-4">{faq.q}</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-200 group-open:rotate-90" />
                </summary>
                <p className="px-4 md:px-5 pb-4 md:pb-5 text-sm text-neutral-500 leading-relaxed border-t border-neutral-100 pt-3">
                  {faq.a}
                </p>
              </motion.details>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
}

const Truck = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="2"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
);
