import express from "express";
import { login, sendResetPasswordEmail } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/sendResetPasswordEmail", sendResetPasswordEmail);

export default router;
