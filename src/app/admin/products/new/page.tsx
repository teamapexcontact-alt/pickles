"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { useToast } from "@/context/ToastContext";

const categories = [
  { value: "mango", label: "Mango Pickles" },
  { value: "gongura", label: "Gongura" },
  { value: "chicken", label: "Chicken Pickles" },
  { value: "prawn", label: "Prawn Pickles" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "spicy-specials", label: "Spicy Specials" },
];

const spiceLevels = [
  { value: "mild", label: "Mild" },
  { value: "medium", label: "Medium" },
  { value: "hot", label: "Hot" },
  { value: "extra-hot", label: "Extra Hot" },
];

interface VariantEntry {
  weightGrams: number;
  price: number;
  stockQuantity: number;
  sku: string;
}

export default function NewProductPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    slug: "",
    categoryId: "",
    description: "",
    ingredients: "",
    spiceLevel: "medium",
    shelfLifeDays: 180,
    isActive: true,
    featured: false,
  });
  const [variants, setVariants] = useState<VariantEntry[]>([
    { weightGrams: 200, price: 0, stockQuantity: 0, sku: "" },
    { weightGrams: 500, price: 0, stockQuantity: 0, sku: "" },
  ]);

  const generateSlug = (name: string) =>
    name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleNameChange = (name: string) => {
    setProduct((p) => ({ ...p, name, slug: generateSlug(name) }));
  };

  const addVariant = () =>
    setVariants((v) => [...v, { weightGrams: 0, price: 0, stockQuantity: 0, sku: "" }]);

  const removeVariant = (index: number) =>
    setVariants((v) => v.filter((_, i) => i !== index));

  const updateVariant = (index: number, field: keyof VariantEntry, value: string | number) =>
    setVariants((v) => v.map((item, i) => (i === index ? { ...item, [field]: value } : item)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 1000));
    showToast({ type: "success", title: "Product created", message: `${product.name} has been added` });
    setIsSaving(false);
    router.push("/admin/products");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/products" className="p-2 rounded-md hover:bg-neutral-100 transition-colors">
          <ArrowLeft className="w-5 h-5 text-neutral-500" />
        </Link>
        <div>
          <h1 className="text-2xl font-heading font-semibold text-neutral-900">New Product</h1>
          <p className="text-sm text-neutral-500 mt-1">Add a new product to your catalog</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardContent>
            <h2 className="font-heading font-semibold text-lg text-neutral-900 mb-4">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Input label="Product Name" value={product.name} onChange={(e) => handleNameChange(e.target.value)} required />
              <Input label="Slug" value={product.slug} onChange={(e) => setProduct((p) => ({ ...p, slug: e.target.value }))} required />
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Category</label>
                <select
                  value={product.categoryId}
                  onChange={(e) => setProduct((p) => ({ ...p, categoryId: e.target.value }))}
                  className="w-full rounded-md border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 bg-white focus:outline-none focus:border-accent"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-1.5">Spice Level</label>
                <select
                  value={product.spiceLevel}
                  onChange={(e) => setProduct((p) => ({ ...p, spiceLevel: e.target.value }))}
                  className="w-full rounded-md border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 bg-white focus:outline-none focus:border-accent"
                >
                  {spiceLevels.map((s) => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <Input label="Shelf Life (days)" type="number" value={product.shelfLifeDays} onChange={(e) => setProduct((p) => ({ ...p, shelfLifeDays: Number(e.target.value) }))} />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Description</label>
              <textarea
                value={product.description}
                onChange={(e) => setProduct((p) => ({ ...p, description: e.target.value }))}
                rows={3}
                className="w-full rounded-md border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent resize-none"
                placeholder="Describe your product..."
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Ingredients (comma separated)</label>
              <textarea
                value={product.ingredients}
                onChange={(e) => setProduct((p) => ({ ...p, ingredients: e.target.value }))}
                rows={2}
                className="w-full rounded-md border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent resize-none"
                placeholder="Mustard oil, mango, red chili, fenugreek..."
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-neutral-700 mb-1.5">Process Description (optional)</label>
              <textarea
                value={product.processDescription}
                onChange={(e) => setProduct((p) => ({ ...p, processDescription: e.target.value }))}
                rows={2}
                className="w-full rounded-md border border-neutral-200 px-4 py-2.5 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-accent resize-none"
                placeholder="How this pickle is traditionally made..."
              />
            </div>
            <div className="flex items-center gap-6 mt-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={product.isActive} onChange={(e) => setProduct((p) => ({ ...p, isActive: e.target.checked }))} className="rounded border-neutral-200 text-accent focus:ring-accent" />
                <span className="text-sm text-neutral-700">Active</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={product.featured} onChange={(e) => setProduct((p) => ({ ...p, featured: e.target.checked }))} className="rounded border-neutral-200 text-accent focus:ring-accent" />
                <span className="text-sm text-neutral-700">Featured</span>
              </label>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-heading font-semibold text-lg text-neutral-900">Variants</h2>
              <Button type="button" variant="secondary" size="sm" leftIcon={<Plus className="w-4 h-4" />} onClick={addVariant}>
                Add Variant
              </Button>
            </div>
            <div className="space-y-3">
              {variants.map((variant, i) => (
                <div key={i} className="flex items-end gap-3 p-3 rounded-md bg-neutral-50">
                  <Input label="Weight (g)" type="number" value={variant.weightGrams} onChange={(e) => updateVariant(i, "weightGrams", Number(e.target.value))} />
                  <Input label="Price (₹)" type="number" value={variant.price} onChange={(e) => updateVariant(i, "price", Number(e.target.value))} />
                  <Input label="Stock" type="number" value={variant.stockQuantity} onChange={(e) => updateVariant(i, "stockQuantity", Number(e.target.value))} />
                  <Input label="SKU" value={variant.sku} onChange={(e) => updateVariant(i, "sku", e.target.value)} />
                  {variants.length > 1 && (
                    <button type="button" onClick={() => removeVariant(i)} className="p-2.5 rounded-md hover:bg-red-50 text-neutral-400 hover:text-red-600 transition-colors mb-0.5">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-end gap-3">
          <Link href="/admin/products">
            <Button type="button" variant="ghost" size="lg">Cancel</Button>
          </Link>
          <Button type="submit" variant="primary" size="lg" leftIcon={<Save className="w-4 h-4" />} isLoading={isSaving}>
            Save Product
          </Button>
        </div>
      </form>
    </div>
  );
}
