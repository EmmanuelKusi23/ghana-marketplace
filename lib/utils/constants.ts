import { GhanaLocation, Category } from '@/types';

export const GHANA_LOCATIONS: GhanaLocation[] = [
  'Accra',
  'Kumasi',
  'Takoradi',
  'Tamale',
  'Cape Coast',
  'Tema',
  'Ashaiman',
  'Sunyani',
  'Koforidua',
  'Obuasi',
  'Techiman',
  'Ho',
  'Other',
];

export const CATEGORIES: Category[] = [
  {
    id: 'clothing',
    name: 'Clothing',
    icon: 'Shirt',
    subcategories: [
      'Men\'s Clothing',
      'Women\'s Clothing',
      'Kids\' Clothing',
      'Traditional Wear',
      'Sportswear',
    ],
    count: 0,
  },
  {
    id: 'shoes',
    name: 'Shoes & Footwear',
    icon: 'ShoppingBag',
    subcategories: [
      'Men\'s Shoes',
      'Women\'s Shoes',
      'Kids\' Shoes',
      'Sneakers',
      'Sandals',
      'Formal Shoes',
    ],
    count: 0,
  },
  {
    id: 'accessories',
    name: 'Accessories',
    icon: 'Watch',
    subcategories: [
      'Bags',
      'Watches',
      'Jewelry',
      'Sunglasses',
      'Belts',
      'Hats & Caps',
    ],
    count: 0,
  },
  {
    id: 'electronics',
    name: 'Electronics',
    icon: 'Smartphone',
    subcategories: [
      'Phones & Tablets',
      'Laptops',
      'Headphones',
      'Speakers',
      'Chargers & Cables',
      'Smart Watches',
    ],
    count: 0,
  },
  {
    id: 'home',
    name: 'Home & Living',
    icon: 'Home',
    subcategories: [
      'Furniture',
      'Kitchen Items',
      'Decor',
      'Bedding',
      'Appliances',
    ],
    count: 0,
  },
  {
    id: 'books',
    name: 'Books & Media',
    icon: 'BookOpen',
    subcategories: [
      'Textbooks',
      'Novels',
      'Comics',
      'DVDs',
      'Video Games',
    ],
    count: 0,
  },
];

export const PAYMENT_METHODS = [
  {
    id: 'mtn-momo',
    name: 'MTN Mobile Money',
    icon: '📱',
    description: 'Pay with MTN MoMo',
  },
  {
    id: 'vodafone-cash',
    name: 'Vodafone Cash',
    icon: '💳',
    description: 'Pay with Vodafone Cash',
  },
  {
    id: 'airteltigo-money',
    name: 'AirtelTigo Money',
    icon: '💰',
    description: 'Pay with AirtelTigo Money',
  },
  {
    id: 'cash-on-delivery',
    name: 'Cash on Delivery',
    icon: '💵',
    description: 'Pay when you receive the item',
  },
  {
    id: 'bank-transfer',
    name: 'Bank Transfer',
    icon: '🏦',
    description: 'Direct bank transfer',
  },
];

export const CONDITIONS = [
  { value: 'new', label: 'Brand New', description: 'Never used, with tags' },
  { value: 'like-new', label: 'Like New', description: 'Used once or twice' },
  { value: 'good', label: 'Good', description: 'Used but well maintained' },
  { value: 'fair', label: 'Fair', description: 'Used with minor wear' },
  { value: 'poor', label: 'Poor', description: 'Heavily used, needs repair' },
];
