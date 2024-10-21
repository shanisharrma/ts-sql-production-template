import { RateLimiterMySQL } from 'rate-limiter-flexible';
import { Sequelize } from 'sequelize';
import { ServerConfig } from '.';

// Initialize rate limiter variable.
export let rateLimiterMySQL: RateLimiterMySQL | null = null;

// Function to configure the rate limiter with a Sequelize connection.
export const initRateLimiter = (sequelizeConnection: Sequelize) => {
    rateLimiterMySQL = new RateLimiterMySQL({
        storeClient: sequelizeConnection, // MySQL connection client.
        dbName: ServerConfig.DB_NAME, // Database name for rate limiting.
        tableName: 'rate_limiter', // Table for storing rate limit data.
        keyPrefix: 'rate_limit_', // Key prefix for identifying rate limits.
        points: Number(ServerConfig.POINTS), // Max requests allowed.
        duration: Number(ServerConfig.DURATION), // Validity duration for points.
        blockDuration: Number(ServerConfig.BLOCK_DURATION), // Block duration after limit exceeded.
    });
};
