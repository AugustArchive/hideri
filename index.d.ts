
    export namespace Hideri {
        export const version: string;
        export function create(options?: Hideri.Options): Hideri.Logger;
        export class Logger {
            constructor(options?: Hideri.Options);

            public options: Hideri.Options;
            public constructMethod(method: Hideri.Method, append?: boolean): this;
            public deleteMethods(): this;
            public constructLevel(method: Hideri.Method): Hideri.IBuildResult;
            public assign(method: Hideri.Method): this;
            public getDefaultMethods(): Method[];
            public info(message: string): void;
            public verbose(message: string): void;
            public debug(message: string): void;
            public error(message: string): void;
            public warn(message: string): void;
        }
        export type Method = {
            name: string;
            color: string;
            levels: Level[];
            inspectDepth?: number;
            padLeft?: number;
            padRight?: number;
        }
        export type Level = {
            text: string;
            color: string;
            padLeft?: number;
            padRight?: number;
        }
        export type Options = {
        methods?: Method[];
    }
    export type IBuildResult = {
        result: string;
        fill: string;
    }
}
