import mongoose, { Schema, Document } from "mongoose";

export interface ISubscription extends Document {
  userId: string;
  orderId: string;
  status: string;
  endDate: Date;
  createdAt: Date;
}

const SubscriptionSchema: Schema = new Schema({
  userId: { type: String, required: true },
  orderId: { type: String, required: true },
  status: { type: String, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Subscription ||
  mongoose.model<ISubscription>("Subscription", SubscriptionSchema);
