import DotenvFlow from 'dotenv-flow';

// Load environment variables from .env files.
DotenvFlow.config();

// Exporting application configuration settings.
export default {
    ENV: process.env.ENV, // Environment type (e.g., development, production).
    PORT: process.env.PORT, // Server port.
    SERVER_URL: process.env.SERVER_URL, // Base URL for the server.

    // Database Configuration
    DB_USER: process.env.DB_USER, // Database username.
    DB_PASS: process.env.DB_PASS, // Database password.
    DB_NAME: process.env.DB_NAME, // Database name.
    DB_HOST: process.env.DB_HOST, // Database host.
    DB_PORT: process.env.DB_PORT, // Database port.

    // Rate Limiter Configuration
    POINTS: Number(process.env.POINTS), // Max requests in a time window.
    DURATION: Number(process.env.DURATION), // Duration for points validity.
    BLOCK_DURATION: Number(process.env.BLOCK_DURATION), // Block duration after limit exceeded.
};
