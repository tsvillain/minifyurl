export interface ShortUrl {
  createdAt: Date;
  updatedAt: Date;
  originalUrl: string;
  shortUrl: string;
  expiredAt: Date;
  visitCount: number;
  creatorId?: string;
}
