import fs from 'fs/promises';
import { renderToString } from '@antv/infographic/ssr';
import { error, info, success } from '../utils/error.js';
import { getInputData } from '../utils/input.js';
import { getDefaultOutput, writeOutput } from '../utils/output.js';

export interface RenderOptions {
  input?: string;
  string?: string;
  output?: string;
  background?: string;
  quiet?: boolean;
  config?: string;
  theme?: string;
}

export async function renderCommand(options: RenderOptions): Promise<void> {
  const {
    input,
    string: stringInput,
    output: userOutput,
    quiet,
    config: configFile,
    theme,
  } = options;

  const log = quiet ? () => {} : info;

  // Validate input - cannot use both input file and string
  if (input && stringInput) {
    error('Cannot use both --input and --string options. Please use one.');
  }

  // Validate input file exists
  if (input && input !== '-') {
    try {
      await fs.access(input);
    } catch {
      error(`Input file "${input}" doesn't exist`);
    }
  }

  // Read config file if provided
  let config: Record<string, unknown> = {};
  if (configFile) {
    try {
      const configContent = await fs.readFile(configFile, 'utf-8');
      config = JSON.parse(configContent);
    } catch {
      error(`Configuration file "${configFile}" is invalid or doesn't exist`);
    }
  }

  // Merge CLI options with config
  if (theme) config.theme = theme;

  // Determine output file (always SVG)
  let output = userOutput;
  if (!output) {
    const actualInput = input && input !== '-' ? input : undefined;
    output = getDefaultOutput(actualInput);
  } else if (output === '-') {
    output = '/dev/stdout';
  }

  // Read input data
  let inputData: string;
  if (stringInput) {
    // Convert \n to actual newlines and unescape other escape sequences
    inputData = stringInput.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
  } else {
    inputData = await getInputData(input && input !== '-' ? input : undefined);
  }

  if (!inputData.trim()) {
    error('No input data provided');
  }

  log(`Rendering infographic...`);

  try {
    // Render using SSR
    const svgString = await renderToString(inputData, config as any);

    await writeOutput(output, svgString);

    if (output !== '/dev/stdout') {
      success(`Infographic rendered to ${output}`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    error(`Failed to render: ${message}`);
  }
}
