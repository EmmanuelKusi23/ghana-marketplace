import mongoose, { Schema, Model } from 'mongoose';
import { ListingCondition, ListingStatus } from '@/types';

export interface IListing {
  _id: string;
  sellerId: Schema.Types.ObjectId;
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

const ListingSchema = new Schema<IListing>(
  {
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 100,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: 1000,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
    },
    subcategory: {
      type: String,
    },
    condition: {
      type: String,
      enum: ['new', 'like-new', 'good', 'fair', 'poor'] as ListingCondition[],
      required: [true, 'Condition is required'],
    },
    images: {
      type: [String],
      required: [true, 'At least one image is required'],
      validate: {
        validator: function(v: string[]) {
          return v && v.length > 0 && v.length <= 10;
        },
        message: 'Must have between 1 and 10 images',
      },
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    status: {
      type: String,
      enum: ['active', 'sold', 'pending', 'flagged'] as ListingStatus[],
      default: 'active',
    },
    views: {
      type: Number,
      default: 0,
    },
    favorites: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

ListingSchema.index({ sellerId: 1 });
ListingSchema.index({ category: 1 });
ListingSchema.index({ location: 1 });
ListingSchema.index({ status: 1 });
ListingSchema.index({ createdAt: -1 });
ListingSchema.index({ price: 1 });

const ListingModel: Model<IListing> =
  mongoose.models.Listing || mongoose.model<IListing>('Listing', ListingSchema);

export default ListingModel;
