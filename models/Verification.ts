import mongoose, { Schema, Model } from 'mongoose';

export interface IVerification {
  _id: string;
  orderId: Schema.Types.ObjectId;
  type: 'pickup' | 'delivery';
  photos: string[];
  gpsCoordinates: {
    latitude: number;
    longitude: number;
    accuracy?: number;
  };
  timestamp: Date;
  verifiedBy: Schema.Types.ObjectId;
  code: string;
  confirmed: boolean;
}

const VerificationSchema = new Schema<IVerification>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    type: {
      type: String,
      enum: ['pickup', 'delivery'],
      required: true,
    },
    photos: {
      type: [String],
      required: true,
      validate: {
        validator: function(v: string[]) {
          return v && v.length >= 2;
        },
        message: 'At least 2 photos are required for verification',
      },
    },
    gpsCoordinates: {
      latitude: {
        type: Number,
        required: true,
      },
      longitude: {
        type: Number,
        required: true,
      },
      accuracy: Number,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    verifiedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    confirmed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

VerificationSchema.index({ orderId: 1, type: 1 });
VerificationSchema.index({ verifiedBy: 1 });

const VerificationModel: Model<IVerification> =
  mongoose.models.Verification || mongoose.model<IVerification>('Verification', VerificationSchema);

export default VerificationModel;
