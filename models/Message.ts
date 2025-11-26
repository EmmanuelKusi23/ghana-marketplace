import mongoose, { Schema, Model } from 'mongoose';

export interface IMessage {
  _id: string;
  senderId: Schema.Types.ObjectId;
  receiverId: Schema.Types.ObjectId;
  listingId?: Schema.Types.ObjectId;
  message: string;
  read: boolean;
  timestamp: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    listingId: {
      type: Schema.Types.ObjectId,
      ref: 'Listing',
    },
    message: {
      type: String,
      required: [true, 'Message content is required'],
      maxlength: 1000,
    },
    read: {
      type: Boolean,
      default: false,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

MessageSchema.index({ senderId: 1, receiverId: 1 });
MessageSchema.index({ timestamp: -1 });

const MessageModel: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default MessageModel;
