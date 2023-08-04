import express from "express";
import bodyParser from "body-parser";
import mongoose, { mongo } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import nodemailer from "nodemailer";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import friendRoutes from "./routes/friends.js";
import notificationRoutes from "./routes/notification.js";
import commentRoutes from "./routes/comment.js";
import eventRoutes from "./routes/events.js";
import reportingRoutes from "./routes/reportings.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";
import { verifyToken } from "./middleware/auth.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import { users, posts } from "./data/index.js";
import setupSocketIO from "./socketio/setup.js";
import { cleanSocketIds } from "./socketio/setup.js";
import fastTest from "./fastTest.js";

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

//Multer Valentin S3* fichier séparé
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

upload.single('picturePath')
//Multer Valentin S3*

/* ROUTES WITH FILES */
app.post("/auth/register", upload.single("picture"), register);
app.post("/posts", verifyToken, upload.single("picture"), createPost);

/* ROUTES !!!!*/
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/friends", friendRoutes);
app.use("/notifications", notificationRoutes);
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
