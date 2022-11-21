import fs from 'fs';
import { v4 } from 'uuid';
import path from 'path';

export function saveFile(filePath: string, fileName: string): string {
  const basePath = path.resolve('./src/public/uploads');
  const newFileName = `${v4()}-${fileName}`;
  const newPath = `${basePath}/${newFileName}`;
  if (!fs.existsSync(basePath)) {
    fs.mkdirSync(basePath);
  }
  fs.renameSync(filePath, newPath);
  return `/uploads/${newFileName}`;
}

export function replaceFile(filePath: string, fileName: string) {
  const basePath = path.resolve('./src/public/uploads');
  const newPath = `${basePath}/${fileName}`;
  fs.renameSync(filePath, newPath);
}
