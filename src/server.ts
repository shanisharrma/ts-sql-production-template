import app from './app';
import { ServerConfig } from './config';
import { Logger } from './utils/commons';
import { EApplicationEvents } from './utils/constants';

const server = app.listen(ServerConfig.PORT);

(() => {
    try {
        Logger.info(EApplicationEvents.APPLICATION_STARTED, { meta: { PORT: ServerConfig.PORT, URL: ServerConfig.SERVER_URL } });
    } catch (error) {
        Logger.error(EApplicationEvents.APPLICATION_STARTED, { meta: error });

        server.close((error) => {
            if (error) {
                Logger.error(EApplicationEvents.APPLICATION_STARTED, { meta: error });
            }
            process.exit(1);
        });
    }
})();
