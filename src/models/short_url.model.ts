import { Document, model, Schema } from "mongoose";
import { ShortUrl } from "../interfaces/short_url.interface";

interface IShortUrl extends ShortUrl, Document {}

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
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        ret.original_url = ret.originalUrl;
        ret.short_url = ret.shortUrl;
        ret.expired_at = ret.expiredAt.toISOString();
        ret.visit_count = ret.visitCount;
        ret.creator_id = ret.creatorId;
        ret.created_at = ret.createdAt.toISOString();
        ret.updated_at = ret.updatedAt.toISOString();
        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        ret.original_url = ret.originalUrl;
        ret.short_url = ret.shortUrl;
        ret.expired_at = ret.expiredAt.toISOString();
        ret.visit_count = ret.visitCount;
        ret.creator_id = ret.creatorId;
        ret.created_at = ret.createdAt.toISOString();
        ret.updated_at = ret.updatedAt.toISOString();
        return ret;
      },
    },
  }
);

export default model<IShortUrl>("ShortUrl", shortUrl);
