import express from "express";
import {
  acceptFriendRequest,
  createFriendRequest,
} from "../controllers/friends.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", verifyToken, createFriendRequest);
router.post("/accept", verifyToken, acceptFriendRequest);

export default router;
