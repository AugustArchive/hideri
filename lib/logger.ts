import { Collection } from '@maika.xyz/eris-utils';
import { dateformat } from '@maika.xyz/miu';
import { Transport } from './core/transport';
import colors from 'chalk';

export type Options = {
    transports: Transport[];
}

export class Logger {
    public options: Options;
    public transports: Collection<Transport>;

    constructor(options: Options) {
        this.options    = Object.assign({}, options);
        this.transports = new Collection<Transport>();

        this.addTransports();
        Object.freeze(this.options);
    }

    public addTransports() {
        this.options.transports.forEach((t: Transport) => {
            this.transports.set(t.name, t);
        });
    }

    private write(message: string, other: string): Logger {
        this.options.transports.forEach((t: Transport) => {
            if (t.name === 'file') t.append(other);
            else t.append(message);
        });
        return this;
    }

    public info(message: string): Logger {
        this.write(`${colors.bgCyan('INFO')} <=> ${message}`, `INFO <=> ${message}\n`);
        return this;
    }

    public warn(message: string): Logger {
        this.write(`${colors.bgYellow('WARN')} <=>  ${message}`, `WARNING <=> ${message}\n`);
        return this;
    }
    
    public error(message: string): Logger {
        this.write(`${colors.bgRed('ERROR')} <=> ${message}`, `ERROR <=> ${message}\n`);
        return this;
    }

    public debug(message: string): Logger {
        this.write(`${colors.bgGreen('DEBUG')} <=> ${message}`, `ERROR <=> ${message}\n`);
        return this;
    }

    public verbose(message: string): Logger {
        this.write(`${colors.bgMagenta('VERBOSE')} <=> ${message}`, `VERBOSE <=> ${message}\n`);
        return this;
    }
}