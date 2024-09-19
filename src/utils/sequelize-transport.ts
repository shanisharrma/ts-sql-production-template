import TransportStream, { TransportStreamOptions } from 'winston-transport';
import { Log } from '../database'; // Import the Sequelize Log model
import { LogEntry } from 'winston';

interface SequelizeTransportOptions extends TransportStreamOptions {
    level: string;
}

class SequelizeTransport extends TransportStream {
    constructor(opts: SequelizeTransportOptions) {
        super(opts);
        this.level = opts.level;
    }

    log(info: LogEntry, callback: () => void) {
        setImmediate(() => {
            this.emit('logged', info);
        });

        const { level, message, meta = {} } = info;

        // Store log in the database using Sequelize
        Log.create({
            level: level,
            message: message,
            meta: JSON.stringify(meta),
            timestamp: new Date(), // Store current timestamp
        });

        callback();
    }
}

export default SequelizeTransport;
