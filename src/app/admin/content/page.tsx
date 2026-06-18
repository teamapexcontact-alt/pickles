"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { useToast } from "@/context/ToastContext";

const defaultContent = {
  hero: { badge: "Authentic Homemade Pickles", title: "Taste of Tradition", subtitle: "Discover authentic homemade pickles crafted from generations-old recipes.", ctaShop: "Shop Now", ctaProcess: "Our Process" },
  cta: { title: "Ready to Taste Tradition?", subtitle: "Order your favorite homemade pickles today. Free shipping on orders above ₹499.", ctaShop: "Shop Collection", ctaWhatsApp: "Order via WhatsApp" },
  featuredProducts: [
    { name: "Classic Mango Pickle", spice: "Medium", price: "₹299", weight: "500g", badge: "Best Seller" },
    { name: "Gongura Pickle", spice: "Hot", price: "₹349", weight: "500g", badge: "Popular" },
    { name: "Chicken Pickle", spice: "Extra Hot", price: "₹449", weight: "500g", badge: "Non-Veg" },
    { name: "Prawn Pickle", spice: "Hot", price: "₹499", weight: "500g", badge: "Premium" },
  ],
  benefits: [
    { icon: "Leaf", title: "100% Homemade", description: "Made in small batches using traditional family recipes passed down through generations." },
    { icon: "Shield", title: "Premium Quality", description: "We use only the finest ingredients - no preservatives, no artificial flavors, just purity." },
    { icon: "Truck", title: "Free Delivery", description: "Free shipping on orders above ₹499. Delivered fresh to your doorstep." },
    { icon: "Heart", title: "Made with Love", description: "Every jar is prepared with the same care and love as our grandmothers did." },
    { icon: "Clock", title: "Long Shelf Life", description: "Properly stored, our pickles stay fresh for 6-12 months without refrigeration." },
    { icon: "Award", title: "Authentic Taste", description: "Award-winning recipes that bring the authentic taste of Andhra to your home." },
  ],
  processSteps: [
    { step: "01", title: "Select Ingredients", description: "We source the finest mangoes, spices, and oils from trusted local farmers." },
    { step: "02", title: "Sun-Dried & Prepared", description: "Ingredients are sun-dried for days and prepared with traditional techniques." },
    { step: "03", title: "Slow-Cooked to Perfection", description: "Each batch is slow-cooked with the perfect blend of spices and love." },
    { step: "04", title: "Packed with Care", description: "Freshly packed in premium jars to preserve the authentic homemade taste." },
  ],
  testimonials: [
    { name: "Priya S.", location: "Hyderabad", rating: 5, text: "The mango pickle tastes just like my grandmother used to make. Absolutely authentic!", product: "Mango Pickle" },
    { name: "Rahul M.", location: "Bangalore", rating: 5, text: "Best gongura pickle I've had outside of home. The spice level is perfect!", product: "Gongura Pickle" },
    { name: "Ananya K.", location: "Mumbai", rating: 4, text: "Love the chicken pickle! Great quality and the delivery was super fast.", product: "Chicken Pickle" },
  ],
  faq: [
    { q: "How long do your pickles last?", a: "Our pickles have a shelf life of 6-12 months when stored in a cool, dry place away from direct sunlight." },
    { q: "Do you use preservatives?", a: "No! We use absolutely no preservatives or artificial additives. Our pickles are 100% natural." },
    { q: "What is your delivery timeframe?", a: "We deliver within 3-5 business days across India. Free shipping on orders above ₹499." },
    { q: "Can I customize the spice level?", a: "Absolutely! You can add a note at checkout with your spice preference and we'll customize it." },
    { q: "Do you offer bulk/wholesale orders?", a: "Yes! We offer special pricing for bulk orders. Contact us via WhatsApp for details." },
  ],
};

type SiteContent = typeof defaultContent;
type SectionName = keyof SiteContent;

const iconNameMap: Record<string, string> = {
  Leaf: "🌿",
  Shield: "🛡️",
  Truck: "🚚",
  Heart: "❤️",
  Clock: "⏰",
  Award: "🏆",
};

export default function AdminContent() {
  const { showToast } = useToast();
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [activeSection, setActiveSection] = useState<SectionName>("hero");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("apex-site-content");
    if (saved) {
      try {
        setContent(JSON.parse(saved));
      } catch { /* ignore */ }
    }
  }, []);

  const saveContent = async () => {
    setIsSaving(true);
    localStorage.setItem("apex-site-content", JSON.stringify(content));
    await new Promise((r) => setTimeout(r, 500));
    showToast({ type: "success", title: "Content saved", message: "Your changes have been saved locally" });
    setIsSaving(false);
  };

  const updateField = (section: SectionName, field: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: { ...(prev[section] as any), [field]: value },
    }));
  };

  const updateArrayItem = (section: SectionName, index: number, field: string, value: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: (prev[section] as any[]).map((item: any, i: number) =>
        i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const addArrayItem = (section: SectionName, template: any) => {
    setContent((prev) => ({
      ...prev,
      [section]: [...(prev[section] as any[]), template],
    }));
  };

  const removeArrayItem = (section: SectionName, index: number) => {
    setContent((prev) => ({
      ...prev,
      [section]: (prev[section] as any[]).filter((_: any, i: number) => i !== index),
    }));
  };

  const tabs: { key: SectionName; label: string }[] = [
    { key: "hero", label: "Hero" },
    { key: "cta", label: "CTA" },
    { key: "featuredProducts", label: "Products" },
    { key: "benefits", label: "Benefits" },
    { key: "processSteps", label: "Process" },
    { key: "testimonials", label: "Testimonials" },
    { key: "faq", label: "FAQ" },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "hero":
        return (
          <Card>
            <CardContent>
              <h2 className="font-heading font-semibold text-lg text-neutral-900 mb-4">Hero Section</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Badge Text" value={content.hero.badge} onChange={(e) => updateField("hero", "badge", e.target.value)} />
                <Input label="Title" value={content.hero.title} onChange={(e) => updateField("hero", "title", e.target.value)} />
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Subtitle</label>
                  <textarea value={content.hero.subtitle} onChange={(e) => updateField("hero", "subtitle", e.target.value)} rows={2} className="w-full rounded-md border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent resize-none" />
                </div>
                <Input label="Shop Button Text" value={content.hero.ctaShop} onChange={(e) => updateField("hero", "ctaShop", e.target.value)} />
                <Input label="Process Button Text" value={content.hero.ctaProcess} onChange={(e) => updateField("hero", "ctaProcess", e.target.value)} />
              </div>
            </CardContent>
          </Card>
        );

      case "cta":
        return (
          <Card>
            <CardContent>
              <h2 className="font-heading font-semibold text-lg text-neutral-900 mb-4">CTA Section</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Title</label>
                  <textarea value={content.cta.title} onChange={(e) => updateField("cta", "title", e.target.value)} rows={2} className="w-full rounded-md border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent resize-none" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-neutral-700 mb-1.5">Subtitle</label>
                  <textarea value={content.cta.subtitle} onChange={(e) => updateField("cta", "subtitle", e.target.value)} rows={2} className="w-full rounded-md border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent resize-none" />
                </div>
                <Input label="Shop Button Text" value={content.cta.ctaShop} onChange={(e) => updateField("cta", "ctaShop", e.target.value)} />
                <Input label="WhatsApp Button Text" value={content.cta.ctaWhatsApp} onChange={(e) => updateField("cta", "ctaWhatsApp", e.target.value)} />
              </div>
            </CardContent>
          </Card>
        );

      case "featuredProducts":
        return (
          <div className="space-y-3">
            {(content.featuredProducts as any[]).map((item: any, i: number) => (
              <Card key={i}>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-sm text-neutral-600">Product #{i + 1}</h3>
                    <button onClick={() => removeArrayItem("featuredProducts", i)} className="p-1.5 rounded-md hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <Input label="Name" value={item.name} onChange={(e) => updateArrayItem("featuredProducts", i, "name", e.target.value)} />
                    <Input label="Spice" value={item.spice} onChange={(e) => updateArrayItem("featuredProducts", i, "spice", e.target.value)} />
                    <Input label="Price" value={item.price} onChange={(e) => updateArrayItem("featuredProducts", i, "price", e.target.value)} />
                    <Input label="Weight" value={item.weight} onChange={(e) => updateArrayItem("featuredProducts", i, "weight", e.target.value)} />
                    <Input label="Badge" value={item.badge} onChange={(e) => updateArrayItem("featuredProducts", i, "badge", e.target.value)} />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => addArrayItem("featuredProducts", { name: "", spice: "", price: "", weight: "", badge: "" })}>
              Add Product
            </Button>
          </div>
        );

      case "benefits":
        return (
          <div className="space-y-3">
            {(content.benefits as any[]).map((item: any, i: number) => (
              <Card key={i}>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-sm text-neutral-600">{iconNameMap[item.icon] || "📦"} Benefit #{i + 1}</h3>
                    <button onClick={() => removeArrayItem("benefits", i)} className="p-1.5 rounded-md hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid gap-3">
                    <Input label="Icon Name" value={item.icon} onChange={(e) => updateArrayItem("benefits", i, "icon", e.target.value)} />
                    <Input label="Title" value={item.title} onChange={(e) => updateArrayItem("benefits", i, "title", e.target.value)} />
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Description</label>
                    <textarea value={item.description} onChange={(e) => updateArrayItem("benefits", i, "description", e.target.value)} rows={2} className="w-full rounded-md border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent resize-none" />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => addArrayItem("benefits", { icon: "Leaf", title: "", description: "" })}>
              Add Benefit
            </Button>
          </div>
        );

      case "processSteps":
        return (
          <div className="space-y-3">
            {(content.processSteps as any[]).map((item: any, i: number) => (
              <Card key={i}>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-sm text-neutral-600">Step #{i + 1}</h3>
                    <button onClick={() => removeArrayItem("processSteps", i)} className="p-1.5 rounded-md hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Input label="Step Number" value={item.step} onChange={(e) => updateArrayItem("processSteps", i, "step", e.target.value)} />
                    <Input label="Title" value={item.title} onChange={(e) => updateArrayItem("processSteps", i, "title", e.target.value)} />
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Description</label>
                      <textarea value={item.description} onChange={(e) => updateArrayItem("processSteps", i, "description", e.target.value)} rows={2} className="w-full rounded-md border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent resize-none" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => addArrayItem("processSteps", { step: "0" + (content.processSteps.length + 1), title: "", description: "" })}>
              Add Step
            </Button>
          </div>
        );

      case "testimonials":
        return (
          <div className="space-y-3">
            {(content.testimonials as any[]).map((item: any, i: number) => (
              <Card key={i}>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-sm text-neutral-600">Testimonial #{i + 1}</h3>
                    <button onClick={() => removeArrayItem("testimonials", i)} className="p-1.5 rounded-md hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid md:grid-cols-2 gap-3">
                    <Input label="Name" value={item.name} onChange={(e) => updateArrayItem("testimonials", i, "name", e.target.value)} />
                    <Input label="Location" value={item.location} onChange={(e) => updateArrayItem("testimonials", i, "location", e.target.value)} />
                    <Input label="Rating (1-5)" type="number" min={1} max={5} value={item.rating} onChange={(e) => updateArrayItem("testimonials", i, "rating", Number(e.target.value))} />
                    <Input label="Product" value={item.product} onChange={(e) => updateArrayItem("testimonials", i, "product", e.target.value)} />
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-neutral-700 mb-1.5">Review Text</label>
                      <textarea value={item.text} onChange={(e) => updateArrayItem("testimonials", i, "text", e.target.value)} rows={3} className="w-full rounded-md border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent resize-none" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => addArrayItem("testimonials", { name: "", location: "", rating: 5, text: "", product: "" })}>
              Add Testimonial
            </Button>
          </div>
        );

      case "faq":
        return (
          <div className="space-y-3">
            {(content.faq as any[]).map((item: any, i: number) => (
              <Card key={i}>
                <CardContent>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-sm text-neutral-600">FAQ #{i + 1}</h3>
                    <button onClick={() => removeArrayItem("faq", i)} className="p-1.5 rounded-md hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid gap-3">
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Question</label>
                    <textarea value={item.q} onChange={(e) => updateArrayItem("faq", i, "q", e.target.value)} rows={2} className="w-full rounded-md border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent resize-none" />
                    <label className="block text-sm font-medium text-neutral-700 mb-1.5">Answer</label>
                    <textarea value={item.a} onChange={(e) => updateArrayItem("faq", i, "a", e.target.value)} rows={3} className="w-full rounded-md border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent resize-none" />
                  </div>
                </CardContent>
              </Card>
            ))}
            <Button variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={() => addArrayItem("faq", { q: "", a: "" })}>
              Add FAQ
            </Button>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-semibold text-neutral-900">Content Editor</h1>
          <p className="text-sm text-neutral-500 mt-1">Manage homepage content and sections</p>
        </div>
        <Button variant="primary" size="sm" leftIcon={<Save className="w-4 h-4" />} onClick={saveContent} isLoading={isSaving}>
          Save All
        </Button>
      </div>

      <div className="flex gap-2 flex-wrap border-b border-neutral-200 pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveSection(tab.key)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              activeSection === tab.key
                ? "bg-accent text-white"
                : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-700"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {renderSection()}
    </div>
  );
}
