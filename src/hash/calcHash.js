import fs from 'fs';
import { createHash } from 'crypto';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
    const fileToCalculateHashFor = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');
    const outputFile = path.join(__dirname, 'files', 'hashOutput.txt');

    const hash = createHash('sha256');

    const fileStream = fs.createReadStream(fileToCalculateHashFor);

    fileStream.on('data', (chunk) => {
        hash.update(chunk);
    });

    fileStream.on('end', () => {
        const hashHex = hash.digest('hex');
        console.log(`SHA256 Hash: ${hashHex}`);

        fs.writeFileSync(outputFile, hashHex);
        console.log(`Hash has been written to ${outputFile}`);
    });

    fileStream.on('error', (err) => {
        console.error(`Error reading the file: ${err.message}`);
    });
};

await calculateHash();
