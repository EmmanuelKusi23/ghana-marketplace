import mongoose, { Schema, Model } from 'mongoose';
import { DisputeStatus } from '@/types';

export interface IDispute {
  _id: string;
  orderId: Schema.Types.ObjectId;
  raisedBy: Schema.Types.ObjectId;
  reason: string;
  description: string;
  evidencePhotos: string[];
  status: DisputeStatus;
  adminNotes?: string;
  resolution?: {
    decision: 'refund-buyer' | 'release-seller' | 'partial-refund';
    refundAmount?: number;
    penaltyApplied?: {
      userId: string;
      type: 'warning' | 'strike' | 'ban';
      reason: string;
      appliedAt: Date;
    };
    notes: string;
  };
  createdAt: Date;
  resolvedAt?: Date;
  resolvedBy?: Schema.Types.ObjectId;
}

const DisputeSchema = new Schema<IDispute>(
  {
    orderId: {
      type: Schema.Types.ObjectId,
      ref: 'Order',
      required: true,
    },
    raisedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      maxlength: 1000,
    },
    evidencePhotos: {
      type: [String],
      required: true,
    },
    status: {
      type: String,
      enum: ['open', 'under-review', 'resolved-refund', 'resolved-release', 'resolved-partial'] as DisputeStatus[],
      default: 'open',
    },
    adminNotes: {
      type: String,
    },
    resolution: {
      decision: {
        type: String,
        enum: ['refund-buyer', 'release-seller', 'partial-refund'],
      },
      refundAmount: Number,
      penaltyApplied: {
        userId: String,
        type: {
          type: String,
          enum: ['warning', 'strike', 'ban'],
        },
        reason: String,
        appliedAt: Date,
      },
      notes: String,
    },
    resolvedAt: {
      type: Date,
    },
    resolvedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

DisputeSchema.index({ orderId: 1 });
DisputeSchema.index({ status: 1 });
DisputeSchema.index({ raisedBy: 1 });

const DisputeModel: Model<IDispute> =
  mongoose.models.Dispute || mongoose.model<IDispute>('Dispute', DisputeSchema);

export default DisputeModel;
