"use client";

import { Fragment, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, ShoppingBag, Trash2, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";

export function CartDrawer() {
  const { items, itemCount, subtotal, cartOpen, closeCart, removeItem, updateQuantity, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [cartOpen]);

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-neutral-900/60 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-100">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-brand-600" />
                <span className="text-base font-semibold text-neutral-900">Your Cart</span>
                {itemCount > 0 && (
                  <span className="text-sm text-neutral-500">({itemCount})</span>
                )}
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="p-2 rounded-full hover:bg-neutral-100 transition-colors"
              >
                <X className="w-5 h-5 text-neutral-500" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center px-5 text-center">
                <ShoppingBag className="w-16 h-16 text-neutral-200 mb-4" />
                <p className="text-neutral-900 font-medium mb-1">Your cart is empty</p>
                <p className="text-sm text-neutral-500 mb-6">Add some pickles to get started!</p>
                <Button variant="primary" onClick={closeCart}>
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={item.productVariantId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                        className="flex gap-4 py-4 border-b border-neutral-100"
                      >
                        <div className="w-16 h-16 rounded-xl bg-neutral-100 flex-shrink-0 overflow-hidden">
                          {item.product.image ? (
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" loading="lazy" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-300 text-xs">No img</div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-neutral-900 truncate">{item.product.name}</h4>
                          <p className="text-xs text-neutral-500 mt-0.5">{item.variant.size} · qty: {item.quantity}</p>
                          <p className="text-sm font-semibold text-brand-600 mt-1">{formatCurrency(item.variant.price * item.quantity)}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <button onClick={() => updateQuantity(item.productVariantId, item.quantity - 1)}
                              className="p-1 rounded-md hover:bg-neutral-100 text-neutral-500 transition-colors">
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.productVariantId, item.quantity + 1)}
                              className="p-1 rounded-md hover:bg-neutral-100 text-neutral-500 transition-colors">
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                            <button onClick={() => removeItem(item.productVariantId)}
                              className="p-1 rounded-md hover:bg-brand-50 text-neutral-400 hover:text-brand-500 ml-auto transition-colors">
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                <div className="border-t border-neutral-100 px-5 py-4 space-y-3 bg-white">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-neutral-600">Subtotal</span>
                    <span className="font-semibold text-neutral-900">{formatCurrency(subtotal)}</span>
                  </div>
                  <p className="text-xs text-neutral-400">Shipping calculated at checkout</p>
                  <Button variant="primary" fullWidth size="lg" onClick={handleCheckout}>
                    Checkout · {formatCurrency(subtotal)}
                  </Button>
                  <button onClick={closeCart}
                    className="w-full text-center text-sm text-neutral-500 hover:text-brand-600 transition-colors">
                    Continue shopping
                  </button>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
