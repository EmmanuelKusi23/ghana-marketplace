import mongoose, { Schema, Model } from 'mongoose';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  profileImage?: string;
  role: 'buyer' | 'seller' | 'admin' | 'courier';
  verified: boolean;
  favorites: Schema.Types.ObjectId[];
  joinDate: Date;

  // Rating System
  rating: number;
  totalRatings: number;
  strikes: number;
  banned: boolean;

  // Courier-specific fields
  vehicleType?: string;
  licenseNumber?: string;
  activeDeliveries?: number;
  completedDeliveries?: number;
  courierRating?: number;
  availabilityStatus?: 'available' | 'busy' | 'offline';
}

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
    },
    profileImage: {
      type: String,
      default: '',
    },
    role: {
      type: String,
      enum: ['buyer', 'seller', 'admin', 'courier'],
      default: 'buyer',
    },
    verified: {
      type: Boolean,
      default: false,
    },
    favorites: [{
      type: Schema.Types.ObjectId,
      ref: 'Listing',
    }],
    joinDate: {
      type: Date,
      default: Date.now,
    },

    // Rating System
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    totalRatings: {
      type: Number,
      default: 0,
    },
    strikes: {
      type: Number,
      default: 0,
    },
    banned: {
      type: Boolean,
      default: false,
    },

    // Courier-specific fields
    vehicleType: {
      type: String,
    },
    licenseNumber: {
      type: String,
    },
    activeDeliveries: {
      type: Number,
      default: 0,
    },
    completedDeliveries: {
      type: Number,
      default: 0,
    },
    courierRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    availabilityStatus: {
      type: String,
      enum: ['available', 'busy', 'offline'],
      default: 'offline',
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1 });
UserSchema.index({ location: 1 });

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
