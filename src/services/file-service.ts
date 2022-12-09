import fs from 'fs';
import { v4 } from 'uuid';
import EnvVars from '@configurations/EnvVars';
import { createClient } from '@supabase/supabase-js';

export async function saveFile(userId: number, filePath: string, fileName: string): Promise<string> {
  const supabase = createClient(EnvVars.sbProjectUrl, EnvVars.sbApiKey);

  const newFileName = `${v4()}-${fileName}`;
  const fileBuffer = fs.readFileSync(filePath);

  const { data, error } = await supabase.storage.from('uploads').upload(`${userId}/${newFileName}`, fileBuffer, {
    cacheControl: '3600',
    upsert: false,
  });

  if (!data && error) {
    throw error.message;
  }

  return data.path;
}
