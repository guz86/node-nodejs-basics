import { promises as fs } from 'fs';
import path from 'path';

async function listFiles() {
    const dirPath = path.join(process.cwd(), 'src', 'fs', 'files');

    try {
        await fs.access(dirPath);
    } catch {
        throw new Error('failed');
    }

    try {
        const files = await fs.readdir(dirPath);

        files.forEach(file => {
            console.log(file);
        });
    } catch (error) {
        throw new Error('failed');
    }
}

listFiles().catch(error => {
    console.error(error.message);
});
