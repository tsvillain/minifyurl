import { Document, model, Schema } from "mongoose";
import { Url } from "../interfaces/url.interface";

interface IUrl extends Url, Document {}

const url = new Schema<IUrl>(
  {
    original_url: { type: String, required: true },
    code: { type: String, required: true },
    expired_at: { type: Date, required: true },
    visit_count: { type: Number, default: 0 },
    creator_id: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        ret.original_url = ret.original_url;
        ret.code = ret.code;
        ret.expired_at = ret.expired_at.toISOString();
        ret.visit_count = ret.visit_count;
        ret.creator_id = ret.creator_id;
        ret.created_at = ret.createdAt.toISOString();
        ret.updated_at = ret.updatedAt.toISOString();
        delete ret.updatedAt;
        delete ret.createdAt;
        return ret;
      },
    },
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        ret.original_url = ret.original_url;
        ret.code = ret.code;
        ret.expired_at = ret.expired_at.toISOString();
        ret.visit_count = ret.visit_count;
        ret.creator_id = ret.creator_id;
        ret.created_at = ret.createdAt.toISOString();
        ret.updated_at = ret.updatedAt.toISOString();
        delete ret.createdAt;
        delete ret.updatedAt;
        return ret;
      },
    },
  }
);

export default model<IUrl>("Url", url);
