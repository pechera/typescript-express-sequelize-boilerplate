import path from 'path';
import log4js, { Configuration } from 'log4js';
import directory from '../consts/dirname.js';

const config: Configuration = {
    appenders: {
        console: {
            type: 'console',
        },
        logfile: { type: 'file', filename: path.join(directory.root, 'logs/error.log') },
    },
    categories: {
        default: { appenders: ['console'], level: 'info' },
        error: {
            appenders: ['console', 'logfile'],
            level: 'error',
        },
    },
};

log4js.configure(config);

export default log4js.getLogger();
