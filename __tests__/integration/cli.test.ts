import { describe, expect, it } from 'vitest';
import { execSync } from 'child_process';
import { readFileSync, unlinkSync, existsSync } from 'fs';
import { join } from 'path';

const CLI = 'node dist/cli.js';

describe('CLI Integration Tests', () => {
  describe('--help', () => {
    it('should show help information', () => {
      const output = execSync(CLI + ' --help', { encoding: 'utf-8' });
      expect(output).toContain('Command-line interface for AntV Infographic');
      expect(output).toContain('input');
      expect(output).toContain('output');
      expect(output).toContain('template');
    });
  });

  describe('--version', () => {
    it('should show version information', () => {
      const output = execSync(CLI + ' --version', { encoding: 'utf-8' });
      expect(output).toMatch(/\d+\.\d+\.\d+/);
    });
  });
});

describe('template command', () => {
  it('should list all available templates', () => {
    const output = execSync(CLI + ' template', { encoding: 'utf-8' });
    expect(output).toContain('Available templates');
    expect(output).toContain('list-row-simple-horizontal-arrow');
    expect(output).toContain('hierarchy-tree-tech-style-capsule-item');
    expect(output).toContain('github.com/antvis/Infographic');
  });

  it('should show template count', () => {
    const output = execSync(CLI + ' template', { encoding: 'utf-8' });
    expect(output).toMatch(/\(\d+\)/);
  });
});
