// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  profileImage?: string;
  joinDate: Date;
  role: 'buyer' | 'seller' | 'admin';
  verified: boolean;
}

// Listing Types
export type ListingCondition = 'new' | 'like-new' | 'good' | 'fair' | 'poor';
export type ListingStatus = 'active' | 'sold' | 'pending' | 'flagged';

export interface Listing {
  id: string;
  sellerId: string;
  seller?: User;
  title: string;
  description: string;
  price: number;
  category: string;
  subcategory?: string;
  condition: ListingCondition;
  images: string[];
  location: string;
  status: ListingStatus;
  views: number;
  favorites: number;
  createdAt: Date;
  updatedAt: Date;
}

// Message Types
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  listingId?: string;
  message: string;
  read: boolean;
  timestamp: Date;
}

export interface Conversation {
  id: string;
  participants: User[];
  lastMessage: Message;
  listing?: Listing;
  unreadCount: number;
}

// Category Types
export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
  count: number;
}

// Ghana-specific Types
export type GhanaLocation =
  | 'Accra'
  | 'Kumasi'
  | 'Takoradi'
  | 'Tamale'
  | 'Cape Coast'
  | 'Tema'
  | 'Ashaiman'
  | 'Sunyani'
  | 'Koforidua'
  | 'Obuasi'
  | 'Techiman'
  | 'Ho'
  | 'Other';

export type PaymentMethod =
  | 'mtn-momo'
  | 'vodafone-cash'
  | 'airteltigo-money'
  | 'cash-on-delivery'
  | 'bank-transfer';

export interface Payment {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  method: PaymentMethod;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  reference: string;
  timestamp: Date;
}

// Order Types
export interface Order {
  id: string;
  listingId: string;
  listing?: Listing;
  buyerId: string;
  buyer?: User;
  sellerId: string;
  seller?: User;
  amount: number;
  paymentMethod: PaymentMethod;
  deliveryMethod: 'pickup' | 'delivery';
  deliveryAddress?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date;
  updatedAt: Date;
}

// Filter Types
export interface MarketplaceFilters {
  category?: string;
  subcategory?: string;
  location?: GhanaLocation;
  condition?: ListingCondition;
  minPrice?: number;
  maxPrice?: number;
  searchQuery?: string;
  sortBy?: 'recent' | 'price-low' | 'price-high' | 'popular';
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Analytics Types (for Admin Dashboard)
export interface DashboardStats {
  totalUsers: number;
  totalListings: number;
  totalOrders: number;
  totalRevenue: number;
  activeListings: number;
  soldListings: number;
  flaggedListings: number;
  newUsersThisMonth: number;
  ordersThisMonth: number;
  revenueThisMonth: number;
}
