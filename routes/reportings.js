import express from "express";
import { listReportings, createReporting } from "../controllers/reportings.js";

import { verifyToken } from "../middleware/auth.js";
import { isAdmin } from "../middleware/admin.js";

const router = express.Router();

router.get("/", [verifyToken, isAdmin], listReportings);
router.post("/new", [verifyToken], createReporting);

export default router;
