import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ClientProviders } from "./ClientProviders";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "APEX Pickles - Premium Homemade Pickles Online",
    template: "%s | APEX Pickles",
  },
  description: "Authentic homemade pickles made with traditional recipes. Mango, Gongura, Chicken, Prawn pickles and more. Order online for delivery across India.",
  keywords: ["homemade pickles", "andhra pickles", "telugu pickles", "mango pickle online", "gongura pickle", "chicken pickle", "prawn pickle", "traditional pickles"],
  authors: [{ name: "APEX Pickles" }],
  creator: "APEX Pickles",
  publisher: "APEX Pickles",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://apexpickles.com"),
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://apexpickles.com",
    siteName: "APEX Pickles",
    title: "APEX Pickles - Premium Homemade Pickles Online",
    description: "Authentic homemade pickles made with traditional recipes. Order online for delivery across India.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "APEX Pickles - Premium Homemade Pickles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "APEX Pickles - Premium Homemade Pickles Online",
    description: "Authentic homemade pickles made with traditional recipes. Order online for delivery across India.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#8B1A1A",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} h-full antialiased`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://firebasestorage.googleapis.com" />
      </head>
      <body className="min-h-full flex flex-col"><ClientProviders>{children}</ClientProviders></body>
    </html>
  );
}