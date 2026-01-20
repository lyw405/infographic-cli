#!/usr/bin/env node

import { error } from './utils/error.js';
import { program } from './index.js';

try {
  await program.parseAsync(process.argv);
} catch (err) {
  error(err instanceof Error ? err.message : String(err));
}
