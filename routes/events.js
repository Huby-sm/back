import express from "express";
import {createEvent, getEvents} from "../controllers/events.js";

import { verifyToken } from "../middleware/auth.js";
//import { isBde} from "../middleware/bde.js";
import { isAdmin } from "../middleware/admin.js";

const router = express.Router();

/* CREATE */
//router.post("/", [verifyToken, isAdmin], createEvent);
//router.post("/", [verifyToken, isBde], createEvent);

/* READ */
router.get("/", verifyToken, getEvents);


export default router;
