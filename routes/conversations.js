import express from "express";
import { createConversation } from "../controllers/conversations.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", verifyToken, createConversation);

export default router;
