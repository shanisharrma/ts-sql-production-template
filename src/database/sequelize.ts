import { Sequelize } from 'sequelize';
import { ServerConfig } from '../config';
import { EApplicationEnvironment } from '../utils/constants';

const connection: Sequelize = new Sequelize(ServerConfig.DB_NAME ?? '', ServerConfig.DB_USER ?? '', ServerConfig.DB_PASS ?? '', {
    host: ServerConfig.DB_HOST ?? '',
    dialect: 'mysql',
    // eslint-disable-next-line no-console
    logging: ServerConfig.ENV === EApplicationEnvironment.PRODUCTION ? false : console.log,
});

export default connection;
