/**
 * Application-wide constants
 */

export const APP_NAME = 'PetCareShop';
export const APP_DESCRIPTION = 'Chuyên Gia Làm Đẹp, Lưu Trú & Chăm Sóc Thú Y';

export const ROUTES = {
  // Auth
  LOGIN: '/login',
  REGISTER: '/register',

  // Customer
  HOME: '/home',
  SERVICES: '/services',
  SHOP: '/shop',
  BOOKING: '/booking',
  PROFILE: '/profile',

  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
  ADMIN_CUSTOMERS: '/admin/customers',
  ADMIN_BOOKINGS: '/admin/bookings',
  ADMIN_SERVICES: '/admin/services',
  ADMIN_PRODUCTS: '/admin/products',
  ADMIN_ANALYTICS: '/admin/analytics',
  ADMIN_SETTINGS: '/admin/settings',
} as const;

export const COLORS = {
  primary: '#13ec13',
  accentOrange: '#ff9f43',
  accentTeal: '#0fb9b1',
  background: '#f6f8f6',
  backgroundDark: '#102210',
  text: '#111811',
} as const;
