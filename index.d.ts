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
    export function create(options?: Hideri.Options): Hideri.Logger;

    /** The logger instance */
    export class Logger {
        constructor(options?: Hideri.Options);

        public options: Hideri.Options;
        public constructMethod(method: Hideri.Method, append?: boolean): this;
        public deleteMethods(): this;
        public constructLevel(method: Hideri.Method): Hideri.IBuildResult;
        public assign(method: Hideri.Method): this;
        public getDefaultMethods(): Hideri.Method[];
        public info(message: string): void;
        public verbose(message: string): void;
        public debug(message: string): void;
        public error(message: string): void;
        public warn(message: string): void;
    }
    export type Method = {
        name: string;
        color: string;
        levels: Hideri.Level[];
        inspectDepth?: number;
        padLeft?: number;
        padRight?: number;
    };
    export type Level = {
        text: string;
        color: string;
        padLeft?: number;
        padRight?: number;
    }
    export type Options = {
        methods?: Hideri.Method[];
    }
    export type IBuildResult = {
        result: string;
        fill: string;
    }
}
declare module '@maika.xyz/hideri' {
    export = Hideri;
}