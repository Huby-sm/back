import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath} from "url";
import { register } from "./controllers/auth.js";
/*Test*/
/* Configuration */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json({limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({limit: "30mb", extended:true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')));

/* File storage */
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "public/assets");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
const uplaod = multer({ storage});

/* Routes with files */
app.post("/auth/register", uplaod.single("picture"), register);
/* Mongoose Setup */
const PORT = process.env.PORT || 6001;
/* To avoid any warning*/
mongoose.set('strictQuery', false);
/* To connect to the database */
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
})
.catch((error) => console.log(error.message));