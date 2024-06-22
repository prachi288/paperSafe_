const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    EMAIL_ID: process.env.EMAIL_ID,
    EMAIL_PASSKEY :process.env.EMAIL_PASSKEY,
    ENCRYPTION_KEY :process.env.ENCRYPTION_KEY,
    ENCRYPTION_IV :process.env.ENCRYPTION_IV,
    CLOUDINARY_CLOUD_NAME :process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET
}