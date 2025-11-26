// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  profileImage?: string;
  joinDate: Date;
  role: 'buyer' | 'seller' | 'admin' | 'courier';
  verified: boolean;
  rating?: number;
  totalRatings?: number;
  strikes?: number;
  banned?: boolean;
}

// Courier Types
export interface Courier extends User {
  role: 'courier';
  vehicleType?: string;
  licenseNumber?: string;
  activeDeliveries: number;
  completedDeliveries: number;
  courierRating: number;
  availabilityStatus: 'available' | 'busy' | 'offline';
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

// Order Types with Escrow
export type OrderStatus =
  | 'pending'           // Order placed, awaiting payment
  | 'paid'              // Payment in escrow
  | 'courier-assigned'  // Courier assigned
  | 'picked-up'         // Item picked up from seller
  | 'in-transit'        // Out for delivery
  | 'delivered'         // Delivered to buyer
  | 'completed'         // Confirmed by buyer/auto-confirmed
  | 'disputed'          // Under dispute
  | 'refunded'          // Refunded to buyer
  | 'cancelled';        // Cancelled

export interface Order {
  id: string;
  listingId: string;
  listing?: Listing;
  buyerId: string;
  buyer?: User;
  sellerId: string;
  seller?: User;
  courierId?: string;
  courier?: Courier;

  // Pricing
  itemPrice: number;
  deliveryFee: number;
  platformCommission: number;
  totalAmount: number;

  // Payment & Escrow
  paymentMethod: PaymentMethod;
  escrowStatus: 'held' | 'released' | 'refunded';
  escrowAmount: number;

  // Delivery
  deliveryAddress: string;
  pickupAddress: string;

  // Verification Codes
  pickupCode: string;
  deliveryCode: string;

  // Status & Timeline
  status: OrderStatus;
  statusHistory: StatusUpdate[];

  // Auto-confirmation
  deliveryConfirmationDeadline?: Date;
  autoConfirmed: boolean;

  createdAt: Date;
  updatedAt: Date;
}

export interface StatusUpdate {
  status: OrderStatus;
  timestamp: Date;
  updatedBy: string;
  notes?: string;
}

// Verification Types
export interface VerificationProof {
  id: string;
  orderId: string;
  type: 'pickup' | 'delivery';
  photos: string[];
  gpsCoordinates: GPSCoordinates;
  timestamp: Date;
  verifiedBy: string;
  code: string;
  confirmed: boolean;
}

export interface GPSCoordinates {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

// Dispute Types
export type DisputeStatus = 'open' | 'under-review' | 'resolved-refund' | 'resolved-release' | 'resolved-partial';

export interface Dispute {
  id: string;
  orderId: string;
  order?: Order;
  raisedBy: string;
  raiser?: User;
  reason: string;
  description: string;
  evidencePhotos: string[];
  status: DisputeStatus;
  adminNotes?: string;
  resolution?: DisputeResolution;
  createdAt: Date;
  resolvedAt?: Date;
  resolvedBy?: string;
}

export interface DisputeResolution {
  decision: 'refund-buyer' | 'release-seller' | 'partial-refund';
  refundAmount?: number;
  penaltyApplied?: Penalty;
  notes: string;
}

export interface Penalty {
  userId: string;
  type: 'warning' | 'strike' | 'ban';
  reason: string;
  appliedAt: Date;
}

// Transaction & Payout Types
export interface Transaction {
  id: string;
  orderId: string;
  type: 'escrow-hold' | 'platform-commission' | 'courier-payment' | 'seller-payout' | 'refund';
  amount: number;
  fromUserId?: string;
  toUserId?: string;
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  description: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface Payout {
  orderId: string;
  sellerId: string;
  courierId: string;
  itemPrice: number;
  deliveryFee: number;
  platformCommission: number;
  sellerPayout: number;
  courierPayout: number;
  platformEarnings: number;
  timestamp: Date;
}

// Rating System
export interface Rating {
  id: string;
  orderId: string;
  raterId: string;
  ratedUserId: string;
  rating: number; // 1-5
  review?: string;
  type: 'buyer-to-seller' | 'seller-to-buyer' | 'buyer-to-courier' | 'seller-to-courier';
  createdAt: Date;
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
