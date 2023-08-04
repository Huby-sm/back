import express from "express";
import {
  createConversation,
  readConversation,
} from "../controllers/conversations.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", verifyToken, createConversation);
router.get("/:userId", verifyToken, readConversation);

export default router;
