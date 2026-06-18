import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
  type DocumentData,
  type FirestoreDataConverter,
  type QueryConstraint,
} from "firebase/firestore";
import {
  Product,
  ProductVariant,
  ProductImage,
  Category,
  Order,
  OrderItem,
  OrderStatus,
  Review,
  Coupon,
  Address,
} from "@/types";

const converter = <T extends DocumentData>(): FirestoreDataConverter<T> => ({
  toFirestore: (data: T) => data,
  fromFirestore: (snap) => snap.data() as T,
});

const collections = {
  products: collection(db, "products").withConverter(converter<Product>()),
  categories: collection(db, "categories").withConverter(converter<Category>()),
  orders: collection(db, "orders").withConverter(converter<Order>()),
  reviews: collection(db, "reviews").withConverter(converter<Review>()),
  coupons: collection(db, "coupons").withConverter(converter<Coupon>()),
  addresses: collection(db, "addresses").withConverter(converter<Address>()),
};

export async function getProducts(filters?: {
  categoryId?: string;
  isActive?: boolean;
  featured?: boolean;
  search?: string;
  limitCount?: number;
}): Promise<Product[]> {
  const constraints: QueryConstraint[] = [];
  if (filters?.isActive !== undefined) {
    constraints.push(where("isActive", "==", filters.isActive));
  }
  if (filters?.featured !== undefined) {
    constraints.push(where("featured", "==", filters.featured));
  }
  if (filters?.categoryId) {
    constraints.push(where("categoryId", "==", filters.categoryId));
  }
  constraints.push(orderBy("createdAt", "desc"));
  if (filters?.limitCount) {
    constraints.push(limit(filters.limitCount));
  }
  const q = query(collections.products, ...constraints);
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getProductBySlug(slug: string): Promise<(Product & { id: string }) | null> {
  const q = query(collections.products, where("slug", "==", slug), limit(1));
  const snapshot = await getDocs(q);
  if (snapshot.empty) return null;
  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
}

export async function getProductById(id: string): Promise<(Product & { id: string }) | null> {
  const docRef = doc(db, "products", id).withConverter(converter<Product>());
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

export async function getProductVariants(productId: string): Promise<(ProductVariant & { id: string })[]> {
  const q = query(
    collection(db, "productVariants").withConverter(converter<ProductVariant>()),
    where("productId", "==", productId),
    where("isActive", "==", true),
    orderBy("weightGrams", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getProductImages(productId: string): Promise<(ProductImage & { id: string })[]> {
  const q = query(
    collection(db, "productImages").withConverter(converter<ProductImage>()),
    where("productId", "==", productId),
    orderBy("displayOrder", "asc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getCategories(): Promise<(Category & { id: string })[]> {
  const q = query(collections.categories, where("isActive", "==", true), orderBy("displayOrder", "asc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function createOrder(orderData: Omit<Order, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const docRef = await addDoc(collections.orders, {
    ...orderData,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function updateOrderStatus(orderId: string, status: OrderStatus, notes?: string): Promise<void> {
  const orderRef = doc(db, "orders", orderId);
  await updateDoc(orderRef, {
    status,
    updatedAt: Timestamp.now(),
  });
  if (notes) {
    await addDoc(collection(db, "orderStatusHistory"), {
      orderId,
      status,
      notes,
      createdBy: "admin",
      createdAt: Timestamp.now(),
    });
  }
}

export async function getUserOrders(userId: string): Promise<(Order & { id: string })[]> {
  const q = query(
    collections.orders,
    where("userId", "==", userId),
    orderBy("createdAt", "desc"),
    limit(20)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function getOrderById(orderId: string): Promise<(Order & { id: string }) | null> {
  const docRef = doc(db, "orders", orderId).withConverter(converter<Order>());
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
}

export async function getOrderItems(orderId: string): Promise<(OrderItem & { id: string })[]> {
  const q = query(
    collection(db, "orderItems").withConverter(converter<OrderItem>()),
    where("orderId", "==", orderId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function createReview(review: Omit<Review, "id" | "createdAt" | "updatedAt">): Promise<string> {
  const docRef = await addDoc(collections.reviews, {
    ...review,
    createdAt: Timestamp.now(),
    updatedAt: Timestamp.now(),
  });
  return docRef.id;
}

export async function getProductReviews(productId: string): Promise<(Review & { id: string })[]> {
  const q = query(
    collections.reviews,
    where("productId", "==", productId),
    orderBy("createdAt", "desc"),
    limit(20)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export async function validateCoupon(code: string, orderAmount: number): Promise<{ valid: boolean; discount?: number; message?: string }> {
  const q = query(
    collections.coupons,
    where("code", "==", code.toUpperCase()),
    where("isActive", "==", true),
    limit(1)
  );
  const snapshot = await getDocs(q);
  if (snapshot.empty) return { valid: false, message: "Invalid coupon code" };
  const coupon = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() as Coupon };
  const now = new Date();
  if (now < new Date(coupon.validFrom) || now > new Date(coupon.validTo)) {
    return { valid: false, message: "Coupon has expired" };
  }
  if (coupon.usedCount >= coupon.usageLimit) {
    return { valid: false, message: "Coupon usage limit reached" };
  }
  if (orderAmount < coupon.minOrderAmount) {
    return { valid: false, message: `Minimum order amount is ₹${coupon.minOrderAmount}` };
  }
  let discount = coupon.discountType === "percentage"
    ? Math.round(orderAmount * (coupon.discountValue / 100))
    : coupon.discountValue;
  if (coupon.maxDiscountAmount) {
    discount = Math.min(discount, coupon.maxDiscountAmount);
  }
  return { valid: true, discount };
}

export async function getUserAddresses(userId: string): Promise<(Address & { id: string })[]> {
  const q = query(collections.addresses, where("userId", "==", userId), orderBy("isDefault", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}