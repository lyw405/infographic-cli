import { describe, expect, it, beforeEach, afterEach } from 'vitest';
import { execSync } from 'child_process';
import { writeFileSync, unlinkSync, existsSync, mkdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { tmpdir } from 'os';

const CLI = 'node dist/cli.js';
const outputDir = join(tmpdir(), 'infographic-cli-tests');

describe('CLI', () => {
  beforeEach(() => {
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }
  });

  afterEach(() => {
    // Clean up test output files
    try {
      const files = ['test.svg', 'simple.svg', 'input.svg'];
      files.forEach(file => {
        const filePath = join(outputDir, file);
        if (existsSync(filePath)) {
          unlinkSync(filePath);
        }
      });
      const infoFiles = ['test.ifgc', 'simple.ifgc', 'input.ifgc'];
      infoFiles.forEach(file => {
        const filePath = join(outputDir, file);
        if (existsSync(filePath)) {
          unlinkSync(filePath);
        }
      });
    } catch {
      // Ignore cleanup errors
    }
  });

  it('should render a simple infographic to SVG', () => {
    const inputFile = join(outputDir, 'input.ifgc');
    const outputFile = join(outputDir, 'output.svg');
    const input = `infographic list-row-simple-horizontal-arrow
data
  title Test Infographic
  desc This is a test
  items
    - label Step 1
      desc First step
    - label Step 2
      desc Second step
    - label Step 3
      desc Third step
`;
    writeFileSync(inputFile, input);

    execSync(CLI + ` -i ${inputFile} -o ${outputFile}`);

    expect(existsSync(outputFile)).toBe(true);

    const svgContent = readFileSync(outputFile, 'utf-8');
    expect(svgContent).toContain('<svg');
    expect(svgContent).toContain('Test Infographic');
    expect(svgContent).toContain('Step 1');
  });

  it('should render using template shorthand', () => {
    const inputFile = join(outputDir, 'simple.ifgc');
    const outputFile = join(outputDir, 'simple.svg');
    const input = `infographic list-row-simple-horizontal-arrow
data
  title Simple Test
  items
    - label A
    - label B
    - label C
`;
    writeFileSync(inputFile, input);

    execSync(CLI + ` -i ${inputFile} -o ${outputFile}`);

    expect(existsSync(outputFile)).toBe(true);
    const svgContent = readFileSync(outputFile, 'utf-8');
    expect(svgContent).toContain('<svg');
  });

  it('should infer output format from file extension', () => {
    const inputFile = join(outputDir, 'test.ifgc');
    const outputFile = join(outputDir, 'test.svg');
    const input = `infographic list-row-simple-horizontal-arrow
data
  title Test
  items
    - label A
`;
    writeFileSync(inputFile, input);

    execSync(CLI + ` -i ${inputFile} -o ${outputFile}`);

    expect(existsSync(outputFile)).toBe(true);
  });

  it('should read from stdin using echo pipe', () => {
    const outputFile = join(outputDir, 'stdin-test.svg');
    const input = `infographic list-row-simple-horizontal-arrow
data
  title From Stdin
  items
    - label A
`;
    execSync(`echo "${input}" | ${CLI} -o ${outputFile}`, {
      shell: '/bin/bash',
    });

    expect(existsSync(outputFile)).toBe(true);
    const svgContent = readFileSync(outputFile, 'utf-8');
    expect(svgContent).toContain('From Stdin');
  });

  it('should suppress output with --quiet flag', () => {
    const inputFile = join(outputDir, 'quiet-test.ifgc');
    const outputFile = join(outputDir, 'quiet-test.svg');
    const input = `infographic list-row-simple-horizontal-arrow
data
  title Quiet Test
  items
    - label A
`;
    writeFileSync(inputFile, input);

    const output = execSync(
      CLI + ` -i ${inputFile} -o ${outputFile} --quiet`,
      { encoding: 'utf-8' }
    );

    // Should not contain "Rendering" message
    expect(output).not.toContain('Rendering');
    // But file should still be created
    expect(existsSync(outputFile)).toBe(true);
  });

  it('should error for non-existent input file', () => {
    const outputFile = join(outputDir, 'test.svg');
    expect(() => {
      execSync(CLI + ` -i /nonexistent/file.ifgc -o ${outputFile}`, {
        encoding: 'utf-8',
      });
    }).toThrow();
  });

  it('should create output directory if it does not exist', () => {
    const inputFile = join(outputDir, 'test.ifgc');
    const outputFile = join(outputDir, 'subdir', 'nested', 'test.svg');
    const input = `infographic list-row-simple-horizontal-arrow
data
  title Directory Test
  items
    - label A
`;
    writeFileSync(inputFile, input);

    execSync(CLI + ` -i ${inputFile} -o ${outputFile}`);

    expect(existsSync(outputFile)).toBe(true);
  });
});

describe('CLI with configuration', () => {
  let outputDir: string;

  beforeEach(() => {
    outputDir = join(tmpdir(), 'infographic-cli-config-tests');
    if (!existsSync(outputDir)) {
      mkdirSync(outputDir, { recursive: true });
    }
  });

  afterEach(() => {
    try {
      const files = ['theme-test.svg', 'config-test.svg', 'config.json', 'theme-test.ifgc', 'config-test.ifgc'];
      files.forEach(file => {
        const filePath = join(outputDir, file);
        if (existsSync(filePath)) {
          unlinkSync(filePath);
        }
      });
    } catch {
      // Ignore cleanup errors
    }
  });

  it('should use custom theme when specified', () => {
    const inputFile = join(outputDir, 'theme-test.ifgc');
    const outputFile = join(outputDir, 'theme-test.svg');
    const input = `infographic list-row-simple-horizontal-arrow
data
  title Theme Test
  items
    - label A
`;
    writeFileSync(inputFile, input);

    execSync(CLI + ` -i ${inputFile} -o ${outputFile} --theme hand-drawn`);

    expect(existsSync(outputFile)).toBe(true);
  });

  it('should load configuration from file', () => {
    const inputFile = join(outputDir, 'config-test.ifgc');
    const configFile = join(outputDir, 'config.json');
    const outputFile = join(outputDir, 'config-test.svg');
    const input = `infographic list-row-simple-horizontal-arrow
data
  title Config Test
  items
    - label A
`;
    const config = { theme: 'hand-drawn' };

    writeFileSync(inputFile, input);
    writeFileSync(configFile, JSON.stringify(config));

    execSync(
      CLI + ` -i ${inputFile} -o ${outputFile} --config ${configFile}`
    );

    expect(existsSync(outputFile)).toBe(true);
  });
});
