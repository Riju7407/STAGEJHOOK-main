#!/usr/bin/env node
/**
 * Production entry point for STAGEJHOOK server
 * Handles directory navigation and starts the Express server
 */

import path from 'path';
import { fileURLToPath } from 'url';
import { spawn } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverDir = path.join(__dirname, 'server');

// Change to server directory and start the server
const serverProcess = spawn('npm', ['start'], {
  cwd: serverDir,
  stdio: 'inherit',
  shell: true
});

serverProcess.on('exit', (code) => {
  process.exit(code);
});

serverProcess.on('error', (error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
