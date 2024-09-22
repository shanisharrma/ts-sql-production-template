import { RateLimiterMySQL } from 'rate-limiter-flexible';
import { Sequelize } from 'sequelize';
import { ServerConfig } from '.';

export let rateLimiterMySQL: RateLimiterMySQL | null = null;

export const initRateLimiter = (sequelizeConnection: Sequelize) => {
    rateLimiterMySQL = new RateLimiterMySQL({
        storeClient: sequelizeConnection,
        dbName: ServerConfig.DB_NAME,
        tableName: 'rate_limiter',
        keyPrefix: 'rate_limit_',
        points: Number(ServerConfig.RATE_LIMIT_MAX),
        duration: Number(ServerConfig.RATE_LIMIT_WINDOW),
        blockDuration: Number(ServerConfig.RATE_LIMIT_BLOCK_WINDOW),
    });
};
