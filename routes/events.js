import express from "express";
import {createEvent, getEvents} from "../controllers/events.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getEvents);


export default router;