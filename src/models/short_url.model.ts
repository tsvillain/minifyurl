import { Document, model, Schema } from "mongoose";

interface IShortUrl extends Document {
  originalUrl: string;
  expiredAt: Date;
  visitCount: number;
  creatorId?: string;
  shortUrl: string;
}

const shortUrl = new Schema<IShortUrl>(
  {
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    expiredAt: { type: Date, required: true },
    visitCount: { type: Number, default: 0 },
    creatorId: { type: String },
  },
  {
    timestamps: true,
  }
);

export default model<IShortUrl>("ShortUrl", shortUrl);
