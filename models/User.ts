import mongoose, { Schema, Model } from 'mongoose';

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  location: string;
  profileImage?: string;
  role: 'buyer' | 'seller' | 'admin';
  verified: boolean;
  favorites: Schema.Types.ObjectId[];
  joinDate: Date;
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
      enum: ['buyer', 'seller', 'admin'],
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
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ email: 1 });
UserSchema.index({ location: 1 });

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export default UserModel;
