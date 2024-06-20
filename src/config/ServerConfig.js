const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    EMAIL_ID: process.env.EMAIL_ID,
    EMAIL_PASSKEY :process.env.EMAIL_PASSKEY
}