import express from "express";

import { verifyToken } from "../middleware/auth.js";
import {
  createComment,
  getCommentInPost,
  likeComment,
} from "../controllers/comments.js";

const router = express.Router();

/* CREATE */
router.post("/", verifyToken, createComment);

/* READ */
router.get("/:postId", verifyToken, getCommentInPost);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeComment);

export default router;
