import express from "express";
import {
  login,
  resetPasswordEmail,
  sendResetPasswordEmail,
} from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/sendResetPasswordEmail", sendResetPasswordEmail);
router.post("/resetPassword", resetPasswordEmail);

export default router;
