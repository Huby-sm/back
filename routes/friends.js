import express from "express";
import {
  acceptFriendRequest,
  createFriendRequest,
  declineFriendRequest,
  cancelFriendship,
} from "../controllers/friends.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", verifyToken, createFriendRequest);
router.post("/accept", verifyToken, acceptFriendRequest);
router.post("/decline", verifyToken, declineFriendRequest);
router.delete("/:friendId/cancel", verifyToken, cancelFriendship);

export default router;
