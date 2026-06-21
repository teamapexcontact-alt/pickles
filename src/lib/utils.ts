import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function formatDateTime(date: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function generateOrderNumber(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `PKL-${timestamp}-${random}`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function getSpiceLevelColor(level: string): string {
  const colors: Record<string, string> = {
    mild: 'bg-herb-100 text-herb-800',
    medium: 'bg-gold-100 text-gold-800',
    hot: 'bg-brand-100 text-brand-800',
    'extra-hot': 'bg-brand-200 text-brand-900',
  };
  return colors[level] || 'bg-gray-100 text-gray-800';
}

export function getOrderStatusColor(status: string): string {
  const colors: Record<string, string> = {
    placed: 'bg-blue-100 text-blue-800',
    preparing: 'bg-gold-100 text-gold-800',
    packed: 'bg-herb-100 text-herb-800',
    shipped: 'bg-sky-100 text-sky-800',
    out_for_delivery: 'bg-gold-100 text-gold-800',
    delivered: 'bg-herb-100 text-herb-800',
    cancelled: 'bg-brand-100 text-brand-800',
    returned: 'bg-neutral-100 text-neutral-800',
  };
  return colors[status] || 'bg-neutral-100 text-neutral-800';
}

export function getOrderStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    placed: 'Order Placed',
    preparing: 'Preparing',
    packed: 'Packed',
    shipped: 'Shipped',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    cancelled: 'Cancelled',
    returned: 'Returned',
  };
  return labels[status] || status;
}

export function getPaymentStatusColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-gold-100 text-gold-800',
    paid: 'bg-herb-100 text-herb-800',
    failed: 'bg-brand-100 text-brand-800',
    refunded: 'bg-blue-100 text-blue-800',
    partial: 'bg-gold-100 text-gold-800',
  };
  return colors[status] || 'bg-neutral-100 text-neutral-800';
}