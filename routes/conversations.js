import express from "express";
import {
  createConversation,
  readConversation,
  getConversationsNotificationsNumber,
} from "../controllers/conversations.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", verifyToken, createConversation);
router.get("/:userId", verifyToken, readConversation);
router.get(
  "/notificationsCount",
  verifyToken,
  getConversationsNotificationsNumber
);

export default router;
