import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
  getUsers,
  checkBlocked,
  toggleBlockUser,
} from "../controllers/users.js";

import { verifyToken } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/", [verifyToken, isAdmin], getUsers);
router.get("/:id/blocked", verifyToken, checkBlocked);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

router.post("/:id/blocked", [verifyToken, isAdmin], toggleBlockUser);

export default router;
