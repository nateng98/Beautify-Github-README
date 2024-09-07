import { Router } from "express";
import { banners } from "../constants/index.mjs";

const router = Router();

router.get("/banners", (req, res) => {
  res.send(banners);
});

export default router;
