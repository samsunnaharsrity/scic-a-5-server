import { Schema, model } from "mongoose";

const ToolSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: String,
  image: String,
  price: {
    type: String,
    enum: ["Free", "Premium"],
    default: "Free",
  },
  rating: {
    type: Number,
    default: 5,
  },
  featured: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

export default model("Tool", ToolSchema);