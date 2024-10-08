import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
    const fileToWrite = path.join(__dirname, 'files', 'fileToWrite.txt');

    const writeStream = fs.createWriteStream(fileToWrite, { encoding: 'utf8' });

    console.log('Ctrl+D Enter - to save / Ctrl+C - exit');

    process.stdin.resume();

    process.stdin.on('data', (chunk) => {
        writeStream.write(chunk);
    });

    process.stdin.on('end', () => {
        writeStream.end();
        console.log('File writing completed.');
    });

    process.on('SIGINT', () => {
        writeStream.end();
        console.log('File writing interrupted. Exiting...');
        process.exit();
    });

    writeStream.on('error', (err) => {
        console.error(`Error writing to the file: ${err.message}`);
    });
};

await write();
