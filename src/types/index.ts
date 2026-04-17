/**
 * Shared TypeScript types and interfaces
 */

// ─── User & Auth ──────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: 'customer' | 'admin';
  avatar?: string;
  createdAt: string;
}

// ─── Pet ──────────────────────────────────────────────────
export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: 'dog' | 'cat' | 'other';
  breed?: string;
  age?: number;
  weight?: number;
  avatar?: string;
  notes?: string;
}

// ─── Service ──────────────────────────────────────────────
export type ServiceCategory = 'grooming' | 'hotel' | 'vet' | 'training';

export interface Service {
  id: string;
  name: string;
  category: ServiceCategory;
  description: string;
  price: number;
  duration: number; // in minutes
  isActive: boolean;
}

// ─── Booking ──────────────────────────────────────────────
export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  customerId: string;
  petId: string;
  serviceId: string;
  status: BookingStatus;
  scheduledAt: string;
  notes?: string;
  totalPrice: number;
  createdAt: string;
}

// ─── Product ──────────────────────────────────────────────
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  stock: number;
  images: string[];
  isActive: boolean;
}

// ─── API Response Wrapper ─────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
}
