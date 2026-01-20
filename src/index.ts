#!/usr/bin/env node

import { Command } from 'commander';
import { renderCommand, type RenderOptions } from './commands/render.js';
import { templateCommand } from './commands/template.js';
import { error } from './utils/error.js';

const packageJson = await import('../package.json', {
  with: { type: 'json' },
});

const program = new Command();

program
  .name('ifgc')
  .description('Command-line interface for AntV Infographic - render declarative infographics to SVG')
  .version((packageJson as { default: { version: string } }).default.version);

// Main options (render by default, like mmdc)
program
  .option('-i, --input <file>', 'Input .ifgc file (omit to read from stdin)')
  .option('-s, --string <content>', 'Input .ifgc content as a string (use \\n for newlines)')
  .option('-o, --output <file>', 'Output file (default: input file with .svg extension)')
  .option('--background <color>', 'Background color (default: transparent)', 'transparent')
  .option('-c, --config <file>', 'JSON configuration file')
  .option('-t, --theme <name>', 'Theme name')
  .option('-q, --quiet', 'Suppress log output')
  .action(async (options: RenderOptions) => {
    try {
      await renderCommand(options);
    } catch (err) {
      error(err instanceof Error ? err.message : String(err));
    }
  });

// Template subcommand (helper)
program
  .command('template')
  .description('List available infographic templates')
  .action(async () => {
    try {
      await templateCommand();
    } catch (err) {
      error(err instanceof Error ? err.message : String(err));
    }
  });

export { program };
