import mongoose, { Schema, Model } from 'mongoose';
import { PaymentMethod } from '@/types';

export interface IOrder {
  _id: string;
  listingId: Schema.Types.ObjectId;
  buyerId: Schema.Types.ObjectId;
  sellerId: Schema.Types.ObjectId;
  amount: number;
  paymentMethod: PaymentMethod;
  deliveryMethod: 'pickup' | 'delivery';
  deliveryAddress?: string;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
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
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentMethod: {
      type: String,
      enum: [
        'mtn-momo',
        'vodafone-cash',
        'airteltigo-money',
        'cash-on-delivery',
        'bank-transfer',
      ] as PaymentMethod[],
      required: true,
    },
    deliveryMethod: {
      type: String,
      enum: ['pickup', 'delivery'],
      required: true,
    },
    deliveryAddress: {
      type: String,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled'],
      default: 'pending',
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
