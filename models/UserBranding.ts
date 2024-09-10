import mongoose, { Schema, Document } from "mongoose";

export interface IUserBranding extends Document {
  userId: string;
  branding: {
    name: string;
    handle: string;
    headshot: string | null;
  };
}

const UserBrandingSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  branding: {
    name: { type: String, default: "" },
    handle: { type: String, default: "" },
    headshot: { type: String, default: null },
  },
});

export default mongoose.models.UserBranding ||
  mongoose.model<IUserBranding>("UserBranding", UserBrandingSchema);
