import fs from 'fs';
import { v4 } from 'uuid';
import path from 'path';

export function saveFile(userId: number, filePath: string, fileName: string): string {
  const basePath = path.resolve('./src/public/uploads');
  const newFileName = `${v4()}-${fileName}`;
  const newPath = `${basePath}/${userId}/${newFileName}`;
  if (!fs.existsSync(`${basePath}/${userId}`)) {
    fs.mkdirSync(`${basePath}/${userId}`);
  }
  fs.renameSync(filePath, newPath);
  return `/uploads/${userId}/${newFileName}`;
}

export function replaceFile(userId: number, filePath: string, fileName: string) {
  const basePath = path.resolve('./src/public/uploads');
  const newPath = `${basePath}/${userId}/${fileName}`;
  fs.renameSync(filePath, newPath);
}
