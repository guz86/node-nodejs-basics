import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    const sourceDir = path.join(__dirname, 'files');
    const targetDir = path.join(__dirname, 'files_copy');

    try {
        await fs.access(sourceDir);
    } catch {
        throw new Error('operation failed');
    }

    try {
        await fs.access(targetDir);
        throw new Error('operation failed');
    } catch (error) {
        if (error.code !== 'ENOENT') {
            throw error;
        }
    }

    await fs.mkdir(targetDir);

    const files = await fs.readdir(sourceDir);

    await Promise.all(
        files.map(async (file) => {
            const sourceFilePath = path.join(sourceDir, file);
            const targetFilePath = path.join(targetDir, file);
            await fs.copyFile(sourceFilePath, targetFilePath);
        })
    );
};

try {
    await copy();
} catch (error) {
    console.error(error.message);
}
