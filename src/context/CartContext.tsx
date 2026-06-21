"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { CartItem, Product, ProductVariant, type WithId } from "@/types";

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: WithId<Product>, variant: WithId<ProductVariant>, quantity?: number) => void;
  removeItem: (productVariantId: string) => void;
  updateQuantity: (productVariantId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productVariantId: string) => number;
  isInCart: (productVariantId: string) => boolean;
  cartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "apex-pickles-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [initialized, setInitialized] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setItems(parsed);
      }
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
    } finally {
      setInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (initialized) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, initialized]);

  const addItem = useCallback((product: WithId<Product>, variant: WithId<ProductVariant>, quantity = 1) => {
    setItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.productVariantId === variant.id);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { productVariantId: variant.id, quantity, product, variant }];
    });
    setCartOpen(true);
  }, []);

  const removeItem = useCallback((productVariantId: string) => {
    setItems((prev) => prev.filter((item) => item.productVariantId !== productVariantId));
  }, []);

  const updateQuantity = useCallback((productVariantId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productVariantId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productVariantId === productVariantId ? { ...item, quantity } : item
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getItemQuantity = useCallback((productVariantId: string) => {
    const item = items.find((item) => item.productVariantId === productVariantId);
    return item?.quantity || 0;
  }, [items]);

  const isInCart = useCallback((productVariantId: string) => {
    return items.some((item) => item.productVariantId === productVariantId);
  }, [items]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.variant.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        getItemQuantity,
        isInCart,
        cartOpen,
        openCart: () => setCartOpen(true),
        closeCart: () => setCartOpen(false),
        toggleCart: () => setCartOpen((prev) => !prev),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
