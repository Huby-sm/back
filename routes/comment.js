import express from "express";

import { verifyToken } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";
import {
  createComment,
  getCommentInPost,
  likeComment,
  deleteComment,
} from "../controllers/comments.js";

const router = express.Router();

/* CREATE */
router.post("/", verifyToken, createComment);

/* READ */
router.get("/:postId", verifyToken, getCommentInPost);
router.delete("/:commentId", [verifyToken, isAdmin], deleteComment);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeComment);

export default router;
