import mongoose, { Schema, Document } from "mongoose";
import { CarouselState } from "@/types";

export interface ICarousel extends Document, CarouselState {
  userId: string;
}

const CarouselSchema: Schema = new Schema(
  {
    userId: { type: String, required: true },
    name: { type: String, required: true },
    slides: [
      {
        type: {
          type: String,
          enum: ["intro", "slide", "outro"],
          required: true,
        },
        title: { type: String, required: true },
        tagline: String,
        description: { type: String, required: true },
        imageUrl: String,
        backgroundImage: String,
      },
    ],
    background: {
      color1: String,
      color2: String,
      color3: String,
      color4: String,
    },
    titleTextSettings: {
      alignment: { type: String, enum: ["left", "center", "right"] },
      fontSize: Number,
      fontStyle: { type: String, enum: ["normal", "italic"] },
      fontWeight: { type: String, enum: ["normal", "bold"] },
    },
    descriptionTextSettings: {
      alignment: { type: String, enum: ["left", "center", "right"] },
      fontSize: Number,
      fontStyle: { type: String, enum: ["normal", "italic"] },
      fontWeight: { type: String, enum: ["normal", "bold"] },
    },
    taglineTextSettings: {
      alignment: { type: String, enum: ["left", "center", "right"] },
      fontSize: Number,
      fontStyle: { type: String, enum: ["normal", "italic"] },
      fontWeight: { type: String, enum: ["normal", "bold"] },
    },
    layout: {
      height: Number,
      width: Number,
      pattern: String,
      backgroundOpacity: Number,
    },
    sharedSelectedElement: {
      id: Number,
      opacity: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Carousel ||
  mongoose.model<ICarousel>("Carousel", CarouselSchema);
