import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http.error";
import ShortUrlModel from "../models/url.model";
import logger from "../utils/logger";

class RedirectController {
  public getUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.params;
      logger.debug(`[RedirectController] Request params: ${JSON.stringify(req.params)}`);
      logger.debug(`[RedirectController] Request headers: ${JSON.stringify(req.headers)}`);
        logger.info(`[RedirectController] Received redirect request for code: ${code}`);

      if (!code) {
          logger.warn("[RedirectController] Missing required params: code");
        throw new HttpError(400, "Missing required params: code");
      }

      logger.info(`[RedirectController] Querying DB for code: ${code}`);
      const url = await ShortUrlModel.findOneAndUpdate(
        { code: code },
        {
          $inc: { visit_count: 1 },
        }
      );
      logger.debug(`[RedirectController] DB query result: ${JSON.stringify(url)}`);

      if (!url) {
          logger.warn(`[RedirectController] No URL found for code: ${code}`);
      } else {
          logger.info(`[RedirectController] Found URL: ${url.original_url}, expired_at: ${url.expired_at}`);
      }

      if (url == null || new Date(url.expired_at).getTime() < Date.now()) {
          logger.warn(`[RedirectController] URL for code ${code} is invalid or expired.`);
        throw new HttpError(404, "Invalid URL");
      }

        logger.info(`[RedirectController] Preparing to redirect to: ${url.original_url}`);
        logger.debug(`[RedirectController] Response status: 302, Location: ${url.original_url}`);
      res.redirect(302, url.original_url);
    } catch (error) {
        logger.error(`[RedirectController] Error in getUrl: ${error}`);
      next(error);
    }
  };
}

export default RedirectController;
