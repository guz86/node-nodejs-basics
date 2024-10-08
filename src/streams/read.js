import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    const fileToRead = path.join(__dirname, 'files', 'fileToRead.txt');

    const readStream = fs.createReadStream(fileToRead, { encoding: 'utf8' });

    readStream.on('data', (chunk) => {
        process.stdout.write(chunk);
    });

    readStream.on('end', () => {
        console.log('\nFile reading completed.');
    });

    readStream.on('error', (err) => {
        console.error(`Error reading the file: ${err.message}`);
    });
};

await read();
