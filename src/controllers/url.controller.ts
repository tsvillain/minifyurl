import { Request, Response, NextFunction } from "express";
import UrlModel from "../models/url.model";
import { HttpError } from "../utils/http.error";
import { createResponse } from "../utils/response";
import { addDays, urlToShortString } from "../utils/helper_function";

class UrlController {
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

      const { protocol, host } = req;
      const prefixUrl = `${protocol}://${host}`;

      const urls = await UrlModel.find({ creator_id: creator_id });
      if (urls.length === 0) {
        throw new HttpError(404, `No urls exist by creator_id: ${creator_id}`);
      }

      const modifiedUrls = urls.filter((url) => {
        return {
          ...url,
          url_prefix: prefixUrl,
          full_url: `${prefixUrl}/${url.code}`,
        };
      });

      res
        .status(200)
        .json(
          createResponse(
            "success",
            "List of all urls created by the creator",
            modifiedUrls
          )
        );
    } catch (error) {
      next(error);
    }
  };

  // TODO: if a creator is creating same url, update the existing one expire_in only.
  public createNewUrl = async (
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

      const code = urlToShortString(url, creator_id);

      const newShortUrl = await UrlModel.create({
        original_url: url,
        code: code,
        creator_id: creator_id,
        visit_count: 0,
        expired_at: addDays(new Date(), expire_in),
      });

      res.status(201).json(
        createResponse("success", "Short Url created successfully", {
          ...newShortUrl.toJSON(),
          url_prefix: prefixUrl,
          full_url: `${prefixUrl}/${newShortUrl.code}`,
        })
      );
    } catch (error) {
      next(error);
    }
  };
}

export default UrlController;
