import { readFile, writeFile, unlink } from 'node:fs/promises';
import { resolve } from 'node:path';
import { x } from 'tar';

const root = process.cwd();
const encoded = (await readFile(resolve(root, '.euromarket/source.tgz.b64'), 'utf8')).replace(/\s+/g, '');
const archive = resolve(root, '.euromarket/source.tgz');
await writeFile(archive, Buffer.from(encoded, 'base64'));
await x({ file: archive, cwd: root });
await unlink(archive);
