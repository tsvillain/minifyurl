import { Router } from "express";
import RedirectController from "../controllers/redirect.controller";

const router = Router();

const redirectController = new RedirectController();

router.get("/:code", redirectController.getUrl);

export default router;
