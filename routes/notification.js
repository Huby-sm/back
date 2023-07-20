import express from "express";
import {
  createNotification,
  listNotifications,
  countNotSeenNotifications,
} from "../controllers/notifications.js";

const router = express.Router();

router.post("/", createNotification);
router.get("/", listNotifications);
router.get("/count", countNotSeenNotifications);

export default router;
