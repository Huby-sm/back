import express from "express";
import { createFriendRequest } from "../controllers/friends.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/new", verifyToken, createFriendRequest);

export default router;
