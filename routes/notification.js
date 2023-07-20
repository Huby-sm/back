import express from "express";
import {
  createNotification,
  listNotifications,
} from "../controllers/notifications.js";

const router = express.Router();

router.post("/", createNotification);
router.get("/", listNotifications);

export default router;
