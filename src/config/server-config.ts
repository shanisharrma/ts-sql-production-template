import DotenvFlow from 'dotenv-flow';

DotenvFlow.config();

export default {
    ENV: process.env.ENV,
    PORT: process.env.PORT,
    SERVER_URL: process.env.SERVER_URL,

    // Database Configuration
    DB_USER: process.env.DB_USER,
    DB_PASS: process.env.DB_PASS,
    DB_NAME: process.env.DB_NAME,
    DB_HOST: process.env.DB_HOST,

    // Rate Limiting
    RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX,
    RATE_LIMIT_WINDOW: process.env.RATE_LIMIT_WINDOW,
    RATE_LIMIT_BLOCK_WINDOW: process.env.RATE_LIMIT_BLOCK_WINDOW,
};
