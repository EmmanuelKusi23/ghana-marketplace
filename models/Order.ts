import mongoose, { Schema, Model } from 'mongoose';
import { PaymentMethod, OrderStatus } from '@/types';

export interface IOrder {
  _id: string;
  listingId: Schema.Types.ObjectId;
  buyerId: Schema.Types.ObjectId;
  sellerId: Schema.Types.ObjectId;
  courierId?: Schema.Types.ObjectId;

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
  statusHistory: Array<{
    status: OrderStatus;
    timestamp: Date;
    updatedBy: string;
    notes?: string;
  }>;

  // Auto-confirmation
  deliveryConfirmationDeadline?: Date;
  autoConfirmed: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    listingId: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
      required: true,
    },
    buyerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    courierId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },

    // Pricing
    itemPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    deliveryFee: {
      type: Number,
      required: true,
      default: 0,
    },
    platformCommission: {
      type: Number,
      required: true,
      default: 0,
    },
    totalAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Payment & Escrow
    paymentMethod: {
      type: String,
      enum: ['mtn-momo', 'vodafone-cash', 'airteltigo-money', 'cash-on-delivery', 'bank-transfer'] as PaymentMethod[],
      required: true,
    },
    escrowStatus: {
      type: String,
      enum: ['held', 'released', 'refunded'],
      default: 'held',
    },
    escrowAmount: {
      type: Number,
      required: true,
      min: 0,
    },

    // Delivery
    deliveryAddress: {
      type: String,
      required: true,
    },
    pickupAddress: {
      type: String,
      required: true,
    },

    // Verification Codes
    pickupCode: {
      type: String,
      required: true,
    },
    deliveryCode: {
      type: String,
      required: true,
    },

    // Status & Timeline
    status: {
      type: String,
      enum: ['pending', 'paid', 'courier-assigned', 'picked-up', 'in-transit', 'delivered', 'completed', 'disputed', 'refunded', 'cancelled'] as OrderStatus[],
      default: 'pending',
    },
    statusHistory: [
      {
        status: {
          type: String,
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        updatedBy: {
          type: String,
          required: true,
        },
        notes: String,
      },
    ],

    // Auto-confirmation
    deliveryConfirmationDeadline: {
      type: Date,
    },
    autoConfirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

OrderSchema.index({ buyerId: 1 });
OrderSchema.index({ sellerId: 1 });
OrderSchema.index({ status: 1 });
OrderSchema.index({ createdAt: -1 });

const OrderModel: Model<IOrder> =
  mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default OrderModel;
