export const businessConfig = {
  company: {
    name: "APEX Pickles",
    shortName: "APEX",
    tagline: "Taste of Tradition",
    description: "Authentic homemade pickles crafted from generations-old recipes.",
    founded: 2024,
  },

  contact: {
    email: "hello@apexpickles.com",
    phone: "+91 9876543210",
    whatsapp: "919XXXXXXXXX",
    address: {
      line1: "123, Traditional Foods Colony",
      line2: "Andhra Pradesh, India",
      pincode: "500001",
    },
  },

  social: {
    instagram: "https://instagram.com/apexpickles",
    facebook: "https://facebook.com/apexpickles",
    youtube: "https://youtube.com/@apexpickles",
    twitter: "https://twitter.com/apexpickles",
  },

  shipping: {
    freeShippingThreshold: 499,
    standardFee: 49,
    estimatedDays: "3-5 business days",
  },

  branding: {
    primaryColor: "#8B1A1A",
    secondaryColor: "#E85D2C",
    logo: "/logo.png",
    favicon: "/favicon.ico",
  },

  hero: {
    badge: "Authentic Homemade Pickles",
    title: "Taste of Tradition",
    subtitle: "Discover authentic homemade pickles crafted from generations-old recipes. Every jar brings the taste of traditional Andhra kitchens to your table.",
    ctaShop: "Shop Now",
    ctaProcess: "Our Process",
  },

  footer: {
    description: "Bringing the authentic taste of traditional Andhra pickles to your doorstep. Made with love, just like grandmother used to make.",
    copyright: `© ${new Date().getFullYear()} APEX Pickles. All rights reserved.`,
  },

  seo: {
    title: "APEX Pickles - Authentic Homemade Pickles",
    description: "Discover authentic homemade pickles crafted from generations-old recipes. Traditional Andhra pickles delivered to your doorstep.",
  },
};

export type BusinessConfig = typeof businessConfig;