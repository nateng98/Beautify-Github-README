import { Router } from "express";
import { newsData } from "../constants/index.mjs";

const router = Router();

router.get("/news", (req, res) => {
  res.send(newsData);
});

export default router;
