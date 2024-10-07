import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fileExists = async (filePath) => {
    try {
        await fs.access(filePath);
        return true;
    } catch (error) {
        if (error.code === 'ENOENT') {
            return false;
        }
        throw error;
    }
};

const create = async () => {
    const filePath = path.join(__dirname, 'files', 'fresh.txt');

    if (await fileExists(filePath)) {
        throw new Error('file already exists');
    }

    await fs.writeFile(filePath, 'I am fresh and young', 'utf8');
    console.log('File created');
};

try {
    await create();
} catch (error) {
    console.error(error.message);
}
