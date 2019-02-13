import { Transport } from '../core/transport';
import { createWriteStream, WriteStream, mkdir } from "fs";

export class FileTransport implements Transport {
    public name: string;
    public stream?: WriteStream;
    public path: string;

    constructor(path: string) {
        this.name = 'file';
        
        if (!path) throw new Error(`FileTransport > Requires "path" (If the path is specified & not a folder, it will process it for you)`);
        this.stream = createWriteStream(path);
        this.path = path;

        this.mkdir();
    }

    public mkdir() {
        mkdir(this.path, 777, (error) => {
            if (error && error.code !== 'EEXIST') return;
        });
    }

    public append(x: string) {
        const stream = this.stream as WriteStream;
        stream.write(x);
    }
}