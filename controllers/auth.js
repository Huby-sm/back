import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import UserToken from "../models/UserToken.js";
import sendEmail from "../utils/mailer.js";
import { generateToken } from "../utils/index.js";
import nodemailer from "nodemailer";

/* REGISTER USER */
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      friends,
      location,
      occupation,
      promo,
      filiere,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath: req.file.location,
      friends,
      location,
      occupation,
      promo,
      filiere,
    });
    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/* LOGGING IN */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(400).json({ msg: "User does not exist. " });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials. " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    console.log(token);
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendResetPasswordEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email: email });
  if (!user) return res.status(400).json({ msg: "User does not exist. " });

  const token = new UserToken({
    userId: user._id,
    token: generateToken(32),
    context: "resetPassword",
  });

  const savedToken = await token.save();

  const resetPasswordLink = `http://localhost:3000/resetPassword/${savedToken.token}`;

  let message = {
    from: "Sender Name <sender@example.com>",
    to: email,
    subject: "Reset password",
    text: `Hello ! Here is your link to reset password: ${resetPasswordLink}`,
    html: `<p>Hello ! Here is your link to reset password: <a href="${resetPasswordLink}" target="_blank">Click here</a></p>`,
  };

  const sentEmail = await sendEmail(message);

  const link = nodemailer.getTestMessageUrl(sentEmail);
  console.log("link :>> ", link);
  res.status(200).json({ status: "ok" });
};

export const resetPasswordEmail = async (req, res) => {
  const { token, password } = req.body;
  const tokenDB = await UserToken.findOne({ token });

  if (!tokenDB) return res.status(400).json({ msg: "Token does not exist. " });

  const user = await User.findOne({ _id: tokenDB.userId });
  if (!user) return res.status(400).json({ msg: "User does not exist. " });

  const salt = await bcrypt.genSalt();
  const passwordHash = await bcrypt.hash(password, salt);

  user.password = passwordHash;
  await user.save();

  await UserToken.deleteOne({ token });

  res.status(200).json({ status: "ok" });
};
