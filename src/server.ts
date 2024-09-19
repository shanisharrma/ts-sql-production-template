import app from './app';
import { ServerConfig } from './config';
import connection from './database/sequelize';
import { Logger } from './utils/commons';
import { EApplicationEvents } from './utils/constants';

const server = app.listen(ServerConfig.PORT);

(() => {
    try {
        if (connection) Logger.info(EApplicationEvents.DATABASE_CONNECTED, { meta: {} });

        Logger.info(EApplicationEvents.APPLICATION_STARTED, { meta: { PORT: ServerConfig.PORT, URL: ServerConfig.SERVER_URL } });
    } catch (error) {
        Logger.error(EApplicationEvents.APPLICATION_CONNECTION_ERROR, { meta: error });

        server.close((error) => {
            if (error) {
                Logger.error(EApplicationEvents.APPLICATION_CONNECTION_ERROR, { meta: error });
            }
            process.exit(1);
        });
    }
})();
