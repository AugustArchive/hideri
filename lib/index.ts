import { Logger, Options } from './logger';

export function create(options: Options): Logger {
    const instance = new Logger(options);
    return instance;
}

export * from './logger';
export * from './transports/console';
export * from './transports/file';
export * from './core/transport';