import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    const filePath = path.join(__dirname, 'files', 'fileToRemove.txt');

    try {
        await fs.access(filePath);
    } catch {
        throw new Error('failed');
    }

    await fs.unlink(filePath);
};

try {
    await remove();
} catch (error) {
    console.error(error.message);
}
