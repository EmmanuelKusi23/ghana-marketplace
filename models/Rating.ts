import mongoose, { Schema, Model } from 'mongoose';

export interface IRating {
  _id: string;
  orderId: Schema.Types.ObjectId;
  raterId: Schema.Types.ObjectId;
  ratedUserId: Schema.Types.ObjectId;
  rating: number;
  review?: string;
  type: 'buyer-to-seller' | 'seller-to-buyer' | 'buyer-to-courier' | 'seller-to-courier';
  createdAt: Date;
}

const RatingSchema = new Schema<IRating>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    raterId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    ratedUserId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    review: {
      type: String,
      maxlength: 500,
    },
    type: {
      type: String,
      enum: ['buyer-to-seller', 'seller-to-buyer', 'buyer-to-courier', 'seller-to-courier'],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

RatingSchema.index({ orderId: 1 });
RatingSchema.index({ raterId: 1 });
RatingSchema.index({ ratedUserId: 1 });

const RatingModel: Model<IRating> =
  mongoose.models.Rating || mongoose.model<IRating>('Rating', RatingSchema);

export default RatingModel;
