import fs from 'fs';
import path from 'path';
import { createGzip } from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
    const fileToCompress = path.join(__dirname, 'files', 'fileToCompress.txt');
    const archiveFile = path.join(__dirname, 'files', 'archive.gz');

    const readStream = fs.createReadStream(fileToCompress);

    const gzip = createGzip();

    const writeStream = fs.createWriteStream(archiveFile);

    readStream
        .pipe(gzip)
        .pipe(writeStream)
        .on('finish', () => {
            console.log('Archive.gz');
        })
        .on('error', (err) => {
            console.error(`Ошибка: ${err.message}`);
        });
};

await compress();
