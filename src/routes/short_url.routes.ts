import { Router } from "express";
import ShortUrlController from "../controllers/short_url.controller";

const router = Router();

const shortUrlController = new ShortUrlController();

router.get("/urls", shortUrlController.getAllUrlByCreator);
router.post("/url", shortUrlController.createNewShortUrl);

export default router;
