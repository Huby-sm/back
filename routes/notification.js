import express from "express";
import {
  createNotification,
  listNotifications,
  countNotSeenNotifications,
  markSeen,
  update,
} from "../controllers/notifications.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyToken, createNotification);
router.get("/", verifyToken, listNotifications);
router.get("/count", verifyToken, countNotSeenNotifications);
router.put("/markSeen", verifyToken, markSeen);
router.put("/:id", verifyToken, update);

export default router;
