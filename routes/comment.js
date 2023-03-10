import express from "express";

import { verifyToken } from "../middleware/auth.js";
import {createComment,getCommentInPost} from "../controllers/comments.js";

const router = express.Router();

/* READ */
router.post("/", verifyToken, createComment);

/* UPDATE */
router.get("/:postId", verifyToken, getCommentInPost);

/*TEST*/
export default router;