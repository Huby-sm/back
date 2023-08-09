import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const config = {
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
    },
    region: process.env.BUCKET_REGION,
};
const s3 = new S3Client(config);

export default s3;