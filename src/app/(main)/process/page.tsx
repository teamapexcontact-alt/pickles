"use client";

import { Sun, Leaf, Heart, Clock, Award, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const steps = [
  {
    icon: Leaf,
    number: "01",
    title: "Select Premium Ingredients",
    description: "We start with the finest raw mangoes, fresh spices, and pure mustard oil sourced from trusted local farmers across Andhra Pradesh. Every ingredient is hand-picked for quality.",
  },
  {
    icon: Sun,
    number: "02",
    title: "Sun-Dried to Perfection",
    description: "Key ingredients are naturally sun-dried for 2-3 days. This traditional method enhances flavors and ensures the perfect texture that makes our pickles unique.",
  },
  {
    icon: Heart,
    number: "03",
    title: "Traditional Recipe Preparation",
    description: "Our master chefs prepare each batch using time-honored family recipes. The spice blend is freshly ground and mixed in precise proportions passed down through generations.",
  },
  {
    icon: Clock,
    number: "04",
    title: "Slow-Cooked & Matured",
    description: "The pickle mixture is slow-cooked and then left to mature in traditional earthen pots or ceramic jars. This natural aging process develops deep, complex flavors.",
  },
  {
    icon: Award,
    number: "05",
    title: "Quality Checked & Packed",
    description: "Each batch undergoes rigorous quality checks before being packed in premium, food-grade jars. We ensure every jar that leaves our kitchen meets our high standards.",
  },
];

export default function ProcessPage() {
  return (
    <div className="container-custom py-16">
      <div className="text-center mb-12">
        <h1 className="heading-2 mb-4">Our Pickle-Making Process</h1>
        <p className="text-lg text-neutral-500 max-w-2xl mx-auto">Every jar tells a story of tradition, patience, and love. Here&apos;s how we make our pickles.</p>
      </div>

      <div className="max-w-3xl mx-auto space-y-8">
        {steps.map((step, index) => (
          <div key={step.number} className="relative pl-16">
            <div className="absolute left-0 top-0 w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
              <step.icon className="w-6 h-6 text-accent" />
            </div>
            {index < steps.length - 1 && (
              <div className="absolute left-6 top-12 w-0.5 h-[calc(100%+1rem)] bg-gradient-to-b from-accent/20 to-transparent" />
            )}
            <div>
              <span className="text-sm font-bold text-accent">{step.number}</span>
              <h3 className="font-heading font-semibold text-xl text-neutral-900 mt-1 mb-2">{step.title}</h3>
              <p className="text-neutral-600 leading-relaxed">{step.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-16 p-8 rounded-lg border border-neutral-200 bg-neutral-50">
        <h2 className="heading-4 mb-2">Ready to taste the tradition?</h2>
        <p className="text-neutral-500 mb-6">Browse our collection and bring home authentic homemade pickles.</p>
        <Link href="/products"><Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>Explore Pickles</Button></Link>
      </div>
    </div>
  );
}
