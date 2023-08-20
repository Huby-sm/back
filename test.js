import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
console.log('BUCKET_NAME:', process.env.BUCKET_NAME);