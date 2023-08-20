import express from "express";
import {
  listConversations,
  createConversation,
  readConversation,
  getConversationsNotificationsNumber,
  createMessage,
} from "../controllers/conversations.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, listConversations);
router.post("/new", verifyToken, createConversation);
router.get(
  "/notificationsCount",
  verifyToken,
  getConversationsNotificationsNumber
);
router.get("/:conversationId", verifyToken, readConversation);
router.post("/messages/new", verifyToken, createMessage);

export default router;
