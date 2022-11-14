import fs from 'fs';
import { v4 } from 'uuid';
import path from 'path';

export function saveFile(filePath: string, fileName: string): string {
  const basePath = path.resolve('./src/public/uploads');
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const newFileName = `${v4() as string}-${fileName}`;
  const newPath = `${basePath}/${newFileName}`;
  fs.mkdirSync(basePath);
  fs.renameSync(filePath, newPath);
  return `/uploads/${newFileName}`;
}
