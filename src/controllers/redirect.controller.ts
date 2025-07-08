import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http.error";
import ShortUrlModel from "../models/url.model";

class RedirectController {
  public getUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.params;
      console.log(`[RedirectController] Received redirect request for code: ${code}`);

      if (!code) {
        console.warn("[RedirectController] Missing required params: code");
        throw new HttpError(400, "Missing required params: code");
      }

      const url = await ShortUrlModel.findOneAndUpdate(
        { code: code },
        {
          $inc: { visit_count: 1 },
        }
      );

      if (!url) {
        console.warn(`[RedirectController] No URL found for code: ${code}`);
      } else {
        console.log(`[RedirectController] Found URL: ${url.original_url}, expired_at: ${url.expired_at}`);
      }

      if (url == null || new Date(url.expired_at).getTime() < Date.now()) {
        console.warn(`[RedirectController] URL for code ${code} is invalid or expired.`);
        throw new HttpError(404, "Invalid URL");
      }

      console.log(`[RedirectController] Redirecting to: ${url.original_url}`);
      res.redirect(302, url.original_url);
    } catch (error) {
      console.error("[RedirectController] Error in getUrl:", error);
      next(error);
    }
  };
}

export default RedirectController;
