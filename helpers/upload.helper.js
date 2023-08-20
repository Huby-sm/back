import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import multer from 'multer';
import path from 'path';
import s3  from '../utils/s3.util.js';
import {GetObjectCommand} from "@aws-sdk/client-s3";

const upload = multer({
    storage: multerS3({
        s3: s3,
        //acl: 'public-read',
        bucket: process.env.BUCKET_NAME,
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const uniqueFileName = Date.now().toString() + path.extname(file.originalname);
            cb(null, uniqueFileName);
        },
    }),
});

// Fonction pour obtenir une URL signée
/*const getSignedUrl = async (picturePath) => {
    const command = new GetObjectCommand({
        Bucket: process.env.BUCKET_NAME,
        Key: picturePath,
    });

    return s3.getSignedUrl(command);
}*/

export default upload;