import express from "express";
import {
  createNotification,
  listNotifications,
  countNotSeenNotifications,
  markSeen,
} from "../controllers/notifications.js";

const router = express.Router();

router.post("/", createNotification);
router.get("/", listNotifications);
router.get("/count", countNotSeenNotifications);
router.put("/markSeen", markSeen);

export default router;
