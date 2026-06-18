"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Star, Shield, Truck, Leaf, Heart, Clock, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card, CardContent } from "@/components/ui/Card";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { staggerChildren: 0.1 },
};

const fadeInUpItem = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
};

const featuredProducts = [
  { name: "Classic Mango Pickle", spice: "Medium", price: "₹299", weight: "500g", badge: "Best Seller" },
  { name: "Gongura Pickle", spice: "Hot", price: "₹349", weight: "500g", badge: "Popular" },
  { name: "Chicken Pickle", spice: "Extra Hot", price: "₹449", weight: "500g", badge: "Non-Veg" },
  { name: "Prawn Pickle", spice: "Hot", price: "₹499", weight: "500g", badge: "Premium" },
];

const benefits = [
  { icon: Leaf, title: "100% Homemade", description: "Made in small batches using traditional family recipes passed down through generations." },
  { icon: Shield, title: "Premium Quality", description: "We use only the finest ingredients - no preservatives, no artificial flavors." },
  { icon: Truck, title: "Free Delivery", description: "Free shipping on orders above ₹499. Delivered fresh to your doorstep." },
  { icon: Heart, title: "Made with Love", description: "Every jar is prepared with the same care as our grandmothers did." },
  { icon: Clock, title: "Long Shelf Life", description: "Properly stored, our pickles stay fresh for 6-12 months." },
  { icon: Award, title: "Authentic Taste", description: "Award-winning recipes that bring the taste of Andhra to your home." },
];

const testimonials = [
  { name: "Priya S.", location: "Hyderabad", rating: 5, text: "The mango pickle tastes just like my grandmother used to make. Absolutely authentic!", product: "Mango Pickle" },
  { name: "Rahul M.", location: "Bangalore", rating: 5, text: "Best gongura pickle I've had outside of home. The spice level is perfect!", product: "Gongura Pickle" },
  { name: "Ananya K.", location: "Mumbai", rating: 4, text: "Love the chicken pickle! Great quality and the delivery was super fast.", product: "Chicken Pickle" },
];

const processSteps = [
  { step: "01", title: "Select Ingredients", description: "We source the finest mangoes, spices, and oils from trusted local farmers." },
  { step: "02", title: "Sun-Dried & Prepared", description: "Ingredients are sun-dried for days and prepared with traditional techniques." },
  { step: "03", title: "Slow-Cooked", description: "Each batch is slow-cooked with the perfect blend of spices and love." },
  { step: "04", title: "Packed Fresh", description: "Freshly packed in premium jars to preserve the authentic homemade taste." },
];

const faqs = [
  { q: "How long do your pickles last?", a: "Our pickles have a shelf life of 6-12 months when stored in a cool, dry place away from direct sunlight." },
  { q: "Do you use preservatives?", a: "No! We use absolutely no preservatives or artificial additives. Our pickles are 100% natural." },
  { q: "What is your delivery timeframe?", a: "We deliver within 3-5 business days across India. Free shipping on orders above ₹499." },
  { q: "Can I customize the spice level?", a: "Absolutely! You can add a note at checkout with your spice preference." },
  { q: "Do you offer bulk orders?", a: "Yes! We offer special pricing for bulk orders. Contact us via WhatsApp for details." },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-neutral-50">
        <div className="container-custom min-h-[70vh] flex items-center py-20">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Badge variant="default" size="md" className="mb-4 bg-accent-light text-accent">Authentic Homemade Pickles</Badge>
              <h1 className="heading-1 mb-6 text-balance">
                Taste of <span className="text-accent">Tradition</span>
              </h1>
              <p className="body-lg text-neutral-500 mb-8 max-w-lg">
                Discover authentic homemade pickles crafted from generations-old recipes. Every jar brings the taste of traditional Andhra kitchens to your table.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/products">
                  <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                    Shop Now
                  </Button>
                </Link>
                <Link href="/process">
                  <Button variant="secondary" size="lg">
                    Our Process
                  </Button>
                </Link>
              </div>
              <div className="flex items-center gap-4 mt-8 pt-6 border-t border-neutral-200">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-sm text-neutral-500">2,500+ happy customers</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-lg bg-neutral-100 flex items-center justify-center">
                <div className="text-center p-12">
                  <span className="text-7xl">🥭</span>
                  <p className="text-base font-medium text-neutral-600 mt-4">Premium Mango Pickle</p>
                </div>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-white rounded-md border border-neutral-200 px-5 py-3 shadow-sm">
                <p className="text-xs text-neutral-500">Starting from</p>
                <p className="text-2xl font-semibold text-neutral-900">₹199</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...fadeInUp}>
            <h2 className="heading-2 mb-3">Our Signature Collection</h2>
            <p className="body-lg text-neutral-500">Handcrafted pickles made with select ingredients and traditional recipes</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" {...staggerChildren}>
            {featuredProducts.map((product, index) => (
              <motion.div key={product.name} {...fadeInUpItem} transition={{ delay: index * 0.1 }}>
                <Link href="/products" className="block group">
                  <Card variant="hover" padding="none" className="overflow-hidden">
                    <div className="aspect-square bg-neutral-50 flex items-center justify-center relative">
                      {product.badge && (
                        <Badge variant="info" className="absolute top-3 left-3">{product.badge}</Badge>
                      )}
                      <span className="text-5xl">🥫</span>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <Badge variant="spice" value={product.spice.toLowerCase()} size="sm">{product.spice}</Badge>
                        <span className="text-xs text-neutral-400">{product.weight}</span>
                      </div>
                      <h3 className="font-medium text-neutral-900 group-hover:text-accent transition-colors">{product.name}</h3>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-lg font-semibold text-neutral-900">{product.price}</span>
                        <span className="text-xs text-accent font-medium inline-flex items-center gap-0.5">
                          Add to cart <ChevronRight className="w-3 h-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          <motion.div className="text-center mt-10" {...fadeInUp}>
            <Link href="/products">
              <Button variant="secondary" rightIcon={<ArrowRight className="w-4 h-4" />}>
                View All Products
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...fadeInUp}>
            <h2 className="heading-2 mb-3">Why Choose Us</h2>
            <p className="body-lg text-neutral-500">We believe in preserving authentic taste while meeting modern quality standards</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" {...staggerChildren}>
            {benefits.map((benefit) => (
              <motion.div key={benefit.title} {...fadeInUpItem} transition={{ duration: 0.4 }}>
                <Card variant="hover">
                  <CardContent>
                    <div className="w-10 h-10 rounded-md bg-accent-light flex items-center justify-center mb-3">
                      <benefit.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="font-medium text-neutral-900 mb-1">{benefit.title}</h3>
                    <p className="text-sm text-neutral-500 leading-relaxed">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...fadeInUp}>
            <h2 className="heading-2 mb-3">Our Process</h2>
            <p className="body-lg text-neutral-500">From our kitchen to your table, every step is handled with care</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="hidden lg:block absolute top-12 left-[12%] right-[12%] h-px bg-neutral-200" />
            {processSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center mx-auto mb-4">
                  <span className="text-lg font-semibold text-white">{step.step}</span>
                </div>
                <h3 className="font-medium text-neutral-900 mb-1">{step.title}</h3>
                <p className="text-sm text-neutral-500 max-w-xs mx-auto">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-neutral-50">
        <div className="container-custom">
          <motion.div className="text-center max-w-2xl mx-auto mb-12" {...fadeInUp}>
            <h2 className="heading-2 mb-3">What Our Customers Say</h2>
            <p className="body-lg text-neutral-500">Real reviews from people who love authentic homemade pickles</p>
          </motion.div>
          <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6" {...staggerChildren}>
            {testimonials.map((testimonial) => (
              <motion.div key={testimonial.name} {...fadeInUpItem} transition={{ duration: 0.4 }}>
                <Card variant="hover">
                  <CardContent>
                    <div className="flex items-center gap-0.5 mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                      ))}
                    </div>
                    <p className="text-sm text-neutral-600 mb-4 leading-relaxed italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                    <div className="pt-3 border-t border-neutral-100">
                      <p className="font-medium text-sm text-neutral-900">{testimonial.name}</p>
                      <p className="text-xs text-neutral-400">{testimonial.location}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-accent text-white text-center">
        <div className="container-custom">
          <motion.div className="max-w-2xl mx-auto" {...fadeInUp}>
            <h2 className="heading-2 mb-3 text-white">Ready to Taste Tradition?</h2>
            <p className="body-lg mb-8 text-white/70">Order your favorite homemade pickles today. Free shipping on orders above ₹499.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link href="/products">
                <Button variant="secondary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
                  Shop Collection
                </Button>
              </Link>
              <a href="https://wa.me/919XXXXXXXXX" target="_blank" rel="noopener">
                <Button variant="ghost" size="lg" className="text-white border border-white/30 hover:bg-white/10">
                  Order via WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="container-custom max-w-3xl">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="heading-2 mb-3">FAQ</h2>
            <p className="body-lg text-neutral-500">Answers to common questions</p>
          </motion.div>
          <motion.div className="space-y-2" {...staggerChildren}>
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                {...fadeInUpItem}
                transition={{ delay: index * 0.05 }}
                className="group rounded-md border border-neutral-200 [&[open]]:border-accent/30 transition-colors"
              >
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none">
                  <span className="text-sm font-medium text-neutral-900 pr-4">{faq.q}</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400 flex-shrink-0 transition-transform duration-200 group-open:rotate-90" />
                </summary>
                <p className="px-4 pb-4 text-sm text-neutral-500 leading-relaxed border-t border-neutral-100 pt-3">
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