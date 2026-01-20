import fs from 'fs/promises';
import path from 'path';

export async function writeOutput(
  output: string,
  data: string | Buffer,
): Promise<void> {
  if (output === '/dev/stdout') {
    process.stdout.write(data);
  } else {
    const outputDir = path.dirname(output);
    await fs.mkdir(outputDir, { recursive: true });
    await fs.writeFile(output, data);
  }
}

export function getDefaultOutput(
  input: string | undefined,
): string {
  if (input) {
    const inputWithoutExt = input.replace(/\.(info|txt)$/, '');
    return `${inputWithoutExt}.svg`;
  }
  return 'out.svg';
}
