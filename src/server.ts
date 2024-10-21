import app from './app'; // Import the Express application
import { initRateLimiter, ServerConfig } from './config'; // Import configuration and rate limiter initialization
import connection from './database/sequelize'; // Import the Sequelize database connection
import { Logger } from './utils/commons'; // Import the logging utility
import { Enums } from './utils/constants'; // Import application events for logging

// Start the server and handle server-specific errors
const server = app.listen(ServerConfig.PORT, () => {
    // Database Connection
    if (connection)
        Logger.info(Enums.EApplicationEvents.DATABASE_CONNECTED, {
            meta: { Host: ServerConfig.DB_HOST, PORT: ServerConfig.DB_PORT },
        });

    // Initiating the Rate Limiter
    initRateLimiter(connection);
    Logger.info(Enums.EApplicationEvents.RATE_LIMITER_INITIATED, {
        meta: { POINTS: ServerConfig.POINTS, DURATION: ServerConfig.DURATION },
    });

    // Starting the server
    Logger.info(Enums.EApplicationEvents.APPLICATION_STARTED, {
        meta: {
            PORT: ServerConfig.PORT,
            SERVER_URL: ServerConfig.SERVER_URL,
        },
    });
});

// Handle server errors
server.on('error', (error) => {
    Logger.error(Enums.EApplicationEvents.APPLICATION_ERROR, { meta: error });

    server.close((closeError) => {
        if (closeError) {
            Logger.error(Enums.EApplicationEvents.SERVER_CLOSE_ERROR, {
                meta: closeError,
            });
        }
        process.exit(1); // Exit the process after closing the server
    });
});

// Catch unhandled promise rejections
process.on('unhandledRejection', (reason) => {
    Logger.error(Enums.EApplicationEvents.UNHANDLED_PROMISE_REJECTION, {
        meta: reason,
    });

    server.close((closeError) => {
        if (closeError) {
            Logger.error(Enums.EApplicationEvents.SERVER_CLOSE_ERROR, {
                meta: closeError,
            });
        }
        process.exit(1);
    });
});

// Catch uncaught exceptions
process.on('uncaughtException', (error) => {
    Logger.error(Enums.EApplicationEvents.UNCAUGHT_EXCEPTION, { meta: error });

    server.close((closeError) => {
        if (closeError) {
            Logger.error(Enums.EApplicationEvents.SERVER_CLOSE_ERROR, {
                meta: closeError,
            });
        }
        process.exit(1);
    });
});
