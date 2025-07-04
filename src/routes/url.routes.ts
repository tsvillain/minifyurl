import { Router } from "express";
import UrlController from "../controllers/url.controller";

const router = Router();

const urlController = new UrlController();

router.get("/urls", urlController.getAllUrlByCreator);
router.post("/url", urlController.createNewUrl);

export default router;
