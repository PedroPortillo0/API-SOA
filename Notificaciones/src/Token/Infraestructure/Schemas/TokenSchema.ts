import mongoose, { Schema } from "mongoose";

const TokenSchema = new Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, required: true },
  isUsed: { type: Boolean, required: true, default: false },
  expiresAt: { type: Date, required: true },
});

export default mongoose.model("Token", TokenSchema);
