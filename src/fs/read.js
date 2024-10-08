import { promises as fs } from 'fs';
import path from 'path';

async function readFileContent() {
    const filePath = path.join(process.cwd(), 'src', 'fs', 'files', 'fileToRead.txt');

    try {
        await fs.access(filePath);
    } catch (error) {
        throw new Error('failed');
    }

    try {
        const content = await fs.readFile(filePath, 'utf-8');
        console.log(content);
    } catch (error) {
        throw new Error('failed');
    }
}

readFileContent().catch(error => {
    console.error(error.message);
});
