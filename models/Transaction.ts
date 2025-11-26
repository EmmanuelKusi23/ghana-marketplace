import mongoose, { Schema, Model } from 'mongoose';

export interface ITransaction {
  _id: string;
  orderId: Schema.Types.ObjectId;
  type: 'escrow-hold' | 'platform-commission' | 'courier-payment' | 'seller-payout' | 'refund';
  amount: number;
  fromUserId?: Schema.Types.ObjectId;
  toUserId?: Schema.Types.ObjectId;
  status: 'pending' | 'completed' | 'failed';
  reference: string;
  description: string;
  createdAt: Date;
  completedAt?: Date;
}

const TransactionSchema = new Schema<ITransaction>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    type: {
      type: String,
      enum: ['escrow-hold', 'platform-commission', 'courier-payment', 'seller-payout', 'refund'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    fromUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    toUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed'],
      default: 'pending',
    },
    reference: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    completedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

TransactionSchema.index({ orderId: 1 });
TransactionSchema.index({ reference: 1 });
TransactionSchema.index({ type: 1 });
TransactionSchema.index({ status: 1 });

const TransactionModel: Model<ITransaction> =
  mongoose.models.Transaction || mongoose.model<ITransaction>('Transaction', TransactionSchema);

export default TransactionModel;
