import fs from 'fs/promises';
import readline from 'readline';

export async function getInputData(inputFile: string | undefined): Promise<string> {
  if (inputFile) {
    return await fs.readFile(inputFile, 'utf-8');
  }

  return await new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      crlfDelay: Infinity,
    });

    let data = '';

    rl.on('line', (line) => {
      data += line + '\n';
    });

    rl.on('close', () => {
      resolve(data);
    });

    rl.on('error', (err) => {
      reject(err);
    });
  });
}
