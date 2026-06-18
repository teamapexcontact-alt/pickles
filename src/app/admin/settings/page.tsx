"use client";

import { useState } from "react";
import { Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { useToast } from "@/context/ToastContext";

export default function AdminSettings() {
  const { showToast } = useToast();
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState({
    storeName: "APEX Pickles",
    supportEmail: "support@apexpickles.com",
    supportPhone: "+91 9876543210",
    whatsappNumber: "919XXXXXXXXX",
    freeShippingThreshold: "499",
    shippingFee: "49",
    instagram: "https://instagram.com/apexpickles",
    facebook: "https://facebook.com/apexpickles",
    youtube: "https://youtube.com/@apexpickles",
    aboutText: "Bringing the authentic taste of traditional Andhra pickles to your doorstep.",
    deliveryDays: "3-5 business days",
  });

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((r) => setTimeout(r, 800));
    showToast({ type: "success", title: "Settings saved", message: "Business settings have been updated" });
    setIsSaving(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-semibold text-neutral-900">Settings</h1>
        <p className="text-sm text-neutral-500 mt-1">Manage your store settings and business information</p>
      </div>

      <Card>
        <CardContent>
          <h2 className="font-heading font-semibold text-lg text-neutral-900 mb-4">Store Information</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Store Name" value={settings.storeName} onChange={(e) => setSettings((s) => ({ ...s, storeName: e.target.value }))} />
            <Input label="Support Email" type="email" value={settings.supportEmail} onChange={(e) => setSettings((s) => ({ ...s, supportEmail: e.target.value }))} />
            <Input label="Support Phone" value={settings.supportPhone} onChange={(e) => setSettings((s) => ({ ...s, supportPhone: e.target.value }))} />
            <Input label="WhatsApp Number" value={settings.whatsappNumber} onChange={(e) => setSettings((s) => ({ ...s, whatsappNumber: e.target.value }))} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="font-heading font-semibold text-lg text-neutral-900 mb-4">Shipping</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Free Shipping Threshold (₹)" type="number" value={settings.freeShippingThreshold} onChange={(e) => setSettings((s) => ({ ...s, freeShippingThreshold: e.target.value }))} />
            <Input label="Standard Shipping Fee (₹)" type="number" value={settings.shippingFee} onChange={(e) => setSettings((s) => ({ ...s, shippingFee: e.target.value }))} />
            <Input label="Estimated Delivery Time" value={settings.deliveryDays} onChange={(e) => setSettings((s) => ({ ...s, deliveryDays: e.target.value }))} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="font-heading font-semibold text-lg text-neutral-900 mb-4">Social Media</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Input label="Instagram URL" value={settings.instagram} onChange={(e) => setSettings((s) => ({ ...s, instagram: e.target.value }))} />
            <Input label="Facebook URL" value={settings.facebook} onChange={(e) => setSettings((s) => ({ ...s, facebook: e.target.value }))} />
            <Input label="YouTube URL" value={settings.youtube} onChange={(e) => setSettings((s) => ({ ...s, youtube: e.target.value }))} />
          </div>
        </CardContent>
      </Card>

      <div className="flex items-center justify-end">
        <Button variant="primary" size="lg" leftIcon={<Save className="w-4 h-4" />} onClick={handleSave} isLoading={isSaving}>
          Save Settings
        </Button>
      </div>
    </div>
  );
}
