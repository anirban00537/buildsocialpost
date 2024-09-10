import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
}

const UserSchema: Schema = new Schema(
  {
    uid: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    displayName: { type: String },
    photoURL: { type: String },
  },
  { timestamps: true }
);

export default mongoose.models.User ||
  mongoose.model<IUser>("User", UserSchema);
