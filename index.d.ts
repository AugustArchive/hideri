import fs from 'fs';

declare namespace Hideri {
    /**
     * The version of the Hideri component
     * @returns The version `package.json`
     */
    export const version: string;

    /**
     * Creates a new instance of the logger. You can do `new Logger()` but this is a bit easier
     * @param options The options to use
     * @returns The logger
     */
    export function create(options: Hideri.Options): Hideri.Logger;

    /** The logger instance */
    export class Logger {
        constructor(options: Hideri.Options);
        public options: Hideri.Options;
        public info(message: string): this;
        public error(message: string): this;
        public warn(message: string): this;
        public verbose(message: string): this;
        public debug(message: string): this;
    }

    export interface Transport {
        /** The transport name (to add to the collection) */
        name: string;

        /** Prints anything to the transport */
        append(x: string): void;
    }

    /** Console transport to use for console logs */
    export class ConsoleTransport implements Transport {
        public name: string;
        constructor(hideri: Hideri.Logger);
        public append(message: string): void;
    }

    /** File transport to use `.log` files to log anything */
    export class FileTransport implements Transport {
        public name: string;
        public stream: fs.ReadStream;
        constructor(hideri: Hideri.Logger, path: string);
        public append(message: string): void;
    }

    export type Options = {
        /**
         * Transports array
         */
        transports: Hideri.Transport[];
    }
}
declare module '@maika.xyz/hideri' {
    export = Hideri;
}