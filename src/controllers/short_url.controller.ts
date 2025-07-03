import { Request, Response, NextFunction } from "express";
import ShortUrlModel from "../models/short_url.model";
import { HttpError } from "../utils/http.error";
import { ShortUrl } from "../interfaces/short_url.interface";
import { addDays, urlToShortString } from "../utils/helper_function";

class ShortUrlController {
  public getAllUrlByCreator = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { creator_id } = req.body;
      if (!creator_id) {
        throw new HttpError(400, "Missing required field: creator_id");
      }

      // const { protocol, host } = req;

      // const fullUrl = `${protocol}://${host}`;

      const urls = await ShortUrlModel.find({ creatorId: creator_id });
      if (urls.length === 0) {
        throw new HttpError(404, "No short urls founds");
      }
      res.status(200).json(urls);
    } catch (error) {
      next(error);
    }
  };

  public createNewShortUrl = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { url, creator_id, expire_in } = req.body;
      if (!url || !creator_id || !expire_in) {
        throw new HttpError(400, "Missing required fields");
      }

      const { protocol, host } = req;

      const prefixUrl = `${protocol}://${host}`;

      const shortUrl = urlToShortString(url);

      const newShortUrl = await ShortUrlModel.create({
        originalUrl: url,
        shortUrl: shortUrl,
        creatorId: creator_id,
        visitCount: 0,
        expiredAt: addDays(new Date(), expire_in),
      });

      res.status(201).json({
        ...newShortUrl.toJSON(),
        short_url_prefix: prefixUrl,
        full_url: `${prefixUrl}/${newShortUrl.shortUrl}`,
      });
    } catch (error) {
      next(error);
    }
  };
}

export default ShortUrlController;
