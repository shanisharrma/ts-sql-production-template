import { createLogger, format, transports } from 'winston';
import { ConsoleTransportInstance, FileTransportInstance } from 'winston/lib/winston/transports';
import util from 'util';
import { ServerConfig } from '../../config';
import { EApplicationEnvironment } from '../constants';
import path from 'path';
import { red, blue, green, yellow, magenta } from 'colorette';
import * as sourceMapSupport from 'source-map-support';

// Linking Typescript Compiler Trace Support
sourceMapSupport.install();

// Selecting color for defined level
const colorizeLevel = (level: string) => {
    switch (level) {
        case 'info':
            return blue(level);
        case 'error':
            return red(level);
        case 'warn':
            return yellow(level);
        default:
            return level;
    }
};

const consoleLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info;

    const customLevel = colorizeLevel(level.toUpperCase());
    const customMessage = message;
    const customTimeStamp = green(timestamp);
    const customMeta = util.inspect(meta, {
        showHidden: false,
        depth: null,
        colors: true,
    });

    const customLog = `${customLevel} [${customTimeStamp}] ${customMessage}\n${magenta('META')} ${customMeta}`;
    return customLog;
});

const consoleTransport = (): Array<ConsoleTransportInstance> => {
    if (ServerConfig.ENV === EApplicationEnvironment.DEVELOPMENT) {
        return [
            new transports.Console({
                level: 'info',
                format: format.combine(format.timestamp(), consoleLogFormat),
            }),
        ];
    }
    return [];
};

const fileLogFormat = format.printf((info) => {
    const { level, message, timestamp, meta = {} } = info;

    const logMeta: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(meta)) {
        if (value instanceof Error) {
            logMeta[key] = {
                name: value.name,
                message: value.message,
                trace: value.stack,
            };
        }
        logMeta[key] = value;
    }

    const logData = {
        level: level.toUpperCase(),
        message,
        timestamp,
        meta: logMeta,
    };

    return JSON.stringify(logData, null, 4);
});

const fileTransport = (): Array<FileTransportInstance> => {
    return [
        new transports.File({
            level: 'info',
            filename: path.join(__dirname, '../', '../', '../', 'logs', `${ServerConfig.ENV}.log`),
            format: format.combine(format.timestamp(), fileLogFormat),
        }),
    ];
};

export default createLogger({
    defaultMeta: {
        meta: {},
    },
    transports: [...fileTransport(), ...consoleTransport()],
});
