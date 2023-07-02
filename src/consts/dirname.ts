import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const rootPath = path.normalize(__dirname + '/..');

const directory = {
    root: rootPath,
    distDir: rootPath + '/build',
    assetsDir: rootPath + '/public',
};

export default directory;
