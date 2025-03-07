import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    images: {
      type: [String],
      required: true
    },
    category: {
      type: String,
      required: true
    },
    stock: {
      type: String,
      require:true
    },
    stockNum: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);