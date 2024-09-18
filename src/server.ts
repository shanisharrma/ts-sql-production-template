import app from './app';
import { ServerConfig } from './config';

const server = app.listen(ServerConfig.PORT);

(() => {
    try {
        // eslint-disable-next-line no-console
        console.info(`APPLICATION_STARTED`, { meta: { PORT: ServerConfig.PORT, URL: ServerConfig.SERVER_URL } });
    } catch (error) {
        // eslint-disable-next-line no-console
        console.error(`APPLICATION_STARTED`, { meta: error });

        server.close((error) => {
            if (error) {
                // eslint-disable-next-line no-console
                console.error(`APPLICATION_STARTED`, { meta: error });
            }
            process.exit(1);
        });
    }
})();
