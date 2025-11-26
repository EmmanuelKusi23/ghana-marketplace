// Verification Code Generation and Validation

/**
 * Generate a unique 6-digit verification code
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

/**
 * Generate a unique reference for transactions
 */
export function generateTransactionReference(prefix: string = 'TXN'): string {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${prefix}-${timestamp}-${random}`;
}

/**
 * Validate verification code format
 */
export function isValidVerificationCode(code: string): boolean {
  return /^\d{6}$/.test(code);
}

/**
 * Calculate delivery confirmation deadline (4 hours from delivery)
 */
export function calculateConfirmationDeadline(deliveryTime: Date = new Date()): Date {
  const deadline = new Date(deliveryTime);
  deadline.setHours(deadline.getHours() + 4);
  return deadline;
}

/**
 * Check if auto-confirmation period has passed
 */
export function shouldAutoConfirm(deadline: Date): boolean {
  return new Date() > deadline;
}

/**
 * Calculate platform fees
 */
export interface FeeCalculation {
  itemPrice: number;
  deliveryFee: number;
  platformCommission: number;
  totalAmount: number;
  sellerPayout: number;
  courierPayout: number;
  platformEarnings: number;
}

export function calculateFees(
  itemPrice: number,
  deliveryFee: number = 20,
  commissionRate: number = 0.05 // 5% commission
): FeeCalculation {
  const platformCommission = itemPrice * commissionRate;
  const totalAmount = itemPrice + deliveryFee;
  const sellerPayout = itemPrice - platformCommission;
  const courierPayout = deliveryFee;
  const platformEarnings = platformCommission;

  return {
    itemPrice,
    deliveryFee,
    platformCommission,
    totalAmount,
    sellerPayout,
    courierPayout,
    platformEarnings,
  };
}

/**
 * Validate GPS coordinates
 */
export function isValidGPSCoordinates(
  latitude: number,
  longitude: number
): boolean {
  return (
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  );
}

/**
 * Calculate distance between two GPS points (Haversine formula)
 * Returns distance in kilometers
 */
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return Math.round(distance * 100) / 100; // Round to 2 decimal places
}
