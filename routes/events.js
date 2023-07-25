import express from "express";
import {createEvent, getEvents} from "../controllers/events.js";

import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/*CREATE*/
router.post("/", verifyToken, createEvent);

/* READ */
router.get("/events", verifyToken, getEvents);


export default router;