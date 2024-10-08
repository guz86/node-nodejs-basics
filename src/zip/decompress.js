import fs from 'fs';
import path from 'path';
import { createGunzip } from 'zlib';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    const archiveFile = path.join(__dirname, 'files', 'archive.gz');
    const fileToDecompress = path.join(__dirname, 'files', 'fileToCompress.txt');

    const readStream = fs.createReadStream(archiveFile);

    const gunzip = createGunzip();

    const writeStream = fs.createWriteStream(fileToDecompress);

    readStream
        .pipe(gunzip)
        .pipe(writeStream)
        .on('finish', () => {
            console.log('Файл распакован');
        })
        .on('error', (err) => {
            console.error(`Ошибка: ${err.message}`);
        });
};

await decompress();
