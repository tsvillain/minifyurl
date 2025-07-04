import { Request, Response, NextFunction } from "express";
import { HttpError } from "../utils/http.error";
import ShortUrlModel from "../models/url.model";

class RedirectController {
  public getUrl = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code } = req.params;
      if (!code) {
        throw new HttpError(400, "Missing required params: code");
      }

      const url = await ShortUrlModel.findOne({ code: code });
    } catch (error) {
      next(error);
    }
  };
}
