import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config({ path: ".env" });
import path from "path";
import helmet from "helmet";
import morgan from "morgan";
import nodemailer from "nodemailer";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import conversationRoutes from "./routes/conversations.js";
import friendRoutes from "./routes/friends.js";
import notificationRoutes from "./routes/notification.js";
import commentRoutes from "./routes/comment.js";
import eventRoutes from "./routes/events.js";
import reportingRoutes from "./routes/reportings.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import setupSocketIO from "./socketio/setup.js";
import { cleanSocketIds } from "./socketio/setup.js";
import fastTest from "./fastTest.js";
import upload from "./helpers/upload.helper.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

console.log("BUCKET_NAME_ici:", process.env.BUCKET_NAME);

/* FILE STORAGE */
/*const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/assets");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });*/
/* FILE STORAGE */

/* ROUTES WITH FILES */
//app.post("/auth/register", upload.single("picturePath"), register);
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picturePath"), createPost);
//app.post("/auth/register", uploadToS3, register);
//app.post("/posts", verifyToken, uploadToS3,s3Uploader,createPost);

/* ROUTES !!!!*/
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/friends", friendRoutes);
app.use("/notifications", notificationRoutes);
app.use("/conversations", conversationRoutes);
app.use("/comments", commentRoutes);
app.use("/events", eventRoutes);
app.use("/reportings", reportingRoutes);

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
//mongoose.set("strictQuery", false); //ajout

/* MAIL */

export let transporter = null;

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    await cleanSocketIds();
    setupSocketIO(app, PORT);

    fastTest();
    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    //Post.insertMany(posts);

    nodemailer.createTestAccount((err, account) => {
      if (err) {
        console.error("Failed to create a testing account. " + err.message);
        return process.exit(1);
      }

      console.log("Credentials obtained, sending message...");

      // Create a SMTP transporter object
      transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    });
  })
  .catch((error) => console.log(`${error} did not connect`));
