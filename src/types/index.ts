export type WithId<T> = T & { id: string };

export interface User {
  uid: string;
  email: string | null;
  phoneNumber: string | null;
  displayName: string | null;
  photoURL: string | null;
  role: 'customer' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}

export interface Address {
  userId: string;
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Product {
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  ingredients: string[];
  spiceLevel: 'mild' | 'medium' | 'hot' | 'extra-hot';
  shelfLifeDays: number;
  processDescription?: string;
  isActive: boolean;
  featured: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductVariant {
  productId: string;
  weightGrams: number;
  price: number;
  stockQuantity: number;
  sku: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProductImage {
  productId: string;
  url: string;
  altText?: string;
  displayOrder: number;
  createdAt: Date;
}

export interface Order {
  userId: string;
  orderNumber: string;
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  paymentStatus: PaymentStatus;
  paymentId?: string;
  shippingAddressId: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type OrderStatus = 
  | 'placed'
  | 'preparing'
  | 'packed'
  | 'shipped'
  | 'out_for_delivery'
  | 'delivered'
  | 'cancelled'
  | 'returned';

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded' | 'partial';

export interface OrderItem {
  orderId: string;
  productVariantId: string;
  quantity: number;
  price: number;
  productName: string;
  variantWeight: number;
  createdAt: Date;
}

export interface OrderStatusHistory {
  orderId: string;
  status: OrderStatus;
  notes?: string;
  createdBy: string;
  createdAt: Date;
}

export interface Review {
  productId: string;
  userId: string;
  rating: number;
  title?: string;
  content?: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrderAmount: number;
  maxDiscountAmount?: number;
  usageLimit: number;
  usedCount: number;
  validFrom: Date;
  validTo: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CartItem {
  productVariantId: string;
  quantity: number;
  product: Product & { id: string };
  variant: ProductVariant & { id: string };
}

export interface ShippingAddress {
  name: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface CheckoutData {
  shippingAddress: ShippingAddress;
  phone: string;
  email?: string;
  notes?: string;
  couponCode?: string;
}

export interface RazorpayOrder {
  id: string;
  amount: number;
  currency: string;
  receipt: string;
  status: string;
  created_at: number;
}

export interface PaymentVerification {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}