import { RateLimiterMySQL } from 'rate-limiter-flexible';
import { Sequelize } from 'sequelize';
import { ServerConfig } from '.';

export let rateLimiterMySQL: RateLimiterMySQL | null = null;

const POINTS = 10;
const DURATION = 60;
const BLOCK_DURATION = 600;

export const initRateLimiter = (sequelizeConnection: Sequelize) => {
    rateLimiterMySQL = new RateLimiterMySQL({
        storeClient: sequelizeConnection,
        dbName: ServerConfig.DB_NAME,
        tableName: 'rate_limiter',
        keyPrefix: 'rate_limit_',
        points: POINTS,
        duration: DURATION,
        blockDuration: BLOCK_DURATION,
    });
};
