import { Transport } from '../core/transport';

export class ConsoleTransport implements Transport {
    public name: string;

    constructor() {
        this.name = 'console';
    }

    public append(x: string) {
        // Why not console[x]?
        // Because writing in stdout is the same shit
        
        process.stdout.write(`${x}\n`);
    }
}